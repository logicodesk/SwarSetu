from fastapi import APIRouter
from app.config import SARVAM_API_KEY, GEMINI_API_KEY, DEMO_MODE
import datetime

router = APIRouter(tags=["Health"])

@router.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "system": "SwarSetu Sovereign Compute Engine (FastAPI)",
        "version": "1.0.0-hackathon",
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
        "services": {
            "sarvam_stt": "configured" if SARVAM_API_KEY else "fallback-available",
            "gemini_extraction": "configured" if GEMINI_API_KEY else "fallback-available",
            "demo_mode": DEMO_MODE or (not SARVAM_API_KEY and not GEMINI_API_KEY)
        }
    }
