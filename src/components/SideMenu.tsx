import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, SettingsIcon, FileTextIcon, CreditCardIcon, ListIcon, XIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
export function SideMenu({
  isOpen,
  onClose
}: SideMenuProps) {
  const {
    isRTL
  } = useLanguage();
  const {
    t
  } = useTranslation();
  return <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" onClick={onClose} />}
      {/* Side Menu */}
      <div className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'} shadow-lg`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium">Menu</h2>
          <button onClick={onClose} className="text-gray-500">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="py-4">
          <Link to="/home" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100" onClick={onClose}>
            <HomeIcon className={`h-5 w-5 ${isRTL ? 'ml-3' : 'mr-3'} text-cyan-500`} />
            <span>{t('home')}</span>
          </Link>
          <Link to="/settings" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100" onClick={onClose}>
            <SettingsIcon className={`h-5 w-5 ${isRTL ? 'ml-3' : 'mr-3'} text-cyan-500`} />
            <span>{t('settings')}</span>
          </Link>
          <div className="border-t border-gray-200 my-2"></div>
          <Link to="/new-invoice" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100" onClick={onClose}>
            <FileTextIcon className={`h-5 w-5 ${isRTL ? 'ml-3' : 'mr-3'} text-cyan-500`} />
            <span>{t('createInvoice')}</span>
          </Link>
          <Link to="/supplier-payments" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100" onClick={onClose}>
            <CreditCardIcon className={`h-5 w-5 ${isRTL ? 'ml-3' : 'mr-3'} text-cyan-500`} />
            <span>{t('recordPayment')}</span>
          </Link>
          <Link to="/invoices-list" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100" onClick={onClose}>
            <ListIcon className={`h-5 w-5 ${isRTL ? 'ml-3' : 'mr-3'} text-cyan-500`} />
            <span>{t('invoiceList')}</span>
          </Link>
        </div>
      </div>
    </>;
}