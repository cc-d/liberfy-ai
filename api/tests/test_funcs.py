import sys
import unittest
from os.path import dirname, abspath, join as opjoin
from utils import get_gptmodels


class TestFuncs(unittest.TestCase):
    def test_get_gpt_models(self):
        with open(
            opjoin(dirname(dirname(abspath(__file__))), 'files', 'gptmodels.txt')
        ) as f:
            filemodels = list({line.strip() for line in f.readlines() if line.strip()})
        self.assertEqual(get_gptmodels(), filemodels)
