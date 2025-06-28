import axios from 'axios';
import * as cheerio from 'cheerio';

const readGoogleDoc = async (doc_url) => {
    try {
        const response = await axios.get(doc_url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $$ = cheerio.load(response.data);

        const textBlocks = [];

        $$('p, h1, h2, h3, h4, h5, h6').each((i, elem) => {
            const text = $$(elem).text().trim();
            if (text) textBlocks.push(text);
        });

        const fullText = textBlocks.join('');

        const json = JSON.parse(fullText)
        return json;
    } catch (err) {
        console.error("Error fetching or parsing Google Doc:", err.message);
        return null;
    }
}

export default readGoogleDoc
