import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = "https://www.sportdata.org/wushu/set-online/"

const scrapeWaitingList = async (competitionId, eventFilter) => {
    const url = `${BASE_URL}popup_nennungen_main.php?popup_action=waitlistallpublic&verid=${competitionId}`;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const waitingList = {};

    const tables = $('table');
    const rows = $(tables[2]).find('tr');

    rows.each((_, row) => {
        const cells = $(row).find('td').map((_, cell) =>
            $(cell).text().trim()
        ).get();

        const eventInfo = cells[4];
        if (eventInfo && eventInfo.includes(eventFilter)) {
            const athleteName = cells[1];

            if (waitingList[athleteName]) {
                waitingList[athleteName].events.push({ event: eventInfo });
            } else {
                waitingList[athleteName] = {
                    competitor: { name: athleteName },
                    events: [{ event: eventInfo }]
                };
            }
        }
    });

    return waitingList;
};

export default scrapeWaitingList