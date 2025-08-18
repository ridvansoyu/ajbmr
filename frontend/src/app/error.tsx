"use client";
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <div className="container-custom py-16 text-center">
      <h2 className="text-2xl font-serif font-medium text-primary-900 mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-6">{error.message || 'An unexpected error occurred.'}</p>
      <button onClick={reset} className="btn btn-primary">Try again</button>
    </div>
  );
}


