from langchain_core.runnables import (RunnableBranch, RunnableLambda, RunnableParallel,
RunnablePassthrough)
from langchain_core.output_parsers import StrOutputParser
from app.const import ModelProvider
from .llm import LLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.vectorstores import Neo4jVector
from langchain_openai import OpenAIEmbeddings

class QueryFunction:

    @classmethod
    def _get_llm(cls):
        llm_instance = LLM(temperature=0)
        llm = llm_instance.get_model(ModelProvider.OPENAI)
        return llm
    
    @classmethod
    def _get_final_prompt(cls):
        template = """Answer the question based only on the following context:
        {context}
        If the context is empty, say answers can't be found in the selected document.

        Question: {question}
        Use natural language and be concise.
        Answer:"""
        prompt = ChatPromptTemplate.from_template(template)
        return prompt
    
    @classmethod
    def _get_vector_index(cls):
        vector_index = Neo4jVector.from_existing_graph(
            OpenAIEmbeddings(),
            search_type="hybrid",
            node_label="Document",
            text_node_properties=["text"],
            embedding_node_property="embedding"
        )
        return vector_index

    @classmethod
    def _context_from_vector_search(cls, question):
        vector_index = cls._get_vector_index()
        context = [el.page_content for el in vector_index.similarity_search(question)]
        print(context)
        return context
    
    @classmethod
    def _get_chain(cls):
        chain = (
        RunnableParallel(
            {
                "context": RunnableLambda(lambda x: cls._context_from_vector_search(x["question"])),
                "question": RunnablePassthrough(),
            }
        )
        | cls._get_final_prompt()
        | cls._get_llm()
        | StrOutputParser()
        )
        return chain
    @classmethod
    def query(cls, query):
        chain = cls._get_chain()
        llm_response = chain.invoke({"question": query})
        return llm_response