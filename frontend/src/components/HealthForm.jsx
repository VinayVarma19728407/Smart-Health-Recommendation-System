import React from 'react';

const symptomsList = [
    'Fever', 'Cough', 'Fatigue', 'Headache', 'Nausea',
    'Dizziness', 'Severe Dizziness', 'Muscle Pain', 'Sore Throat',
    'Shortness of Breath', 'Chest Pain'
];

const HealthForm = ({ step, data, setData, onNext, onBack, onSubmit, loading }) => {
    const [consentGiven, setConsentGiven] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSymptomToggle = (symptom) => {
        setData(prev => {
            const symptoms = prev.symptoms.includes(symptom)
                ? prev.symptoms.filter(s => s !== symptom)
                : [...prev.symptoms, symptom];
            return { ...prev, symptoms };
        });
    };

    if (step === 1) {
        return (
            <div className="form-step">
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" name="age" value={data.age} onChange={handleChange} placeholder="Enter your age" required />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select name="gender" value={data.gender} onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Height (cm)</label>
                    <input type="number" name="height" value={data.height} onChange={handleChange} placeholder="e.g. 175" required />
                </div>
                <div className="form-group">
                    <label>Weight (kg)</label>
                    <input type="number" name="weight" value={data.weight} onChange={handleChange} placeholder="e.g. 70" required />
                </div>
                <div className="form-group">
                    <label>Location (City/Region)</label>
                    <input type="text" name="location" value={data.location} onChange={handleChange} placeholder="e.g. Mumbai, India" required />
                </div>
                <button className="btn-primary" onClick={onNext}>Next Step</button>
            </div>
        );
    }

    return (
        <div className="form-step">
            <div className="form-group">
                <label>Symptoms (Select all that apply)</label>
                <div className="multi-select">
                    {symptomsList.map(s => (
                        <label key={s} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={data.symptoms.includes(s)}
                                onChange={() => handleSymptomToggle(s)}
                            />
                            {s}
                        </label>
                    ))}
                </div>
            </div>
            <div className="form-group">
                <label>Chronic Diseases?</label>
                <select name="chronicDiseases" value={data.chronicDiseases} onChange={handleChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
                {data.chronicDiseases === 'Yes' && (
                    <input
                        type="text"
                        name="chronicDiseasesType"
                        value={data.chronicDiseasesType}
                        onChange={handleChange}
                        placeholder="Specify disease type"
                        style={{ marginTop: '10px' }}
                    />
                )}
            </div>
            <div className="form-group">
                <label>Previous Surgeries (Optional)</label>
                <textarea name="previousSurgeries" value={data.previousSurgeries} onChange={handleChange} placeholder="List any major surgeries"></textarea>
            </div>
            <div className="form-group">
                <label>Previous Prescriptions (Optional)</label>
                <textarea name="previousPrescriptions" value={data.previousPrescriptions} onChange={handleChange} placeholder="List any medications you take"></textarea>
            </div>

            <div className="consent-section">
                <label className="consent-checkbox">
                    <input
                        type="checkbox"
                        checked={consentGiven}
                        onChange={(e) => setConsentGiven(e.target.checked)}
                    />
                    <span>I understand this is not medical advice and should not replace professional medical consultation. This system provides general health guidance only.</span>
                </label>
            </div>

            <div className="btn-group">
                <button className="btn-secondary" onClick={onBack}>Back</button>
                <button
                    className="btn-primary"
                    onClick={() => onSubmit(data)}
                    disabled={loading || !consentGiven}
                >
                    {loading ? 'Analyzing...' : 'Get Recommendations'}
                </button>
            </div>
        </div>
    );
};

export default HealthForm;
