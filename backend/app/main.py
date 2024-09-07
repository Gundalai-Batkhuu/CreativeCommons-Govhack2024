from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controller.search import Search
from .model.payload import SearchQuery
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

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
    results = Search.search(payload.query, payload.file_type, payload.mix)
    return JSONResponse(
            status_code=200,
            content=jsonable_encoder({
                "results": results
                })
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5500)