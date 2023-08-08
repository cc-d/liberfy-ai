import sys
import unittest
from os.path import dirname, abspath, join as opjoin

if not dirname(dirname(abspath(__file__))) in sys.path:
    sys.path.insert(0, dirname(abspath(__file__)))

print(sys.path)
from api.config import APIDIR, FILESDIR
from api.utils import get_gptmodels, get_gptroles


class TestUtils(unittest.TestCase):
    def test_get_gpt_models(self):
        with open(opjoin(FILESDIR, 'gptmodels.txt')) as f:
            filemodels = list({line.strip() for line in f.readlines() if line.strip()})
        self.assertEqual(get_gptmodels(), filemodels)

    def test_get_gpt_roles(self):
        with open(opjoin(FILESDIR, 'gptroles.txt')) as f:
            fileroles = list({line.strip() for line in f.readlines() if line.strip()})
