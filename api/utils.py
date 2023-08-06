from typing import Optional, List, Dict, Any, Union, TypeVar, Generic, Type, Callable
from os.path import dirname, abspath, join as opjoin
from logfunc import logf


# assumes in same directory as in repo
@logf()
def get_gptmodels() -> List[str]:
    """Returns a list of GPT models in files/gptmodels.txt

    Returns:
        List[str]: List of GPT models
    """
    with open(opjoin(dirname(abspath(__file__)), 'files', 'gptmodels.txt')) as f:
        return list({line.strip() for line in f.readlines() if line.strip()})
