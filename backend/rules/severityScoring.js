/**
 * Severity Scoring System
 * Calculates risk level based on symptoms, age, chronic diseases, and BMI
 */

const calculateSeverityScore = (userData, bmi) => {
    let score = 0;

    // Symptom-based scoring
    const symptoms = userData.symptoms || [];

    if (symptoms.includes('Fever')) score += 2;
    if (symptoms.includes('Shortness of Breath')) score += 5;
    if (symptoms.includes('Chest Pain')) score += 5;
    if (symptoms.includes('Severe Dizziness')) score += 4;
    if (symptoms.includes('Dizziness')) score += 2;
    if (symptoms.includes('Headache')) score += 1;
    if (symptoms.includes('Nausea')) score += 1;
    if (symptoms.includes('Fatigue')) score += 1;
    if (symptoms.includes('Cough')) score += 1;
    if (symptoms.includes('Muscle Pain')) score += 1;

    // Age factor
    if (userData.age >= 60) score += 3;
    else if (userData.age >= 45) score += 1;

    // Chronic disease factor
    if (userData.chronicDiseases === 'Yes') score += 3;

    // BMI factor
    if (bmi.category === 'Obese') score += 2;
    else if (bmi.category === 'Underweight') score += 1;

    // Determine severity level
    let level, color, message;

    if (score <= 3) {
        level = 'Low';
        color = 'green';
        message = 'Home care advice recommended. Monitor symptoms and maintain healthy habits.';
    } else if (score <= 7) {
        level = 'Moderate';
        color = 'yellow';
        message = 'Monitor symptoms closely. Consider consulting a healthcare provider if symptoms worsen.';
    } else {
        level = 'High';
        color = 'red';
        message = 'Strongly recommend consulting a doctor. Multiple risk factors detected.';
    }

    return {
        score,
        level,
        color,
        message,
        emoji: level === 'Low' ? '🟢' : level === 'Moderate' ? '🟡' : '🔴'
    };
};

module.exports = { calculateSeverityScore };
