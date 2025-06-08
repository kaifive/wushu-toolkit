import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = "https://www.sportdata.org/wushu/set-online/"

const scrapeCategories = async (competitionId, eventFilter) => {
    const url = `${BASE_URL}veranstaltung_info_main.php?active_menu=calendar&vernr=${competitionId}&ver_info_action=catauslist#a_eventheadend`;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const categories = {};

    const tables = $('table');
    const rows = $(tables[3]).find('tr');

    rows.each((_, row) => {
        $(row).find('td').each((_, cell) => {
            const $cell = $(cell);
            const link = $cell.find('a').attr('href'); // get href if it exists
            const text = $cell.text().trim();

            if (text.includes(eventFilter)) {
                const url = new URL(link, 'https://example.com');
                const catId = url.searchParams.get('catid');
                categories[text] = catId;

            }

        });
    })

    return categories;
};

export default scrapeCategories