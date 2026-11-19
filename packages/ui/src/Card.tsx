import React from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`border rounded-lg p-4 shadow-sm ${className}`}>{children}</div>;
}
