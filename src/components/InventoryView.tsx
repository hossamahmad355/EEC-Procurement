import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  setInventoryLowStockFilter,
  setInventoryCategoryFilter,
  setQuickActionModal
} from '../store/procurementSlice';
import { Package, Search, AlertTriangle, Filter, X, Zap } from 'lucide-react';

export const InventoryView: React.FC = () => {
  const dispatch = useDispatch();
  const inventory = useSelector((state: RootState) => state.procurement.inventory);
  const darkMode = useSelector((state: RootState) => state.procurement.darkMode);
  const lowStockFilter = useSelector((state: RootState) => state.procurement.inventoryLowStockFilter);
  const categoryFilter = useSelector((state: RootState) => state.procurement.inventoryCategoryFilter);

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.warehouse.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLowStock = !lowStockFilter || item.quantity <= item.minLimit;
    const matchesCategory = categoryFilter === 'الكل' || item.category === categoryFilter;
    return matchesSearch && matchesLowStock && matchesCategory;
  });

  const isFiltered = lowStockFilter || categoryFilter !== 'الكل';

  return (
    <div className="space-y-6">
      <div className={`p-5 rounded-2xl border shadow-md flex flex-wrap items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-800/90 border-indigo-900/40 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black">مخزون المواد والمعدات</h2>
            <p className="text-xs opacity-75">متابعة أرصدة المخازن الرئيسية والمواقع الإنشائية للشركة</p>
          </div>
        </div>

        <button
          onClick={() => dispatch(setQuickActionModal('new_request'))}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:from-amber-600 hover:to-amber-700 transition"
        >
          <Zap className="w-4 h-4" />
          <span>طلب توريد مواد جديد</span>
        </button>
      </div>

      {/* Active Filter Notification Badge */}
      {isFiltered && (
        <div className="flex items-center justify-between p-3.5 bg-red-500/15 border border-red-500/30 rounded-xl text-xs font-bold text-red-300">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-red-400" />
            <span>
              عرض مفلتر من مؤشرات الأداء:
              {lowStockFilter && ' [تحديد المواد الحرجة - منخفضة المخزون فقط]'}
              {categoryFilter !== 'الكل' && ` [التصنيف: ${categoryFilter}]`}
            </span>
          </div>
          <button
            onClick={() => {
              dispatch(setInventoryLowStockFilter(false));
              dispatch(setInventoryCategoryFilter('الكل'));
            }}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-white transition"
          >
            <X className="w-3.5 h-3.5" />
            <span>عرض كل المواد</span>
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <div className={`p-4 rounded-2xl border shadow-sm flex flex-wrap items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-800/80 border-indigo-900/40' : 'bg-white border-slate-200'
      }`}>
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute right-3.5 top-3 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="البحث برقم الكود، اسم المادة أو المخزن..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pr-10 pl-4 py-2.5 rounded-xl border text-sm focus:outline-none ${
              darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(setInventoryLowStockFilter(!lowStockFilter))}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              lowStockFilter
                ? 'bg-red-500 text-white shadow shadow-red-500/30'
                : darkMode ? 'bg-slate-900/50 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>المواد المنخفضة فقط</span>
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border shadow-md overflow-hidden ${
        darkMode ? 'bg-slate-800/80 border-indigo-900/40' : 'bg-white border-slate-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                <th className="py-3.5 px-4">كود المادة</th>
                <th className="py-3.5 px-4">اسم المادة</th>
                <th className="py-3.5 px-4">التصنيف</th>
                <th className="py-3.5 px-4">الكمية المتوفرة</th>
                <th className="py-3.5 px-4">الوحدة</th>
                <th className="py-3.5 px-4">المخزن</th>
                <th className="py-3.5 px-4">حد الطلب الأدنى</th>
                <th className="py-3.5 px-4">حالة المخزون</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/20">
              {filtered.length > 0 ? (
                filtered.map((item) => {
                  const isLow = item.quantity <= item.minLimit;
                  return (
                    <tr key={item.id} className="hover:bg-white/5 transition">
                      <td className="py-3.5 px-4 font-bold text-amber-400">{item.code}</td>
                      <td className="py-3.5 px-4 font-bold">{item.name}</td>
                      <td className="py-3.5 px-4 opacity-90">{item.category}</td>
                      <td className={`py-3.5 px-4 font-black ${isLow ? 'text-red-400' : 'text-emerald-400'}`}>
                        {item.quantity.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 opacity-75">{item.unit}</td>
                      <td className="py-3.5 px-4">{item.warehouse}</td>
                      <td className="py-3.5 px-4 font-bold text-amber-400">{item.minLimit.toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isLow
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {isLow ? 'منخفض - يلزم إعادة الطلب' : 'متوفر ومستقر'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-sm opacity-60">
                    لا توجد مواد في المخزون تطابق معايير التصفية.
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
