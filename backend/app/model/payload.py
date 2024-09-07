from pydantic import BaseModel
from typing import Literal, List

class SearchQuery(BaseModel):
    query: str
    file_type: Literal["pdf", "docx", "csv", "xlsx"] | None = None

class SearchResult(BaseModel):
    title: str | None
    link: str | None
    thumbnail: str | None       
    html_snippet: str | None

class KnowledgeBase(BaseModel):
    links: List[str]
    files: List[str] | None = None
    description: str   

class UserQuery(BaseModel):
    query: str    
