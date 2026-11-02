# 🏥 Smart Health Recommendation System

An AI-powered health recommendation web application that provides personalized health advice based on user-input symptoms, demographics, BMI, and location-based climate data. Built with a React frontend and a modular Node.js/Express backend integrated with the **Groq AI API (LLaMA 3)**.

> ⚠️ **Disclaimer**: This system provides preliminary health recommendations only. It does **not** replace professional medical consultation. Always consult a licensed healthcare professional for medical advice.

---

## 🌟 Features

- 🤖 **AI-Powered Recommendations** – Integrates with Groq's LLaMA 3 model for intelligent, context-aware health advice
- 🔴 **Emergency Red-Flag Detector** – Instantly identifies potentially life-threatening symptom combinations
- 📊 **Severity Scoring System** – Calculates and displays a health severity score based on reported symptoms
- 🧠 **Explainability Engine** – Explains *why* each recommendation is given in plain language
- 🎂 **Age-Based Recommendation Tiers** – Tailored advice for children, adults, and seniors
- ⚧ **Gender-Specific Safety Notes** – Highlights relevant health considerations by gender
- 📏 **BMI Calculator & Category Advice** – Computes BMI from height/weight and gives targeted guidance
- 🌍 **Climate-Aware Suggestions** – Adapts recommendations based on your location's climate
- 💊 **Medicine & Lifestyle Suggestions** – Highlights medicine recommendations prominently
- ✅ **Confidence Level Indicator** – Shows how confident the system is in its recommendations
- ⏱️ **Recovery Timeline** – Provides an estimated recovery period based on symptoms
- 🌙 **Dark / Light Mode** – Toggle between themes for comfortable viewing
- 🎨 **Glassmorphism UI** – Modern, polished interface with smooth animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, CSS (Glassmorphism) |
| Backend | Node.js, Express 5 |
| AI Engine | Groq SDK (`llama3-8b-8192`) |
| Styling | Custom CSS with CSS Variables & Dark Mode |
| Build Tool | Vite |
| API | REST (`POST /api/recommend`) |

---

## 📁 Project Structure

```
Smart Health Recommendation System/
├── frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx             # Main app with routing and theme toggle
│   │   ├── index.css           # Global styles (glassmorphism, dark mode)
│   │   └── components/
│   │       ├── HealthForm.jsx  # Multi-step input form
│   │       └── RecommendationDashboard.jsx  # Results display
│   ├── index.html
│   └── package.json
│
└── backend/                    # Node.js + Express backend
    ├── server.js               # Express server & API routes
    ├── recommendationEngine.js # Core orchestration engine
    ├── groqService.js          # Groq AI integration
    ├── .env                    # Environment variables (not committed)
    └── rules/                  # Modular rule engine
        ├── symptomRules.js     # Symptom-to-recommendation mapping
        ├── ageRules.js         # Age-based health advice
        ├── genderRules.js      # Gender-specific safety notes
        ├── bmiRules.js         # BMI category recommendations
        ├── emergencyRules.js   # Emergency condition detection
        ├── severityScoring.js  # Health severity calculator
        └── explainability.js   # Explainability/reasoning engine
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Groq API Key](https://console.groq.com/) (free tier available)

### 1. Clone the repository

```bash
git clone https://github.com/VinayVarma19728407/Smart-Health-Recommendation-System.git
cd Smart-Health-Recommendation-System
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

Start the backend server:

```bash
node server.js
```

The backend will run at **http://localhost:5000**

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run at **http://localhost:5173**

---

## 🔌 API Reference

### `POST /api/recommend`

**Request Body:**
```json
{
  "age": 30,
  "gender": "Male",
  "height": 175,
  "weight": 70,
  "location": "Mumbai",
  "symptoms": ["headache", "fever"],
  "chronicDiseases": "No",
  "chronicDiseasesType": "",
  "previousSurgeries": "",
  "previousPrescriptions": ""
}
```

**Response:**
```json
{
  "bmi": { "value": "22.9", "category": "Normal" },
  "climate": "Humid",
  "severityScore": { "score": 4, "level": "Moderate" },
  "emergency": { "isEmergency": false, "flags": [] },
  "rules": [...],
  "ageSpecificAdvice": [...],
  "genderSpecificAdvice": [...],
  "explainability": {...},
  "recoveryTimeline": "5–7 days with rest",
  "confidenceLevel": "High confidence recommendation based on reported symptoms",
  "warnings": [],
  "aiAdvice": "...",
  "disclaimer": "..."
}
```

---

## 🖥️ Screenshots

### Multi-Step Health Form
The user fills in personal details across two steps: demographics (age, gender, height, weight, location) and health history (symptoms, chronic diseases, previous surgeries/prescriptions).

### Recommendation Dashboard
Displays a full health analysis including:
- BMI + Climate Badge
- Emergency Alert (if triggered)
- Severity Score Gauge
- AI-Generated Recommendations
- Medicine Highlights
- Age & Gender-Specific Notes
- Explainability Section
- Recovery Timeline

---

## 🧪 How It Works

1. **User Input**: Patient fills in demographics and symptoms via a two-step form
2. **Rule Engine**: Backend applies modular rules — BMI classification, symptom matching, age tiers, gender-safety checks, emergency flags
3. **Severity Scoring**: A numeric severity score is calculated from symptom count, BMI, age, and chronic conditions
4. **Groq AI Call**: Context-rich prompt is sent to Groq's LLaMA 3 model for intelligent, narrative advice
5. **Explainability**: Each factor (BMI, symptoms, age) has its decision explained in plain language
6. **Results Display**: Frontend renders a rich dashboard with all data, highlighted medicines, warnings and disclaimers

---

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Your Groq API key for AI recommendations |
| `PORT` | Backend server port (default: `5000`) |

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📜 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

Developed as part of a Smart Health Recommendation System project, leveraging modern AI and web technologies to make basic health guidance more accessible.
