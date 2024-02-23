const express = require('express');
const axios = require('axios');
const translatte = require('translatte');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.post('/translate', async (req, res) => {
    try {
        const { text } = req.body;

        
        if (!text) {
            return res.status(400).json({ error: 'Missing "text" in the request "body", use raw JSON data' });
        }

       
        const translationResult = await translatte(text, { from: 'en', to: 'fr' });

        
        if (translationResult && translationResult.text) {
            const translatedText = translationResult.text;
            return res.json({ translation: translatedText });
        } else {
            return res.status(500).json({ error: 'Failed to translate text' });
        }
    } catch (error) {
       
        console.error('Error during translation:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
    console.log(`http://127.0.0.1:${PORT}`);
});
