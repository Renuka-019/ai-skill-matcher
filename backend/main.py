from fastapi import FastAPI
from pydantic import BaseModel
from matcher import match_all

app = FastAPI()

class UserInput(BaseModel):
    skills: str
    interests: str

@app.get("/")
def root():
    return {"message": "AI Skill Matcher API Running"}

@app.post("/match")
def match(user: UserInput):
    combined = user.skills + " " + user.interests

    opportunities, courses = match_all(combined)

    score = len(user.skills.split()) * 10

    if score > 100:
        level = "Advanced"
    elif score > 50:
        level = "Intermediate"
    else:
        level = "Beginner"

    return {
        "matches": opportunities[:5],
        "courses": courses[:3],
        "skill_score": score,
        "level": level
    }
