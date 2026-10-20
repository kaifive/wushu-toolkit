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
  // Production sheet (live, read-only) — drives the schedule and the live scores.
  SHEET_ID: '1QBaEYns9YHykZpj3UdUPftrGfnn1W8nwhbzS6IKyh-w',
  // Previous sheets (kept for reference):
  // SHEET_ID: '12lE2WHVVp9LE5cUUlE9ilUyEEezZNbaytqLXPUlKIRc', // earlier prod
  // SHEET_ID: '11kwXcCvledDdkZW6R_U4JvhWlXxTtJYeYU7OBEeRdXA', // test copy

  // The prod sheet no longer carries Age or the all-around-champion registration
  // flag. We look those up by athlete name from this reference sheet (the older
  // copy), which still has both. Same ring-tab gids as prod.
  REFERENCE_SHEET_ID: '11kwXcCvledDdkZW6R_U4JvhWlXxTtJYeYU7OBEeRdXA',

  // The three ring tabs we care about (gid + display name). A 4th tab on the
  // sheet (gid 1596685463) is intentionally excluded.
  TABS: [
    { gid: '205393319', name: 'Ring 1' },
    { gid: '260479325', name: 'Ring 2' },
    { gid: '0', name: 'Ring 3' },
  ],

  // Columns of the PROD sheet (gviz column letters). Prod dropped Age and the
  // qualifier flag, and shifted everything left by one vs the old layout.
  COLUMNS: {
    firstName: 'B',
    lastName: 'C',
    gender: 'D',
    event: 'F', // event name (shown as a tooltip on each score)
    score: 'G',
  },

  // Columns of the REFERENCE sheet (the copy) used to look up age + registration
  // by athlete name. This sheet keeps the original layout.
  REFERENCE_COLUMNS: {
    firstName: 'B',
    lastName: 'C',
    age: 'D',
    registered: 'H', // "Yes" = registered for the all-around (grand) champion
  },

  // An athlete is registered for the all-around champion when their reference
  // `registered` column equals this.
  registeredValue: 'Yes',

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

  // Column indexes (0-based) used when reading the prod schedule CSV.
  SCHEDULE_COLUMNS: {
    time: 0, // A
    firstName: 1, // B
    lastName: 2, // C
    experience: 4, // E
    event: 5, // F
    score: 6, // G
  },
}

