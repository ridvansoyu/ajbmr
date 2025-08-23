"use client";
import React from 'react';
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

    const getStyles = () => {
      switch (variant) {
        case 'success':
          return 'bg-green-600 text-white border-green-700';
        case 'error':
          return 'bg-red-600 text-white border-red-700';
        case 'warning':
          return 'bg-yellow-600 text-white border-yellow-700';
        case 'info':
          return 'bg-blue-600 text-white border-blue-700';
        default:
          return 'bg-gray-600 text-white border-gray-700';
      }
    };

    return (
      <SnackbarContent ref={ref} role="alert" {...props}>
        <div className={`flex items-center p-4 rounded-lg border shadow-lg min-w-[300px] ${getStyles()}`}>
          <div className="flex-shrink-0 mr-3">
            {getIcon()}
          </div>
          <div className="flex-1 text-sm font-medium">
            {message}
          </div>
        </div>
      </SnackbarContent>
    );
  }
);

CustomSnackbar.displayName = 'CustomSnackbar';

export default CustomSnackbar;
