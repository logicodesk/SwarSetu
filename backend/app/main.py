from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import ALLOWED_ORIGINS
from app.routes import health, transcription, extraction, submission

app = FastAPI(
    title="SwarSetu API",
    description="Multilingual Voice-to-Form Backend Engine for Indian Regional Languages",
    version="1.0.0"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(transcription.router)
app.include_router(extraction.router)
app.include_router(submission.router)

@app.get("/")
def root():
    return {
        "app": "SwarSetu",
        "description": "Speak Your Language. Access Every Form.",
        "docs": "/docs",
        "health": "/api/health"
    }
