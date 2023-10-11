import StyledComponentsRegistry from "@/lib/registry"
import '../styles/globals.css'
import NextAuthSessionProvider from "./providers/NextAuthProvider"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Analytics  } from '@vercel/analytics/react'

export const metadata = {
  title: 'TPF SoftStock',
  description: 'TPF Softstock - Gestão de softwares e licenças da corporação.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <NextAuthSessionProvider>
            {children}
            <Analytics  />
          </NextAuthSessionProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
