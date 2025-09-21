import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { NewInvoicePage } from './pages/NewInvoicePage';
import { InvoicesListPage } from './pages/InvoicesListPage';
import { InvoiceDetailsPage } from './pages/InvoiceDetailsPage';
import { InvoiceEditPage } from './pages/InvoiceEditPage';
import { SupplierPaymentPage } from './pages/SupplierPaymentPage';
import { PaymentDetailsPage } from './pages/PaymentDetailsPage';
import { SettingsPage } from './pages/SettingsPage';
import { LanguageProvider } from './contexts/LanguageContext';
export function AppRouter() {
  return <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/new-invoice" element={<NewInvoicePage />} />
          <Route path="/supplier-payments" element={<SupplierPaymentPage />} />
          <Route path="/payments/:id" element={<PaymentDetailsPage />} />
          <Route path="/invoices-list" element={<InvoicesListPage />} />
          <Route path="/invoices/:id" element={<InvoiceDetailsPage />} />
          <Route path="/invoices/:id/edit" element={<InvoiceEditPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>;
}