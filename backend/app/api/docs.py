from fastapi import APIRouter, UploadFile, File, HTTPException
import os

router = APIRouter()

DOCS_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "expert_docs")

@router.post("/upload")
async def upload_doc(file: UploadFile = File(...)):
    if not file.filename.endswith('.txt'):
        raise HTTPException(status_code=400, detail="Only .txt files are allowed")
    dest = os.path.join(DOCS_PATH, file.filename)
    with open(dest, "wb") as f:
        f.write(await file.read())
    return {"message": "File uploaded", "filename": file.filename}