/* eslint-disable @typescript-eslint/no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { IntlProvider } from 'react-intl'; 
import { LanguageContext, LanguageProvider } from "./context/LanguageContext";
import React from 'react';

const Root = () => {
  const { locale, messages } = React.useContext(LanguageContext);

  return (
  <IntlProvider locale={locale} messages={messages}>
     <App />
  </IntlProvider>
  );

  };

  createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <Root />
    </LanguageProvider>
  </StrictMode>
  );
