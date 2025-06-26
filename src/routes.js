import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// Base
const About = React.lazy(() => import('./views/about/About'))
const ContactUs = React.lazy(() => import('./views/contact/ContactUs'))

// Athlete Toolkit
const DeductionCodeLookup = React.lazy(() => import('./views/toolkit/deduction-code-lookup/DeductionCodeLookup'))
const RequiredMovements = React.lazy(() => import('./views/toolkit/required-movements/RequiredMovements'))
const AverageScoreCalculator = React.lazy(() => import('./views/toolkit/average-score-beater/AverageScoreCalculator'))

// 2024 Team Trials
const About2024 = React.lazy(() => import('./views/2024team-trials/about/About'))
const Schedule2024 = React.lazy(() => import('./views/2024team-trials/schedule/Schedule2024'))
const TotalScores2024 = React.lazy(() => import('./views/2024team-trials/total-scores/TotalScores2024'))
const MaleStandings = React.lazy(() => import('./views/2024team-trials/standings/MaleStandings'))
const FemaleStandings = React.lazy(() => import('./views/2024team-trials/standings/FemaleStandings'))
const HolisticDashboard = React.lazy(() => import('./views/2024team-trials/dashboards/HolisticDashboard'))
const AthleteDashboard = React.lazy(() => import('./views/2024team-trials/dashboards/AthleteDashboard'))
const EventDashboard = React.lazy(() => import('./views/2024team-trials/dashboards/EventDashboard'))
const USTeamDashboard = React.lazy(() => import('./views/2024team-trials/dashboards/USTeamDashboard'))

// Sportdata
const SportdataSportDataStandingsTable = React.lazy(() => import('./views/sportdataComponents/standings/SportDataStandingsTable'))
const SportdataScorecards = React.lazy(() => import('./views/sportdataComponents/scorecard/Scorecard'))

// 2025 Team Trials
const About2025 = React.lazy(() => import('./views/2025team-trials/about/About'))
const USTeam = React.lazy(() => import('./views/2025team-trials/USTeam'))
const ScorecardStats = React.lazy(() => import('./views/2025team-trials/ScorecardStats'))
const AdultsSchedule2025 = React.lazy(() => import('./views/2025team-trials/AdultsSchedule2025'))

// Coming Soon
const ComingSoon = React.lazy(() => import('./views/coming-soon/ComingSoon'))

const dev_routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

const base_routes = [
  { path: '/', name: 'About2025', element: About2025 },

  { path: '/about', name: 'About', element: About },
  { path: '/contact-us', name: 'ContactUs', element: ContactUs },
  { path: '/toolkit/deduction-code-lookup', name: 'DeductionCodeLookup', element: DeductionCodeLookup },
  { path: '/toolkit/required-movements', name: 'RequiredMovements', element: RequiredMovements },
  { path: '/toolkit/average-score-calculator', name: 'AverageScoreCalculator', element: AverageScoreCalculator },
  { path: '/nandu-calculator', name: 'NanduCalculator', element: ComingSoon },
]

const adults2025_routes = [
  { path: '/2025-adults/about', name: 'About2025', element: About2025 },
  { path: '/2025-adults/schedule', name: 'Schedule2025', element: AdultsSchedule2025, protected: true },
  { path: '/2025-adults/male-standings', name: 'MaleStandings2025', element: SportdataSportDataStandingsTable, protected: true },
  { path: '/2025-adults/female-standings', name: 'FemaleStandings2025', element: SportdataSportDataStandingsTable, protected: true },
  { path: '/2025-adults/us-team', name: 'USTeam', element: USTeam, protected: true },
  { path: '/2025-adults/scorecard', name: 'Scorecard2025', element: SportdataScorecards, protected: true },
  { path: '/2025-adults/scorecard-stats', name: 'ScorecardStats2025', element: ScorecardStats, protected: true },
]

const phoenix2025_routes = [
  { path: '/2025-phoenix/male-standings', name: 'MaleStandings2025', element: SportdataSportDataStandingsTable },
  { path: '/2025-phoenix/female-standings', name: 'FemaleStandings2025', element: SportdataSportDataStandingsTable },
  { path: '/2025-phoenix/scorecard', name: 'Scorecard2025', element: SportdataScorecards },
]

const juniors2024_routes = [
  { path: '/2024-juniors/about', name: 'About2024', element: About2024 },
  { path: '/2024-juniors/schedule', name: 'Schedule2024', element: Schedule2024 },
  { path: '/2024-juniors/total-scores', name: 'TotalScores2024', element: TotalScores2024 },
  { path: '/2024-juniors/male-standings', name: 'MaleStandings', element: MaleStandings },
  { path: '/2024-juniors/female-standings', name: 'FemaleStandings', element: FemaleStandings },
  { path: '/2024-juniors/holistic-dashboard', name: 'HolisticDashboard', element: HolisticDashboard },
  { path: '/2024-juniors/athlete-dashboard', name: 'AthleteDashboard', element: AthleteDashboard },
  { path: '/2024-juniors/event-dashboard', name: 'EventDashboard', element: EventDashboard },
  { path: '/2024-juniors/us-team-dashboard', name: 'USTeamDashboard', element: USTeamDashboard },
]

const live_routes = [
  ...base_routes,
  ...adults2025_routes,
  ...phoenix2025_routes,
  ...juniors2024_routes,
]

const routes = live_routes
//const routes = [...dev_routes, ...live_routes]

export default routes
