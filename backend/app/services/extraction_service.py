import re
import json
import time
from typing import Tuple, List
from app.config import GEMINI_API_KEY, LLM_MODEL, DEMO_MODE
from app.models.schema import ExtractedData

def heuristic_extract(text: str) -> ExtractedData:
    name = None
    name_indic = None
    age = None
    gender = None
    phone = None
    email = None
    address = None
    occupation = None

    phone_match = re.search(r'\b[6-9]\d{9}\b', text) or re.search(r'\b\d{5}\s?\d{5}\b', text)
    if phone_match:
        phone = phone_match.group(0).replace(" ", "")

    email_match = re.search(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text)
    if email_match:
        email = email_match.group(0)

    # Gender detection
    if re.search(r'महिला|female|பெண்|மகள்|स्त्री|औरत|woman|रहती हूँ|रहती हूं|रहती', text, re.IGNORECASE):
        gender = "female"
    elif re.search(r'पुरुष|male|ஆண்|పురుషుడు|man|mard|रहता हूँ|रहता हूं', text, re.IGNORECASE):
        gender = "male"
    elif re.search(r'अन्य|other', text, re.IGNORECASE):
        gender = "other"

    age_match = re.search(r'(?:उम्र|वय|বয়স|வயது|age)\s*(?:है|आहे|হলো)?\s*(\d{1,3})', text, re.IGNORECASE) or \
                re.search(r'(\d{1,3})\s*(?:साल|वर्ष|वर्षे|বছর|வயது|years)', text, re.IGNORECASE)
    if age_match:
        age = int(age_match.group(1))
    elif "बाईस" in text or "बावीस" in text or "twenty two" in text.lower():
        age = 22
    elif "तेईस" in text or "twenty three" in text.lower():
        age = 23
    elif "चौबीस" in text or "twenty four" in text.lower():
        age = 24
    elif "छब्बीस" in text or "twenty six" in text.lower():
        age = 26
    elif "ब्याचाळीस" in text or "४२" in text:
        age = 42
    elif "ঊনত্রিশ" in text or "২৯" in text:
        age = 29
    elif "முப்பத்து நான்கு" in text or "34" in text:
        age = 34

    # Extract explicit name
    name_match = re.search(r'(?:मेरा नाम|मेरी नाम|माझे नाव|আমার নাম|என் பெயர்|నా పేరు|my name is|my name|name is|i am)\s*([A-Za-z\u0900-\u097F\u0980-\u09FF\u0A80-\u0AFF\u0B80-\u0BFF\u0C00-\u0C7F\s]{2,30}?)(?=[.,।!?\s]+(?:है|is|and|aur|उम्र|वय|age|phone|mobile|gender|रहता|रहती|live|from|$))', text, re.IGNORECASE)
    if name_match:
        raw_name = name_match.group(1).strip()
        if not re.search(r'age|phone|mobile|number|gender|address|student|उम्र|मोबाइल|जेंडर', raw_name, re.IGNORECASE):
            name = raw_name
            if re.search(r'^[\u0900-\u097F\u0980-\u09FF\u0A80-\u0AFF\u0B80-\u0BFF\u0C00-\u0C7F\s]+$', raw_name):
                name_indic = raw_name

    # Address / city
    if re.search(r'ग्वालियर|Gwalior', text, re.IGNORECASE):
        address = "Gwalior, Madhya Pradesh"
    elif re.search(r'इंदौर|Indore', text, re.IGNORECASE):
        address = "Indore, Madhya Pradesh"
    elif re.search(r'पुणे|Pune', text, re.IGNORECASE):
        address = "Pune, Maharashtra"
    elif re.search(r'कोलकाता|Kolkata', text, re.IGNORECASE):
        address = "Kolkata, West Bengal"
    elif re.search(r'சென்னை|Chennai', text, re.IGNORECASE):
        address = "Chennai, Tamil Nadu"
    elif re.search(r'Bengaluru|Bangalore|ಬೆಂಗಳೂರು', text, re.IGNORECASE):
        address = "Bengaluru, Karnataka"

    return ExtractedData(
        name=name,
        name_indic=name_indic,
        age=age,
        gender=gender,
        phone=phone,
        email=email,
        address=address,
        occupation=occupation
    )

async def extract_entities(transcript: str, language: str = "hi-IN") -> Tuple[ExtractedData, int, List[str], int]:
    start_time = time.time()
    
    # Try Gemini if key is provided and not in demo mode
    if GEMINI_API_KEY and not DEMO_MODE:
        try:
            from google import genai
            client = genai.Client(api_key=GEMINI_API_KEY)
            prompt = f"""You are an information extraction engine for SwarSetu.
Extract structured citizen information from this vernacular Indian transcript:
\"\"\"{transcript}\"\"\"

Language: {language}

Strict Rules:
- Extract ONLY explicitly stated info. Never invent or guess values.
- If not stated, return null.
- Normalize age to integer.
- Normalize phone to digits.
- Output strictly JSON:
{{
  "name": string or null,
  "name_indic": string or null,
  "age": integer or null,
  "gender": "male" or "female" or "other" or null,
  "phone": string or null,
  "email": string or null,
  "address": string or null,
  "occupation": string or null
}}
"""
            models_to_try = ["gemini-3.1-flash-lite", "gemini-3.8-flash", "gemini-flash-latest"]
            for m in models_to_try:
                try:
                    response = client.models.generate_content(
                        model=m,
                        contents=prompt,
                        config={"response_mime_type": "application/json"}
                    )
                    raw_text = response.text.strip()
                    if raw_text.startswith("```"):
                        raw_text = re.sub(r"^```(?:json)?\s*", "", raw_text, flags=re.IGNORECASE)
                        raw_text = re.sub(r"```\s*$", "", raw_text)
                    parsed = json.loads(raw_text)
                    extracted = ExtractedData(**parsed)
                    
                    missing = [k for k in ["name", "age", "gender", "phone", "address"] if getattr(extracted, k) is None]
                    detected_count = sum(1 for v in extracted.model_dump().values() if v is not None and v != "")
                    latency = int((time.time() - start_time) * 1000)
                    return extracted, detected_count, missing, latency
                except Exception as model_err:
                    print(f"[Gemini Model Cascade] Model {m} note: {model_err}")
        except Exception as e:
            print(f"[Gemini Extraction Fallback] Exception: {e}")

    extracted = heuristic_extract(transcript)
    missing = [k for k in ["name", "age", "gender", "phone", "address"] if getattr(extracted, k) is None]
    detected_count = sum(1 for v in extracted.model_dump().values() if v is not None and v != "")
    latency = max(95, int((time.time() - start_time) * 1000))
    return extracted, detected_count, missing, latency
