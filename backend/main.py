from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
import base64

load_dotenv()

app = FastAPI(title="Stability AI Text-to-Image API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

STABILITY_API_KEY = os.getenv("STABILITY_API_KEY")
STABILITY_API_URL = "https://api.stability.ai/v2beta/stable-image/generate/sd3"

if not STABILITY_API_KEY:
    raise Exception("STABILITY_API_KEY not found in .env")

class ImageRequest(BaseModel):
    prompt: str
    output_format: str = "jpeg"

@app.post("/generate-image")
def generate_image(data: ImageRequest):
    headers = {
        "Authorization": f"Bearer {STABILITY_API_KEY}",
        "Accept": "image/*"
    }

    response = requests.post(
        STABILITY_API_URL,
        headers=headers,
        files={"none": ''},
        data={
            "prompt": data.prompt,
            "output_format": data.output_format
        }
    )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    img_base64 = base64.b64encode(response.content).decode("utf-8")
    return {"image_base64": img_base64}
