/**
 * Emergency Red-Flag Detection
 * Identifies critical symptoms requiring immediate medical attention
 */

const checkEmergencyConditions = (userData) => {
    const symptoms = userData.symptoms || [];
    const emergencySymptoms = [];

    // Critical symptom detection
    if (symptoms.includes('Shortness of Breath')) {
        emergencySymptoms.push('Shortness of Breath');
    }
    if (symptoms.includes('Chest Pain')) {
        emergencySymptoms.push('Chest Pain');
    }
    if (symptoms.includes('Severe Dizziness')) {
        emergencySymptoms.push('Severe Dizziness');
    }

    const isEmergency = emergencySymptoms.length > 0;

    let message = '';
    if (isEmergency) {
        message = `🚨 SEEK IMMEDIATE MEDICAL ATTENTION - You reported: ${emergencySymptoms.join(', ')}. These symptoms may indicate a serious condition requiring urgent evaluation.`;
    }

    return {
        isEmergency,
        emergencySymptoms,
        message
    };
};

module.exports = { checkEmergencyConditions };
