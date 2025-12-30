'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useChatStore } from '@/store/useChatStore'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const { settings } = useChatStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <>{children}</>

  const fontSizeClass = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  }[settings.fontSize]

  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
      <div className={fontSizeClass}>
        {children}
      </div>
    </NextThemesProvider>
  )
}
