import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleDarkMode, setQuickActionModal } from '../store/procurementSlice';
import { ShoppingCart, Bell, HelpCircle, User, Moon, Sun, Camera } from 'lucide-react';
import { NotificationsDropdown } from './NotificationsDropdown';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.procurement.darkMode);
  const notificationsCount = useSelector((state: RootState) => state.procurement.notificationsCount);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className={`h-20 px-6 flex items-center justify-between border-b transition-colors duration-300 shadow-md z-30 relative ${
      darkMode 
        ? 'bg-[#1a1533] border-indigo-900/50 text-slate-100' 
        : 'bg-[#1e1b4b] border-indigo-900 text-slate-100'
    }`}>
      {/* Right side: Company Logo & Branding */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center shadow-lg border-2 border-amber-300">
          <span className="text-slate-950 font-black text-lg tracking-wider">EEC</span>
        </div>
        <div>
          <h1 className="text-base font-extrabold text-white tracking-wide">الشركة المصرية الهندسية للمقاولات</h1>
          <p className="text-xs text-amber-300 font-medium">Egyptian Engineering Company (EEC)</p>
        </div>
      </div>

      {/* Center: Department Title & Cart Icon */}
      <div className="hidden md:flex items-center gap-3 bg-white/10 px-5 py-2.5 rounded-2xl border border-white/10 backdrop-blur-md">
        <ShoppingCart className="w-6 h-6 text-amber-400 animate-pulse" />
        <div>
          <h2 className="text-sm font-bold text-white">إدارة المشتريات</h2>
          <p className="text-xs text-slate-300">Procurement Department</p>
        </div>
      </div>

      {/* Left side: Controls, Document Scanner, Notifications Dropdown & Profile */}
      <div className="flex items-center gap-3">
        {/* Camera Document Scanner Button */}
        <button
          onClick={() => dispatch(setQuickActionModal('scanner'))}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition border border-amber-400/50 shadow cursor-pointer"
          title="مسح الفواتير وإيصالات الشراء بالكاميرا (AI OCR)"
        >
          <Camera className="w-4 h-4" />
          <span className="hidden sm:inline">مسح الفواتير</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-400 transition-all border border-white/10 cursor-pointer"
          title={darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Facebook-style Notifications Popover Bell Button */}
        <div className="relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`p-2.5 rounded-xl transition-all relative border cursor-pointer ${
              isNotificationsOpen
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg'
                : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/10'
            }`}
            title="فتح قائمة الإشعارات"
          >
            <Bell className={`w-5 h-5 ${isNotificationsOpen ? 'text-slate-950' : 'text-amber-400'}`} />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-black rounded-full flex items-center justify-center border-2 border-slate-900 shadow animate-pulse">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* Scrollable Floating Flyout Popover (Facebook Style) */}
          <NotificationsDropdown
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
          />
        </div>

        {/* Help */}
        <button 
          onClick={() => alert('دليل نظام إدارة المشتريات - الشركة المصرية الهندسية للمقاولات')}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-all border border-white/10 hidden sm:flex cursor-pointer"
          title="المساعدة"
        >
          <HelpCircle className="w-5 h-5 text-slate-300" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-xs font-bold text-white block">مدير المشتريات</span>
            <span className="text-[10px] text-amber-300 block">مشرف النظام</span>
          </div>
        </div>
      </div>
    </header>
  );
};
