import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = "https://www.sportdata.org/wushu/set-online/"

const scrapeRegistration = async (competitionId, eventFilter) => {
    const url = `${BASE_URL}popup_nennungen_main.php?popup_action=nennungenall&verid=${competitionId}`;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const registration = {};

    const tables = $('table');
    const rows = $(tables[2]).find('tr');

    rows.each((_, row) => {
        const cells = $(row).find('td').map((_, cell) =>
            $(cell).text().trim()
        ).get();

        const eventInfo = cells[6];

        if (eventInfo && eventInfo.includes(eventFilter)) {
            const athleteName = cells[2];
            const eventDetails = cells[7]?.split('|').map(s => s.trim()) ?? [];
            const diffIndex = eventDetails.findIndex((item) => item === 'DIFF');

            const nandu = (diffIndex !== -1 && eventDetails[diffIndex + 1])
                ? eventDetails[diffIndex + 1].split(',').map(s => s.trim())
                : [];

            if (registration[athleteName]) {
                registration[athleteName].events.push({
                    event: eventInfo,
                    nandu: nandu,
                });
            } else {
                registration[athleteName] = {
                    competitor: { name: athleteName },
                    events: [{
                        event: eventInfo,
                        nandu: nandu,
                    }]
                };
            }
        }
    });

    return registration;
};

export default scrapeRegistration