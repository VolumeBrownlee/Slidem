import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

COLAB_API = "https://c5d6-34-32-159-195.ngrok-free.app"

class SlideRequest(BaseModel):
    topic: str
    audience: str
    content: str
    knowledge: str = ""

@router.post("/generate")
async def generate_slide(req: SlideRequest):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{COLAB_API}/generate-slides",
                json=req.dict()
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print("ERROR in /generate:", e)  # <--- Add this line
            raise HTTPException(status_code=500, detail=str(e))
            from fastapi.responses import StreamingResponse
from io import BytesIO

class ImageRequest(BaseModel):
    prompt: str

@router.post("/generate-image")
async def generate_image(req: ImageRequest):
    async with httpx.AsyncClient() as client:
        try:
            # Forward the request to Colab
            response = await client.post(
                f"{COLAB_API}/generate-image",
                json=req.dict()
            )
            response.raise_for_status()
            # Colab returns an image file, so stream it back to the frontend
            return StreamingResponse(BytesIO(response.content), media_type="image/png")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))