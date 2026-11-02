import React from 'react';

const RecommendationDashboard = ({ results, onReset }) => {
    // Helper to parse AI advice for medicines
    const parseAIAdvice = (advice) => {
        const sections = advice.split(/###|##/).filter(s => s.trim());
        return sections.map((section, index) => {
            const isMedicine = section.toLowerCase().includes('medicine') || section.toLowerCase().includes('otc');
            const title = section.split('\n')[0].trim();
            const content = section.split('\n').slice(1).join('\n').trim();

            return (
                <div key={index} className={`card-item ${isMedicine ? 'medicine-card' : ''}`}>
                    {title && <h4 style={{ marginBottom: '10px', color: isMedicine ? 'var(--primary)' : 'inherit' }}>{title}</h4>}
                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {content}
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="results">
            {/* Emergency Alert - Highest Priority */}
            {results.emergency?.isEmergency && (
                <div className="emergency-alert">
                    <div className="emergency-icon">🚨</div>
                    <div className="emergency-content">
                        <h3>SEEK IMMEDIATE MEDICAL ATTENTION</h3>
                        <p>{results.emergency.message}</p>
                    </div>
                </div>
            )}

            {/* Severity Score Badge */}
            <div className="severity-section">
                <div className={`severity-badge severity-${results.severityScore.level.toLowerCase()}`}>
                    <div className="severity-emoji">{results.severityScore.emoji}</div>
                    <div className="severity-details">
                        <div className="severity-level">{results.severityScore.level} Risk</div>
                        <div className="severity-score">Score: {results.severityScore.score}</div>
                    </div>
                </div>
                <p className="severity-message">{results.severityScore.message}</p>
            </div>

            {/* Health Profile */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Your Health Profile</h3>
                <div className={`bmi-badge bmi-${results.bmi.category}`}>
                    BMI: {results.bmi.value} • {results.bmi.category}
                </div>
                <p style={{ marginTop: '15px', fontSize: '1rem', opacity: 0.8 }}>
                    Climate Condition: <strong style={{ color: 'var(--primary)' }}>{results.climate}</strong>
                </p>
            </div>

            {/* Explainability Section */}
            <div className="explainability-section">
                <div className="section-icon">💡</div>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>
                    {results.explainability}
                </div>
            </div>

            {/* Confidence Level */}
            <div className="confidence-badge">
                <span className="confidence-icon">📊</span>
                {results.confidenceLevel}
            </div>

            {/* Age-Specific Advice */}
            {results.ageSpecificAdvice && (
                <>
                    <div className="section-title">
                        <span className="section-icon">👤</span>
                        Age-Specific Guidance ({results.ageSpecificAdvice.tier})
                    </div>
                    <div className="card-item age-advice">
                        <p style={{ marginBottom: '10px' }}>{results.ageSpecificAdvice.advice}</p>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8, fontStyle: 'italic' }}>
                            {results.ageSpecificAdvice.emphasis}
                        </p>
                    </div>
                </>
            )}

            {/* Gender-Specific Advice */}
            {results.genderSpecificAdvice && (
                <>
                    <div className="section-title">
                        <span className="section-icon">⚕️</span>
                        Gender-Specific Health Notes
                    </div>
                    <div className="card-item gender-advice">
                        <p style={{ marginBottom: '10px' }}>{results.genderSpecificAdvice.advice}</p>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8, fontStyle: 'italic' }}>
                            {results.genderSpecificAdvice.emphasis}
                        </p>
                    </div>
                </>
            )}

            {/* General Care Advice */}
            <div className="section-title">
                <span className="section-icon">📋</span>
                General Care Recommendations
            </div>
            {results.rules.map((rule, i) => (
                <div key={i} className="card-item">{rule}</div>
            ))}

            {/* Recovery Timeline */}
            {results.recoveryTimeline && (
                <>
                    <div className="section-title">
                        <span className="section-icon">⏱️</span>
                        Recovery Timeline & When to Seek Care
                    </div>
                    <div className="card-item timeline-card">
                        {results.recoveryTimeline}
                    </div>
                </>
            )}

            {/* AI-Enhanced Insights */}
            <div className="section-title">
                <span className="section-icon">🤖</span>
                AI-Enhanced Insights & Medicine Suggestions
            </div>
            <div className="ai-content">
                {parseAIAdvice(results.aiAdvice)}
            </div>

            {/* Safety Warnings */}
            {results.warnings.length > 0 && (
                <>
                    <div className="section-title" style={{ color: 'var(--danger)' }}>
                        <span className="section-icon">⚠️</span>
                        Safety Warnings
                    </div>
                    {results.warnings.map((warning, i) => (
                        <div key={i} className="card-item warning-card">{warning}</div>
                    ))}
                </>
            )}

            {/* Disclaimer */}
            <div className="disclaimer">
                {results.disclaimer}
            </div>

            {/* Bias & Limitation Notice */}
            <div className="bias-notice">
                {results.biasNotice}
            </div>

            <button className="btn-secondary" onClick={onReset} style={{ marginTop: '40px', width: '100%', padding: '18px' }}>
                ← Start New Analysis
            </button>
        </div>
    );
};

export default RecommendationDashboard;
