'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
          <div style={{ maxWidth: 400, padding: 32, textAlign: 'center', background: '#fff', borderRadius: 16, border: '1px solid #e4e4e7', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#18181b', marginBottom: 8 }}>Something went wrong</h2>
            <p style={{ fontSize: 14, color: '#71717a', marginBottom: 24 }}>An unexpected error occurred. Please refresh the page and try again.</p>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '8px 20px', fontSize: 14, fontWeight: 500, color: '#fff', background: '#18181b', border: 'none', borderRadius: 8, cursor: 'pointer' }}
            >
              Refresh page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
