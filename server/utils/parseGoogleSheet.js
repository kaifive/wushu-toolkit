import axios from 'axios';
import Papa from 'papaparse'; // npm install papaparse

const parseGoogleSheet = async (csvUrls) => {
    console.log("here")
  const allScores = {};

  for (const url of csvUrls) {
    try {
      const response = await axios.get(url);
      const { data } = response;

      const parsed = Papa.parse(data, { header: false });
      const rows = parsed.data;

      if (!rows || rows.length < 2) continue;

      const eventName = rows[0][0]?.trim() || 'Unknown Event';

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const name = row[0]?.trim();
        const score = row[1]?.trim();

        if (!name || !score) continue;

        allScores[name.toLowerCase()] = {
          athleteName: name,
          finalScore: score,
          event: eventName,
        };
      }
    } catch (err) {
      console.error(`Failed to load sheet from ${url}:`, err.message);
    }
  }

  return allScores;
};

export default parseGoogleSheet;
