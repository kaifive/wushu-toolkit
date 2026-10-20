import * as cheerio from 'cheerio';

function parseScheduleData(rawData) {
    const $ = cheerio.load(rawData);

    const scheduleData = {
        eventName: $('h1').text().trim(),
        sessions: []
    };

    // 1. Find all Sessions (Friday Morning, etc.)
    $('a[name]').each((i, sessionAnchor) => {
        const sessionName = $(sessionAnchor).find('h2').text().trim();
        if (!sessionName) return;

        const session = {
            id: $(sessionAnchor).attr('name'),
            name: sessionName.substring(0, sessionName.length - 12).trim(), // Get last 12 characters for date
            rings: []
        };

        // 2. Find Rings within this session (usually in the next sibling table)
        const sessionContainer = $(sessionAnchor).closest('td');

        sessionContainer.find('h2').each((j, ringHeader) => {
            const ringText = $(ringHeader).text();
            if (!ringText.includes('Ring')) return;

            const ring = {
                ringNumber: parseInt(ringText.replace(/\D/g, '')),
                events: []
            };

            // 3. Find Event Tables inside this Ring's container
            // Note: The structure has tables for each category
            $(ringHeader).parent().find('table').each((k, eventTable) => {
                const $eventTable = $(eventTable);

                // The first row (blue bg) contains the category name
                const category = $eventTable.find('tr').first().find('h3').text().trim();
                if (!category) return;

                const event = {
                    category: category,
                    athletes: []
                };

                // 4. Find Athletes (all rows after the header row)
                $eventTable.find('tr').slice(1).each((l, row) => {
                    const cols = $(row).find('td');
                    const order = $(cols[0]).text().trim();
                    const name = $(cols[1]).text().trim();

                    if (order && name) {
                        event.athletes.push({
                            order: parseInt(order),
                            name: name
                        });
                    }
                });

                ring.events.push(event);
            });

            session.rings.push(ring);
        });

        scheduleData.sessions.push(session);
    });

    return scheduleData;
}

export { parseScheduleData };