import copy,sys,unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from validate_course_content import validate_status

class CompletionTests(unittest.TestCase):
    def setUp(self):
        self.data={'summary':{'unit_total':1,'text_complete':0,'audio_verified':0,'QA_approved':0,'publishable':0},
          'units':[{'lesson_id':'fr-a1-u01','six_authored_sections':True,'text_complete':False,'audio_verified':False,'QA_approved':False,'publishable':False,'reference_audio_assets':['voc005']}]}
    def test_reference_only_stays_draft(self):self.assertEqual(validate_status(self.data),[])
    def test_reference_not_full_audio(self):
        self.data['units'][0]['audio_verified']=True;self.data['summary']['audio_verified']=1
        self.assertTrue(any('reference vocabulary' in e for e in validate_status(self.data)))
    def test_cannot_publish_without_review(self):
        self.data['units'][0]['publishable']=True;self.data['summary']['publishable']=1
        self.assertTrue(any('publication gates' in e for e in validate_status(self.data)))
    def test_duplicate_units(self):
        self.data['units'].append(copy.deepcopy(self.data['units'][0]));self.data['summary']['unit_total']=2
        self.assertIn('Duplicate lesson IDs',validate_status(self.data))
if __name__=='__main__':unittest.main()
