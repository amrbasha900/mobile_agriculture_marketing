import React, { memo } from 'react';
type TranslationKey = 'home' | 'settings' | 'createInvoice' | 'recordPayment' | 'invoiceList' | 'language' | 'logout' | 'welcomeTo' | 'newInvoice' | 'supplierPayments' | 'invoicesList' | 'login' | 'welcomeBack' | 'signInToContinue' | 'domain' | 'email' | 'password' | 'signIn' | 'supplier' | 'invoiceDate' | 'defaultCustomer' | 'defaultItem' | 'invoiceItems' | 'quantity' | 'price' | 'total' | 'customer' | 'save' | 'cancel' | 'addItem' | 'newPayment' | 'amount' | 'paymentDate' | 'details' | 'sendPayment' | 'paymentHistory' | 'viewAllSupplierPayments' | 'noPaymentsFound' | 'clearFilters' | 'filter' | 'search' | 'startDate' | 'endDate' | 'status' | 'all' | 'completed' | 'pending' | 'rejected' | 'cancelled' | 'viewDetails' | 'paymentDetails' | 'back' | 'description' | 'invoiceDetails' | 'editInvoice' | 'item' | 'adding' | 'processing' | 'tryAdjustingFilters' | 'detailsPlaceholder' | 'searchPlaceholder' | 'noInvoicesFound' | 'paymentSaved' | 'locked';
export const translations: Record<TranslationKey, {
  english: string;
  arabic: string;
}> = {
  home: {
    english: 'Home',
    arabic: 'الرئيسية'
  },
  settings: {
    english: 'Settings',
    arabic: 'الإعدادات'
  },
  createInvoice: {
    english: 'Create Invoice',
    arabic: 'إنشاء فاتورة'
  },
  recordPayment: {
    english: 'Record Payment',
    arabic: 'تسجيل دفعة'
  },
  invoiceList: {
    english: 'Invoice List',
    arabic: 'قائمة الفواتير'
  },
  language: {
    english: 'Language',
    arabic: 'اللغة'
  },
  logout: {
    english: 'Log Out',
    arabic: 'تسجيل الخروج'
  },
  welcomeTo: {
    english: 'Welcome to X Agricultural Marketing',
    arabic: 'مرحبا بكم في التسويق الزراعي X'
  },
  newInvoice: {
    english: 'New Invoice',
    arabic: 'فاتورة جديدة'
  },
  supplierPayments: {
    english: 'Supplier Payments',
    arabic: 'دفعات الموردين'
  },
  invoicesList: {
    english: 'Invoices List',
    arabic: 'قائمة الفواتير'
  },
  login: {
    english: 'Login',
    arabic: 'تسجيل الدخول'
  },
  welcomeBack: {
    english: 'Welcome Back',
    arabic: 'مرحبًا بعودتك'
  },
  signInToContinue: {
    english: 'Sign in to continue',
    arabic: 'سجل دخولك للمتابعة'
  },
  domain: {
    english: 'Domain',
    arabic: 'النطاق'
  },
  email: {
    english: 'Email',
    arabic: 'البريد الإلكتروني'
  },
  password: {
    english: 'Password',
    arabic: 'كلمة المرور'
  },
  signIn: {
    english: 'Sign In',
    arabic: 'تسجيل الدخول'
  },
  supplier: {
    english: 'Supplier',
    arabic: 'المورد'
  },
  invoiceDate: {
    english: 'Invoice Date',
    arabic: 'تاريخ الفاتورة'
  },
  defaultCustomer: {
    english: 'Default Customer',
    arabic: 'العميل الافتراضي'
  },
  defaultItem: {
    english: 'Default Item',
    arabic: 'العنصر الافتراضي'
  },
  invoiceItems: {
    english: 'Invoice Items',
    arabic: 'عناصر الفاتورة'
  },
  quantity: {
    english: 'Quantity',
    arabic: 'الكمية'
  },
  price: {
    english: 'Price',
    arabic: 'السعر'
  },
  total: {
    english: 'Total',
    arabic: 'المجموع'
  },
  customer: {
    english: 'Customer',
    arabic: 'العميل'
  },
  save: {
    english: 'Save',
    arabic: 'حفظ'
  },
  cancel: {
    english: 'Cancel',
    arabic: 'إلغاء'
  },
  addItem: {
    english: 'Add Item',
    arabic: 'إضافة عنصر'
  },
  newPayment: {
    english: 'New Payment',
    arabic: 'دفعة جديدة'
  },
  amount: {
    english: 'Amount',
    arabic: 'المبلغ'
  },
  paymentDate: {
    english: 'Payment Date',
    arabic: 'تاريخ الدفع'
  },
  details: {
    english: 'Details',
    arabic: 'التفاصيل'
  },
  sendPayment: {
    english: 'Send Payment',
    arabic: 'إرسال الدفعة'
  },
  paymentHistory: {
    english: 'Payment History',
    arabic: 'سجل الدفعات'
  },
  viewAllSupplierPayments: {
    english: 'View all supplier payments',
    arabic: 'عرض جميع دفعات الموردين'
  },
  noPaymentsFound: {
    english: 'No payments found',
    arabic: 'لم يتم العثور على دفعات'
  },
  clearFilters: {
    english: 'Clear Filters',
    arabic: 'مسح الفلاتر'
  },
  filter: {
    english: 'Filter',
    arabic: 'تصفية'
  },
  search: {
    english: 'Search',
    arabic: 'بحث'
  },
  startDate: {
    english: 'Start Date',
    arabic: 'تاريخ البدء'
  },
  endDate: {
    english: 'End Date',
    arabic: 'تاريخ الانتهاء'
  },
  status: {
    english: 'Status',
    arabic: 'الحالة'
  },
  all: {
    english: 'All',
    arabic: 'الكل'
  },
  completed: {
    english: 'Completed',
    arabic: 'مكتمل'
  },
  pending: {
    english: 'Pending',
    arabic: 'قيد الانتظار'
  },
  rejected: {
    english: 'Rejected',
    arabic: 'مرفوض'
  },
  cancelled: {
    english: 'Cancelled',
    arabic: 'ملغي'
  },
  viewDetails: {
    english: 'View details',
    arabic: 'عرض التفاصيل'
  },
  paymentDetails: {
    english: 'Payment Details',
    arabic: 'تفاصيل الدفع'
  },
  back: {
    english: 'Back',
    arabic: 'رجوع'
  },
  description: {
    english: 'Description',
    arabic: 'الوصف'
  },
  invoiceDetails: {
    english: 'Invoice Details',
    arabic: 'تفاصيل الفاتورة'
  },
  editInvoice: {
    english: 'Edit Invoice',
    arabic: 'تعديل الفاتورة'
  },
  item: {
    english: 'Item',
    arabic: 'عنصر'
  },
  adding: {
    english: 'Adding...',
    arabic: 'جاري الإضافة...'
  },
  processing: {
    english: 'Processing...',
    arabic: 'جاري المعالجة...'
  },
  tryAdjustingFilters: {
    english: 'Try adjusting your filters or create a new payment',
    arabic: 'حاول تعديل الفلاتر أو إنشاء دفعة جديدة'
  },
  detailsPlaceholder: {
    english: 'Enter payment details or memo',
    arabic: 'أدخل تفاصيل الدفع أو ملاحظة'
  },
  searchPlaceholder: {
    english: 'Search by supplier, memo, or payment ID...',
    arabic: 'بحث بواسطة المورد أو الملاحظة أو رقم الدفعة...'
  },
  noInvoicesFound: {
    english: 'No invoices found matching your filters.',
    arabic: 'لم يتم العثور على فواتير تطابق الفلاتر الخاصة بك.'
  },
  paymentSaved: {
    english: 'Payment Saved',
    arabic: 'تم حفظ الدفعة'
  },
  locked: {
    english: 'Locked',
    arabic: 'مقفل'
  }
};