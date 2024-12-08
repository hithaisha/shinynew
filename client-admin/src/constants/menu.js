import {
  Home,
  Box,
  DollarSign,
  Tag,
  Clipboard,
  Camera,
  AlignLeft,
  UserPlus,
  Users,
  Chrome,
  BarChart,
  Settings,
  Archive,
  LogIn,
} from 'react-feather'

export const MENUITEMS = [
  // {
  //     path: '/dashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false
  // },
  {
    title: 'Users',
    icon: UserPlus,
    type: 'sub',
    active: false,
    children: [
      { path: '/users/list-user', title: 'User List', type: 'link' },
      // { path: '/users/create-user', title: 'Create User', type: 'link' },
    ],
  },
  {
    title: 'Items',
    icon: DollarSign,
    type: 'sub',
    active: false,
    children: [
      { path: '/items/list-item', title: 'Item List', type: 'link' },
      { path: `/items/item-settings/new`, title: 'Create Item', type: 'link' },
    ],
  },
  {
    title: 'Reports',
    icon: DollarSign,
    type: 'sub',
    active: false,
    children: [
      // { path: '/reports/report-table', title: 'Report List', type: 'link' },
      { path: `/reports/report`, title: 'Report Details', type: 'link' },
    ],
  },
]
