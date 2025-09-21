import React, { useState } from 'react';
import { ArrowLeftIcon, UserIcon, GlobeIcon, LogOutIcon, MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SideMenu } from '../components/SideMenu';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
export function SettingsPage() {
  const {
    language,
    setLanguage,
    isRTL
  } = useLanguage();
  const {
    t
  } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Mock user data
  const user = {
    username: 'John Doe',
    email: 'john.doe@example.com'
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
        <button onClick={() => setIsMenuOpen(true)} className="mr-3">
          <MenuIcon className="h-6 w-6 text-gray-500" />
        </button>
        <h1 className="text-lg font-medium">{t('settings')}</h1>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        {/* User Information */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 flex items-center justify-center mr-4">
              <UserIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-medium">{user.username}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
        {/* Language Settings */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center mb-3">
            <GlobeIcon className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="font-medium">{t('language')}</h3>
          </div>
          <div className="space-y-2">
            <div className={`p-3 rounded-lg flex items-center justify-between ${language === 'english' ? 'bg-cyan-50 border border-cyan-200' : 'border border-gray-200'}`} onClick={() => setLanguage('english')}>
              <span className={language === 'english' ? 'text-cyan-700' : 'text-gray-700'}>
                English
              </span>
              {language === 'english' && <div className="h-4 w-4 rounded-full bg-cyan-500"></div>}
            </div>
            <div className={`p-3 rounded-lg flex items-center justify-between ${language === 'arabic' ? 'bg-cyan-50 border border-cyan-200' : 'border border-gray-200'}`} onClick={() => setLanguage('arabic')}>
              <span className={language === 'arabic' ? 'text-cyan-700' : 'text-gray-700'}>
                العربية (Arabic)
              </span>
              {language === 'arabic' && <div className="h-4 w-4 rounded-full bg-cyan-500"></div>}
            </div>
          </div>
        </div>
        {/* Logout Button */}
        <button className="w-full bg-white border border-gray-200 text-red-500 flex items-center justify-center py-3 rounded-lg shadow-sm">
          <LogOutIcon className="h-5 w-5 mr-2" />
          <span>{t('logout')}</span>
        </button>
      </div>
    </div>;
}