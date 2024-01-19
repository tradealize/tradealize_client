import React, { useContext, useEffect } from "react";
import { combineComponents } from "./context";
import { CapacitorProvider } from "./context/CapacitorContext";
import { FiltersProvider } from "./context/FiltersContext";
import { PaymentSourcesProvider } from "./context/PaymentSourcesContext";
import { ConversationsProvider } from "./context/ConversationsContext";
import { MessagesProvider } from "./context/MessagesContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import { InvoicesProvider } from "./context/InvoicesContext";
import { TutorialsProvider } from "./context/TutorialsContext";
import { ProductsProvider } from "./context/ProductsContext";
import { AnalyticsProvider } from "./context/AnalyticsContext";
import { ModalProvider } from "./context/ModalContext";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
import { setupIonicReact } from "@ionic/react";
import {
  AppConfigContext,
  AppConfigProvider,
} from "./context/AppConfigContext";
import { PurchasesProvider } from "./context/PurchasesContext";
import { setupColor } from "./utils/appconfig";
import "@ionic/react/css/core.css";
import Main from "./Main";
import { TranslationsProvider } from "./context/TranslationsContext";
import { PaymentMethodsProvider } from "./context/PaymentMethodsContext";
import { StaffProvider } from "./context/StaffContext";

setupIonicReact();

const AppContextProviderWrapper = combineComponents([
  AuthProvider,
  MenuProvider,
  StaffProvider,
  FiltersProvider,
  InvoicesProvider,
  ProductsProvider,
  MessagesProvider,
  CheckoutProvider,
  PurchasesProvider,
  CapacitorProvider,
  TutorialsProvider,
  AnalyticsProvider,
  ConversationsProvider,
  PaymentSourcesProvider,
  PaymentMethodsProvider,
]);

const AppContext = () => {
  const { accent, primary, accent_secondary, firebaseConfig, getAppConfig } =
    useContext(AppConfigContext);

  useEffect(() => {
    getAppConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setupColor("accent-secondary", accent_secondary);
    setupColor("primary", primary);
    setupColor("accent", accent);
  }, [primary, accent]);

  const renderApp = () => {
    if (firebaseConfig && firebaseConfig !== null) {
      return (
        <TranslationsProvider>
          <ModalProvider>
            <AuthProvider>
              <AppContextProviderWrapper>
                <Main />
              </AppContextProviderWrapper>
            </AuthProvider>
          </ModalProvider>
        </TranslationsProvider>
      );
    }
  };

  return <div>{renderApp()}</div>;
};

const App = () => {
  return (
    <AppConfigProvider>
      <AppContext />
    </AppConfigProvider>
  );
};

export default App;
