// server.js
import express from 'express';
import cors from 'cors';

import scrapeWaitingList from './sportdata-utils/scrapeWaitingList.js';
import scrapeRegistration from './sportdata-utils/scrapeRegistration.js';
import scrapeCategories from './sportdata-utils/scrapeCategories.js';
import scrapeScorecard from './sportdata-utils/scrapeScorecard.js'

import parseGoogleDoc from './utils/parseGoogleDoc.js'

const app = express();
app.use(cors()); // enable CORS for your frontend to call this
app.use(express.json());

const PORT = 5000;

const COMPETITION_ID_MAPPING = {
    "2025-phoenix": 67,
    "2025-adults": 68,
}

app.get("/:competition/registration-data", async (req, res) => {
    const { competition } = req.params;
    const { searchTerm = "" } = req.query;

    try {
        const data = await scrapeRegistration(COMPETITION_ID_MAPPING[competition], searchTerm);
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/:competition/waiting-list-data", async (req, res) => {
    const { competition } = req.params;
    const { searchTerm = "" } = req.query;

    try {
        const data = await scrapeWaitingList(COMPETITION_ID_MAPPING[competition], searchTerm);
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/:competition/category-data", async (req, res) => {
    const { competition } = req.params;
    const { searchTerm = "" } = req.query;

    try {
        const data = await scrapeCategories(COMPETITION_ID_MAPPING[competition], searchTerm);
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/:competition/scorecard-data/:scorecardId", async (req, res) => {
    const { competition, scorecardId } = req.params;

    try {
        const data = await scrapeScorecard(COMPETITION_ID_MAPPING[competition], scorecardId);
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Define the API endpoint
app.post('/parse-google-doc', async (req, res) => {
    const { doc_url } = req.body;

    try {
        const data = await parseGoogleDoc(doc_url);
        res.json({ data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
