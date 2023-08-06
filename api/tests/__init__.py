import sys
import os
from os.path import dirname, abspath

if not dirname(dirname(abspath(__file__))) in sys.path:
    sys.path.insert(0, dirname(abspath(__file__)))
