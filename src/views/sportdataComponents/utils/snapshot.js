import fs from 'fs/promises';
import path from 'path';

import { COMPETITION_CONFIG } from "./competitionConfig.js";
import { getData } from "./getData.js";

async function snapshot(competitionConfig) {
    const data = await getData(competitionConfig);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${competitionConfig.competition}-${timestamp}.json`;
    const snapshotDir = path.resolve('snapshots');

    await fs.mkdir(snapshotDir, { recursive: true });

    const filepath = path.join(snapshotDir, filename);
    await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

console.log("Snapshotting data...")
await snapshot(COMPETITION_CONFIG["2025-adults"])

console.log("...snapshot succeeded!")