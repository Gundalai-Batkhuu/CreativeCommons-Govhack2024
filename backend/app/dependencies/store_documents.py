from app.dependencies.llm import LLM
from app.const import ModelProvider
from langchain_experimental.graph_transformers import LLMGraphTransformer
from langchain_community.graphs import Neo4jGraph
from langchain.text_splitter import TokenTextSplitter

class StoreFunction:

    @classmethod
    def _get_document_chunks(cls, documents):
        text_splitter = TokenTextSplitter(chunk_size=512, chunk_overlap=24)
        split_documents = text_splitter.split_documents(documents)
        return split_documents

    @classmethod
    def _get_graph_documents(cls, documents):
        documents = cls._get_document_chunks(documents)
        llm_selector = LLM(temperature=0)
        llm = llm_selector.get_model(ModelProvider.BEDROCK_HAIKU)
        llm_transformer = LLMGraphTransformer(llm=llm)
        graph_documents = llm_transformer.convert_to_graph_documents(documents)
        return graph_documents  

    @classmethod
    def store(cls, documents):
        graph_documents = cls._get_graph_documents(documents)
        print("got graph documents")
        graph = Neo4jGraph()
        graph.add_graph_documents(
            graph_documents,
            baseEntityLabel=True,
            include_source=True
        )
        graph.query("CREATE FULLTEXT INDEX entity IF NOT EXISTS FOR (e:__Entity__) ON EACH [e.id]")