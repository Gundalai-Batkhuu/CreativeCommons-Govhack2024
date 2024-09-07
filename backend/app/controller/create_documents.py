from langchain_community.document_transformers import BeautifulSoupTransformer
from langchain_community.document_loaders import AsyncChromiumLoader
from app.dependencies.create_documents import CreateFunction

class Create():
    @classmethod
    def create_document_from_file(cls):
        return "creating from file"
    
    @classmethod
    async def create_document_from_link(cls, links):
        documents = await CreateFunction.create_document_from_link(links)
        return documents
    
    @classmethod
    def create_document_from_both(cls):
        return "creating from both file and links"