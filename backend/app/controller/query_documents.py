from app.dependencies.query_documents import QueryFunction
class Query():
    @classmethod
    def query(cls, query):
        return QueryFunction.query(query)