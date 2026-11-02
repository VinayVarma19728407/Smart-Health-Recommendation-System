/**
 * Symptom-Specific Care Advice
 * Provides targeted recommendations based on reported symptoms
 */

const getSymptomRecommendations = (symptoms, climate) => {
    const recommendations = [];
    const timeline = [];

    if (symptoms.includes('Fever')) {
        recommendations.push('Rest and stay hydrated. Monitor temperature regularly.');
        recommendations.push('Use over-the-counter fever reducers if needed (acetaminophen/ibuprofen).');
        timeline.push('If fever persists for more than 3 days or exceeds 103°F (39.4°C), consult a doctor.');
    }

    if (symptoms.includes('Cough')) {
        recommendations.push('Stay hydrated to help thin mucus.');
        recommendations.push('Use a humidifier if air is dry.');
        timeline.push('If cough persists beyond 2 weeks or worsens, seek medical evaluation.');
    }

    if (symptoms.includes('Fatigue')) {
        recommendations.push('Ensure adequate sleep (7-9 hours per night).');
        recommendations.push('Maintain regular, light physical activity to boost energy.');
        timeline.push('If fatigue is severe or persistent beyond 2 weeks, consult a healthcare provider.');
    }

    if (symptoms.includes('Headache')) {
        recommendations.push('Stay hydrated and rest in a quiet, dark room.');
        recommendations.push('Avoid screen time and bright lights.');
        timeline.push('If headaches are severe, frequent, or accompanied by vision changes, seek medical attention.');
    }

    if (symptoms.includes('Nausea')) {
        recommendations.push('Eat small, bland meals (crackers, toast, rice).');
        recommendations.push('Avoid strong odors and greasy foods.');
        timeline.push('If nausea persists beyond 24-48 hours or includes vomiting, consult a doctor.');
    }

    if (symptoms.includes('Muscle Pain')) {
        recommendations.push('Rest affected muscles and apply ice or heat as needed.');
        recommendations.push('Gentle stretching may help relieve tension.');
        timeline.push('If muscle pain is severe or persists beyond a week, seek evaluation.');
    }

    if (symptoms.includes('Sore Throat')) {
        recommendations.push('Gargle with warm salt water several times daily.');
        recommendations.push('Stay hydrated with warm liquids (tea, soup).');
        timeline.push('If sore throat lasts more than 5 days or is severe, consult a doctor.');
    }

    // Climate-based additions
    if (climate === 'Hot' || climate === 'Humid') {
        recommendations.push('Stay hydrated! Drink at least 3-4 liters of water daily.');
        recommendations.push('Avoid heavy outdoor activities during peak sun hours (10 AM - 4 PM).');
    }

    if (climate === 'Cold') {
        recommendations.push('Keep warm and protect against cold exposure.');
        recommendations.push('Maintain indoor humidity to prevent dry air irritation.');
    }

    if (climate === 'Rainy') {
        recommendations.push('Avoid getting wet in the rain to prevent temperature fluctuations.');
        recommendations.push('Ensure adequate vitamin D intake due to limited sun exposure.');
    }

    return {
        recommendations,
        timeline: timeline.length > 0 ? timeline.join(' ') : 'Monitor symptoms and seek medical care if they worsen or don\'t improve within expected timeframes.'
    };
};

module.exports = { getSymptomRecommendations };
