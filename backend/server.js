const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const { generateRecommendations } = require('./recommendationEngine');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/recommend', async (req, res) => {
    try {
        const userData = req.body;

        // basic validation to avoid runtime errors inside recommendation engine
        const requiredFields = ['age', 'gender', 'height', 'weight', 'location'];
        const missing = requiredFields.filter(f => userData[f] === undefined || userData[f] === null || userData[f] === '');
        if (missing.length > 0) {
            return res.status(400).json({
                error: `Missing required fields: ${missing.join(', ')}`
            });
        }

        const recommendations = await generateRecommendations(userData);
        res.json(recommendations);
    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
