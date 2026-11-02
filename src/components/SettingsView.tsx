import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleDarkMode } from '../store/procurementSlice';
import { Settings, Moon, Sun, Shield, Database, Bell } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.procurement.darkMode);

  return (
    <div className="space-y-6">
      <div className={`p-5 rounded-2xl border shadow-md flex items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-800/90 border-indigo-900/40 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black">إعدادات النظام والتفضيلات</h2>
            <p className="text-xs opacity-75">إدارة تفضيلات العرض والتخزين المحلي وإشعارات نظام المشتريات</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <div className={`p-6 rounded-2xl border shadow-md ${
          darkMode ? 'bg-slate-800/80 border-indigo-900/40' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <Sun className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">مظهر الواجهة والوضع الليلي</h3>
          </div>
          <p className="text-xs opacity-75 mb-4">يمكنك التبديل بين الوضع الداكن والوضع الفاتح بحسب تفضيلك لضمان راحة العين.</p>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow transition hover:from-amber-600 hover:to-amber-700"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{darkMode ? 'التحول إلى الوضع الفاتح' : 'التحول إلى الوضع الداكن'}</span>
          </button>
        </div>

        {/* Local Storage Auto-save Settings */}
        <div className={`p-6 rounded-2xl border shadow-md ${
          darkMode ? 'bg-slate-800/80 border-indigo-900/40' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">الحفظ التلقائي والتخزين المحلي</h3>
          </div>
          <p className="text-xs opacity-75 mb-4">جميع البيانات والطلبات والأوامر يتم حفظها تلقائياً في التخزين المحلي لمتصفحك (LocalStorage) لضمان استمرارية تجربة المستخدم.</p>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-4 py-2.5 rounded-xl border border-emerald-500/20">
            <Shield className="w-4 h-4" />
            <span>الحفظ التلقائي مفعل ونشط</span>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className={`p-6 rounded-2xl border shadow-md ${
          darkMode ? 'bg-slate-800/80 border-indigo-900/40' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-base">إشعارات النظام والمنظومة</h3>
          </div>
          <p className="text-xs opacity-75 mb-4">تلقي تنبيهات فورية عند اعتماد طلبات الشراء أو استلام مواد المشاريع الجديدة.</p>
          <button
            onClick={() => alert('تم تحديث إعدادات الإشعارات بنجاح')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow"
          >
            تحديث تفضيلات الإشعارات
          </button>
        </div>
      </div>
    </div>
  );
};
