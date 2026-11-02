/**
 * Age-Based Recommendation Tiers
 * Provides age-appropriate health guidance
 */

const getAgeBasedRecommendations = (age) => {
    if (age < 18) {
        return {
            tier: 'Pediatric',
            advice: '⚠️ Guardian Notice: For individuals under 18, please consult with a pediatrician or guardian before following any health recommendations. Growing bodies have unique nutritional and health needs.',
            emphasis: 'Parental supervision required for all health decisions.'
        };
    } else if (age >= 18 && age < 45) {
        return {
            tier: 'Young Adult',
            advice: 'Focus on building healthy lifestyle habits now. Regular exercise, balanced nutrition, and adequate sleep form the foundation of long-term health.',
            emphasis: 'Preventive care and healthy habits are key at this stage.'
        };
    } else if (age >= 45 && age < 60) {
        return {
            tier: 'Middle Age',
            advice: 'This is a crucial time for preventive care. Consider regular health screenings, maintain cardiovascular health, and monitor weight and blood pressure closely.',
            emphasis: 'Preventive screenings and lifestyle modifications are increasingly important.'
        };
    } else {
        return {
            tier: 'Senior',
            advice: 'Based on your age group, extra caution is advised. Pay special attention to medication interactions, fall prevention, and regular medical check-ups. Stay active within your comfort level.',
            emphasis: 'Regular medical supervision and careful monitoring recommended.'
        };
    }
};

module.exports = { getAgeBasedRecommendations };
