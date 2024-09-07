from langchain_community.document_transformers import BeautifulSoupTransformer
from langchain_community.document_loaders import AsyncChromiumLoader

class CreateFunction:  
    @classmethod
    async def create_document_from_link(cls, links):
        transformer = BeautifulSoupTransformer()
        loader = AsyncChromiumLoader(links, user_agent="MyAppUserAgent")
        html = await loader.aload()
        transformed_docs = transformer.transform_documents(html, tags_to_extract=["span", "p", "li", "div", "a"])
        return transformed_docs