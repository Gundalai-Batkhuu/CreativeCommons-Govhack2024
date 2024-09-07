from typing import Union
from langchain_openai import ChatOpenAI
from app.const import ModelProvider
from langchain_aws import ChatBedrock
from dotenv import load_dotenv
import os
from app.const import ModelDetails

load_dotenv()

os.environ["AWS_ACCESS_KEY_ID"] = os.getenv("AWS_ACCESS_KEY_ID")
os.environ["AWS_SECRET_ACCESS_KEY"] = os.getenv("AWS_SECRET_ACCESS_KEY")
os.environ["AWS_DEFAULT_REGION"] = os.getenv("AWS_REGION_SYD")

class LLM:
    def __init__(self, temperature: Union[float, int] = 0):  
        self.temperature = temperature  

    def get_model(self, model_provider):
        if model_provider == ModelProvider.OPENAI:
            model = ModelDetails.OPENAI_GPT_TURBO
            return self._get_openai(model)   
        if model_provider == ModelProvider.BEDROCK_HAIKU:
            model = ModelDetails.BEDROCK_CLAUDE_HAIKU
            return self._get_bedrock(model)   
        if model_provider == ModelProvider.BEDROCK_SONNET:
            model = ModelDetails.BEDROCK_CLAUDE_SONNET
            return self._get_bedrock(model)  
    
    def _get_openai(self, model: str) -> ChatOpenAI:
        llm = ChatOpenAI(temperature=self.temperature, model_name=model)
        return llm    
    
    def _get_bedrock(self, model: str) -> ChatBedrock:
        llm = ChatBedrock(
            model_id=model,
            model_kwargs=dict(temperature=self.temperature),
        )
        return llm
        