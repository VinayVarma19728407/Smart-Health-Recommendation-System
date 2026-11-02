import React, { useState, useEffect } from 'react';
import HealthForm from './components/HealthForm';
import RecommendationDashboard from './components/RecommendationDashboard';

function App() {
    const [theme, setTheme] = useState('light');
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        age: '',
        gender: 'Male',
        height: '',
        weight: '',
        location: '',
        symptoms: [],
        chronicDiseases: 'No',
        chronicDiseasesType: '',
        previousSurgeries: '',
        previousPrescriptions: ''
    });
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const handleFormSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            setResults(result);
            setStep(3); // Move to results step
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            alert('Failed to get recommendations. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container glass">
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <h1>SmartHealth AI</h1>

            {step < 3 && (
                <div className="step-indicator">
                    <div className={`dot ${step === 1 ? 'active' : ''}`}></div>
                    <div className={`dot ${step === 2 ? 'active' : ''}`}></div>
                </div>
            )}

            {step === 1 && (
                <HealthForm
                    step={1}
                    data={formData}
                    setData={setFormData}
                    onNext={() => setStep(2)}
                />
            )}

            {step === 2 && (
                <HealthForm
                    step={2}
                    data={formData}
                    setData={setFormData}
                    onBack={() => setStep(1)}
                    onSubmit={handleFormSubmit}
                    loading={loading}
                />
            )}

            {step === 3 && results && (
                <RecommendationDashboard
                    results={results}
                    onReset={() => {
                        setStep(1);
                        setResults(null);
                    }}
                />
            )}
        </div>
    );
}

export default App;
