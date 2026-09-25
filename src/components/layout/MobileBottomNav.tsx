import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon, Home, LayoutGrid, Search, Store, User } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  badge?: number;
}

export const MobileBottomNav: React.FC = () => {
  const navItems: NavItem[] = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Categories', path: '/categories', icon: LayoutGrid },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Stores', path: '/stores', icon: Store },
    { name: 'Account', path: '/account', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#172B82]/95 backdrop-blur-xl border-t border-white/15 md:hidden pb-safe shadow-[0_-4px_24px_rgba(23,43,130,0.35)] select-none">
      <div className="flex items-center justify-around h-14 px-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-semibold relative transition-all active:scale-95 ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <div
                  className={`flex flex-col items-center justify-center w-full py-1 px-1 rounded-xl transition-all duration-200 ${
                    isActive ? 'bg-white/12' : ''
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <Icon
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isActive
                          ? 'text-white scale-110 drop-shadow-[0_1px_4px_rgba(255,255,255,0.4)]'
                          : 'text-white/70'
                      }`}
                      strokeWidth={isActive ? 2.3 : 1.8}
                    />
                    {typeof item.badge === 'number' && item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-2.5 bg-white text-[#172B82] text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[9.5px] mt-0.5 tracking-tight ${
                      isActive ? 'text-white font-bold' : 'text-white/70'
                    }`}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white absolute bottom-1 shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
