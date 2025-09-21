import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MenuIcon, ArrowLeftIcon, CalendarIcon, FileTextIcon, EditIcon, LockIcon, AlertCircleIcon, UserIcon } from 'lucide-react';
import { SideMenu } from '../components/SideMenu';
import { toast, Toaster } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
// Mock invoice data (expanded with more details and added is_locked field)
const mockInvoices = [{
  id: 1,
  invoiceNumber: 'INV-2023-001',
  supplierId: 1,
  supplierName: 'Supplier A',
  date: '2023-06-15',
  amount: 1250.75,
  status: 'paid',
  is_locked: false,
  items: [{
    id: 1,
    name: 'Product A',
    quantity: 5,
    price: 100.0,
    total: 500.0,
    customerId: 1,
    customerName: 'Customer 1'
  }, {
    id: 2,
    name: 'Service B',
    quantity: 3,
    price: 250.25,
    total: 750.75,
    customerId: 2,
    customerName: 'Customer 2'
  }],
  tax: 0,
  payments: [{
    id: 1,
    date: '2023-06-30',
    amount: 1250.75,
    method: 'Bank Transfer'
  }],
  notes: 'Delivered on time'
}, {
  id: 2,
  invoiceNumber: 'INV-2023-002',
  supplierId: 2,
  supplierName: 'Supplier B',
  date: '2023-06-18',
  amount: 845.5,
  status: 'pending',
  is_locked: true,
  items: [{
    id: 3,
    name: 'Hardware C',
    quantity: 2,
    price: 422.75,
    total: 845.5,
    customerId: 3,
    customerName: 'Customer 3'
  }],
  tax: 0,
  payments: [],
  notes: 'Awaiting delivery'
}, {
  id: 3,
  invoiceNumber: 'INV-2023-003',
  supplierId: 1,
  supplierName: 'Supplier A',
  date: '2023-06-20',
  amount: 2340.0,
  status: 'paid',
  is_locked: false,
  items: [{
    id: 4,
    name: 'Product D',
    quantity: 10,
    price: 200.0,
    total: 2000.0,
    customerId: 1,
    customerName: 'Customer 1'
  }, {
    id: 5,
    name: 'Service E',
    quantity: 1,
    price: 340.0,
    total: 340.0,
    customerId: 4,
    customerName: 'Customer 4'
  }],
  tax: 0,
  payments: [{
    id: 2,
    date: '2023-07-01',
    amount: 2340.0,
    method: 'Credit Card'
  }],
  notes: 'Priority order'
}, {
  id: 4,
  invoiceNumber: 'INV-2023-004',
  supplierId: 3,
  supplierName: 'Supplier C',
  date: '2023-06-22',
  amount: 1100.25,
  status: 'overdue',
  is_locked: true,
  items: [{
    id: 6,
    name: 'Product F',
    quantity: 5,
    price: 220.05,
    total: 1100.25,
    customerId: 2,
    customerName: 'Customer 2'
  }],
  tax: 0,
  payments: [],
  notes: 'Second reminder sent'
}, {
  id: 5,
  invoiceNumber: 'INV-2023-005',
  supplierId: 2,
  supplierName: 'Supplier B',
  date: '2023-06-25',
  amount: 750.0,
  status: 'paid',
  is_locked: false,
  items: [{
    id: 7,
    name: 'Service G',
    quantity: 3,
    price: 250.0,
    total: 750.0,
    customerId: 3,
    customerName: 'Customer 3'
  }],
  tax: 0,
  payments: [{
    id: 3,
    date: '2023-07-10',
    amount: 750.0,
    method: 'Bank Transfer'
  }],
  notes: ''
}, {
  id: 6,
  invoiceNumber: 'INV-2023-006',
  supplierId: 3,
  supplierName: 'Supplier C',
  date: '2023-06-28',
  amount: 3200.5,
  status: 'pending',
  is_locked: false,
  items: [{
    id: 8,
    name: 'Hardware H',
    quantity: 2,
    price: 1200.25,
    total: 2400.5,
    customerId: 1,
    customerName: 'Customer 1'
  }, {
    id: 9,
    name: 'Service I',
    quantity: 4,
    price: 200.0,
    total: 800.0,
    customerId: 4,
    customerName: 'Customer 4'
  }],
  tax: 0,
  payments: [],
  notes: 'Partial delivery expected'
}, {
  id: 7,
  invoiceNumber: 'INV-2023-007',
  supplierId: 1,
  supplierName: 'Supplier A',
  date: '2023-07-02',
  amount: 980.75,
  status: 'pending',
  is_locked: false,
  items: [{
    id: 10,
    name: 'Product J',
    quantity: 7,
    price: 140.11,
    total: 980.75,
    customerId: 2,
    customerName: 'Customer 2'
  }],
  tax: 0,
  payments: [],
  notes: ''
}, {
  id: 8,
  invoiceNumber: 'INV-2023-008',
  supplierId: 2,
  supplierName: 'Supplier B',
  date: '2023-07-05',
  amount: 1450.0,
  status: 'paid',
  is_locked: true,
  items: [{
    id: 11,
    name: 'Service K',
    quantity: 5,
    price: 290.0,
    total: 1450.0,
    customerId: 3,
    customerName: 'Customer 3'
  }],
  tax: 0,
  payments: [{
    id: 4,
    date: '2023-07-15',
    amount: 1450.0,
    method: 'Credit Card'
  }],
  notes: 'Expedited service'
}, {
  id: 9,
  invoiceNumber: 'INV-2023-009',
  supplierId: 3,
  supplierName: 'Supplier C',
  date: '2023-07-08',
  amount: 675.25,
  status: 'pending',
  is_locked: false,
  items: [{
    id: 12,
    name: 'Product L',
    quantity: 3,
    price: 225.08,
    total: 675.25,
    customerId: 1,
    customerName: 'Customer 1'
  }],
  tax: 0,
  payments: [],
  notes: ''
}, {
  id: 10,
  invoiceNumber: 'INV-2023-010',
  supplierId: 1,
  supplierName: 'Supplier A',
  date: '2023-07-10',
  amount: 2100.0,
  status: 'pending',
  is_locked: false,
  items: [{
    id: 13,
    name: 'Hardware M',
    quantity: 6,
    price: 350.0,
    total: 2100.0,
    customerId: 4,
    customerName: 'Customer 4'
  }],
  tax: 0,
  payments: [],
  notes: 'Bulk order discount applied'
}];
export function InvoiceDetailsPage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    isRTL
  } = useLanguage();
  const {
    t
  } = useTranslation();
  useEffect(() => {
    // Simulate API fetch with a delay
    const fetchInvoice = async () => {
      setLoading(true);
      try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        const invoiceId = parseInt(id as string);
        if (isNaN(invoiceId)) {
          throw new Error('Invalid invoice ID');
        }
        const foundInvoice = mockInvoices.find(inv => inv.id === invoiceId);
        if (!foundInvoice) {
          throw new Error('Invoice not found');
        }
        setInvoice(foundInvoice);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        toast.error(err.message || 'Failed to load invoice');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleEditInvoice = () => {
    if (invoice && !invoice.is_locked) {
      navigate(`/invoices/${invoice.id}/edit`);
    }
  };
  return <div className="flex flex-col min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <Toaster position="top-center" />
      {/* Side Menu */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      {/* Mobile status bar simulation */}
      <div className="bg-white px-4 py-2 flex justify-between items-center">
        <div className="text-xs">9:41 AM</div>
        <div className="flex space-x-1">
          <div className="h-3 w-3">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 9C18 12.3137 15.3137 15 12 15C8.68629 15 6 12.3137 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9Z" fill="currentColor" />
              <path d="M18.7942 20.1284C16.9555 21.3864 14.5929 22 12 22C9.40712 22 7.04455 21.3864 5.20577 20.1284C5.38825 18.8866 7.8166 17 12 17C16.1834 17 18.6118 18.8866 18.7942 20.1284Z" fill="currentColor" />
            </svg>
          </div>
          <div className="h-3 w-3">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M22 7C22 8.65685 20.6569 10 19 10C17.3431 10 16 8.65685 16 7C16 5.34315 17.3431 4 19 4C20.6569 4 22 5.34315 22 7ZM14 7C14 9.76142 16.2386 12 19 12C19.7286 12 20.4117 11.8519 21.0194 11.5903C21.0066 11.7264 21 11.8643 21 12.0036V14.0036C21 14.5533 20.5509 15 20 15H4C3.44772 15 3 14.5533 3 14.0036V12.0036C3 11.4538 3.44772 11.0072 4 11.0072H14.1537C14.0546 10.6887 14 10.3503 14 10C14 9.29577 14.1654 8.62291 14.4662 8.02208C14.1727 7.46968 14 6.83518 14 6.15553V4.98386C14 2.23373 16.2319 0 19 0C21.7681 0 24 2.23373 24 4.98386V6.15553C24 6.83518 23.8273 7.46968 23.5338 8.02208C23.8346 8.62291 24 9.29577 24 10C24 10.3503 23.9454 10.6887 23.8463 11.0072H27C27.5523 11.0072 28 11.4538 28 12.0036V14.0036C28 14.5533 27.5523 15 27 15H24V20.0036C24 20.5533 23.5523 21 23 21H1C0.447715 21 0 20.5533 0 20.0036V15H3V21H21V15H18.9806C19.3163 14.4305 19.5 13.7736 19.5 13.0699C19.5 11.7938 18.8693 10.6622 17.9059 9.94363C18.5307 9.09044 19 8.09813 19 7H14Z" fill="currentColor" />
            </svg>
          </div>
          <div className="h-3 w-5">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="6" width="20" height="12" rx="2" fill="currentColor" />
              <rect x="4" y="8" width="16" height="8" rx="1" fill="white" />
            </svg>
          </div>
        </div>
      </div>
      {/* Header with Back Button */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <button onClick={() => setIsMenuOpen(true)} className="mr-3">
            <MenuIcon className="h-6 w-6 text-gray-500" />
          </button>
          <button onClick={() => navigate('/invoices-list')} className="mr-3 text-gray-500 hover:text-gray-700" aria-label="Back to invoices list">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-medium">{t('invoiceDetails')}</h1>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {loading ?
      // Skeleton Loader
      <div className="bg-white rounded-lg shadow p-4">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div> : error ?
      // Error State
      <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-500 mb-4">
              <AlertCircleIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error Loading Invoice
            </h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button onClick={() => navigate('/invoices-list')} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700">
              {t('back')}
            </button>
          </div> :
      // Invoice Details
      <div className="space-y-4">
            {/* Invoice Header */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {invoice.invoiceNumber}
                  </h2>
                  <p className="text-gray-600">{invoice.supplierName}</p>
                </div>
                <div className="text-right">
                  {invoice.is_locked ? <div className="flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded-full" title="This invoice is locked and cannot be edited">
                      <LockIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{t('locked')}</span>
                    </div> : <button onClick={handleEditInvoice} className="flex items-center bg-gradient-to-r from-cyan-500 to-indigo-600 text-white px-3 py-1 rounded-lg hover:from-cyan-600 hover:to-indigo-700">
                      <EditIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">
                        {t('editInvoice')}
                      </span>
                    </button>}
                </div>
              </div>
              <div>
                <p className="text-gray-500">{t('invoiceDate')}</p>
                <p className="font-medium flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                  {formatDate(invoice.date)}
                </p>
              </div>
            </div>
            {/* Invoice Items */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-800 flex items-center">
                  <FileTextIcon className="h-4 w-4 mr-2 text-gray-500" />
                  {t('invoiceItems')}
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {invoice.items.map((item: any) => <div key={item.id} className="p-4">
                    <div className="flex justify-between mb-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="font-semibold">
                        ${item.total.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <div>
                          {item.quantity} × ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-1">
                      <span className="inline-flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                        <UserIcon className="h-3 w-3 mr-1" />
                        {item.customerName}
                      </span>
                    </div>
                  </div>)}
              </div>
              {/* Totals */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                {invoice.tax > 0 && <div className="flex justify-between mb-2">
                    <div className="text-gray-600">Tax</div>
                    <div className="font-medium">${invoice.tax.toFixed(2)}</div>
                  </div>}
                <div className="flex justify-between text-lg font-semibold">
                  <div>{t('total')}</div>
                  <div>${invoice.amount.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>;
}