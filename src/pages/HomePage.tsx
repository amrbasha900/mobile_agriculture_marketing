import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileTextIcon, CreditCardIcon, ListIcon, MenuIcon } from 'lucide-react';
import { SideMenu } from '../components/SideMenu';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
export function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isRTL
  } = useLanguage();
  const {
    t
  } = useTranslation();
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
      <div className="bg-white px-4 py-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => setIsMenuOpen(true)} className="mr-3">
            <MenuIcon className="h-6 w-6 text-gray-500" />
          </button>
          <h1 className="text-lg font-medium">{t('home')}</h1>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Logo and Welcome Message */}
        <div className="flex-1 flex flex-col justify-center items-center mt-[-40px]">
          <img src="/play_store_512.png" alt="App Logo" className="h-32 w-32 mb-6" />
          <h2 className="text-xl font-medium text-gray-800 text-center mb-8">
            {t('welcomeTo')}
          </h2>
        </div>
        {/* Vertical Navigation Buttons */}
        <div className="flex flex-col space-y-4 mb-8 mx-auto w-full max-w-sm">
          <Link to="/new-invoice" className="flex items-center p-4 rounded-lg bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center mr-4">
              <FileTextIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-medium text-gray-800">
              {t('newInvoice')}
            </span>
          </Link>
          <Link to="/supplier-payments" className="flex items-center p-4 rounded-lg bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center mr-4">
              <CreditCardIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-medium text-gray-800">
              {t('supplierPayments')}
            </span>
          </Link>
          <Link to="/invoices-list" className="flex items-center p-4 rounded-lg bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center mr-4">
              <ListIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-medium text-gray-800">
              {t('invoicesList')}
            </span>
          </Link>
        </div>
      </div>
    </div>;
}