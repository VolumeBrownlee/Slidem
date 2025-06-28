from pydantic import BaseModel, Field
from typing import List, Optional

class Slide(BaseModel):
    title: str
    bullets: List[str]
    notes: str
    chart_type: Optional[str] = None
    image_description: Optional[str] = None

class Presentation(BaseModel):
    title: str
    slides: List[Slide]
    topic: str
    audience: str
    visual_style: Optional[dict] = None

class StrategyReport(BaseModel):
    structure_quality: str
    emphasis_suggestions: List[str]
    pacing_notes: List[str]
    audience_advice: List[str]

class CoachingFeedback(BaseModel):
    content_feedback: str
    delivery_tips: List[str]
    improvement_areas: List[str]
