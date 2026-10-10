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

export interface FormFieldLocalization {
  fullNameLabel: string;
  nameEnglishPlaceholder: string;
  nameIndicPlaceholder: string;
  ageLabel: string;
  agePlaceholder: string;
  ageUnit: string;
  genderLabel: string;
  genderMale: string;
  genderFemale: string;
  genderOther: string;
  phoneLabel: string;
  phonePlaceholder: string;
  addressLabel: string;
  addressPlaceholder: string;
  occupationLabel: string;
  occupationPlaceholder: string;
  voiceFillMissingTitle: string;
  submitButtonText: string;
  clearButtonText: string;
  bhashiniVerifiedBadge: string;
  attentionBannerTitle: string;
  attentionBannerDesc: string;
  setGenderMaleText: string;
  setGenderFemaleText: string;
  setGenderOtherText: string;
  formEngineTitle: string;
  formEngineSubtitle: string;
  aiDetectedBadge: string;
  needsSpokenBadge: string;
  verifiedBadge: string;
  needsReviewBadge: string;
}

export const FORM_LOCALIZATIONS: Record<IndicLanguageCode, FormFieldLocalization> = {
  'hi-IN': {
    fullNameLabel: 'Full Name (पूरा नाम)',
    nameEnglishPlaceholder: 'English Script (उदा. राहुल शर्मा)',
    nameIndicPlaceholder: 'Devanagari Script (उदा. राहुल शर्मा)',
    ageLabel: 'Age (आयु)',
    agePlaceholder: 'वर्ष (उदा. 22)',
    ageUnit: 'वर्ष (Years)',
    genderLabel: 'Gender (लिंग)',
    genderMale: 'Male (पुरुष)',
    genderFemale: 'Female (महिला)',
    genderOther: 'Other (अन्य)',
    phoneLabel: 'Mobile Number (मोबाइल नंबर)',
    phonePlaceholder: '10 अंकों का मोबाइल नंबर',
    addressLabel: 'Resident City & State (निवास स्थान)',
    addressPlaceholder: 'शहर, जिला, राज्य (उदा. ग्वालियर, मध्य प्रदेश)',
    occupationLabel: 'Occupation / Category (व्यवसाय)',
    occupationPlaceholder: 'उदा. छात्र / किसान / व्यापारी (Student / Farmer)',
    voiceFillMissingTitle: 'कमी पूरी करें',
    submitButtonText: 'आवेदन जमा करें (Submit)',
    clearButtonText: 'फॉर्म साफ करें (Reset)',
    bhashiniVerifiedBadge: 'भाषिणी सत्यापित • लेवल 2',
    attentionBannerTitle: 'समीक्षा की आवश्यकता • लिंग विवरण अनुपलब्ध',
    attentionBannerDesc: 'लिंग विवरण की पुष्टि करें:',
    setGenderMaleText: 'पुरुष (Male)',
    setGenderFemaleText: 'महिला (Female)',
    setGenderOtherText: 'अन्य (Other)',
    formEngineTitle: 'Smart Form Engine',
    formEngineSubtitle: 'नागरिक फॉर्म वास्तविक समय में भर रहा है',
    aiDetectedBadge: 'AI Detected (Voice)',
    needsSpokenBadge: 'Needs Spoken Name',
    verifiedBadge: 'Verified',
    needsReviewBadge: 'Needs Review • Missing'
  },
  'mr-IN': {
    fullNameLabel: 'Full Name (पूर्ण नाव)',
    nameEnglishPlaceholder: 'English Script (उदा. अमोल पाटील)',
    nameIndicPlaceholder: 'मराठी देवनागरी (उदा. अमोल पाटील)',
    ageLabel: 'Age (वय)',
    agePlaceholder: 'वर्षे (उदा. 42)',
    ageUnit: 'वर्षे (Years)',
    genderLabel: 'Gender (लिंग)',
    genderMale: 'Male (पुरुष)',
    genderFemale: 'Female (महिला)',
    genderOther: 'Other (इतर)',
    phoneLabel: 'Mobile Number (मोबाईल क्रमांक)',
    phonePlaceholder: '10 अंकी मोबाईल क्रमांक',
    addressLabel: 'Resident City & State (निवास स्थान)',
    addressPlaceholder: 'शहर, जिल्हा, राज्य (उदा. पुणे, महाराष्ट्र)',
    occupationLabel: 'Occupation / Category (व्यवसाय / नोकरी)',
    occupationPlaceholder: 'उदा. शेतकरी / विद्यार्थी / व्यावसायिक (Farmer / Student)',
    voiceFillMissingTitle: 'तपशील भरा',
    submitButtonText: 'अर्ज सादर करा (Submit)',
    clearButtonText: 'फॉर्म रीसेट करा (Reset)',
    bhashiniVerifiedBadge: 'भाषिणी प्रमाणित • स्तर २',
    attentionBannerTitle: 'तपासणी आवश्यक • लिंग माहिती उपलब्ध नाही',
    attentionBannerDesc: 'लिंग माहितीची पुष्टी करा:',
    setGenderMaleText: 'पुरुष (Male)',
    setGenderFemaleText: 'महिला (Female)',
    setGenderOtherText: 'इतर (Other)',
    formEngineTitle: 'Smart Form Engine',
    formEngineSubtitle: 'नागरी फॉर्म रिअल-टाइममध्ये भरला जात आहे',
    aiDetectedBadge: 'AI Detected (Voice)',
    needsSpokenBadge: 'Needs Spoken Name',
    verifiedBadge: 'Verified',
    needsReviewBadge: 'Needs Review • Missing'
  },
  'bn-IN': {
    fullNameLabel: 'Full Name (পূর্ণ নাম)',
    nameEnglishPlaceholder: 'English Script (যেমন অনিরুদ্ধ সেন)',
    nameIndicPlaceholder: 'বাংলা লিপি (যেমন অনিরুদ্ধ সেন)',
    ageLabel: 'Age (বয়স)',
    agePlaceholder: 'বছর (যেমন 29)',
    ageUnit: 'বছর (Years)',
    genderLabel: 'Gender (লিঙ্গ)',
    genderMale: 'Male (পুরুষ)',
    genderFemale: 'Female (মহিলা)',
    genderOther: 'Other (অন্যান্য)',
    phoneLabel: 'Mobile Number (মোবাইল নম্বর)',
    phonePlaceholder: '10 সংখ্যার মোবাইল নম্বর',
    addressLabel: 'Resident City & State (বাসস্থানের ঠিকানা)',
    addressPlaceholder: 'শহর, জেলা, রাজ্য (যেমন কলকাতা, পশ্চিমবঙ্গ)',
    occupationLabel: 'Occupation / Category (পেশা)',
    occupationPlaceholder: 'যেমন ছাত্র / চাষী / চাকুরিজীবী (Student / Farmer)',
    voiceFillMissingTitle: 'তথ্য পূরণ করুন',
    submitButtonText: 'আবেদন জমা দিন (Submit)',
    clearButtonText: 'ফর্ম মুছুন (Reset)',
    bhashiniVerifiedBadge: 'ভাষিণী অনুমোদিত • স্তর ২',
    attentionBannerTitle: 'পর্যালোচনা প্রয়োজন • লিঙ্গ তথ্য অনুপস্থিত',
    attentionBannerDesc: 'লিঙ্গ নিশ্চিত করুন:',
    setGenderMaleText: 'পুরুষ (Male)',
    setGenderFemaleText: 'মহিলা (Female)',
    setGenderOtherText: 'অন্যান্য (Other)',
    formEngineTitle: 'Smart Form Engine',
    formEngineSubtitle: 'নাগরিক ফর্ম রিয়েল-টাইমে পূরণ হচ্ছে',
    aiDetectedBadge: 'AI Detected (Voice)',
    needsSpokenBadge: 'Needs Spoken Name',
    verifiedBadge: 'Verified',
    needsReviewBadge: 'Needs Review • Missing'
  },
  'ta-IN': {
    fullNameLabel: 'Full Name (முழு பெயர்)',
    nameEnglishPlaceholder: 'English Script (எ.கா. கார்த்திக்)',
    nameIndicPlaceholder: 'தமிழ் எழுத்துரு (எ.கா. கார்த்திக்)',
    ageLabel: 'Age (வயது)',
    agePlaceholder: 'வயது (எ.கா. 34)',
    ageUnit: 'வயது (Years)',
    genderLabel: 'Gender (பாலினம்)',
    genderMale: 'Male (ஆண்)',
    genderFemale: 'Female (பெண்)',
    genderOther: 'Other (மற்றவை)',
    phoneLabel: 'Mobile Number (கைபேசி எண்)',
    phonePlaceholder: '10 இலக்க கைபேசி எண்',
    addressLabel: 'Resident City & State (வசிப்பிடம்)',
    addressPlaceholder: 'நகரம், மாவட்டம், மாநிலம் (எ.கா. சென்னை, தமிழ்நாடு)',
    occupationLabel: 'Occupation / Category (தொழில் / பணி)',
    occupationPlaceholder: 'எ.கா. விவசாயி / மாணவர் / வியாபாரி (Farmer / Trader)',
    voiceFillMissingTitle: 'விவரங்களை நிரப்பவும்',
    submitButtonText: 'விண்ணப்பத்தை சமர்ப்பிக்கவும் (Submit)',
    clearButtonText: 'படிவத்தை மீட்டமை (Reset)',
    bhashiniVerifiedBadge: 'பாஷினி சரிபார்க்கப்பட்டது • நிலை 2',
    attentionBannerTitle: 'கவனம் தேவை • பாலினம் குறிப்பிடப்படவில்லை',
    attentionBannerDesc: 'பாலினத்தை உறுதிப்படுத்தவும்:',
    setGenderMaleText: 'ஆண் (Male)',
    setGenderFemaleText: 'பெண் (Female)',
    setGenderOtherText: 'மற்றவை (Other)',
    formEngineTitle: 'Smart Form Engine',
    formEngineSubtitle: 'குடிமக்கள் படிவம் நிகழ்நேரத்தில் நிரப்பப்படுகிறது',
    aiDetectedBadge: 'AI Detected (Voice)',
    needsSpokenBadge: 'Needs Spoken Name',
    verifiedBadge: 'Verified',
    needsReviewBadge: 'Needs Review • Missing'
  },
  'te-IN': {
    fullNameLabel: 'Full Name (పూర్తి పేరు)',
    nameEnglishPlaceholder: 'English Script (ఉదా. వెంకటేష్)',
    nameIndicPlaceholder: 'తెలుగు లిపి (ఉదా. వెంకటేష్)',
    ageLabel: 'Age (వయస్సు)',
    agePlaceholder: 'సంవత్సరాలు (ఉదా. 32)',
    ageUnit: 'సంవత్సరాలు (Years)',
    genderLabel: 'Gender (లింగం)',
    genderMale: 'Male (పురుషుడు)',
    genderFemale: 'Female (మహిళ / స్త్రీ)',
    genderOther: 'Other (ఇతర)',
    phoneLabel: 'Mobile Number (మొబైల్ నంబర్)',
    phonePlaceholder: '10 అంకెల మొబైల్ నంబర్',
    addressLabel: 'Resident City & State (నివాస స్థలం)',
    addressPlaceholder: 'నగరం, జిల్లా, రాష్ట్రం (ఉదా. విజయవాడ, ఆంధ్రప్రదేశ్)',
    occupationLabel: 'Occupation / Category (వృత్తి / ఉద్యోగం)',
    occupationPlaceholder: 'ఉదా. రైతు / విద్యార్థి / వ్యాపారి (Farmer / Student)',
    voiceFillMissingTitle: 'వివరాలు పూరించండి',
    submitButtonText: 'దరఖాస్తు సమర్పించండి (Submit)',
    clearButtonText: 'ఫారమ్ రీసెట్ చేయండి (Reset)',
    bhashiniVerifiedBadge: 'భాషిణి ధృవీకరించబడింది • స్థాయి 2',
    attentionBannerTitle: 'పరిశీలన అవసరం • లింగం వివరాలు లేవు',
    attentionBannerDesc: 'లింగాన్ని నిర్ధారించండి:',
    setGenderMaleText: 'పురుషుడు (Male)',
    setGenderFemaleText: 'మహిళ (Female)',
    setGenderOtherText: 'ఇతర (Other)',
    formEngineTitle: 'Smart Form Engine',
    formEngineSubtitle: 'పౌర దరఖాస్తు నిజ-సమయంలో నింపబడుతోంది',
    aiDetectedBadge: 'AI Detected (Voice)',
    needsSpokenBadge: 'Needs Spoken Name',
    verifiedBadge: 'Verified',
    needsReviewBadge: 'Needs Review • Missing'
  },
  'gu-IN': {
    fullNameLabel: 'Full Name (પૂરું નામ)',
    nameEnglishPlaceholder: 'English Script (દા.ત. હિતેશ પટેલ)',
    nameIndicPlaceholder: 'ગુજરાતી લિપિ (દા.ત. હિતેશ પટેલ)',
    ageLabel: 'Age (ઉંમર)',
    agePlaceholder: 'વર્ષ (દા.ત. 35)',
    ageUnit: 'વર્ષ (Years)',
    genderLabel: 'Gender (જાતિ / લિંગ)',
    genderMale: 'Male (પુરુષ)',
    genderFemale: 'Female (મહિલા)',
    genderOther: 'Other (અન્ય)',
    phoneLabel: 'Mobile Number (મોબાઇલ નંબર)',
    phonePlaceholder: '10 અંકનો મોબાઇલ નંબર',
    addressLabel: 'Resident City & State (રહેઠાણનું સ્થળ)',
    addressPlaceholder: 'શહેર, જિલ્લો, રાજ્ય (દા.ત. અમદાવાદ, ગુજરાત)',
    occupationLabel: 'Occupation / Category (વ્યવસાય)',
    occupationPlaceholder: 'દા.ત. ખેડૂત / વિદ્યાર્થી / વેપારી (Farmer / Business)',
    voiceFillMissingTitle: 'વિગત ભરો',
    submitButtonText: 'અરજી સબમિટ કરો (Submit)',
    clearButtonText: 'ફોર્મ રીસેટ કરો (Reset)',
    bhashiniVerifiedBadge: 'ભાષિણી પ્રમાણિત • સ્તર 2',
    attentionBannerTitle: 'ધ્યાન જરૂરી • લિંગ વિગત ખૂટે છે',
    attentionBannerDesc: 'લિંગની પુષ્ટિ કરો:',
    setGenderMaleText: 'પુરુષ (Male)',
    setGenderFemaleText: 'મહિલા (Female)',
    setGenderOtherText: 'અન્ય (Other)',
    formEngineTitle: 'Smart Form Engine',
    formEngineSubtitle: 'નાગરિક ફોર્મ રીઅલ-ટાઇમમાં ભરાઈ રહ્યું છે',
    aiDetectedBadge: 'AI Detected (Voice)',
    needsSpokenBadge: 'Needs Spoken Name',
    verifiedBadge: 'Verified',
    needsReviewBadge: 'Needs Review • Missing'
  },
  'kn-IN': {
    fullNameLabel: 'Full Name (ಪೂರ್ಣ ಹೆಸರು)',
    nameEnglishPlaceholder: 'English Script (ಉದಾ. ಸುರೇಶ್ ಗೌಡ)',
    nameIndicPlaceholder: 'ಕನ್ನಡ ಲಿಪಿ (ಉದಾ. ಸುರೇಶ್ ಗೌಡ)',
    ageLabel: 'Age (ವಯಸ್ಸು)',
    agePlaceholder: 'ವರ್ಷಗಳು (ಉದಾ. 38)',
    ageUnit: 'ವರ್ಷಗಳು (Years)',
    genderLabel: 'Gender (ಲಿಂಗ)',
    genderMale: 'Male (ಪುರುಷ)',
    genderFemale: 'Female (ಮಹಿಳೆ)',
    genderOther: 'Other (ಇತರೆ)',
    phoneLabel: 'Mobile Number (ಮೊಬೈಲ್ ಸಂಖ್ಯೆ)',
    phonePlaceholder: '10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    addressLabel: 'Resident City & State (ವಾಸಸ್ಥಳ)',
    addressPlaceholder: 'ನಗರ, ಜಿಲ್ಲೆ, ರಾಜ್ಯ (ಉದಾ. ಮೈಸೂರು, ಕರ್ನಾಟಕ)',
    occupationLabel: 'Occupation / Category (ಉದ್ಯೋಗ)',
    occupationPlaceholder: 'ಉದಾ. ರೈತ / ವಿದ್ಯಾರ್ಥಿ / ವ್ಯಾಪಾರಿ (Farmer / Supervisor)',
    voiceFillMissingTitle: 'ವಿವರ ಭರ್ತಿ ಮಾಡಿ',
    submitButtonText: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ (Submit)',
    clearButtonText: 'ಫಾರ್ಮ್ ಮರುಹೊಂದಿಸಿ (Reset)',
    bhashiniVerifiedBadge: 'ಭಾಷಿಣಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ • ಹಂತ 2',
    attentionBannerTitle: 'ಗಮನ ಅಗತ್ಯ • ಲಿಂಗ ವಿವರ ಲಭ್ಯವಿಲ್ಲ',
    attentionBannerDesc: 'ಲಿಂಗವನ್ನು ದೃಢೀಕರಿಸಿ:',
    setGenderMaleText: 'ಪುರುಷ (Male)',
    setGenderFemaleText: 'ಮಹಿಳೆ (Female)',
    setGenderOtherText: 'ಇತರೆ (Other)',
    formEngineTitle: 'Smart Form Engine',
    formEngineSubtitle: 'ನಾಗರಿಕ ಅರ್ಜಿಯನ್ನು ನೈಜ ಸಮಯದಲ್ಲಿ ಭರ್ತಿ ಮಾಡಲಾಗುತ್ತಿದೆ',
    aiDetectedBadge: 'AI Detected (Voice)',
    needsSpokenBadge: 'Needs Spoken Name',
    verifiedBadge: 'Verified',
    needsReviewBadge: 'Needs Review • Missing'
  },
  'en-IN': {
    fullNameLabel: 'Full Name (Applicant Name)',
    nameEnglishPlaceholder: 'English Script (e.g. Priya Mehta)',
    nameIndicPlaceholder: 'Regional Script / Native Name (e.g. प्रिया मेहता)',
    ageLabel: 'Age (in Years)',
    agePlaceholder: 'Years (e.g. 26)',
    ageUnit: 'Years',
    genderLabel: 'Gender',
    genderMale: 'Male',
    genderFemale: 'Female',
    genderOther: 'Other',
    phoneLabel: 'Mobile Number (10 Digits)',
    phonePlaceholder: '10-digit mobile number',
    addressLabel: 'Resident City & State',
    addressPlaceholder: 'City, District, State (e.g. Bengaluru, Karnataka)',
    occupationLabel: 'Occupation / Category',
    occupationPlaceholder: 'e.g. Student / Tech Consultant / Farmer',
    voiceFillMissingTitle: 'Voice Fill',
    submitButtonText: 'Submit Application',
    clearButtonText: 'Reset Form',
    bhashiniVerifiedBadge: 'Bhashini Verified • Tier 2',
    attentionBannerTitle: 'Attention Required • Missing Gender',
    attentionBannerDesc: 'Please confirm applicant gender:',
    setGenderMaleText: 'Male',
    setGenderFemaleText: 'Female',
    setGenderOtherText: 'Other',
    formEngineTitle: 'Smart Form Engine',
    formEngineSubtitle: 'Extracting civic schema in real-time',
    aiDetectedBadge: 'AI Detected (Voice)',
    needsSpokenBadge: 'Needs Spoken Name',
    verifiedBadge: 'Verified',
    needsReviewBadge: 'Needs Review • Missing'
  },
  'auto': {
    fullNameLabel: 'Full Name (Citizen Name / पूर्ण नाम)',
    nameEnglishPlaceholder: 'English Script (e.g. Rahul Sharma)',
    nameIndicPlaceholder: 'Native Indic Script / मातृभाषा লিপি / தமிழ்',
    ageLabel: 'Age (आयु / वय / வயது / వయస్సు)',
    agePlaceholder: 'Years (e.g. 28)',
    ageUnit: 'Years',
    genderLabel: 'Gender (लिंग / பாலினம் / లింగం)',
    genderMale: 'Male (पुरुष / ஆண் / పురుషుడు)',
    genderFemale: 'Female (महिला / பெண் / మహిళ)',
    genderOther: 'Other (अन्य / மற்றவை / ఇతర)',
    phoneLabel: 'Mobile Number (मोबाइल / கைபேசி எண்)',
    phonePlaceholder: '10-digit mobile number',
    addressLabel: 'Resident City & State (पता / முகவரி)',
    addressPlaceholder: 'City, District, State (e.g. Mumbai, Maharashtra)',
    occupationLabel: 'Occupation / Category (व्यवसाय / தொழில்)',
    occupationPlaceholder: 'e.g. Student / Farmer / Professional',
    voiceFillMissingTitle: 'Voice Fill Missing',
    submitButtonText: 'Submit Application (जमा करें)',
    clearButtonText: 'Reset Form (रीसेट)',
    bhashiniVerifiedBadge: 'Bhashini Universal • 22 Scripts',
    attentionBannerTitle: 'Attention Required • Missing Gender',
    attentionBannerDesc: 'Please confirm applicant gender:',
    setGenderMaleText: 'Male (पुरुष)',
    setGenderFemaleText: 'Female (महिला)',
    setGenderOtherText: 'Other (अन्य)',
    formEngineTitle: 'Smart Form Engine',
    formEngineSubtitle: 'Extracting civic schema in real-time (Multi-Engine)',
    aiDetectedBadge: 'AI Detected (Voice)',
    needsSpokenBadge: 'Needs Spoken Name',
    verifiedBadge: 'Verified',
    needsReviewBadge: 'Needs Review • Missing'
  }
};
