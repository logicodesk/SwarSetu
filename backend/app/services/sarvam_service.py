import httpx
import time
from typing import Tuple
from app.config import SARVAM_API_KEY, DEMO_MODE

DEMO_TRANSCRIPTS = {
    "hi-IN": "मेरा नाम राहुल शर्मा है। मेरी उम्र बाईस साल है। मैं ग्वालियर मध्य प्रदेश में रहता हूँ। मेरा फोन नंबर 9876543210 है।",
    "mr-IN": "माझे नाव अमोल पाटील आहे. माझे वय ब्याचाळीस वर्षे आहे. मी पुणे महाराष्ट्र येथे राहतो. माझा मोबाईल नंबर 9822334455 आहे. मी शेतकरी आहे.",
    "bn-IN": "আমার নাম অনিরুদ্ধ সেন। আমার বয়স ঊনত্রিশ বছর। আমি কলকাতা পশ্চিমবঙ্গে থাকি। আমার ফোন নম্বর 9830112233।",
    "ta-IN": "என் பெயர் கார்த்திக். எனக்கு வயது முப்பத்து நான்கு. நான் சென்னை தமிழ்நாட்டில் வசிக்கிறேன். என் அலைபேசி எண் 9444123456."
}

async def transcribe_audio_stream(audio_bytes: bytes, language: str = "hi-IN", filename: str = "audio.webm") -> Tuple[str, bool, int]:
    start_time = time.time()
    
    if SARVAM_API_KEY and not DEMO_MODE and len(audio_bytes) > 0:
        try:
            async with httpx.AsyncClient(timeout=25.0) as client:
                files = {"file": (filename, audio_bytes, "audio/webm")}
                data = {"language_code": language, "model": "saaras:v1"}
                headers = {"api-subscription-key": SARVAM_API_KEY}
                
                resp = await client.post("https://api.sarvam.ai/speech-to-text", files=files, data=data, headers=headers)
                if resp.status_code == 200:
                    payload = resp.json()
                    transcript = payload.get("transcript", "")
                    if transcript:
                        latency = int((time.time() - start_time) * 1000)
                        return transcript, False, latency
        except Exception as e:
            print(f"[Sarvam API Fallback] Exception: {e}")

    # Fallback to authentic predefined regional demo speech
    transcript = DEMO_TRANSCRIPTS.get(language, DEMO_TRANSCRIPTS["hi-IN"])
    latency = max(135, int((time.time() - start_time) * 1000))
    return transcript, True, latency
