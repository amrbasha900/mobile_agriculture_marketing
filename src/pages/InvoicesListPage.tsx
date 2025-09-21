import React, { useEffect, useState, useRef, Component } from 'react';
import { ArrowLeftIcon, FilterIcon, ChevronDownIcon, CalendarIcon, PlusIcon, ChevronRightIcon, MenuIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SideMenu } from '../components/SideMenu';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
// Mock invoice data
const mockInvoices = [{
  id: 1,
  invoiceNumber: 'INV-2023-001',
  supplierId: 1,
  supplierName: 'Supplier A',
  date: '2023-06-15',
  amount: 1250.75
}, {
  id: 2,
  invoiceNumber: 'INV-2023-002',
  supplierId: 2,
  supplierName: 'Supplier B',
  date: '2023-06-18',
  amount: 845.5
}, {
  id: 3,
  invoiceNumber: 'INV-2023-003',
  supplierId: 1,
  supplierName: 'Supplier A',
  date: '2023-06-20',
  amount: 2340.0
}, {
  id: 4,
  invoiceNumber: 'INV-2023-004',
  supplierId: 3,
  supplierName: 'Supplier C',
  date: '2023-06-22',
  amount: 1100.25
}, {
  id: 5,
  invoiceNumber: 'INV-2023-005',
  supplierId: 2,
  supplierName: 'Supplier B',
  date: '2023-06-25',
  amount: 750.0
}, {
  id: 6,
  invoiceNumber: 'INV-2023-006',
  supplierId: 3,
  supplierName: 'Supplier C',
  date: '2023-06-28',
  amount: 3200.5
}, {
  id: 7,
  invoiceNumber: 'INV-2023-007',
  supplierId: 1,
  supplierName: 'Supplier A',
  date: '2023-07-02',
  amount: 980.75
}, {
  id: 8,
  invoiceNumber: 'INV-2023-008',
  supplierId: 2,
  supplierName: 'Supplier B',
  date: '2023-07-05',
  amount: 1450.0
}, {
  id: 9,
  invoiceNumber: 'INV-2023-009',
  supplierId: 3,
  supplierName: 'Supplier C',
  date: '2023-07-08',
  amount: 675.25
}, {
  id: 10,
  invoiceNumber: 'INV-2023-010',
  supplierId: 1,
  supplierName: 'Supplier A',
  date: '2023-07-10',
  amount: 2100.0
}];
// List of suppliers for filtering
const suppliers = [{
  id: 0,
  name: 'All Suppliers'
}, {
  id: 1,
  name: 'Supplier A'
}, {
  id: 2,
  name: 'Supplier B'
}, {
  id: 3,
  name: 'Supplier C'
}];
export function InvoicesListPage() {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {
    isRTL
  } = useLanguage();
  const {
    t
  } = useTranslation();
  const applyFilters = () => {
    let filteredInvoices = [...mockInvoices];
    // Filter by date range
    if (startDate) {
      filteredInvoices = filteredInvoices.filter(invoice => invoice.date >= startDate);
    }
    if (endDate) {
      filteredInvoices = filteredInvoices.filter(invoice => invoice.date <= endDate);
    }
    // Filter by supplier
    if (selectedSupplier !== 0) {
      filteredInvoices = filteredInvoices.filter(invoice => invoice.supplierId === selectedSupplier);
    }
    setInvoices(filteredInvoices);
  };
  const resetFilters = () => {
    setStartDate('');
    setEndDate('');
    setSelectedSupplier(0);
    setInvoices(mockInvoices);
  };
  useEffect(() => {
    // Apply filters whenever filter values change
    applyFilters();
  }, [startDate, endDate, selectedSupplier]);
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleViewDetails = (invoiceId: number) => {
    navigate(`/invoices/${invoiceId}`);
  };
  return <div className="flex flex-col min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
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

      {/* Header - Updated to remove New Invoice button */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => setIsMenuOpen(true)} className={`${isRTL ? 'ml-3' : 'mr-3'}`}>
              <MenuIcon className="h-6 w-6 text-gray-500" />
            </button>
            <h1 className="text-lg font-medium">{t('invoicesList')}</h1>
          </div>
          <button className="flex items-center text-gray-600 px-3 py-2 rounded-lg border border-gray-300" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <FilterIcon className={`h-5 w-5 ${isRTL ? 'ml-1' : 'mr-1'}`} />
            <span>{t('filter')}</span>
            <ChevronDownIcon className={`h-4 w-4 ${isRTL ? 'mr-1' : 'ml-1'} transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && <div className="bg-white px-4 py-3 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('startDate')}
              </label>
              <div className="relative">
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="block w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                <div className={`absolute inset-y-0 ${isRTL ? 'left-0' : 'right-0'} flex items-center ${isRTL ? 'pl-3' : 'pr-3'} pointer-events-none`}>
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('endDate')}
              </label>
              <div className="relative">
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="block w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                <div className={`absolute inset-y-0 ${isRTL ? 'left-0' : 'right-0'} flex items-center ${isRTL ? 'pl-3' : 'pr-3'} pointer-events-none`}>
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('supplier')}
            </label>
            <select value={selectedSupplier} onChange={e => setSelectedSupplier(Number(e.target.value))} className="block w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500">
              {suppliers.map(supplier => <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>)}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={resetFilters} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              {t('clearFilters')}
            </button>
            <button onClick={applyFilters} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-lg hover:from-cyan-600 hover:to-indigo-700">
              {t('filter')}
            </button>
          </div>
        </div>}

      {/* Main Content - Invoices List */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow">
          {/* Mobile-friendly card layout */}
          <div className="divide-y divide-gray-200">
            {invoices.length > 0 ? invoices.map(invoice => <div key={invoice.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-cyan-600">
                      {invoice.invoiceNumber}
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        ${invoice.amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm text-gray-700">
                      {invoice.supplierName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(invoice.date)}
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Link to={`/invoices/${invoice.id}`} className="text-cyan-600 hover:text-cyan-800 flex items-center text-sm" aria-label={`View details for ${invoice.invoiceNumber}`}>
                      {t('viewDetails')}
                      <ChevronRightIcon className={`h-4 w-4 ${isRTL ? 'mr-1' : 'ml-1'}`} />
                    </Link>
                  </div>
                </div>) : <div className="p-8 text-center">
                <p className="text-gray-500">{t('noInvoicesFound')}</p>
              </div>}
          </div>
        </div>
      </div>

      {/* Sticky Edge Button for New Invoice */}
      <EdgeButton isRTL={isRTL} t={t} />
    </div>;
}
// Edge Button Component for New Invoice
function EdgeButton({
  isRTL,
  t
}: {
  isRTL: boolean;
  t: (key: string) => string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setIsExpanded(true);
  };
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setIsExpanded(false);
    }, 1500); // 1.5 seconds delay before sliding back
  };
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return <div className={`fixed ${isRTL ? 'left-0' : 'right-0'} top-1/2 transform -translate-y-1/2 z-20`}>
      {/* Invisible extended touch target for better accessibility */}
      <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-[32px] cursor-pointer`} style={{
      [isRTL ? 'left' : 'right']: isExpanded ? '100%' : 'calc(100% - 12px)'
    }} onMouseEnter={handleMouseEnter} onTouchStart={handleMouseEnter} />
      <Link to="/new-invoice" className="flex items-center h-14 bg-gradient-to-r from-cyan-500 to-indigo-600 
                   text-white shadow-md focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-cyan-500" aria-label="Create new invoice" style={{
      borderRadius: isRTL ? '0 14px 14px 0' : '14px 0 0 14px',
      paddingLeft: '20px',
      paddingRight: '20px',
      transform: isExpanded ? 'translateX(0)' : `translateX(calc(${isRTL ? '-' : ''}100% - 12px))`,
      transition: 'transform 220ms ease-out',
      touchAction: 'manipulation',
      paddingRight: isRTL ? '20px' : `calc(20px + env(safe-area-inset-right, 0px))`,
      paddingLeft: isRTL ? `calc(20px + env(safe-area-inset-left, 0px))` : '20px',
      minWidth: '140px'
    }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onTouchStart={handleMouseEnter} onTouchEnd={handleMouseLeave}>
        <PlusIcon className="h-6 w-6 min-w-[24px]" />
        <span className={`${isRTL ? 'mr-2' : 'ml-2'} whitespace-nowrap font-medium`} style={{
        opacity: isExpanded ? 1 : 0,
        transition: 'opacity 200ms ease-out',
        transitionDelay: isExpanded ? '50ms' : '0ms'
      }}>
          {t('newInvoice')}
        </span>
      </Link>
    </div>;
}