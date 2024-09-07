from app.dependencies.search import SearchFunction
from typing import Optional

class Search():
    @classmethod
    def search(cls, query: str, file_type: Optional[str]):
        return SearchFunction.get_results(query, file_type)