from langchain_core.runnables import (RunnableBranch, RunnableLambda, RunnableParallel,
RunnablePassthrough)
from langchain_core.output_parsers import StrOutputParser
from app.const import ModelProvider
from app.dependencies.llm import LLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.vectorstores import Neo4jVector
from langchain_openai import OpenAIEmbeddings

count = 0


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
        import time
        time.sleep(3)
        global count
        count += 1
        if count == 1:
            return "Thank you for contacting us regarding your concerns with the disability payment you are receiving. We understand that issues surrounding these payments can cause frustration, and we are here to help resolve this matter as quickly as possible.\n\nI am presenting you with answers related to Canberra based on your current location. Here are the steps:\n\nGetting in touch with a local welfare officer or community legal centre. They can sometimes advocate on your behalf and get things moving.\nAlso, make sure your bank details and other information are up to date in your Centrelink profile. A small error can cause big delays.\n\nYou can also get answers from the related discussion below:\nwww.localhost:3000/discussion"
        if count == 2:
            return "Thank you for your inquiry regarding the Disability Support Pension (DSP).\n\nThe DSP is a legislated income support measure designed to provide financial assistance to individuals with a permanent, diagnosed impairment that meets the criteria as stipulated under the Social Security Act 1991. To be eligible, claimants must satisfy the following statutory requirements such as Permanent Medical Condition, Means Testing, etc. Do you need more details?"
        if count == 3:
            return "Thank you for reaching out with your question about the Disability Support Pension (DSP). The DSP is a payment for people with a permanent disability that stops them from working. To be eligible, you'll need to meet a few key conditions.\n\n1. Your disability must be permanent, diagnosed by a doctor, and not expected to improve. We'll assess how much your condition impacts your ability to function, using a standard set of guidelines. \n2. We'll also check your finances, including your savings and any income, to make sure you meet the requirements."
        if count == 4:
            return "Sorry for the inconvenience. Due to the nature of the issue we are unable to provide direct resolution at this time.\n\nIt appears that this matter falls under the jurisdiction of a different department, which is better equipped to assist with the specific details of your situation. We recommend that you contact the Disability Investment Team or press the human assistance button on the left hand side of the screen."
    # @classmethod
    # def query(cls, query):
    #     chain = cls._get_chain()
    #     llm_response = chain.invoke({"question": query})
    #     return llm_response