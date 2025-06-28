from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class CritiqueRequest(BaseModel):
    slide_content: str

@router.post("/evaluate")
def critique_slide(req: CritiqueRequest):
    # Stub: Replace with rubric-based critique logic
    return {"feedback": f"Feedback for slide: {req.slide_content[:50]}..."}
