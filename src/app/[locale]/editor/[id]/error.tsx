'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function EditorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Editor error:', error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-50">
      <div className="mx-4 max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>
        <h2 className="mb-2 text-lg font-semibold text-zinc-900">Something went wrong</h2>
        <p className="mb-6 text-sm text-zinc-500">
          {error.message?.includes('Server Action')
            ? 'This page version was updated. Please refresh and try again.'
            : 'An unexpected error occurred. Please try refreshing the page.'}
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            <RotateCcw className="h-4 w-4" />
            Retry
          </button>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            Refresh page
          </button>
        </div>
      </div>
    </div>
  );
}
