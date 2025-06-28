import os
from langchain.document_loaders import DirectoryLoader, TextLoader
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from dotenv import load_dotenv

load_dotenv()


DOCS_PATH = os.path.join(os.path.dirname(__file__), "expert_docs")
VECTOR_STORE_PATH = os.path.join(os.path.dirname(__file__), "faiss_index")


def build_vector_store():
    loader = DirectoryLoader(DOCS_PATH, glob="*.txt", loader_cls=TextLoader)
    documents = loader.load()
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectorstore = FAISS.from_documents(documents, embeddings)
    vectorstore.save_local(VECTOR_STORE_PATH)
    print("Vector store built and saved at", VECTOR_STORE_PATH)


def load_vector_store():
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    return FAISS.load_local(VECTOR_STORE_PATH, embeddings)

if __name__ == "__main__":
    build_vector_store()
