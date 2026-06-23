// 2026 PWC data source + column mapping.
//
// The whole 2026 PWC section is driven by a single Google Sheet, read live via
// the gviz JSON endpoint (no backend, no API key). The sheet is shared as
// "Anyone with the link can view".
//
// Sheet:
//   https://docs.google.com/spreadsheets/d/12lE2WHVVp9LE5cUUlE9ilUyEEezZNbaytqLXPUlKIRc/edit
//
// We read three "ring" tabs and merge them into one athlete pool. Each ring tab
// shares the same column layout (only column A's header differs per ring).

export const PWC_2026 = {
  // Production sheet (live, read-only):
  SHEET_ID: '12lE2WHVVp9LE5cUUlE9ilUyEEezZNbaytqLXPUlKIRc',
  // Test copy (used while entering test scores). Must be shared
  // "Anyone with the link can view" for gviz to read it.
  // SHEET_ID: '11kwXcCvledDdkZW6R_U4JvhWlXxTtJYeYU7OBEeRdXA',

  // The three ring tabs we care about (gid + display name). A 4th tab on the
  // sheet (gid 1596685463) is intentionally excluded.
  TABS: [
    { gid: '205393319', name: 'Ring 1' },
    { gid: '260479325', name: 'Ring 2' },
    { gid: '0', name: 'Ring 3' },
  ],

  // Columns referenced by their spreadsheet letter (gviz column id), since a few
  // columns have blank header text.
  COLUMNS: {
    firstName: 'B',
    lastName: 'C',
    age: 'D',
    gender: 'E',
    event: 'G', // event name (shown as a tooltip on each score)
    qualifier: 'H', // must equal `qualifierValue` for a score to count
    score: 'J',
  },

  // A row's score only counts toward standings when column H equals this.
  qualifierValue: 'Yes',

  // Sum the highest N scores per athlete to form the total.
  TOP_N: 3,

  // How often the standings / grand champion / schedule pages re-fetch the
  // sheet, in milliseconds. ~10–15s keeps it "live" without risking Google rate
  // limiting when many spectators have it open at once. Going much lower gives
  // little benefit: scores change every few minutes and gviz has its own cache.
  REFRESH_MS: 15000,

  // How values in the gender column map to the Male / Female pages.
  genderValues: {
    Male: ['male', 'm', 'men', 'boys'],
    Female: ['female', 'f', 'women', 'girls'],
  },

  // The schedule pages read CSV instead of gviz JSON: break / intermission rows
  // are text labels sitting in the datetime-typed column A, and gviz silently
  // drops those rows. CSV preserves every row verbatim.
  //
  // The CSV export endpoint returns CORS headers for cross-origin browser
  // requests (it echoes the request Origin on the redirect and "*" on the final
  // response), so "Anyone with the link can view" sharing is sufficient — no
  // Publish-to-web step required.
  scheduleCsvUrl: (sheetId, gid) =>
    `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`,

  // Column indexes (0-based) used when reading the schedule CSV.
  SCHEDULE_COLUMNS: {
    time: 0, // A
    firstName: 1, // B
    lastName: 2, // C
    experience: 5, // F
    event: 6, // G
    score: 9, // J
  },
}

