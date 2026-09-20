from typing import Optional, Literal, List, Dict, Any
from pydantic import BaseModel, Field

class TranscriptionRequest(BaseModel):
    language: Optional[str] = "hi-IN"

class TranscriptionResponse(BaseModel):
    success: bool
    transcript: str
    language: str
    latency_ms: int = 142
    clarity_score: float = 0.982
    is_demo: bool = False
    error: Optional[str] = None

class ExtractionRequest(BaseModel):
    transcript: str
    language: Optional[str] = "hi-IN"

class ExtractedData(BaseModel):
    name: Optional[str] = None
    name_indic: Optional[str] = Field(default=None, alias="nameIndic", serialization_alias="nameIndic")
    age: Optional[int] = None
    gender: Optional[Literal["male", "female", "other"]] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    occupation: Optional[str] = None

    class Config:
        populate_by_name = True

class ExtractionResponse(BaseModel):
    success: bool
    data: ExtractedData
    detected_fields_count: int
    missing_fields: List[str]
    latency_ms: int = 120
    error: Optional[str] = None

class SubmissionRequest(BaseModel):
    form_id: Optional[str] = "SW-FORM-7A"
    applicant: ExtractedData
    telemetry: Optional[Dict[str, Any]] = None

class SubmissionResponse(BaseModel):
    success: bool
    submission_id: str
    timestamp: str
    form_id: str
    message: str
