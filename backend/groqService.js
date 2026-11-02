const Groq = require('groq-sdk');

// Initialize lazily to ensure environment variables are loaded
let groqClient = null;

const getGroqClient = () => {
    if (groqClient) return groqClient;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === 'MISSING_API_KEY') {
        return null;
    }

    try {
        groqClient = new Groq({ apiKey });
        return groqClient;
    } catch (e) {
        console.error("Failed to initialize Groq SDK:", e);
        return null;
    }
};

const getGroqRecommendations = async (userData, bmi, climate, severityScore, emergency) => {
    const client = getGroqClient();
    if (!client) {
        return "AI recommendations are unavailable because no valid GROQ_API_KEY was found. Please check your .env file.";
    }

    const prompt = `
    You are a health recommendation engine.
    Analyze user data:
    - Age: ${userData.age}
    - Gender: ${userData.gender}
    - BMI: ${bmi.value} (${bmi.category})
    - Climate: ${climate}
    - Symptoms: ${userData.symptoms.join(', ') || 'None reported'}
    - Chronic Diseases: ${userData.chronicDiseasesType || 'None'}
    - Previous Prescriptions: ${userData.previousPrescriptions || 'None'}
    - Previous Surgeries: ${userData.previousSurgeries || 'None'}
    
    SEVERITY ASSESSMENT: ${severityScore.emoji} ${severityScore.level} Risk (Score: ${severityScore.score}/10+)
    ${emergency.isEmergency ? `⚠️ EMERGENCY SYMPTOMS DETECTED: ${emergency.emergencySymptoms.join(', ')}` : ''}

    Generate safe, non-diagnostic health recommendations focused on lifestyle guidance, basic care advice, and cautionary warnings.
    ${emergency.isEmergency ? 'IMPORTANT: Acknowledge the emergency symptoms and strongly emphasize seeking immediate medical care.' : ''}
    
    Use the following structure with markdown headers:
    ### Lifestyle Guidance
    (General advice tailored to severity level)
    
    ### Over-the-Counter (OTC) Medicine Suggestions
    For each suggested medicine, clearly state:
    - **Medicine Name**
    - **Why**: (based on symptoms)
    - **When & How**: (dosage frequency, with/without food)
    - **Expected Timeline**: When symptoms should improve
    
    ### When to Seek Medical Care
    Provide specific red flags to watch for based on their symptoms.
    
    Do not provide medical diagnosis or prescription drugs.
    Keep output structured, concise, and human-readable.
    Avoid definitive medical claims.
    Include a strong reminder to consult a pharmacist or doctor before taking any medication.
    `;

    try {
        const chatCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama-3.3-70b-versatile',
        });

        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error('Groq API Error:', error);
        return "Unable to generate AI recommendations at this time.";
    }
};

module.exports = { getGroqRecommendations };
