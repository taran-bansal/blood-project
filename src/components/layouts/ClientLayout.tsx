'use client';

import React from 'react';
import MainLayout from './MainLayout';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
} 