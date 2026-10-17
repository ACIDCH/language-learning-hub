import unittest
import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from integrate_private_courses import questions,split_units

class EditorialImportTest(unittest.TestCase):
    def test_arrow_instruction_is_not_an_answer(self):
        q=questions('3. Transformez : Je visite le musée. → futur proche\n   Réponse / 参考：Je vais visiter le musée.')
        self.assertEqual(len(q),1)
        self.assertEqual(q[0]['answer'],'Je vais visiter le musée.')
    def test_blank_lines_and_multilingual_keys(self):
        q=questions('1. Qui vient ?\r\r\n   Réponse / 参考答案：Paul.\n2. Why? Answer: Because it is explicit.\n3. Je ___ ici. habite。')
        self.assertEqual([v['answer'] for v in q],['Paul.','Because it is explicit.','habite'])
    def test_id_stability(self):
        a=questions('1. Who? Answer: Paul.')[0]
        b=questions('1. Why? Answer: No reason.\n2. Who? Answer: Paul.')[1]
        self.assertEqual(a['id'],b['id'])
    def test_unit_split_preserves_preface(self):
        units=split_units('Preface\nfr-b2-u01 — One\nContent 1\nfr-b2-u02 — Two\nContent 2','Title')
        self.assertEqual([id for id,_ in units],['fr-b2-u01','fr-b2-u02'])
        self.assertTrue(all(text.startswith('Preface') for _,text in units))
