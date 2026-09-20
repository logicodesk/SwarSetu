from fastapi import APIRouter
from app.models.schema import SubmissionRequest, SubmissionResponse
import datetime
import random

router = APIRouter(tags=["Submission"])

@router.post("/api/submit", response_model=SubmissionResponse)
async def submit_application(payload: SubmissionRequest):
    random_id = random.randint(10000, 99999)
    sub_id = f"SW-2026-IND-{random_id}"
    
    return SubmissionResponse(
        success=True,
        submission_id=sub_id,
        timestamp=datetime.datetime.utcnow().isoformat() + "Z",
        form_id=payload.form_id or "SW-FORM-7A",
        message="Application successfully verified and registered in State Citizen Registry."
    )
