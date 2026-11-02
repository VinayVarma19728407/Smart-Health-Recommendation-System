/**
 * Explainability Engine
 * Generates transparent explanations for why recommendations were made
 */

const generateExplanation = (userData, bmi, severityScore) => {
    const factors = [];

    // Symptom factors
    if (userData.symptoms && userData.symptoms.length > 0) {
        factors.push(`you reported ${userData.symptoms.join(', ').toLowerCase()}`);
    }

    // BMI factor
    if (bmi.category === 'Overweight' || bmi.category === 'Obese') {
        factors.push(`your BMI is ${bmi.category.toLowerCase()}`);
    } else if (bmi.category === 'Underweight') {
        factors.push(`your BMI indicates underweight status`);
    }

    // Age factor
    if (userData.age >= 60) {
        factors.push(`your age group (60+) requires extra caution`);
    } else if (userData.age < 18) {
        factors.push(`you are under 18 and require guardian supervision`);
    }

    // Chronic disease factor
    if (userData.chronicDiseases === 'Yes') {
        factors.push(`you have ${userData.chronicDiseasesType || 'chronic health conditions'}`);
    }

    // Gender-specific factors
    if (userData.gender === 'Female' && userData.symptoms?.includes('Fatigue')) {
        factors.push(`as a female with fatigue, iron levels should be monitored`);
    }

    // Build explanation
    let explanation = '**Why am I seeing this recommendation?**\n\n';

    if (factors.length > 0) {
        explanation += `Because ${factors.join(', and ')}, we recommend `;

        if (severityScore.level === 'High') {
            explanation += 'consulting a healthcare provider promptly and following the specific care guidelines provided.';
        } else if (severityScore.level === 'Moderate') {
            explanation += 'monitoring your symptoms closely, following the care advice, and being prepared to seek medical attention if symptoms worsen.';
        } else {
            explanation += 'following general wellness practices, staying hydrated, getting adequate rest, and monitoring your symptoms.';
        }
    } else {
        explanation += 'Based on your health profile, we\'re providing general wellness recommendations to help you maintain good health.';
    }

    explanation += '\n\nThis system uses rule-based logic combined with AI to provide personalized, non-diagnostic health guidance.';

    return explanation;
};

module.exports = { generateExplanation };
