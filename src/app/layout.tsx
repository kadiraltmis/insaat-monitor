import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'İnşaat Monitör - Yönetim Paneli',
  description: 'İnşaat projeleri takip ve yönetim sistemi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}