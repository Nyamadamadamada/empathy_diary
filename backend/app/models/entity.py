from typing import Set
from pydantic import BaseModel, Field


class EntityNamesByType(BaseModel):
    PERSON: Set[str] = Field(default_factory=set)
    ORGANIZATION: Set[str] = Field(default_factory=set)
    LOCATION: Set[str] = Field(default_factory=set)
    CONSUMER_GOOD: Set[str] = Field(default_factory=set)
    EVENT: Set[str] = Field(default_factory=set)
