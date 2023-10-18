import type { Metadata } from 'next'
import './globals.css'
import { BackgroundProvider } from '@/contexts/BackgroundContext'
import Msal from '@/contexts/MsalProvider'
import { UserContextProvider } from '@/contexts/UserContextProvider'
export const metadata: Metadata = {
  title: 'Customize',
  description:
    'Sistema gerador de arquivos desenvolvido pela TPF Engenharia LTDA - 2023 @ Design de Produto',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="h-full w-full bg-customize-background-azul">
        <Msal>
          <UserContextProvider>
            <BackgroundProvider>{children}</BackgroundProvider>
          </UserContextProvider>
        </Msal>
      </body>
    </html>
  )
}
