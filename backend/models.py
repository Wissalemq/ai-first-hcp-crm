from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database import Base

class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    hcp_name = Column(String)
    interaction_type = Column(String)
    date = Column(String)
    time = Column(String)
    topics = Column(Text)
    sentiment = Column(String)
    outcome = Column(Text)
    follow_up = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)