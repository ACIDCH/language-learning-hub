"""Emit public audit metadata and private, lossless text backups. No private IDs in Git."""
import argparse,csv,hashlib,json,re,sys,zipfile,subprocess
from pathlib import Path

def write_json(p,data):
    p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--private-work',required=True,type=Path);ap.add_argument('--outputs',required=True,type=Path);a=ap.parse_args()
    private=a.private_work.resolve();output=a.outputs.resolve();repo=Path(__file__).resolve().parents[1]
    if output.is_relative_to(repo):raise SystemExit('Private outputs must be outside public repository')
    output.mkdir(parents=True,exist_ok=True)
    docs=json.loads((private/'drive-baseline.json').read_text(encoding='utf-8'))
    units=json.loads((repo/'config/curriculum/units.v2.json').read_text(encoding='utf-8'))['units']
    audios=json.loads((repo/'config/assets/lesson-audio.json').read_text(encoding='utf-8'))['mappings']
    detailed={'fr-a1-u%02d'%i for i in range(1,13)}|{'en-ielts-'+t+'-u01' for t in ['reading','listening','writing-task1','writing-task2','speaking','language-upgrade']}
    backup=[]
    with zipfile.ZipFile(output/'existing-course-text-backup.zip','w',zipfile.ZIP_DEFLATED) as z:
        for i,d in enumerate(docs,1):
            raw=d['content'].encode('utf-8');name=f'document-{i:02d}.txt';z.writestr(name,raw)
            backup.append({'file':name,'title':d['title'],'drive_document_id':d['id'],'modified_time':d['modified_time'],'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest()})
        z.writestr('index.json',json.dumps(backup,ensure_ascii=False,indent=2))
    write_json(output/'private-source-index.json',backup)
    comparisons=[]
    original_manifest=json.loads(subprocess.check_output(['git','show','7ac38c7afd685f41aa5ab81da395138686fb59b3:public/learning-assets/manifest.json'],cwd=repo))
    for asset in original_manifest['assets']:
        p=repo/asset['path']
        public=p.read_text(encoding='utf-8-sig').replace('\r','').strip()
        normalized=[d['content'].lstrip('\ufeff').replace('\r','').strip() for d in docs]
        comparisons.append({'file':str(p.relative_to(repo)).replace('\\','/'),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),
          'same_normalized_text_as_drive':public in normalized,'matches_original_git_sha256':hashlib.sha256(p.read_bytes()).hexdigest()==asset['sha256'],
          'action':'preserved_unchanged','note':'Drive masters and earlier public snapshots are separate versions; no replacement or reconciliation performed.'})
    new_drafts={'en-ielts-reading-u02'}
    baseline=[]
    for u in units:
        draft=u['id'] in detailed|new_drafts
        baseline.append({'lesson_id':u['id'],'language':u['language'],'level_or_track':u.get('track',u['level']),
          'baseline_content_status':'six_section_draft' if u['id'] in detailed else 'expanded_outline',
          'content_status':'six_section_draft' if draft else 'expanded_outline',
          'six_authored_sections':draft,'text_complete':False,'audio_verified':False,'QA_approved':False,'publishable':False,
          'reference_audio_assets':[x['asset_id'] for x in audios if x['lesson_id']==u['id']],
          'public_snapshot':any(p.stem in {u['id'],u['id']+'-v1'} for p in (repo/'public/learning-assets').glob('*.txt')),
          'review':'pending','source_location':'private Drive course master; locator in private-source-index.json',
          'next_action':'Review and deepen existing manuscript; align listening transcript, exercises and answers' if draft else 'Author distinct full lesson, exercises, answers and level-appropriate audio'})
    # Current scope counts are evidence tiers; existence of headings is not text completion.
    summary={'unit_total':len(units),'baseline_six_section_drafts':len(detailed),'units_with_six_authored_sections':sum(x['six_authored_sections'] for x in baseline),
      **{key:sum(x[key] for x in baseline) for key in ['text_complete','audio_verified','QA_approved','publishable']},
      'units_with_verified_vocabulary_reference':len(audios),'existing_documents_backed_up':len(docs)}
    write_json(repo/'config/course-completeness.json',{'schema_version':1,'as_of':'2026-10-16 Pacific/Auckland','summary':summary,'units':baseline})
    write_json(repo/'reports/public-snapshot-comparison.json',comparisons)
    for name in ['baseline.csv','content-gaps.csv']:
        p=repo/'reports'/name;p.parent.mkdir(parents=True,exist_ok=True)
        with p.open('w',encoding='utf-8',newline='') as f:
            writer=csv.DictWriter(f,fieldnames=list(baseline[0]));writer.writeheader();writer.writerows(baseline)
    receipts=json.loads((private/'upload-receipts-8.json').read_text(encoding='utf-8'))
    verified={x['drive_file_id']:x for p in private.glob('verified-batch*.json') for x in json.loads(p.read_text())}
    items=[]
    for collection in ['oer','inspire']:
        m=json.loads((private/collection/'asset-manifest.local.json').read_text(encoding='utf-8'))
        for item in m.get('upload_items',m['items']):
            receipt=next((r for r in receipts if r['filename']==item['filename']),None)
            if not receipt:raise ValueError('Missing receipt '+item['filename'])
            proof=verified.get(receipt['drive_file_id'])
            ok=receipt['metadata_verified'] and ((proof and proof['match'] and proof['sha256']==item['sha256']) or receipt.get('readback_sha256_verified'))
            if not ok:raise ValueError('Readback not verified '+item['filename'])
            items.append({**item,'collection':collection,'storage_kind':'google_drive_private','status':'drive_uploaded_verified','drive_file_id':receipt['drive_file_id'],'drive_url':receipt.get('url'),
              'metadata_readback_verified':True,'raw_readback_sha256_verified':True})
    write_json(output/'private-asset-manifest.json',{'items':items})
    public_items=[{k:v for k,v in x.items() if k not in {'drive_file_id','drive_url'}} for x in items]
    write_json(repo/'config/assets/asset-manifest.json',{'schema_version':1,'items':public_items,'private_locators':'Kept only in private manifest; never exposed to static client.'})
    fields=['asset_id','filename','collection','source_url','official_chapter','bytes','sha256','mime','license','status']
    for name in ['french-textbooks-audio.csv','rights-ledger.csv']:
        with (repo/'reports'/name).open('w',encoding='utf-8',newline='') as f:
            w=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');w.writeheader();w.writerows(public_items)
    write_json(repo/'config/assets/unit_asset_mapping.json',{'schema_version':1,'mappings':audios})
    decode=json.loads((private/'audio-decode-results.json').read_text())
    summary.update(textbooks_downloaded_verified=1,chapter_pdfs_downloaded_verified=14,
      audio_files_downloaded_verified=len(decode),audio_decode_failures=sum(not x['decode_ok'] for x in decode),drive_uploads_verified=len(items),
      bytes_uploaded=sum(x['bytes'] for x in items),inspire_original_zip_upload='too_large; 166 unchanged MP3s in three verified ZIPs')
    write_json(output/'run-summary.json',summary);write_json(repo/'reports/run-summary.json',summary)
    write_json(output/'checkpoint.json',{'schema_version':1,'repository':'ACIDCH/language-learning-hub','branch':'phase-03-oer-ingestion',
      'phase0':'audited; Drive quota unavailable through connector','phase1':'FI and Inspire A1 assets verified; detailed lesson alignment in progress; Inspire A2-B2 pending',
      'phase2':'12 vocabulary references mapped; full A1 revision and listening review pending',
      'phase3':'48 English lessons not complete','phase4':'A2-C2 lessons not complete','phase5':'frontend reference player; backend remains empty','phase6':'batch verification only; final project acceptance pending',
      'next_command':'python scripts/generate_inventory.py --private-work .. --outputs ../../outputs',
      'private_state_directory':str(private),'no_background_job_configured':True})
    print(json.dumps(summary,ensure_ascii=False))

if __name__=='__main__':sys.stdout.reconfigure(encoding='utf-8');main()
