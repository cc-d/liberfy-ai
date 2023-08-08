import os
from os.path import dirname, abspath, join as opjoin
import sys

JWT_SECRET_KEY = 'secret'
JWT_ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 600
PORT = 8888
HOST = os.environ.get('LIBAI_HOST', '127.0.0.1')

ROOTDIR = dirname(dirname(abspath(__file__)))
APIDIR = opjoin(ROOTDIR, 'api')
FILESDIR = opjoin(APIDIR, 'files')
