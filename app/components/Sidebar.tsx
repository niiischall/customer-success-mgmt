'use client';

import { NAVIGATION_ITEMS, COLORS, TOOLTIPS } from '../constants';

export default function Sidebar() {
  return (
    <aside className={`w-64 bg-white border-r border-[${COLORS.PRIMARY}] h-[calc(100vh-3.5rem)] shadow-sm`}>
      <nav className="p-4">
        <ul className="space-y-2">
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.id}>
              {item.isDisabled ? (
                <span 
                  className="block px-4 py-2 rounded-md text-gray-400 cursor-not-allowed bg-gray-50"
                  title={TOOLTIPS.COMING_SOON}
                >
                  {item.label}
                </span>
              ) : (
                <a 
                  href={item.href} 
                  className={`block px-4 py-2 rounded-md transition-colors ${
                    item.isActive 
                      ? `bg-[${COLORS.PRIMARY}] text-[${COLORS.TEXT_PRIMARY}] font-medium hover:bg-[${COLORS.PRIMARY_HOVER}]` 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 