import {describe,it,expect,vi,afterEach} from 'vitest';
import {readDriveFile,listDriveFiles,searchDriveFiles,getDriveToken,storeDriveToken,clearDriveToken,clearDriveTokensForUser} from '../src/googleDriveClient';
afterEach(()=>vi.unstubAllGlobals());
describe('Google Drive real API adapter contracts (mock network, no private Google credential)',()=>{
 it('paginates Google Drive folder lists with Bearer token and no token in the URL',async()=>{
  const seen:string[]=[];
  vi.stubGlobal('fetch',vi.fn(async(url:string,init:RequestInit)=>{
   seen.push(url);
   expect((init.headers as Record<string,string>).Authorization).toBe('Bearer fake-token');
   return new Response(JSON.stringify({files:[{id:'abc',name:'lesson.md',mimeType:'text/markdown'}],nextPageToken:'next'}),{status:200});
  }));
  const data=await listDriveFiles('fake-token','root');
  expect(data.files).toHaveLength(1);
  expect(data.nextPageToken).toBe('next');
  expect(seen[0]).toContain('drive/v3/files');
  expect(seen[0]).not.toContain('fake-token');
 });
 it('searches entire Google account by filename, not just current folder',async()=>{
  let q='';
  vi.stubGlobal('fetch',vi.fn(async(url:string)=>{q=new URL(url).searchParams.get('q')||'';return new Response(JSON.stringify({files:[]}),{status:200});}));
  await searchDriveFiles('fake-token','fr-a1-u01');
  expect(q).toContain("name contains 'fr-a1-u01'");
 });
 it('uses official Google Docs export for text and Drive alt=media for PDF',async()=>{
  const urls:string[]=[];
  vi.stubGlobal('fetch',vi.fn(async(url:string)=>{urls.push(url);return new Response(url.includes('/export')?'Bonjour!':'%PDF-1.4',{status:200});}));
  const doc=await readDriveFile('fake-token',{id:'doc123',name:'Leçon',mimeType:'application/vnd.google-apps.document'});
  expect(doc.text).toBe('Bonjour!');
  const pdf=await readDriveFile('fake-token',{id:'pdf123',name:'large.pdf',mimeType:'application/pdf'});
  expect(pdf.pdf?.size).toBeGreaterThan(0);
  expect(urls[0]).toContain('/export?mimeType=text%2Fplain');
  expect(urls[1]).toContain('/pdf123?alt=media');
 });
 it('keeps OAuth token only in process memory, clears on request',()=>{
  storeDriveToken('person','google-account','fake-token',3600);
  expect(getDriveToken('person','google-account')).toBe('fake-token');
  clearDriveToken('person','google-account');
  expect(getDriveToken('person','google-account')).toBeNull();
  storeDriveToken('person','another-google-account','fake-second-token',3600);
  clearDriveTokensForUser('person');
  expect(getDriveToken('person','another-google-account')).toBeNull();
 });
});
