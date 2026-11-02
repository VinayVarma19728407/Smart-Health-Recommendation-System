/**
 * BMI-Based Health Recommendations
 * Provides weight-category specific guidance
 */

const getBMIRecommendations = (bmiCategory) => {
    const recommendations = [];

    switch (bmiCategory) {
        case 'Underweight':
            recommendations.push('Focus on nutrient-dense, calorie-rich foods to reach a healthy weight.');
            recommendations.push('Consider strength training to build muscle mass.');
            recommendations.push('Consult a nutritionist if underweight persists.');
            break;

        case 'Normal':
            recommendations.push('Maintain your current healthy weight through balanced nutrition.');
            recommendations.push('Continue regular physical activity (at least 150 minutes per week).');
            recommendations.push('Focus on overall wellness and preventive care.');
            break;

        case 'Overweight':
            recommendations.push('Focus on low-calorie, nutrient-dense foods.');
            recommendations.push('Incorporate at least 30 minutes of moderate exercise daily.');
            recommendations.push('Consider portion control and mindful eating practices.');
            break;

        case 'Obese':
            recommendations.push('Prioritize weight management through diet and exercise.');
            recommendations.push('Start with low-impact activities like walking or swimming.');
            recommendations.push('Consider consulting a healthcare provider for a personalized weight loss plan.');
            recommendations.push('Monitor for obesity-related health conditions (diabetes, hypertension).');
            break;

        default:
            recommendations.push('Maintain a balanced diet and regular exercise routine.');
    }

    return recommendations;
};

module.exports = { getBMIRecommendations };
