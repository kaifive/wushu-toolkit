export function getSchedule(urls) {
    const loading = true;

    const promises = urls.map(url => {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok for URL: ${url}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data.schedule) {
                    throw new Error(`Schedule data not found for URL: ${url}`);
                }
                return {
                    ring: data.schedule.ringName,
                    schedule: data.schedule.events,
                };
            })
            .catch(error => {
                console.error(`Error fetching schedule for URL ${url}:`, error);
                throw error;
            });
    });

    return Promise.all(promises)
        .then(scheduleData => {
            const date = new Date();
            const californiaTime = date.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}) + " (PDT)"

            return {
                schedules: scheduleData,
                loading: false,
                syncDate: californiaTime
            };
        })
        .catch(error => ({
            schedules: [],
            loading: false,
            error: error
        }));
}
