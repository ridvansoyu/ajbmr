"use client";
import React, { useState, useEffect } from 'react';

const ApiDebug: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<string>('Checking...');
  const [apiUrl, setApiUrl] = useState<string>('');

  useEffect(() => {
    const checkApi = async () => {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
      setApiUrl(url);
      
      try {
        const response = await fetch(`${url}/api/users/register/`, {
          method: 'OPTIONS',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
          setApiStatus('✅ API is reachable');
        } else {
          setApiStatus(`❌ API responded with status: ${response.status}`);
        }
      } catch (error) {
        setApiStatus(`❌ API connection failed: ${error}`);
      }
    };

    checkApi();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <h3 className="font-semibold text-sm mb-2">API Debug Info</h3>
      <div className="text-xs space-y-1">
        <div><strong>API URL:</strong> {apiUrl}</div>
        <div><strong>Status:</strong> {apiStatus}</div>
      </div>
    </div>
  );
};

export default ApiDebug;
