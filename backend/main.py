from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import edge_tts
import tempfile
import os
import uuid
from pydantic import BaseModel

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TTSRequest(BaseModel):
    text: str
    voice: str
    rate: str = "+0%"  # edge-tts format: +0%, -10%, etc.
    pitch: str = "+0Hz" # edge-tts format: +0Hz, -10Hz

@app.get("/voices")
async def get_voices():
    """Fetch available voices from edge-tts"""
    try:
        voices = await edge_tts.list_voices()
        # Filter for English voices for simplicity initially, or return all
        # Returning a simplified structure
        return [
            {
                "Name": v["Name"],
                "ShortName": v["ShortName"],
                "Gender": v["Gender"],
                "Locale": v["Locale"]
            }
            for v in voices
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/tts")
async def generate_tts(request: TTSRequest):
    """Generate audio from text"""
    try:
        communicate = edge_tts.Communicate(
            request.text, 
            request.voice, 
            rate=request.rate, 
            pitch=request.pitch
        )
        
        # Create a unique filename
        filename = f"audio_{uuid.uuid4()}.mp3"
        filepath = os.path.join(tempfile.gettempdir(), filename)
        
        await communicate.save(filepath)
        
        return FileResponse(filepath, media_type="audio/mpeg", filename=filename)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
