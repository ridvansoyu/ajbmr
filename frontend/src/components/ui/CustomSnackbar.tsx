"use client";
import React from 'react';
import { Alert, AlertColor } from '@mui/material';
import { SnackbarContent, CustomContentProps } from 'notistack';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

const CustomSnackbar = React.forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, message, variant, ...props }, ref) => {
    const getIcon = () => {
      switch (variant) {
        case 'success':
          return <CheckCircle className="h-5 w-5" />;
        case 'error':
          return <XCircle className="h-5 w-5" />;
        case 'warning':
          return <AlertTriangle className="h-5 w-5" />;
        case 'info':
          return <Info className="h-5 w-5" />;
        default:
          return null;
      }
    };

    return (
      <SnackbarContent ref={ref} role="alert" {...props}>
        <Alert
          severity={variant as AlertColor}
          icon={getIcon()}
          sx={{
            width: '100%',
            minWidth: '300px',
            '& .MuiAlert-icon': {
              alignItems: 'center',
            },
            '& .MuiAlert-message': {
              fontSize: '0.875rem',
              fontWeight: 500,
            },
          }}
        >
          {message}
        </Alert>
      </SnackbarContent>
    );
  }
);

CustomSnackbar.displayName = 'CustomSnackbar';

export default CustomSnackbar;
