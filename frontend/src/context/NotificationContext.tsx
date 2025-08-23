"use client";
import React, { createContext, useContext, useCallback } from 'react';
import { SnackbarProvider, useSnackbar, VariantType } from 'notistack';
import { getNotification, NotificationKey } from '@/constants/notifications';
import { useLanguage } from './LanguageContext';
import CustomSnackbar from '@/components/ui/CustomSnackbar';

interface NotificationContextValue {
  showNotification: (key: NotificationKey, variant?: VariantType) => void;
  showSuccess: (key: NotificationKey) => void;
  showError: (key: NotificationKey) => void;
  showWarning: (key: NotificationKey) => void;
  showInfo: (key: NotificationKey) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

// Inner component that uses notistack
function NotificationProviderInner({ children }: { children: React.ReactNode }) {
  const { enqueueSnackbar } = useSnackbar();
  const { language } = useLanguage();

  const showNotification = useCallback((key: NotificationKey, variant: VariantType = 'default') => {
    const message = getNotification(key, language);
    enqueueSnackbar(message, { variant });
  }, [enqueueSnackbar, language]);

  const showSuccess = useCallback((key: NotificationKey) => {
    showNotification(key, 'success');
  }, [showNotification]);

  const showError = useCallback((key: NotificationKey) => {
    showNotification(key, 'error');
  }, [showNotification]);

  const showWarning = useCallback((key: NotificationKey) => {
    showNotification(key, 'warning');
  }, [showNotification]);

  const showInfo = useCallback((key: NotificationKey) => {
    showNotification(key, 'info');
  }, [showNotification]);

  const value = {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

// Main provider component
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={4000}
      preventDuplicate
      Components={{
        success: CustomSnackbar,
        error: CustomSnackbar,
        warning: CustomSnackbar,
        info: CustomSnackbar,
      }}
    >
      <NotificationProviderInner>
        {children}
      </NotificationProviderInner>
    </SnackbarProvider>
  );
}

// Hook to use notifications
export function useNotification(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
}
