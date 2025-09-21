import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MenuIcon, ArrowLeftIcon, CalendarIcon, DollarSignIcon, FileTextIcon, AlertCircleIcon } from 'lucide-react';
import { SideMenu } from '../components/SideMenu';
import { toast, Toaster } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
// Mock payment history data (extended with more details)
const paymentHistory = [{
  id: 1,
  supplierId: 1,
  supplierName: 'Supplier A',
  amount: 1250.0,
  date: '2023-08-15',
  details: 'Monthly inventory payment',
  status: 'completed',
  paymentMethod: 'Bank Transfer',
  referenceNumber: 'REF-2023-08-15-001',
  notes: 'Regular monthly payment for inventory supplies',
  timestamp: '2023-08-15T10:30:45',
  createdBy: 'John Smith',
  address: '123 Business Ave, Suite 101, New York, NY 10001',
  contact: 'contact@suppliera.com',
  relatedInvoices: [{
    id: 101,
    invoiceNumber: 'INV-2023-001',
    amount: 750.0
  }, {
    id: 102,
    invoiceNumber: 'INV-2023-002',
    amount: 500.0
  }]
}, {
  id: 2,
  supplierId: 3,
  supplierName: 'Supplier C',
  amount: 780.5,
  date: '2023-08-10',
  details: 'Office supplies',
  status: 'completed',
  paymentMethod: 'Credit Card',
  referenceNumber: 'REF-2023-08-10-002',
  notes: 'Payment for quarterly office supplies order',
  timestamp: '2023-08-10T14:22:10',
  createdBy: 'Sarah Johnson',
  address: '789 Supply Street, Chicago, IL 60601',
  contact: 'sales@supplierc.com',
  relatedInvoices: [{
    id: 103,
    invoiceNumber: 'INV-2023-015',
    amount: 780.5
  }]
}, {
  id: 3,
  supplierId: 2,
  supplierName: 'Supplier B',
  amount: 2340.75,
  date: '2023-08-05',
  details: 'Equipment purchase',
  status: 'completed',
  paymentMethod: 'Bank Transfer',
  referenceNumber: 'REF-2023-08-05-003',
  notes: 'Payment for new manufacturing equipment',
  timestamp: '2023-08-05T09:15:30',
  createdBy: 'Michael Brown',
  address: '456 Manufacturing Blvd, Dallas, TX 75201',
  contact: 'accounts@supplierb.com',
  relatedInvoices: [{
    id: 104,
    invoiceNumber: 'INV-2023-022',
    amount: 2340.75
  }]
}, {
  id: 4,
  supplierId: 1,
  supplierName: 'Supplier A',
  amount: 450.25,
  date: '2023-07-28',
  details: 'Maintenance services',
  status: 'completed',
  paymentMethod: 'Check',
  referenceNumber: 'REF-2023-07-28-004',
  notes: 'Payment for monthly equipment maintenance',
  timestamp: '2023-07-28T11:45:20',
  createdBy: 'John Smith',
  address: '123 Business Ave, Suite 101, New York, NY 10001',
  contact: 'contact@suppliera.com',
  relatedInvoices: [{
    id: 105,
    invoiceNumber: 'INV-2023-030',
    amount: 450.25
  }]
}, {
  id: 5,
  supplierId: 3,
  supplierName: 'Supplier C',
  amount: 1875.0,
  date: '2023-07-20',
  details: 'Raw materials',
  status: 'completed',
  paymentMethod: 'Bank Transfer',
  referenceNumber: 'REF-2023-07-20-005',
  notes: 'Payment for raw materials delivery',
  timestamp: '2023-07-20T13:10:05',
  createdBy: 'Sarah Johnson',
  address: '789 Supply Street, Chicago, IL 60601',
  contact: 'sales@supplierc.com',
  relatedInvoices: [{
    id: 106,
    invoiceNumber: 'INV-2023-035',
    amount: 1200.0
  }, {
    id: 107,
    invoiceNumber: 'INV-2023-036',
    amount: 675.0
  }]
}, {
  id: 6,
  supplierId: 2,
  supplierName: 'Supplier B',
  amount: 3120.0,
  date: '2023-07-15',
  details: 'Quarterly service contract',
  status: 'pending',
  paymentMethod: 'Bank Transfer',
  referenceNumber: 'REF-2023-07-15-006',
  notes: 'Quarterly payment for service contract - awaiting approval',
  timestamp: '2023-07-15T15:30:00',
  createdBy: 'Michael Brown',
  address: '456 Manufacturing Blvd, Dallas, TX 75201',
  contact: 'accounts@supplierb.com',
  relatedInvoices: [{
    id: 108,
    invoiceNumber: 'INV-2023-040',
    amount: 3120.0
  }]
}, {
  id: 7,
  supplierId: 1,
  supplierName: 'Supplier A',
  amount: 980.0,
  date: '2023-07-08',
  details: 'Emergency repair',
  status: 'rejected',
  paymentMethod: 'Credit Card',
  referenceNumber: 'REF-2023-07-08-007',
  notes: 'Payment rejected due to incorrect invoice amount',
  timestamp: '2023-07-08T08:20:15',
  createdBy: 'John Smith',
  address: '123 Business Ave, Suite 101, New York, NY 10001',
  contact: 'contact@suppliera.com',
  relatedInvoices: [{
    id: 109,
    invoiceNumber: 'INV-2023-045',
    amount: 980.0
  }]
}, {
  id: 8,
  supplierId: 3,
  supplierName: 'Supplier C',
  amount: 1250.0,
  date: '2023-07-05',
  details: 'Monthly subscription',
  status: 'pending',
  paymentMethod: 'Bank Transfer',
  referenceNumber: 'REF-2023-07-05-008',
  notes: 'Monthly subscription payment - processing',
  timestamp: '2023-07-05T10:05:30',
  createdBy: 'Sarah Johnson',
  address: '789 Supply Street, Chicago, IL 60601',
  contact: 'sales@supplierc.com',
  relatedInvoices: [{
    id: 110,
    invoiceNumber: 'INV-2023-050',
    amount: 1250.0
  }]
}];
export function PaymentDetailsPage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<any>(null);
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
    const fetchPayment = async () => {
      setLoading(true);
      try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 800));
        const paymentId = parseInt(id as string);
        if (isNaN(paymentId)) {
          throw new Error('Invalid payment ID');
        }
        const foundPayment = paymentHistory.find(payment => payment.id === paymentId);
        if (!foundPayment) {
          throw new Error('Payment not found');
        }
        setPayment(foundPayment);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        toast.error(err.message || 'Failed to load payment details');
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();
  }, [id]);
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const formatTime = (timeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Date(timeString).toLocaleTimeString(undefined, options);
  };
  // Helper function to get status display text and color
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          text: 'Completed',
          className: 'bg-green-100 text-green-800'
        };
      case 'pending':
        return {
          text: 'Pending',
          className: 'bg-yellow-100 text-yellow-800'
        };
      case 'rejected':
        return {
          text: 'Rejected',
          className: 'bg-red-100 text-red-800'
        };
      case 'cancelled':
        return {
          text: 'Cancelled',
          className: 'bg-gray-100 text-gray-800'
        };
      default:
        return {
          text: status.charAt(0).toUpperCase() + status.slice(1),
          className: 'bg-gray-100 text-gray-800'
        };
    }
  };
  const handlePrint = () => {
    toast.success('Printing payment details...');
    // In a real app, this would trigger a print dialog
  };
  const handleDownload = () => {
    toast.success('Downloading payment receipt...');
    // In a real app, this would download a PDF receipt
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
          <button onClick={() => navigate('/supplier-payments')} className="mr-3 text-gray-500 hover:text-gray-700" aria-label="Back to payments list">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-medium">{t('paymentDetails')}</h1>
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
            </div>
          </div> : error ?
      // Error State
      <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-500 mb-4">
              <AlertCircleIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error Loading Payment
            </h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button onClick={() => navigate('/supplier-payments')} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700">
              {t('back')}
            </button>
          </div> :
      // Payment Details - Only the header card
      <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {payment.referenceNumber}
                </h2>
                <p className="text-gray-600">{payment.supplierName}</p>
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusDisplay(payment.status).className}`}>
                {getStatusDisplay(payment.status).text}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="flex items-center">
                <DollarSignIcon className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-gray-500 text-sm">{t('amount')}</p>
                  <p className="font-semibold text-lg">
                    ${payment.amount.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-gray-500 text-sm">{t('paymentDate')}</p>
                  <p className="font-medium">{formatDate(payment.date)}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FileTextIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-gray-500 text-sm">{t('description')}</p>
                  <p className="font-medium break-words">{payment.details}</p>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>;
}