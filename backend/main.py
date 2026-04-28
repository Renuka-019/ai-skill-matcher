from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from matcher import match_data
from data import mentors
from resume_parser import extract_text

app = FastAPI()

class UserInput(BaseModel):
    skills: str
    interests: str
    domain: str

@app.post("/match")
def match(user: UserInput):
    text = user.skills + " " + user.interests + " " + user.domain

    opp, courses = match_data(text)

    xp = len(user.skills.split()) * 15
    level = "Beginner"
    if xp > 60: level = "Intermediate"
    if xp > 120: level = "Advanced"

    return {
        "opportunities": opp[:5],
        "courses": courses[:3],
        "mentors": mentors,
        "xp": xp,
        "level": level
    }

@app.post("/upload-resume")
def upload_resume(file: UploadFile = File(...)):
    text = extract_text(file.file)
    return {"extracted_text": text[:500]}
