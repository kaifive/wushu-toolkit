import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,

  cilInfo,
  cilListNumbered,
  cilClipboard,
  cilWc,
  cilChart,
  cilCalculator,
  cilCheckCircle,
  cilBarcode,
  cilEnvelopeClosed,
  cilDescription,

  cilAddressBook,
  cilAirplay
} from '@coreui/icons'

import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'


const dev_nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

const JUNIORS_24 = [
  {
    component: CNavItem,
    name: 'ConMon Information',
    to: '/2024-juniors/about',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Schedule',
    to: '/2024-juniors/schedule',
    icon: <CIcon icon={cilListNumbered} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Total Scores',
    to: '/2024-juniors/total-scores',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Live Standings',
    icon: <CIcon icon={cilWc} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Male Standings',
        to: '/2024-juniors/male-standings',
      },
      {
        component: CNavItem,
        name: 'Female Standings',
        to: '/2024-juniors/female-standings',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Dashboards',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Holistic Dashboard',
        to: '/2024-juniors/holistic-dashboard',
      },
      {
        component: CNavItem,
        name: 'Athlete Dashboard',
        to: '/2024-juniors/athlete-dashboard',
      },
      {
        component: CNavItem,
        name: 'Event Dashboard',
        to: '/2024-juniors/event-dashboard',
      },
      {
        component: CNavItem,
        name: 'US Team Dashboard',
        to: '/2024-juniors/us-team-dashboard',
      },
    ],
  },
]

const PHOENIX_25 = [
  {
    component: CNavGroup,
    name: 'Live Standings',
    icon: <CIcon icon={cilWc} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Male Standings',
        to: '/2025-phoenix/male-standings',
      },
      {
        component: CNavItem,
        name: 'Female Standings',
        to: '/2025-phoenix/female-standings',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Scorecard',
    to: '/2025-phoenix/scorecard',
    icon: <CIcon icon={cilAirplay} customClassName="nav-icon" />,
  },
]

const ADULTS_25 = [
  {
    component: CNavItem,
    name: 'ConMon Information',
    to: '/2025-adults/about',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Schedule',
    to: '/2025-adults/schedule',
    icon: <CIcon icon={cilListNumbered} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Live Standings',
    icon: <CIcon icon={cilWc} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Male Standings',
        to: '/2025-adults/male-standings',
      },
      {
        component: CNavItem,
        name: 'Female Standings',
        to: '/2025-adults/female-standings',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'US Team',
    to: '/2025-adults/us-team',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Scorecards',
    to: '/2025-adults/scorecard',
    icon: <CIcon icon={cilAirplay} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Scorecard Stats',
    to: '/2025-adults/scorecard-stats',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
]

const JUNIORS_25 = [
  {
    component: CNavTitle,
    name: '2025 Junior Team Trials',
  },
  {
    component: CNavItem,
    name: 'Schedule',
    to: '/2025-juniors/schedule',
    icon: <CIcon icon={cilListNumbered} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Live Standings',
    icon: <CIcon icon={cilWc} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Male Standings',
        to: '/2025-juniors/male-standings',
      },
      {
        component: CNavItem,
        name: 'Female Standings',
        to: '/2025-juniors/female-standings',
      },
    ],
  },
]

const live_nav = [
  {
    component: CNavItem,
    name: 'About Wushu Toolkit',
    to: '/about',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Contact Us',
    to: '/contact-us',
    icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Athlete Toolkit',
  },
  {
    component: CNavItem,
    name: 'Deduction Code Lookup',
    to: '/toolkit/deduction-code-lookup',
    icon: <CIcon icon={cilBarcode} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Required Movements',
    to: '/toolkit/required-movements',
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Average Score Calculator',
    to: '/toolkit/average-score-calculator',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  ...JUNIORS_25,
  {
    component: CNavTitle,
    name: 'Past Competitions',
  },
  {
    component: CNavGroup,
    name: '2025 Adult Team Trials',
    items: [
      ...ADULTS_25,
    ],
  },
  {
    component: CNavGroup,
    name: 'Phoenix Nationals 2025',
    items: [
      ...PHOENIX_25,
    ],
  },
  {
    component: CNavGroup,
    name: '2024 Junior Team Trials',
    items: [
      ...JUNIORS_24,
    ],
  },
  {
    component: CNavTitle,
    name: 'Coming Soon',
  },
  {
    component: CNavItem,
    name: 'Nandu Calculator',
    to: '/nandu-calculator',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
]

const _nav = live_nav
//const _nav = [...dev_nav, ...live_nav];

export default _nav
