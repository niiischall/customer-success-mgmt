export interface NavItem {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
  isDisabled?: boolean;
}

export interface ModeToggleProps {
  isEditMode: boolean;
  onModeToggle: () => void;
}

export interface WorkflowState {
  id: string;
  title: string;
  description: string;
  isEditMode: boolean;
  lastModified?: Date;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'user' | 'viewer';
  permissions: string[];
} 