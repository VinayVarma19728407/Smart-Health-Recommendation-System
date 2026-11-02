const { getGroqRecommendations } = require('./groqService');
const { calculateSeverityScore } = require('./rules/severityScoring');
const { checkEmergencyConditions } = require('./rules/emergencyRules');
const { getAgeBasedRecommendations } = require('./rules/ageRules');
const { getGenderSpecificRecommendations } = require('./rules/genderRules');
const { getBMIRecommendations } = require('./rules/bmiRules');
const { getSymptomRecommendations } = require('./rules/symptomRules');
const { generateExplanation } = require('./rules/explainability');

const calculateBMI = (height, weight) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    let category = '';

    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    return { value: bmi.toFixed(1), category };
};

const getClimate = (location) => {
    // Simple mock climate mapping based on keywords in location
    const loc = location.toLowerCase();
    if (loc.includes('desert') || loc.includes('dubai') || loc.includes('africa')) return 'Hot';
    if (loc.includes('arctic') || loc.includes('canada') || loc.includes('russia')) return 'Cold';
    if (loc.includes('amazon') || loc.includes('mumbai') || loc.includes('thailand')) return 'Humid';
    if (loc.includes('london') || loc.includes('seattle')) return 'Rainy';
    return 'Moderate';
};

const generateRecommendations = async (userData) => {
    const bmi = calculateBMI(userData.height, userData.weight);
    const climate = getClimate(userData.location);

    // Calculate severity score
    const severityScore = calculateSeverityScore(userData, bmi);

    // Check for emergency conditions
    const emergency = checkEmergencyConditions(userData);

    // Get modular recommendations
    const bmiRules = getBMIRecommendations(bmi.category);
    const symptomData = getSymptomRecommendations(userData.symptoms || [], climate);
    const ageAdvice = getAgeBasedRecommendations(userData.age);
    const genderAdvice = getGenderSpecificRecommendations(userData.gender, userData.symptoms);

    // Combine all rule-based recommendations
    const rules = [
        ...bmiRules,
        ...symptomData.recommendations
    ];

    // Generate explainability
    const explainability = generateExplanation(userData, bmi, severityScore);

    // Safety checks
    const warnings = [];
    if (userData.chronicDiseases && userData.chronicDiseases !== 'No') {
        warnings.push(`Caution: Recommendations may need adjustment for ${userData.chronicDiseasesType || 'your condition'}. Consult a doctor.`);
    }

    // Groq AI for enhanced advice (pass severity context)
    const aiAdvice = await getGroqRecommendations(userData, bmi, climate, severityScore, emergency);

    // Determine confidence level
    const confidenceLevel = (userData.symptoms && userData.symptoms.length > 0)
        ? 'High confidence recommendation based on reported symptoms'
        : 'General guidance - consider providing more symptom details for personalized advice';

    return {
        bmi,
        climate,
        severityScore,
        emergency,
        rules,
        ageSpecificAdvice: ageAdvice,
        genderSpecificAdvice: genderAdvice,
        explainability,
        recoveryTimeline: symptomData.timeline,
        confidenceLevel,
        warnings,
        aiAdvice,
        disclaimer: "⚠️ This system provides preliminary health recommendations only. It does not replace professional medical consultation.",
        biasNotice: "⚡ Recommendations are based on general patterns and may not apply to everyone. Individual health needs vary significantly. Always consult healthcare professionals for personalized medical advice."
    };
};

module.exports = { generateRecommendations };
