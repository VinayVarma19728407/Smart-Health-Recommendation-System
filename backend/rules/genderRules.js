/**
 * Gender-Specific Health Considerations
 * Provides gender-appropriate health guidance
 */

const getGenderSpecificRecommendations = (gender, symptoms = []) => {
    if (gender === 'Female') {
        const hasFatigue = symptoms.includes('Fatigue');

        return {
            advice: hasFatigue
                ? 'Iron & Fatigue Awareness: Women are at higher risk for iron deficiency. If fatigue persists, consider checking iron levels. Ensure adequate calcium intake for bone health.'
                : 'Ensure adequate iron and calcium intake. Women have unique nutritional needs, especially for bone health and energy levels.',
            emphasis: 'Iron and calcium are particularly important for female health.'
        };
    } else if (gender === 'Male') {
        return {
            advice: 'Focus on cardiovascular health and active recovery. Men should pay attention to heart health, maintain regular physical activity, and monitor stress levels.',
            emphasis: 'Cardiovascular health and lifestyle activity are key focus areas.'
        };
    } else {
        return {
            advice: 'Follow general health guidelines with attention to your individual needs. Everyone\'s health journey is unique.',
            emphasis: 'Personalized care based on individual health factors.'
        };
    }
};

module.exports = { getGenderSpecificRecommendations };
