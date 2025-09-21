import React, { useEffect, useState, useRef, Component } from 'react';
import { CalendarIcon, PlusIcon, ArrowLeftIcon, SaveIcon, XIcon, ChevronDownIcon, TrashIcon, MenuIcon, SearchIcon, LoaderIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SideMenu } from '../components/SideMenu';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
// Mock data for dropdowns
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
const customers = [{
  id: 1,
  name: 'Customer 1'
}, {
  id: 2,
  name: 'Customer 2'
}, {
  id: 3,
  name: 'Customer 3'
}, {
  id: 4,
  name: 'Customer 4'
}];
const items = [{
  id: 1,
  name: 'Item 1',
  price: 100
}, {
  id: 2,
  name: 'Item 2',
  price: 200
}, {
  id: 3,
  name: 'Item 3',
  price: 150
}, {
  id: 4,
  name: 'Item 4',
  price: 300
}];
interface InvoiceItem {
  id: number;
  itemId: number;
  itemName: string;
  quantity: number;
  price: number;
  total: number;
  customerId: number;
  customerName: string;
}
// Searchable Select Component
interface SearchableSelectProps {
  options: Array<{
    id: number;
    name: string;
    price?: number;
  }>;
  value: number | string;
  onChange: (value: number) => void;
  placeholder: string;
  showPrice?: boolean;
  isRTL?: boolean;
}
function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  showPrice = false,
  isRTL = false
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(option => option.id === Number(value));
  const filteredOptions = options.filter(option => option.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
  const handleSelect = (optionId: number) => {
    onChange(optionId);
    setIsOpen(false);
    setSearchTerm('');
  };
  return <div className="relative" ref={dropdownRef}>
      <div className="flex justify-between items-center w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 cursor-pointer bg-white" onClick={() => setIsOpen(!isOpen)}>
        <div className="truncate">
          {selectedOption ? showPrice ? `${selectedOption.name} (${selectedOption.price ? '$' + selectedOption.price : ''})` : selectedOption.name : placeholder}
        </div>
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
                  {showPrice && option.price !== undefined ? `${option.name} ($${option.price})` : option.name}
                </div>) : <div className="px-3 py-2 text-gray-500 text-sm">
                No results found
              </div>}
          </div>
        </div>}
    </div>;
}
export function NewInvoicePage() {
  const [supplier, setSupplier] = useState<number | ''>('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [defaultCustomer, setDefaultCustomer] = useState<number | ''>('');
  const [defaultItem, setDefaultItem] = useState<number | ''>('');
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([{
    id: 1,
    itemId: 0,
    itemName: '',
    quantity: 1,
    price: 0,
    total: 0,
    customerId: 0,
    customerName: ''
  }]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isRTL
  } = useLanguage();
  const {
    t
  } = useTranslation();
  const handleAddRow = () => {
    // Simulate loading state
    setIsLoading(true);
    // Simulate API call or processing
    setTimeout(() => {
      const newItem: InvoiceItem = {
        id: invoiceItems.length + 1,
        itemId: 0,
        itemName: '',
        quantity: 1,
        price: 0,
        total: 0,
        customerId: defaultCustomer ? Number(defaultCustomer) : 0,
        customerName: defaultCustomer ? customers.find(c => c.id === Number(defaultCustomer))?.name || '' : ''
      };
      setInvoiceItems([...invoiceItems, newItem]);
      setIsLoading(false);
    }, 500);
  };
  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const updatedItems = [...invoiceItems];
    if (field === 'itemId') {
      const selectedItem = items.find(item => item.id === Number(value));
      if (selectedItem) {
        updatedItems[index].itemId = selectedItem.id;
        updatedItems[index].itemName = selectedItem.name;
        updatedItems[index].price = selectedItem.price;
        updatedItems[index].total = selectedItem.price * updatedItems[index].quantity;
      }
    } else if (field === 'customerId') {
      const selectedCustomer = customers.find(customer => customer.id === Number(value));
      if (selectedCustomer) {
        updatedItems[index].customerId = selectedCustomer.id;
        updatedItems[index].customerName = selectedCustomer.name;
      }
    } else if (field === 'quantity') {
      updatedItems[index].quantity = parseInt(value);
      updatedItems[index].total = updatedItems[index].price * parseInt(value);
    } else if (field === 'price') {
      updatedItems[index].price = parseFloat(value);
      updatedItems[index].total = parseFloat(value) * updatedItems[index].quantity;
    } else {
      ;
      (updatedItems[index][field] as any) = value;
    }
    setInvoiceItems(updatedItems);
    // Check if the last item has valid data for enabling/disabling the Add Item button
    const lastItem = updatedItems[updatedItems.length - 1];
    setIsFormValid(lastItem.itemId !== 0 && lastItem.customerId !== 0);
  };
  useEffect(() => {
    // If default customer changes, update all items that don't have a customer assigned
    if (defaultCustomer) {
      const customerId = Number(defaultCustomer);
      const selectedCustomer = customers.find(c => c.id === customerId);
      if (selectedCustomer) {
        const updatedItems = invoiceItems.map(item => {
          if (item.customerId === 0) {
            return {
              ...item,
              customerId: customerId,
              customerName: selectedCustomer.name
            };
          }
          return item;
        });
        setInvoiceItems(updatedItems);
      }
    }
  }, [defaultCustomer]);
  const calculateTotal = () => {
    return invoiceItems.reduce((sum, item) => sum + item.total, 0);
  };
  const handleDeleteRow = (index: number) => {
    const updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
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
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-200">
        <button onClick={() => setIsMenuOpen(true)} className={`${isRTL ? 'ml-3' : 'mr-3'}`}>
          <MenuIcon className="h-6 w-6 text-gray-500" />
        </button>
        <h1 className="text-lg font-medium">{t('newInvoice')}</h1>
        <button className={`${isRTL ? 'mr-auto' : 'ml-auto'} bg-gradient-to-r from-cyan-500 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center`}>
          <SaveIcon className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
          <span>{t('save')}</span>
        </button>
      </div>

      {/* Main Content with padding at the bottom for the sticky footer */}
      <div className="flex-1 p-4 overflow-y-auto pb-[calc(56px+1rem)]">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('supplier')}
              </label>
              <SearchableSelect options={suppliers} value={supplier} onChange={value => setSupplier(value)} placeholder={t('supplier')} isRTL={isRTL} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('invoiceDate')}
              </label>
              <div className="relative">
                <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} className="block w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                <div className={`absolute inset-y-0 ${isRTL ? 'left-0' : 'right-0'} flex items-center ${isRTL ? 'pl-3' : 'pr-3'} pointer-events-none`}>
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('defaultCustomer')}
              </label>
              <div className="flex items-center">
                <SearchableSelect options={customers} value={defaultCustomer} onChange={value => setDefaultCustomer(value)} placeholder={t('customer')} isRTL={isRTL} />
                <UserIcon className={`h-5 w-5 ${isRTL ? 'mr-2' : 'ml-2'} text-gray-400`} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('defaultItem')}
              </label>
              <SearchableSelect options={items} value={defaultItem} onChange={value => setDefaultItem(value)} placeholder={t('defaultItem')} showPrice={true} isRTL={isRTL} />
            </div>
          </div>
        </div>

        {/* Invoice Items - Mobile Friendly Cards */}
        <div className="bg-white rounded-lg shadow mb-4">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-800">{t('invoiceItems')}</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {invoiceItems.map((item, index) => <div key={item.id} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-gray-700">
                    {t('item')} #{item.id}
                  </div>
                  {invoiceItems.length > 1 && <button onClick={() => handleDeleteRow(index)} className="text-red-500 hover:text-red-700 focus:outline-none">
                      <TrashIcon className="h-5 w-5" />
                    </button>}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('item')}
                    </label>
                    <SearchableSelect options={items} value={item.itemId} onChange={value => handleItemChange(index, 'itemId', value)} placeholder={t('item')} isRTL={isRTL} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('quantity')}
                      </label>
                      <input type="number" min="1" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} className="block w-full rounded border border-gray-300 py-2 px-3 text-sm focus:border-cyan-500 focus:ring-cyan-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('price')}
                      </label>
                      <input type="number" min="0" step="0.01" value={item.price} onChange={e => handleItemChange(index, 'price', e.target.value)} className="block w-full rounded border border-gray-300 py-2 px-3 text-sm focus:border-cyan-500 focus:ring-cyan-500" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">
                      {t('total')}:
                    </label>
                    <span className="font-medium">
                      ${item.total.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('customer')}
                    </label>
                    <SearchableSelect options={customers} value={item.customerId} onChange={value => handleItemChange(index, 'customerId', value)} placeholder={t('customer')} isRTL={isRTL} />
                  </div>
                </div>
              </div>)}
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-between items-center">
            <div className={`text-right ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
              <div className="text-sm text-gray-500">{t('total')}</div>
              <div className="text-lg font-semibold">
                ${calculateTotal().toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Add Item Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-10">
        <button type="button" onClick={handleAddRow} disabled={!isFormValid || isLoading} className={`w-full h-14 flex items-center justify-center rounded-lg text-white font-medium transition-all duration-200 ${!isFormValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700'}`}>
          {isLoading ? <LoaderIcon className={`h-5 w-5 animate-spin ${isRTL ? 'ml-2' : 'mr-2'}`} /> : <PlusIcon className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />}
          <span>{isLoading ? t('adding') : t('addItem')}</span>
        </button>
      </div>
    </div>;
}