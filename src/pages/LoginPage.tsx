import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon, GlobeIcon, MenuIcon } from 'lucide-react';
import { SideMenu } from '../components/SideMenu';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
type LoginFormData = {
  domain: string;
  email: string;
  password: string;
};
export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isRTL
  } = useLanguage();
  const {
    t
  } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<LoginFormData>();
  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // Handle login logic here
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
        <h1 className="text-lg font-medium">{t('login')}</h1>
      </div>

      {/* Login Content */}
      <div className="flex-1 flex flex-col p-6">
        <div className="flex justify-center my-8">
          <img src="/play_store_512.png" alt="App Logo" className="h-24 w-24" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">
          {t('welcomeBack')}
        </h1>
        <p className="text-gray-500 text-center mb-8">
          {t('signInToContinue')}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('domain')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GlobeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" {...register('domain', {
              required: 'Domain is required',
              pattern: {
                value: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,
                message: 'Invalid domain format'
              }
            })} className="pl-10 block w-full rounded-lg border border-gray-300 py-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" placeholder="yourdomain.com" />
            </div>
            {errors.domain && <p className="mt-1 text-sm text-red-600">
                {errors.domain.message}
              </p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('email')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="email" {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })} className="pl-10 block w-full rounded-lg border border-gray-300 py-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" placeholder="example@email.com" />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('password')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type={showPassword ? 'text' : 'password'} {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })} className="pl-10 block w-full rounded-lg border border-gray-300 py-3 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>}
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-indigo-700 transition duration-200">
            {t('signIn')}
          </button>
        </form>
      </div>
    </div>;
}