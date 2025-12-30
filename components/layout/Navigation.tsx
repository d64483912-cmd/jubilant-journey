'use client'

import { MessageSquare, History, Settings, User } from 'lucide-react'
import { motion } from 'framer-motion'

export type View = 'welcome' | 'chat' | 'history' | 'settings' | 'profile'

export function Navigation({ currentView, onViewChange }: { 
  currentView: View, 
  onViewChange: (view: View) => void 
}) {
  const navItems = [
    { id: 'welcome', icon: MessageSquare, label: 'Chat' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'profile', icon: User, label: 'Profile' },
  ]

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center z-30 lg:hidden px-6">
      <nav className="glass rounded-[32px] px-4 py-3 flex items-center gap-2 premium-shadow">
        {navItems.map((item) => {
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary/10 rounded-2xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'fill-primary/10' : ''}`} />
              {isActive && (
                <motion.span 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs font-bold relative z-10 uppercase tracking-wider"
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
