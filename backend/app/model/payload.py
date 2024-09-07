from pydantic import BaseModel
from typing import Literal

class SearchQuery(BaseModel):
    query: str
    file_type: Literal["pdf", "docx", "csv", "xlsx"] | None = None
    mix: bool = False

class SearchResult(BaseModel):
    title: str | None
    link: str | None
    thumbnail: str | None       
    html_snippet: str | None
