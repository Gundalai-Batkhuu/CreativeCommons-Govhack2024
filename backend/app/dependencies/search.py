from typing import Optional
from googleapiclient.discovery import build
from dotenv import load_dotenv
import os
from app.model.payload import SearchResult

load_dotenv()

class SearchFunction:
    google_api_key = os.getenv("GOOGLE_API_KEY")    
    google_cse_id = os.getenv("GOOGLE_CSE_ID")
    @classmethod
    def _get_search_query(cls, query: str, file_type: Optional[str]) -> str:
        search_query = f"*.gov.au {query}"
        if file_type:
            search_query = f"{search_query} filetype:{file_type}"
        return search_query
    
    @classmethod
    def _format_results(cls, results):
        results = results["items"]
        formatted_results = []
        for result in results:
            thumbnail = None
            cse_thumbnail = result.get("pagemap", {}).get("cse_thumbnail", None)
            if cse_thumbnail: thumbnail = cse_thumbnail[0].get("src")
            link = result.get("link", None)
            snippet = result.get("snippet", None)
            html_snippet = result.get("htmlSnippet", None)
            title = result.get("title", None)
            condensed_result = SearchResult(title=title, link=link, thumbnail=thumbnail, snippet=snippet, html_snippet=html_snippet)
            formatted_results.append(condensed_result)
        return formatted_results  
    
    @classmethod
    def get_results(cls, query, file_type):
        search_query = cls._get_search_query(query, file_type)
        service = build("customsearch", "v1", developerKey=cls.google_api_key)
        results = service.cse().list(q=search_query, cx=cls.google_cse_id).execute()
        return cls._format_results(results)