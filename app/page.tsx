'use client'

import { useState } from 'react'
import { SplashScreen } from '@/components/sections/SplashScreen'
import { WelcomeScreen } from '@/components/sections/WelcomeScreen'
import { ChatInterface } from '@/components/sections/ChatInterface'
import { HistoryScreen } from '@/components/sections/HistoryScreen'
import { SettingsScreen } from '@/components/sections/SettingsScreen'
import { ProfileScreen } from '@/components/sections/ProfileScreen'
import { Navigation, View } from '@/components/layout/Navigation'
import { useChatStore } from '@/store/useChatStore'

export default function Home() {
  const [view, setView] = useState<View | 'splash'>('splash')
  const { addMessage, mode } = useChatStore()

  const handleStartChat = (query: string) => {
    addMessage({
      id: Date.now().toString(),
      sender: 'user',
      content: query,
      mode
    })
    setView('chat')
  }

  if (view === 'splash') {
    return <SplashScreen onComplete={() => setView('welcome')} />
  }

  return (
    <main className="pb-16 lg:pb-0">
      {view === 'welcome' && <WelcomeScreen onStartChat={handleStartChat} />}
      {view === 'chat' && <ChatInterface onBack={() => setView('welcome')} />}
      {view === 'history' && <HistoryScreen onSelectChat={() => setView('chat')} />}
      {view === 'settings' && <SettingsScreen />}
      {view === 'profile' && <ProfileScreen />}
      
      {view !== 'chat' && (
        <Navigation 
          currentView={view as View} 
          onViewChange={(v) => setView(v)} 
        />
      )}
    </main>
  )
}
