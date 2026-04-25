from dotenv import load_dotenv
import os
import json
from langchain_groq import ChatGroq

load_dotenv()

llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.1-8b-instant"
)

def process_interaction(text: str):
    prompt = f"""
Extract structured data from this HCP interaction.

Return ONLY valid JSON.

Format:
{{
  "hcp_name": "",
  "interaction_type": "",
  "topics": "",
  "sentiment": "",
  "outcome": "",
  "follow_up": ""
}}

Interaction:
{text}
"""

    response = llm.invoke(prompt)

    try:
        return json.loads(response.content)
    except:
        return {"raw": response.content}