'use client';

import { Pencil, Eye } from 'lucide-react';
import { ModeToggleProps } from '../types';
import { APP_NAME, COLORS, TOOLTIPS } from '../constants';
import Logo from './Logo';

export default function Header({ isEditMode, onModeToggle }: ModeToggleProps) {
  return (
    <header className={`bg-white border-b border-[${COLORS.PRIMARY}] shadow-sm`}>
      <div className="mx-auto px-6 sm:px-4">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center space-x-2">
            <Logo />
            <h1 className={`text-lg font-semibold text-[${COLORS.TEXT_PRIMARY}]`}>{APP_NAME}</h1>
          </div>
          <div className="relative group">
            <button
              onClick={onModeToggle}
              className={`
                flex items-center px-3 py-1.5 rounded-md transition-all duration-200
                bg-[${COLORS.PRIMARY}] text-[${COLORS.TEXT_PRIMARY}] hover:bg-[${COLORS.PRIMARY_HOVER}]
              `}
            >
              {isEditMode ? (
                <>
                  <Eye className="w-4 h-4 mr-1.5" />
                  <span className="font-medium">View Mode</span>
                </>
              ) : (
                <>
                  <Pencil className="w-4 h-4 mr-1.5" />
                  <span className="font-medium">Edit Mode</span>
                </>
              )}
            </button>
            <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 border border-[${COLORS.PRIMARY}]`}>
              <div className={`px-4 py-2 text-sm text-[${COLORS.TEXT_PRIMARY}]`}>
                {isEditMode ? TOOLTIPS.VIEW_MODE : TOOLTIPS.EDIT_MODE}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 