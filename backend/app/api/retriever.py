from fastapi import APIRouter

retriever_router = APIRouter()

@retriever_router.get("/")
async def root():
    return {"message": "Retriever endpoint"}