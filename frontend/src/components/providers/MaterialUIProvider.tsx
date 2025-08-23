"use client";
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from '@/theme/theme';

interface MaterialUIProviderProps {
  children: React.ReactNode;
}

export default function MaterialUIProvider({ children }: MaterialUIProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
