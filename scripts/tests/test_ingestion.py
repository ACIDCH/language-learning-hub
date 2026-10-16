import io,sys,tempfile,unittest,zipfile
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from ingest_resources import inspect,safe_url

class IngestionSafety(unittest.TestCase):
    def test_reject_non_official_or_insecure_url(self):
        for url in ['http://laits.utexas.edu/file.pdf','https://laits.utexas.edu.evil.test/x','https://u:p@laits.utexas.edu/x','https://laits.utexas.edu:444/x']:
            with self.assertRaises(ValueError):safe_url(url)
    def test_reject_html_disguised_pdf(self):
        with tempfile.TemporaryDirectory() as d:
            p=Path(d)/'book.pdf';p.write_text('<html>error</html>')
            with self.assertRaises(ValueError):inspect(p)
    def test_reject_archive_traversal(self):
        for name in ['../out.mp3','/out.mp3','C:/out.mp3','dir\\out.mp3']:
            with tempfile.TemporaryDirectory() as d:
                p=Path(d)/'audio.zip'
                entry=zipfile.ZipInfo('placeholder');entry.filename=name
                with zipfile.ZipFile(p,'w') as z:z.writestr(entry,b'x')
                with self.assertRaises(ValueError):inspect(p)
    def test_reject_archive_bomb(self):
        with tempfile.TemporaryDirectory() as d:
            p=Path(d)/'audio.zip'
            with zipfile.ZipFile(p,'w',compression=zipfile.ZIP_DEFLATED) as z:z.writestr('audio.mp3',b'0'*1000000)
            with self.assertRaises(ValueError):inspect(p)
    def test_reject_audio_empty_archive(self):
        with tempfile.TemporaryDirectory() as d:
            p=Path(d)/'audio.zip'
            with zipfile.ZipFile(p,'w') as z:z.writestr('README.txt','No audio')
            with self.assertRaises(ValueError):inspect(p)

if __name__=='__main__':unittest.main()
