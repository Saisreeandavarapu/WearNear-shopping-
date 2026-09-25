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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFCF5]/98 backdrop-blur-lg border-t border-[#DDD7CA] md:hidden pb-safe shadow-lg select-none">
      <div className="flex items-center justify-around h-13 sm:h-14 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full py-0.5 text-xs font-semibold relative transition-all active:scale-90 ${
                  isActive ? 'text-[#243FBA] font-bold' : 'text-[#686868] hover:text-[#191919]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative flex items-center justify-center">
                    <Icon
                      className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-200 ${
                        isActive ? 'text-[#243FBA] scale-110' : 'text-[#686868]'
                      }`}
                      strokeWidth={isActive ? 2.3 : 1.75}
                    />
                    {typeof item.badge === 'number' && item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-2.5 bg-[#243FBA] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[9.5px] mt-0.5 tracking-tight ${
                      isActive ? 'text-[#243FBA] font-bold' : 'text-[#686868]'
                    }`}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#243FBA] absolute bottom-0.5 shadow-[0_0_6px_rgba(36,63,186,0.6)]" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
