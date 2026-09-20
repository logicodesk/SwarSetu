from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional
from app.models.schema import TranscriptionResponse
from app.services.sarvam_service import transcribe_audio_stream

router = APIRouter(tags=["Transcription"])

@router.post("/api/transcribe", response_model=TranscriptionResponse)
async def transcribe(
    audio: UploadFile = File(...),
    language: Optional[str] = Form("hi-IN")
):
    try:
        content = await audio.read()
        transcript, is_demo, latency = await transcribe_audio_stream(
            audio_bytes=content,
            language=language or "hi-IN",
            filename=audio.filename or "audio.webm"
        )
        return TranscriptionResponse(
            success=True,
            transcript=transcript,
            language=language or "hi-IN",
            latency_ms=latency,
            clarity_score=0.985,
            is_demo=is_demo
        )
    except Exception as e:
        return TranscriptionResponse(
            success=False,
            transcript="",
            language=language or "hi-IN",
            error=str(e)
        )
