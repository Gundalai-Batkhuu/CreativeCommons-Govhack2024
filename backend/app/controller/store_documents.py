from app.dependencies.store_documents import StoreFunction

class Store:
    @classmethod
    def store(cls, documents):
        StoreFunction.store(documents)