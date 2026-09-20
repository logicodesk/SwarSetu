import { IndicLanguageCode, IndicLanguageConfig } from '../types';

export const SUPPORTED_LANGUAGES: Record<IndicLanguageCode, IndicLanguageConfig> = {
  'auto': {
    code: 'auto',
    shortCode: 'auto',
    name: 'Auto Detect (Any Language)',
    nativeName: '🌐 Any Language / स्वचालित',
    script: 'Universal Indic + English',
    speakers: 'All 22 Indic Languages + English',
    status: 'Reactive Neural ASR • Multi-Engine',
    conformerModel: 'Universal ASR Cascade',
    samplePrompt: 'Speak in any language (Hindi, English, Marathi, Bengali, Tamil, etc.)...',
    sampleTranscript:
      'My name is Rahul Sharma. I am 28 years old living in Mumbai. My phone number is 9876543210 and I am an engineer.',
    sampleData: {
      name: 'Rahul Sharma',
      nameIndic: 'राहुल शर्मा',
      age: 28,
      gender: 'male',
      phone: '9876543210',
      email: null,
      address: 'Mumbai, Maharashtra',
      occupation: 'Engineer / Professional',
      serviceCategory: 'Universal Citizen Registration'
    }
  },
  'hi-IN': {
    code: 'hi-IN',
    shortCode: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'Devanagari',
    speakers: '528M+ Speakers',
    status: 'Live v1.0 • IndicConformer-v2',
    conformerModel: 'IndicConformer-v2-hi',
    samplePrompt: 'बोलिए, हम सुन रहे हैं...',
    sampleTranscript:
      'मेरा नाम राहुल शर्मा है। मेरी उम्र बाईस साल है। मैं ग्वालियर मध्य प्रदेश में रहता हूँ। मेरा फोन नंबर 9876543210 है।',
    sampleData: {
      name: 'Rahul Sharma',
      nameIndic: 'राहुल शर्मा',
      age: 22,
      gender: null, // intentionally left missing to showcase attention banner
      phone: '9876543210',
      email: null,
      address: 'Gwalior, Madhya Pradesh',
      occupation: 'Student / Freelancer',
      serviceCategory: 'Citizen Welfare & Pension Scheme'
    }
  },
  'en-IN': {
    code: 'en-IN',
    shortCode: 'en',
    name: 'Indian English',
    nativeName: 'English (India)',
    script: 'Latin',
    speakers: '130M+ Speakers',
    status: 'Live v1.0 • Conversational & Vernacular',
    conformerModel: 'IndicConformer-v2-en',
    samplePrompt: 'Speak your details in English or Hinglish...',
    sampleTranscript:
      'My name is Priya Mehta. I am female. My age is 26 years old. I reside in Bengaluru, Karnataka. My phone number is 9880123456.',
    sampleData: {
      name: 'Priya Mehta',
      nameIndic: 'प्रिया मेहता',
      age: 26,
      gender: 'female',
      phone: '9880123456',
      email: null,
      address: 'Bengaluru, Karnataka',
      occupation: 'Tech Consultant',
      serviceCategory: 'Digital Citizen Identity'
    }
  },
  'mr-IN': {
    code: 'mr-IN',
    shortCode: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    script: 'Devanagari',
    speakers: '83M+ Speakers',
    status: 'Live v1.0 • High Syntactic Precision',
    conformerModel: 'IndicConformer-v2-mr',
    samplePrompt: 'बोला, आम्ही ऐकत आहोत...',
    sampleTranscript:
      'माझे नाव अमोल पाटील आहे. माझे वय ब्याचाळीस वर्षे आहे. मी पुणे महाराष्ट्र येथे राहतो. माझा मोबाईल नंबर 9822334455 आहे. मी शेतकरी आहे.',
    sampleData: {
      name: 'Amol Patil',
      nameIndic: 'अमोल पाटील',
      age: 42,
      gender: 'male',
      phone: '9822334455',
      email: null,
      address: 'Pune, Maharashtra',
      occupation: 'Farmer (शेतकरी)',
      serviceCategory: 'Ration & Agricultural Subsidy'
    }
  },
  'bn-IN': {
    code: 'bn-IN',
    shortCode: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    script: 'Bengali',
    speakers: '97M+ Speakers',
    status: 'Live v1.0 • Deep Regional Dialects',
    conformerModel: 'IndicConformer-v2-bn',
    samplePrompt: 'বলুন, আমরা শুনছি...',
    sampleTranscript:
      'আমার নাম অনিরুদ্ধ সেন। আমার বয়স ঊনত্রিশ বছর। আমি কলকাতা পশ্চিমবঙ্গে থাকি। আমার ফোন নম্বর 9830112233।',
    sampleData: {
      name: 'Aniruddha Sen',
      nameIndic: 'অনিরুদ্ধ সেন',
      age: 29,
      gender: 'male',
      phone: '9830112233',
      email: null,
      address: 'Kolkata, West Bengal',
      occupation: 'Software Designer',
      serviceCategory: 'Swasthya Sathi Scheme'
    }
  },
  'ta-IN': {
    code: 'ta-IN',
    shortCode: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil',
    speakers: '75M+ Speakers',
    status: 'Live v1.0 • Pure & Colloquial Engine',
    conformerModel: 'IndicConformer-v2-ta',
    samplePrompt: 'பேசுங்கள், நாங்கள் கேட்கிறோம்...',
    sampleTranscript:
      'என் பெயர் கார்த்திக். எனக்கு வயது முப்பத்து நான்கு. நான் சென்னை தமிழ்நாட்டில் வசிக்கிறேன். என் அலைபேசி எண் 9444123456.',
    sampleData: {
      name: 'Karthik Raman',
      nameIndic: 'கார்த்திக்',
      age: 34,
      gender: 'male',
      phone: '9444123456',
      email: null,
      address: 'Chennai, Tamil Nadu',
      occupation: 'Merchant / Trader',
      serviceCategory: 'Public Civic Connection'
    }
  },
  'te-IN': {
    code: 'te-IN',
    shortCode: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telugu',
    speakers: '82M+ Speakers',
    status: 'Live v1.0 • IndicConformer-v2',
    conformerModel: 'IndicConformer-v2-te',
    samplePrompt: 'మాట్లాడండి, మేము వింటున్నాము...',
    sampleTranscript:
      'నా పేరు వెంకటేష్. నా వయస్సు ముప్పై రెండు సంవత్సరాలు. నేను విజయవాడ ఆంధ్రప్రదేశ్ లో నివసిస్తున్నాను. నా ఫోన్ నంబర్ 9848012345.',
    sampleData: {
      name: 'Venkatesh Rao',
      nameIndic: 'వెంకటేష్',
      age: 32,
      gender: 'male',
      phone: '9848012345',
      email: null,
      address: 'Vijayawada, Andhra Pradesh',
      occupation: 'Agricultural Supervisor',
      serviceCategory: 'Rythu Bharosa Subsidy'
    }
  },
  'gu-IN': {
    code: 'gu-IN',
    shortCode: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    script: 'Gujarati',
    speakers: '60M+ Speakers',
    status: 'Live v1.0 • High Precision',
    conformerModel: 'IndicConformer-v2-gu',
    samplePrompt: 'બોલો, અમે સાંભળી રહ્યા છીએ...',
    sampleTranscript:
      'મારું નામ હિતેશ પટેલ છે. મારી ઉંમર 35 વર્ષ છે. હું અમદાવાદ ગુજરાતમાં રહું છું. મારો ફોન નંબર 9825012345 છે.',
    sampleData: {
      name: 'Hitesh Patel',
      nameIndic: 'હિતેશ પટેલ',
      age: 35,
      gender: 'male',
      phone: '9825012345',
      email: null,
      address: 'Ahmedabad, Gujarat',
      occupation: 'Business Owner',
      serviceCategory: 'MSME & Commerce Welfare'
    }
  },
  'kn-IN': {
    code: 'kn-IN',
    shortCode: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    script: 'Kannada',
    speakers: '50M+ Speakers',
    status: 'Live v1.0 • IndicConformer-v2',
    conformerModel: 'IndicConformer-v2-kn',
    samplePrompt: 'ಮಾತನಾಡಿ, ನಾವು ಕೇಳುತ್ತಿದ್ದೇವೆ...',
    sampleTranscript:
      'ನನ್ನ ಹೆಸರು ಸುರೇಶ್ ಗೌಡ. ನನ್ನ ವಯಸ್ಸು 38 ವರ್ಷ. ನಾನು ಮೈಸೂರು ಕರ್ನಾಟಕದಲ್ಲಿ ವಾಸಿಸುತ್ತಿದ್ದೇನೆ. ನನ್ನ ದೂರವಾಣಿ ಸಂಖ್ಯೆ 9845012345.',
    sampleData: {
      name: 'Suresh Gowda',
      nameIndic: 'ಸುರೇಶ್ ಗೌಡ',
      age: 38,
      gender: 'male',
      phone: '9845012345',
      email: null,
      address: 'Mysuru, Karnataka',
      occupation: 'Senior Supervisor',
      serviceCategory: 'State Citizen Welfare'
    }
  }
};

export const LANGUAGE_LIST = Object.values(SUPPORTED_LANGUAGES);

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES['hi-IN'];
