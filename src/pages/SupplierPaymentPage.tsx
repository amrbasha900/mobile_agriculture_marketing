import React, { useCallback, useEffect, useState, useRef, memo, Component } from 'react';
import { ArrowLeftIcon, ChevronDownIcon, XIcon, SendIcon, DollarSignIcon, PlusIcon, CalendarIcon, ChevronRightIcon, MenuIcon, SearchIcon, FilterIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SideMenu } from '../components/SideMenu';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
// Mock supplier data
const suppliers = [{
  id: 1,
  name: 'Supplier A'
}, {
  id: 2,
  name: 'Supplier B'
}, {
  id: 3,
  name: 'Supplier C'
}];
// Mock payment history data
const paymentHistory = [{
  id: 1,
  supplierId: 1,
  supplierName: 'Supplier A',
  amount: 1250.0,
  date: '2023-08-15',
  details: 'Monthly inventory payment',
  status: 'completed'
}, {
  id: 2,
  supplierId: 3,
  supplierName: 'Supplier C',
  amount: 780.5,
  date: '2023-08-10',
  details: 'Office supplies',
  status: 'completed'
}, {
  id: 3,
  supplierId: 2,
  supplierName: 'Supplier B',
  amount: 2340.75,
  date: '2023-08-05',
  details: 'Equipment purchase',
  status: 'completed'
}, {
  id: 4,
  supplierId: 1,
  supplierName: 'Supplier A',
  amount: 450.25,
  date: '2023-07-28',
  details: 'Maintenance services',
  status: 'completed'
}, {
  id: 5,
  supplierId: 3,
  supplierName: 'Supplier C',
  amount: 1875.0,
  date: '2023-07-20',
  details: 'Raw materials',
  status: 'completed'
}, {
  id: 6,
  supplierId: 2,
  supplierName: 'Supplier B',
  amount: 3120.0,
  date: '2023-07-15',
  details: 'Quarterly service contract',
  status: 'pending'
}, {
  id: 7,
  supplierId: 1,
  supplierName: 'Supplier A',
  amount: 980.0,
  date: '2023-07-08',
  details: 'Emergency repair',
  status: 'rejected'
}, {
  id: 8,
  supplierId: 3,
  supplierName: 'Supplier C',
  amount: 1250.0,
  date: '2023-07-05',
  details: 'Monthly subscription',
  status: 'pending'
}];
// Status options for filtering
const statusOptions = [{
  id: 'all',
  label: 'All'
}, {
  id: 'completed',
  label: 'Completed'
}, {
  id: 'pending',
  label: 'Pending'
}, {
  id: 'rejected',
  label: 'Rejected'
}, {
  id: 'cancelled',
  label: 'Cancelled'
}];
// Searchable Select Component
interface SearchableSelectProps {
  options: Array<{
    id: number | string;
    name?: string;
    label?: string;
  }>;
  value: number | string;
  onChange: (value: number | string) => void;
  placeholder: string;
  isRTL?: boolean;
}
function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  isRTL = false
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(option => option.id === value);
  const optionLabel = selectedOption ? selectedOption.name || selectedOption.label : placeholder;
  const filteredOptions = options.filter(option => {
    const label = option.name || option.label || '';
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  });
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleSelect = (optionId: number | string) => {
    onChange(optionId);
    setIsOpen(false);
    setSearchTerm('');
  };
  return <div className="relative" ref={dropdownRef}>
      <div className="flex justify-between items-center w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 cursor-pointer bg-white" onClick={() => setIsOpen(!isOpen)}>
        <div className="truncate">{optionLabel}</div>
        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
      </div>
      {isOpen && <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200">
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <SearchIcon className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400`} />
              <input type="text" className={`w-full ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 text-sm`} placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onClick={e => e.stopPropagation()} />
              {searchTerm && <button type="button" className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2`} onClick={e => {
            e.stopPropagation();
            setSearchTerm('');
          }}>
                  <XIcon className="h-4 w-4 text-gray-400" />
                </button>}
            </div>
          </div>
          <div className="max-h-60 overflow-auto py-1">
            {filteredOptions.length > 0 ? filteredOptions.map(option => <div key={option.id} className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm" onClick={e => {
          e.stopPropagation();
          handleSelect(option.id);
        }}>
                  {option.name || option.label}
                </div>) : <div className="px-3 py-2 text-gray-500 text-sm">
                No results found
              </div>}
          </div>
        </div>}
    </div>;
}
export function SupplierPaymentPage() {
  const navigate = useNavigate();
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [supplier, setSupplier] = useState<number | ''>('');
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [payments, setPayments] = useState(paymentHistory);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isRTL
  } = useLanguage();
  const {
    t
  } = useTranslation();
  // Filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<number | string>(0);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [filteredPayments, setFilteredPayments] = useState(paymentHistory);
  // Debounced search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);
  // Apply filters
  useEffect(() => {
    let result = [...payments];
    // Filter by search term
    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter(payment => payment.supplierName.toLowerCase().includes(term) || payment.details.toLowerCase().includes(term) || payment.id.toString().includes(term));
    }
    // Filter by date range
    if (startDate) {
      result = result.filter(payment => payment.date >= startDate);
    }
    if (endDate) {
      result = result.filter(payment => payment.date <= endDate);
    }
    // Filter by supplier
    if (selectedSupplier !== 0) {
      result = result.filter(payment => payment.supplierId === Number(selectedSupplier));
    }
    // Filter by status
    if (selectedStatus !== 'all') {
      result = result.filter(payment => payment.status === selectedStatus);
    }
    setFilteredPayments(result);
  }, [debouncedSearchTerm, startDate, endDate, selectedSupplier, selectedStatus, payments]);
  const resetFilters = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    setSelectedSupplier(0);
    setSelectedStatus('all');
  };
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimals
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };
  // Helper function to get status display text and color
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          text: t('completed'),
          className: 'bg-green-100 text-green-800'
        };
      case 'pending':
        return {
          text: t('pending'),
          className: 'bg-yellow-100 text-yellow-800'
        };
      case 'rejected':
        return {
          text: t('rejected'),
          className: 'bg-red-100 text-red-800'
        };
      case 'cancelled':
        return {
          text: t('cancelled'),
          className: 'bg-gray-100 text-gray-800'
        };
      default:
        return {
          text: status.charAt(0).toUpperCase() + status.slice(1),
          className: 'bg-gray-100 text-gray-800'
        };
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (!supplier) {
      alert('Please select a supplier');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }
    // Show submitting state
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const newPayment = {
        id: payments.length + 1,
        supplierId: Number(supplier),
        supplierName: suppliers.find(s => s.id === Number(supplier))?.name || '',
        amount: parseFloat(amount),
        date: paymentDate,
        details: details,
        status: 'completed'
      };
      // Add the new payment to the list
      setPayments([newPayment, ...payments]);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form after success
      setTimeout(() => {
        setSupplier('');
        setAmount('');
        setDetails('');
        setPaymentDate(new Date().toISOString().split('T')[0]);
        setSubmitSuccess(false);
        setIsCreatingPayment(false);
      }, 2000);
    }, 1000);
  };
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

      {/* Header with Menu Icon */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => setIsMenuOpen(true)} className={`${isRTL ? 'ml-3' : 'mr-3'}`}>
              <MenuIcon className="h-6 w-6 text-gray-500" />
            </button>
            <h1 className="text-lg font-medium">
              {isCreatingPayment ? t('newPayment') : t('supplierPayments')}
            </h1>
          </div>
          {!isCreatingPayment && <button className="flex items-center text-gray-600 px-3 py-2 rounded-lg border border-gray-300" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <FilterIcon className={`h-5 w-5 ${isRTL ? 'ml-1' : 'mr-1'}`} />
              <span>{t('filter')}</span>
              <ChevronDownIcon className={`h-4 w-4 ${isRTL ? 'mr-1' : 'ml-1'} transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`} />
            </button>}
          {isCreatingPayment && submitSuccess && <div className="text-green-500 flex items-center">
              <svg className={`h-5 w-5 ${isRTL ? 'ml-1' : 'mr-1'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{t('paymentSaved')}</span>
            </div>}
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && !isCreatingPayment && <div className="bg-white px-4 py-3 border-b border-gray-200 sticky top-0 z-10">
          <div className="mb-4">
            <div className="relative">
              <SearchIcon className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400`} />
              <input type="text" placeholder={t('searchPlaceholder')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className={`block w-full rounded-lg border border-gray-300 py-2 ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} shadow-sm focus:border-cyan-500 focus:ring-cyan-500`} />
            </div>
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('supplier')}
              </label>
              <SearchableSelect options={[{
            id: 0,
            name: t('all')
          }, ...suppliers]} value={selectedSupplier} onChange={value => setSelectedSupplier(value)} placeholder={t('supplier')} isRTL={isRTL} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('status')}
              </label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map(status => <button key={status.id} onClick={() => setSelectedStatus(status.id)} className={`px-3 py-1 rounded-full text-sm font-medium ${selectedStatus === status.id ? 'bg-cyan-100 text-cyan-800 border-2 border-cyan-300' : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'}`}>
                    {t(status.id as 'all' | 'completed' | 'pending' | 'rejected' | 'cancelled')}
                  </button>)}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={resetFilters} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              {t('clearFilters')}
            </button>
            <button onClick={() => setIsFilterOpen(false)} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-lg hover:from-cyan-600 hover:to-indigo-700">
              {t('filter')}
            </button>
          </div>
        </div>}

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto pb-20">
        {isCreatingPayment ? <div className="bg-white rounded-lg shadow p-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('supplier')}
                  </label>
                  <SearchableSelect options={suppliers} value={supplier} onChange={value => setSupplier(value as number)} placeholder={t('supplier')} isRTL={isRTL} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('amount')}
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                      <DollarSignIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" value={amount} onChange={handleAmountChange} className={`${isRTL ? 'pr-10' : 'pl-10'} block w-full rounded-lg border border-gray-300 py-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500`} placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('paymentDate')}
                  </label>
                  <div className="relative">
                    <input type="date" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} className="block w-full rounded-lg border border-gray-300 py-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                    <div className={`absolute inset-y-0 ${isRTL ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none`}>
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('details')}
                  </label>
                  <textarea value={details} onChange={e => setDetails(e.target.value)} rows={4} className="block w-full rounded-lg border border-gray-300 py-3 px-4 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" placeholder={t('detailsPlaceholder')}></textarea>
                </div>
                <div className="flex justify-between pt-4">
                  <button type="button" onClick={() => setIsCreatingPayment(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    {t('cancel')}
                  </button>
                  <button type="submit" disabled={isSubmitting} className={`px-4 py-2 rounded-lg text-white ${isSubmitting ? 'bg-gray-400' : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700'}`}>
                    {isSubmitting ? <div className="flex items-center">
                        <svg className={`animate-spin ${isRTL ? 'ml-1 mr-2' : '-ml-1 mr-2'} h-4 w-4 text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('processing')}
                      </div> : <div className="flex items-center">
                        <SendIcon className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                        {t('sendPayment')}
                      </div>}
                  </button>
                </div>
              </div>
            </form>
          </div> : <div>
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                {t('paymentHistory')}
              </h2>
              <p className="text-sm text-gray-500">
                {t('viewAllSupplierPayments')}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {filteredPayments.length > 0 ? <div className="divide-y divide-gray-200">
                  {filteredPayments.map(payment => <div key={payment.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">
                          {payment.supplierName}
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            ${payment.amount.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(payment.date)}
                          </div>
                        </div>
                      </div>
                      {payment.details && <div className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {payment.details}
                        </div>}
                      <div className="flex justify-between items-center mt-2">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusDisplay(payment.status).className}`}>
                          {getStatusDisplay(payment.status).text}
                        </div>
                        <button onClick={() => navigate(`/payments/${payment.id}`)} className="text-cyan-600 hover:text-cyan-800 flex items-center text-sm">
                          {t('viewDetails')}
                          <ChevronRightIcon className={`h-4 w-4 ${isRTL ? 'mr-1' : 'ml-1'}`} />
                        </button>
                      </div>
                    </div>)}
                </div> : <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 text-gray-400 mb-4">
                    <DollarSignIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {t('noPaymentsFound')}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {t('tryAdjustingFilters')}
                  </p>
                  <button onClick={resetFilters} className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 mr-2">
                    {t('clearFilters')}
                  </button>
                  <button onClick={() => setIsCreatingPayment(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700">
                    <PlusIcon className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                    {t('newPayment')}
                  </button>
                </div>}
            </div>
          </div>}
      </div>

      {/* Edge Button for New Payment - Only show when not creating a payment */}
      {!isCreatingPayment && <EdgeButton onButtonClick={() => setIsCreatingPayment(true)} isRTL={isRTL} t={t} />}
    </div>;
}
// Edge Button Component for New Payment
function EdgeButton({
  onButtonClick,
  isRTL,
  t
}: {
  onButtonClick: () => void;
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
      <button onClick={onButtonClick} className="flex items-center h-14 bg-gradient-to-r from-cyan-500 to-indigo-600 
                 text-white shadow-md focus:outline-none focus:ring-2 
                 focus:ring-offset-2 focus:ring-cyan-500" aria-label="Create new payment" style={{
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
          {t('newPayment')}
        </span>
      </button>
    </div>;
}