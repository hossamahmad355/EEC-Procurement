import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  setQuickActionModal,
  addPurchaseRequest,
  addPurchaseOrder,
  addSupplier,
  addMaterialReceipt
} from '../store/procurementSlice';
import { X, FileText, ShoppingCart, Users, Truck, Tag, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuickActionModal: React.FC = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state: RootState) => state.procurement.quickActionModal);
  const darkMode = useSelector((state: RootState) => state.procurement.darkMode);

  // Form states
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('المبنى الإداري');
  const [department, setDepartment] = useState('الهندسة الإنشائية');
  const [requester, setRequester] = useState('مهندس أحمد سعيد');
  const [amount, setAmount] = useState('500000');
  const [category, setCategory] = useState<'مواد إنشائية' | 'كهربائية' | 'ميكانيكية' | 'تشطيبات' | 'أخرى'>('مواد إنشائية');
  
  // For order/supplier/receipt
  const [supplierName, setSupplierName] = useState('شركة النيل للحديد والصلب');
  const [phone, setPhone] = useState('+20 2 23456789');
  const [email, setEmail] = useState('info@supplier.eg');
  const [poCode, setPoCode] = useState('PR-0268');
  const [itemsCount, setItemsCount] = useState('10');

  if (!modalType) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'new_request') {
      dispatch(addPurchaseRequest({
        title: title || 'طلب توريد مواد بناء',
        project,
        department,
        requester,
        amount: Number(amount) || 250000,
        status: 'قيد المراجعة',
        category
      }));
      triggerConfetti();
    } else if (modalType === 'new_order') {
      dispatch(addPurchaseOrder({
        code: `PR-0${Math.floor(300 + Math.random() * 100)}`,
        supplier: supplierName,
        project,
        amount: Number(amount) || 1500000,
        date: new Date().toISOString().split('T')[0],
        status: 'جاري التنفيذ'
      }));
      triggerConfetti();
    } else if (modalType === 'new_supplier') {
      dispatch(addSupplier({
        name: title || supplierName,
        category,
        rating: 4.5,
        status: 'معتمد',
        phone,
        email,
        dealsCount: 1,
        location: 'القاهرة - المنطقة الصناعية',
        suppliedMaterials: [title || category]
      }));
      triggerConfetti();
    } else if (modalType === 'new_receipt') {
      dispatch(addMaterialReceipt({
        receiptCode: `REC-${Math.floor(600 + Math.random() * 100)}`,
        poCode,
        supplier: supplierName,
        project,
        receivedDate: new Date().toISOString().split('T')[0],
        itemsCount: Number(itemsCount) || 15,
        receiver: requester,
        status: 'مطابق'
      }));
      triggerConfetti();
    } else {
      dispatch(setQuickActionModal(null));
    }
  };

  const getModalTitle = () => {
    switch(modalType) {
      case 'new_request': return { title: 'إنشاء طلب شراء جديد', icon: FileText };
      case 'new_order': return { title: 'إصدار أمر شراء جديد', icon: ShoppingCart };
      case 'new_supplier': return { title: 'إضافة مورد جديد', icon: Users };
      case 'new_receipt': return { title: 'تسجيل استلام مواد جديدة', icon: Truck };
      case 'new_quotation': return { title: 'طلب عرض سعر جديد', icon: Tag };
      default: return { title: 'إجراء سريع', icon: FileText };
    }
  };

  const info = getModalTitle();
  const Icon = info.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className={`w-full max-w-lg rounded-2xl shadow-2xl border overflow-hidden transition-all transform scale-100 ${
        darkMode ? 'bg-slate-900 border-indigo-900 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg">{info.title}</h3>
          </div>
          <button
            onClick={() => dispatch(setQuickActionModal(null))}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {modalType === 'new_request' && (
            <>
              <div>
                <label className="block text-xs font-bold mb-1 opacity-80">عنوان الطلب / المواد المطلوبة</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: حديد تسليح 16مم أو كابلات كهربائية"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">المشروع</label>
                  <select
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="المبنى الإداري">المبنى الإداري</option>
                    <option value="ورشة المعدات">ورشة المعدات</option>
                    <option value="المرافق العامة">المرافق العامة</option>
                    <option value="مبنى الخدمات">مبنى الخدمات</option>
                    <option value="أبراج النيل السكنية">أبراج النيل السكنية</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">التصنيف</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="مواد إنشائية">مواد إنشائية</option>
                    <option value="كهربائية">كهربائية</option>
                    <option value="ميكانيكية">ميكانيكية</option>
                    <option value="تشطيبات">تشطيبات</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">المبلغ التقديري (ج.م)</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">مقدم الطلب</label>
                  <input
                    type="text"
                    required
                    value={requester}
                    onChange={(e) => setRequester(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </>
          )}

          {modalType === 'new_order' && (
            <>
              <div>
                <label className="block text-xs font-bold mb-1 opacity-80">اسم المورد</label>
                <select
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="شركة النيل للحديد والصلب">شركة النيل للحديد والصلب</option>
                  <option value="شركة دلتا للكابلات الكهربائية">شركة دلتا للكابلات الكهربائية</option>
                  <option value="شركة الشرق للسباكة والأدوات">شركة الشرق للسباكة والأدوات</option>
                  <option value="شركة الأمل للتشطيبات والديكور">شركة الأمل للتشطيبات والديكور</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">المشروع</label>
                  <select
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="المبنى الإداري">المبنى الإداري</option>
                    <option value="ورشة المعدات">ورشة المعدات</option>
                    <option value="المرافق العامة">المرافق العامة</option>
                    <option value="مبنى الخدمات">مبنى الخدمات</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">إجمالي القيمة (ج.م)</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </>
          )}

          {modalType === 'new_supplier' && (
            <>
              <div>
                <label className="block text-xs font-bold mb-1 opacity-80">اسم الشركة الموردة</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: شركة النصر للمقاولات والمواد"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">التصنيف الرئيسي</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="مواد إنشائية">مواد إنشائية</option>
                    <option value="كهربائية">كهربائية</option>
                    <option value="ميكانيكية">ميكانيكية</option>
                    <option value="تشطيبات">تشطيبات</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">رقم الهاتف</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 opacity-80">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </>
          )}

          {modalType === 'new_receipt' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">رقم أمر الشراء المرتبط</label>
                  <input
                    type="text"
                    required
                    value={poCode}
                    onChange={(e) => setPoCode(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 opacity-80">عدد البنود المستلمة</label>
                  <input
                    type="number"
                    required
                    value={itemsCount}
                    onChange={(e) => setItemsCount(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 opacity-80">اسم المورد</label>
                <input
                  type="text"
                  required
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 opacity-80">اسم المستلم / المسؤول</label>
                <input
                  type="text"
                  required
                  value={requester}
                  onChange={(e) => setRequester(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </>
          )}

          {modalType === 'new_quotation' && (
            <div>
              <p className="text-sm opacity-80">يمكنك هنا إدخال بيانات طلب عرض سعر جديد من الموردين المعتمدين لتتم مقارنتها آلياً وترسيتها على الأفضل سعراً ومواصفة.</p>
              <div className="mt-4">
                <label className="block text-xs font-bold mb-1 opacity-80">وصف المواد أو الخدمة المطلوب تسعيرها</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: توريد وتركيب مصاعد كهربائية سعة 10 أفراد"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-700/50">
            <button
              type="button"
              onClick={() => dispatch(setQuickActionModal(null))}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${
                darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-lg shadow-amber-500/25 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>حفظ وتأكيد العملية</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
