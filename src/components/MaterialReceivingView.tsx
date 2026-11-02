import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setQuickActionModal } from '../store/procurementSlice';
import { Truck, Plus } from 'lucide-react';

export const MaterialReceivingView: React.FC = () => {
  const dispatch = useDispatch();
  const receipts = useSelector((state: RootState) => state.procurement.receipts);
  const darkMode = useSelector((state: RootState) => state.procurement.darkMode);

  return (
    <div className="space-y-6">
      <div className={`p-5 rounded-2xl border shadow-md flex flex-wrap items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-800/90 border-indigo-900/40 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black">إذن استلام المواد والمعدات</h2>
            <p className="text-xs opacity-75">تسجيل فحص واستلام المواد الواردة من الموردين للمشاريع</p>
          </div>
        </div>

        <button
          onClick={() => dispatch(setQuickActionModal('new_receipt'))}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:from-amber-600 hover:to-amber-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>تسجيل استلام مواد جديد</span>
        </button>
      </div>

      <div className={`rounded-2xl border shadow-md overflow-hidden ${
        darkMode ? 'bg-slate-800/80 border-indigo-900/40' : 'bg-white border-slate-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                <th className="py-3.5 px-4">رقم الإذن</th>
                <th className="py-3.5 px-4">رقم أمر الشراء</th>
                <th className="py-3.5 px-4">المورد</th>
                <th className="py-3.5 px-4">المشروع</th>
                <th className="py-3.5 px-4">تاريخ الاستلام</th>
                <th className="py-3.5 px-4">عدد البنود</th>
                <th className="py-3.5 px-4">المستلم الفني</th>
                <th className="py-3.5 px-4">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/20">
              {receipts.map((rec) => (
                <tr key={rec.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4 font-bold text-amber-400">{rec.receiptCode}</td>
                  <td className="py-3.5 px-4 font-bold">{rec.poCode}</td>
                  <td className="py-3.5 px-4">{rec.supplier}</td>
                  <td className="py-3.5 px-4 opacity-90">{rec.project}</td>
                  <td className="py-3.5 px-4 opacity-75">{rec.receivedDate}</td>
                  <td className="py-3.5 px-4 font-bold">{rec.itemsCount} بند</td>
                  <td className="py-3.5 px-4">{rec.receiver}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      rec.status === 'مطابق' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      rec.status === 'تحت الفحص' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
