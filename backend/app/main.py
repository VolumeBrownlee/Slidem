from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.retriever import retriever_router
from app.api.docs import router as docs_router
from app.api.slides import router as slides_router
from app.api.critique import router as critique_router

app = FastAPI(title="SlideMentor HF API", version="1.0.0")

# Configure CORS (allow frontend dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(retriever_router, prefix="/api/retriever", tags=["retriever"])
app.include_router(docs_router, prefix="/api/docs", tags=["docs"])
app.include_router(slides_router, prefix="/api/slides", tags=["slides"])
app.include_router(critique_router, prefix="/api/critique", tags=["critique"])

@app.get("/")
async def root():
    return {"message": "Welcome to SlideMentor HF API"}