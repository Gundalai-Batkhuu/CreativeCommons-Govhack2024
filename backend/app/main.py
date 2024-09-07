from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from .controller.search import Search
from .controller.create_documents import Create
from .controller.store_documents import Store
from .model.payload import (KnowledgeBase, SearchQuery)
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import Optional, List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return "hello world"

@app.post("/search-query")
def search_query(payload: SearchQuery):
    results = Search.search(payload.query, payload.file_type)
    return JSONResponse(
            status_code=200,
            content=jsonable_encoder({
                "results": results
                })
        )

@app.post("/create-knowledge-base")
async def create_knowledge_base(payload: KnowledgeBase):
    documents = await Create.create_document_from_link(payload.links)
    Store.store(documents)
    print(documents)
    return "hello"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5500)