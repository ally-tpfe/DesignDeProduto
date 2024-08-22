'use client'
import { msalInstance } from '@/services/msal'
import { MsalProvider } from '@azure/msal-react'
import React from 'react'

export default function Msal({ children }: { children: React.ReactNode }) {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>
}
