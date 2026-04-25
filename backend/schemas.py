from pydantic import BaseModel

class InteractionCreate(BaseModel):
    hcp_name: str
    interaction_type: str
    date: str
    time: str
    topics: str
    sentiment: str
    outcome: str
    follow_up: str