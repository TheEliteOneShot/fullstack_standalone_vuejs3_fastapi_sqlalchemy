from functools import lru_cache

from pydantic import BaseSettings


class Settings(BaseSettings):
    """

    BaseSettings, from Pydantic, validates the data so that when we create an instance of Settings,
     environment and testing will have types of str and bool, respectively.

    Parameters:

    Returns:
    instance of Settings

    """

    NONSENSE_API_PREFIX = "/v1/nonsense"
    STUFF_API_PREFIX= "/v1/stuff"

@lru_cache
def get_settings():
    return Settings()
