from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
import models
import schemas

from ai_agent import process_interaction
from pydantic import BaseModel

app = FastAPI()

# ✅ CORS: allow React frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "Backend is working 🚀"}

@app.post("/interactions/")
def create_interaction(interaction: schemas.InteractionCreate, db: Session = Depends(get_db)):
    new_interaction = models.Interaction(
        hcp_name=interaction.hcp_name,
        interaction_type=interaction.interaction_type,
        date=interaction.date,
        time=interaction.time,
        topics=interaction.topics,
        sentiment=interaction.sentiment,
        outcome=interaction.outcome,
        follow_up=interaction.follow_up
    )

    db.add(new_interaction)
    db.commit()
    db.refresh(new_interaction)

    return new_interaction

class ChatInput(BaseModel):
    message: str

@app.post("/ai/chat")
def ai_chat(input: ChatInput):
    result = process_interaction(input.message)
    return result