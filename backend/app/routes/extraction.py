from fastapi import APIRouter
from app.models.schema import ExtractionRequest, ExtractionResponse
from app.services.extraction_service import extract_entities

router = APIRouter(tags=["Extraction"])

@router.post("/api/extract", response_model=ExtractionResponse)
async def extract(payload: ExtractionRequest):
    if not payload.transcript or not payload.transcript.strip():
        return ExtractionResponse(
            success=False,
            data={},
            detected_fields_count=0,
            missing_fields=["name", "age", "gender", "phone", "address"],
            error="Transcript is empty"
        )
    
    data, detected_count, missing, latency = await extract_entities(
        transcript=payload.transcript,
        language=payload.language or "hi-IN"
    )

    return ExtractionResponse(
        success=True,
        data=data,
        detected_fields_count=detected_count,
        missing_fields=missing,
        latency_ms=latency
    )
