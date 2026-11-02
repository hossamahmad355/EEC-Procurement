import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  setQuickActionModal,
  setOrderStatusFilter,
  setOrderProjectFilter
} from '../store/procurementSlice';
import { ShoppingCart, Plus, Printer, Download, Filter, X, Search } from 'lucide-react';

export const PurchaseOrdersView: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.procurement.orders);
  const darkMode = useSelector((state: RootState) => state.procurement.darkMode);
  const orderStatusFilter = useSelector((state: RootState) => state.procurement.orderStatusFilter);
  const orderProjectFilter = useSelector((state: RootState) => state.procurement.orderProjectFilter);

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = orders.filter((order) => {
    const matchesSearch =
      order.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      orderStatusFilter === 'الكل' || order.status === orderStatusFilter;
    const matchesProject =
      orderProjectFilter === 'الكل' || order.project === orderProjectFilter;
    return matchesSearch && matchesStatus && matchesProject;
  });

  const isFiltered = orderStatusFilter !== 'الكل' || orderProjectFilter !== 'الكل';

  return (
    <div className="space-y-6">
      <div className={`p-5 rounded-2xl border shadow-md flex flex-wrap items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-800/90 border-indigo-900/40 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black">إدارة أوامر الشراء</h2>
            <p className="text-xs opacity-75">إصدار ومتابعة عقود أوامر الشراء المعتمدة للموردين</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('تم تصدير تقرير أوامر الشراء كملف Excel بنجاح')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition border"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>تصدير تقرير</span>
          </button>
          <button
            onClick={() => dispatch(setQuickActionModal('new_order'))}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:from-amber-600 hover:to-amber-700 transition"
          >
            <Plus className="w-5 h-5" />
            <span>إصدار أمر شراء جديد</span>
          </button>
        </div>
      </div>

      {/* Active Filter Notification Badge */}
      {isFiltered && (
        <div className="flex items-center justify-between p-3.5 bg-amber-500/15 border border-amber-500/30 rounded-xl text-xs font-bold text-amber-300">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-400" />
            <span>
              عرض مفلتر من مؤشرات الأداء:
              {orderStatusFilter !== 'الكل' && ` [الحالة: ${orderStatusFilter}]`}
              {orderProjectFilter !== 'الكل' && ` [المشروع: ${orderProjectFilter}]`}
            </span>
          </div>
          <button
            onClick={() => {
              dispatch(setOrderStatusFilter('الكل'));
              dispatch(setOrderProjectFilter('الكل'));
            }}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/40 text-white transition"
          >
            <X className="w-3.5 h-3.5" />
            <span>إلغاء التصفية</span>
          </button>
        </div>
      )}

      {/* Search and Status Filters Bar */}
      <div className={`p-4 rounded-2xl border shadow-sm flex flex-wrap items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-800/80 border-indigo-900/40' : 'bg-white border-slate-200'
      }`}>
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute right-3.5 top-3 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="البحث برقم الأمر، المورد أو المشروع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pr-10 pl-4 py-2.5 rounded-xl border text-sm focus:outline-none ${
              darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['الكل', 'جاري التنفيذ', 'تم الاستلام', 'قيد التوريد'].map((status) => (
            <button
              key={status}
              onClick={() => dispatch(setOrderStatusFilter(status))}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                orderStatusFilter === status
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : darkMode ? 'bg-slate-900/50 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className={`rounded-2xl border shadow-md overflow-hidden ${
        darkMode ? 'bg-slate-800/80 border-indigo-900/40' : 'bg-white border-slate-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                <th className="py-3.5 px-4">رقم أمر الشراء</th>
                <th className="py-3.5 px-4">المورد المعتمد</th>
                <th className="py-3.5 px-4">المشروع</th>
                <th className="py-3.5 px-4">تاريخ الإصدار</th>
                <th className="py-3.5 px-4">إجمالي القيمة</th>
                <th className="py-3.5 px-4">الحالة</th>
                <th className="py-3.5 px-4 text-center">طباعة العقد</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/20">
              {filtered.length > 0 ? (
                filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition">
                    <td className="py-3.5 px-4 font-bold text-amber-400">{order.code}</td>
                    <td className="py-3.5 px-4 font-bold">{order.supplier}</td>
                    <td className="py-3.5 px-4 opacity-90">{order.project}</td>
                    <td className="py-3.5 px-4 opacity-75">{order.date}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">{order.amount.toLocaleString()} ج.م</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        order.status === 'جاري التنفيذ' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        order.status === 'تم الاستلام' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => alert(`جاري طباعة أمر الشراء ${order.code} - الشركة المصرية الهندسية للمقاولات`)}
                        className="p-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 transition inline-flex items-center gap-1"
                      >
                        <Printer className="w-4 h-4" />
                        <span>طباعة</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm opacity-60">
                    لا توجد أوامر شراء تطابق التصفية المحددة.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
