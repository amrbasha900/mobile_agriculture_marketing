import React, { useEffect, useState, useRef, Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MenuIcon, ArrowLeftIcon, CalendarIcon, SaveIcon, XIcon, PlusIcon, TrashIcon, AlertCircleIcon, UserIcon, LoaderIcon, SearchIcon, ChevronDownIcon } from 'lucide-react';
import { SideMenu } from '../components/SideMenu';
import { toast, Toaster } from 'sonner';
// Mock suppliers for dropdown
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
// Mock customers for dropdown
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
// Mock invoice data (same as in InvoiceDetailsPage)
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
}
// ... other invoices (same as in InvoiceDetailsPage)
];
// Searchable Select Component (copied from NewInvoicePage)
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
}
function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  showPrice = false
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
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 text-sm" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onClick={e => e.stopPropagation()} />
              {searchTerm && <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={e => {
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
export function InvoiceEditPage() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [defaultCustomer, setDefaultCustomer] = useState<number | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  // Form state
  const [invoiceData, setInvoiceData] = useState<any>({
    invoiceNumber: '',
    supplierId: 0,
    date: '',
    items: [],
    tax: 0
  });
  // Calculate derived values
  const totalAmount = invoiceData.items?.reduce((sum: number, item: any) => sum + item.total, 0) || 0;
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
        if (foundInvoice.is_locked) {
          throw new Error('This invoice is locked and cannot be edited');
        }
        // Clone the invoice for editing
        setInvoiceData({
          id: foundInvoice.id,
          invoiceNumber: foundInvoice.invoiceNumber,
          supplierId: foundInvoice.supplierId,
          date: foundInvoice.date,
          items: JSON.parse(JSON.stringify(foundInvoice.items)),
          tax: foundInvoice.tax
        });
        setError(null);
      } catch (err: any) {
        setError(err.message);
        toast.error(err.message || 'Failed to load invoice');
        // Navigate back to details page after a delay if there's an error
        setTimeout(() => {
          navigate(`/invoices/${id}`);
        }, 2000);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id, navigate]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value
    });
  };
  const handleSupplierChange = (value: number) => {
    setInvoiceData({
      ...invoiceData,
      supplierId: value
    });
  };
  const handleCustomerChange = (value: number) => {
    setDefaultCustomer(value);
    // Update any items without a customer assigned
    if (value) {
      const selectedCustomer = customers.find(c => c.id === value);
      if (selectedCustomer) {
        const updatedItems = invoiceData.items.map((item: any) => {
          if (!item.customerId) {
            return {
              ...item,
              customerId: value,
              customerName: selectedCustomer.name
            };
          }
          return item;
        });
        setInvoiceData({
          ...invoiceData,
          items: updatedItems
        });
      }
    }
  };
  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...invoiceData.items];
    if (field === 'quantity' || field === 'price') {
      const numValue = parseFloat(value);
      updatedItems[index][field] = numValue;
      // Recalculate total for this item
      const quantity = field === 'quantity' ? numValue : updatedItems[index].quantity;
      const price = field === 'price' ? numValue : updatedItems[index].price;
      updatedItems[index].total = quantity * price;
    } else if (field === 'customerId') {
      const customerId = parseInt(value);
      updatedItems[index].customerId = customerId;
      // Update customer name
      const selectedCustomer = customers.find(c => c.id === customerId);
      if (selectedCustomer) {
        updatedItems[index].customerName = selectedCustomer.name;
      }
    } else {
      updatedItems[index][field] = value;
    }
    setInvoiceData({
      ...invoiceData,
      items: updatedItems
    });
    // Check if all items have valid data
    const allItemsValid = updatedItems.every(item => item.name && item.quantity > 0 && item.customerId);
    setIsFormValid(allItemsValid);
  };
  const handleAddItem = () => {
    // Simulate loading state
    setIsAddingItem(true);
    // Simulate API call or processing
    setTimeout(() => {
      const newItem = {
        id: Date.now(),
        name: '',
        quantity: 1,
        price: 0,
        total: 0,
        customerId: defaultCustomer || null,
        customerName: defaultCustomer ? customers.find(c => c.id === defaultCustomer)?.name || '' : ''
      };
      setInvoiceData({
        ...invoiceData,
        items: [...invoiceData.items, newItem]
      });
      setIsAddingItem(false);
      setIsFormValid(false); // New item doesn't have a name yet
    }, 500);
  };
  const handleRemoveItem = (index: number) => {
    const updatedItems = [...invoiceData.items];
    updatedItems.splice(index, 1);
    setInvoiceData({
      ...invoiceData,
      items: updatedItems
    });
    // Check if all remaining items have valid data
    const allItemsValid = updatedItems.every(item => item.name && item.quantity > 0 && item.customerId);
    setIsFormValid(allItemsValid);
  };
  const validateForm = () => {
    // Basic validation
    if (!invoiceData.invoiceNumber.trim()) {
      toast.error('Invoice number is required');
      return false;
    }
    if (!invoiceData.supplierId) {
      toast.error('Supplier is required');
      return false;
    }
    if (!invoiceData.date) {
      toast.error('Invoice date is required');
      return false;
    }
    if (invoiceData.items.length === 0) {
      toast.error('At least one item is required');
      return false;
    }
    for (const item of invoiceData.items) {
      if (!item.name.trim()) {
        toast.error('All items must have a name');
        return false;
      }
      if (item.quantity <= 0) {
        toast.error('All items must have a quantity greater than zero');
        return false;
      }
      if (item.price < 0) {
        toast.error('All items must have a price of zero or greater');
        return false;
      }
      if (!item.customerId) {
        toast.error('All items must have a customer assigned');
        return false;
      }
    }
    return true;
  };
  const handleSave = async () => {
    if (!validateForm()) return;
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In a real app, you would update the invoice on the server here
      toast.success('Invoice updated successfully');
      // Navigate back to the details page
      navigate(`/invoices/${id}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save invoice');
    } finally {
      setSaving(false);
    }
  };
  const handleCancel = () => {
    navigate(`/invoices/${id}`);
  };
  if (loading) {
    return <div className="flex flex-col min-h-screen bg-gray-50">
        <Toaster position="top-center" />
        {/* Side Menu */}
        <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        {/* Mobile status bar simulation */}
        <div className="bg-white px-4 py-2 flex justify-between items-center">
          <div className="text-xs">9:41 AM</div>
          <div className="flex space-x-1">{/* Status icons */}</div>
        </div>
        {/* Header */}
        <div className="bg-white px-4 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <button onClick={() => setIsMenuOpen(true)} className="mr-3">
              <MenuIcon className="h-6 w-6 text-gray-500" />
            </button>
            <h1 className="text-lg font-medium">Edit Invoice</h1>
          </div>
        </div>
        {/* Loading state */}
        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mb-2"></div>
            <p className="text-gray-500">Loading invoice...</p>
          </div>
        </div>
      </div>;
  }
  if (error) {
    return <div className="flex flex-col min-h-screen bg-gray-50">
        <Toaster position="top-center" />
        {/* Side Menu */}
        <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        {/* Mobile status bar simulation */}
        <div className="bg-white px-4 py-2 flex justify-between items-center">
          <div className="text-xs">9:41 AM</div>
          <div className="flex space-x-1">{/* Status icons */}</div>
        </div>
        {/* Header */}
        <div className="bg-white px-4 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <button onClick={() => setIsMenuOpen(true)} className="mr-3">
              <MenuIcon className="h-6 w-6 text-gray-500" />
            </button>
            <h1 className="text-lg font-medium">Edit Invoice</h1>
          </div>
        </div>
        {/* Error state */}
        <div className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-500 mb-4">
              <AlertCircleIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button onClick={() => navigate(`/invoices/${id}`)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700">
              Back to Invoice Details
            </button>
          </div>
        </div>
      </div>;
  }
  return <div className="flex flex-col min-h-screen bg-gray-50">
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
      {/* Header with Menu Icon */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-200">
        <button onClick={() => setIsMenuOpen(true)} className="mr-3">
          <MenuIcon className="h-6 w-6 text-gray-500" />
        </button>
        <h1 className="text-lg font-medium">Edit Invoice</h1>
        <button onClick={handleSave} className="ml-auto bg-gradient-to-r from-cyan-500 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center" disabled={saving}>
          {saving ? <>
              <LoaderIcon className="h-4 w-4 mr-1 animate-spin" />
              <span>Saving...</span>
            </> : <>
              <SaveIcon className="h-4 w-4 mr-1" />
              <span>Save</span>
            </>}
        </button>
      </div>
      {/* Main Content with padding at the bottom for the sticky footer */}
      <div className="flex-1 p-4 overflow-y-auto pb-[calc(56px+1rem)]">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier
              </label>
              <SearchableSelect options={suppliers} value={invoiceData.supplierId} onChange={handleSupplierChange} placeholder="Select Supplier" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Date
              </label>
              <div className="relative">
                <input type="date" name="date" value={invoiceData.date} onChange={handleInputChange} className="block w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Customer
              </label>
              <div className="flex items-center">
                <SearchableSelect options={customers} value={defaultCustomer || ''} onChange={handleCustomerChange} placeholder="Select Customer" />
                <UserIcon className="h-5 w-5 ml-2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Number
              </label>
              <input type="text" name="invoiceNumber" value={invoiceData.invoiceNumber} onChange={handleInputChange} className="block w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax/VAT
              </label>
              <input type="number" name="tax" value={invoiceData.tax} onChange={handleInputChange} min="0" step="0.01" className="block w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
            </div>
          </div>
        </div>
        {/* Invoice Items - Mobile Friendly Cards */}
        <div className="bg-white rounded-lg shadow mb-4">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-800">Invoice Items</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {invoiceData.items.map((item: any, index: number) => <div key={item.id} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-gray-700">
                    Item #{index + 1}
                  </div>
                  {invoiceData.items.length > 1 && <button onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-700 focus:outline-none">
                      <TrashIcon className="h-5 w-5" />
                    </button>}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Name
                    </label>
                    <input type="text" value={item.name} onChange={e => handleItemChange(index, 'name', e.target.value)} className="block w-full rounded-lg border border-gray-300 py-2 px-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input type="number" min="1" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} className="block w-full rounded border border-gray-300 py-2 px-3 text-sm focus:border-cyan-500 focus:ring-cyan-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input type="number" min="0" step="0.01" value={item.price} onChange={e => handleItemChange(index, 'price', e.target.value)} className="block w-full rounded border border-gray-300 py-2 px-3 text-sm focus:border-cyan-500 focus:ring-cyan-500" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">
                      Total:
                    </label>
                    <span className="font-medium">
                      ${item.total.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer
                    </label>
                    <SearchableSelect options={customers} value={item.customerId || ''} onChange={value => handleItemChange(index, 'customerId', value)} placeholder="Select Customer" />
                  </div>
                </div>
              </div>)}
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-between items-center">
            <div className="text-right ml-auto">
              <div className="text-sm text-gray-500">Invoice Total</div>
              <div className="text-lg font-semibold">
                ${(totalAmount + (parseFloat(invoiceData.tax) || 0)).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sticky Add Item Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-10">
        <button type="button" onClick={handleAddItem} disabled={isAddingItem} className="w-full h-14 flex items-center justify-center rounded-lg text-white font-medium transition-all duration-200 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700">
          {isAddingItem ? <LoaderIcon className="h-5 w-5 animate-spin mr-2" /> : <PlusIcon className="h-5 w-5 mr-2" />}
          <span>{isAddingItem ? 'Adding...' : 'Add Item'}</span>
        </button>
      </div>
    </div>;
}