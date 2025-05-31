import { NavItem } from '../types';

export const APP_NAME = 'Customer Success Workflow Management System';

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    isActive: true,
  },
  {
    id: 'workflows',
    label: 'Workflows',
    href: '/workflows',
    isActive: false,
    isDisabled: true,
  },
  {
    id: 'customers',
    label: 'Customers',
    href: '/customers',
    isActive: false,
    isDisabled: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    isActive: false,
    isDisabled: true,
  },
];

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  VIEWER: 'viewer',
} as const;

export const PERMISSIONS = {
  EDIT_WORKFLOW: 'edit_workflow',
  VIEW_WORKFLOW: 'view_workflow',
  MANAGE_USERS: 'manage_users',
  VIEW_ANALYTICS: 'view_analytics',
} as const;

export const COLORS = {
  PRIMARY: '#dbe5fa',
  PRIMARY_HOVER: '#c5d4f0',
  TEXT_PRIMARY: '#2c3e50',
  TEXT_SECONDARY: '#4a5568',
  BACKGROUND: '#f5f8ff',
} as const;

export const TOOLTIPS = {
  EDIT_MODE: 'Switch to edit mode to modify the workflow',
  VIEW_MODE: 'Switch to view mode to see the workflow without editing capabilities',
  COMING_SOON: 'Coming soon',
} as const; 