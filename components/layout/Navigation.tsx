'use client'

import { MessageSquare, History, Settings, User } from 'lucide-react'
import { motion } from 'framer-motion'

export type View = 'welcome' | 'chat' | 'history' | 'settings' | 'profile'

export function Navigation({ currentView, onViewChange }: { 
  currentView: View, 
  onViewChange: (view: View) => void 
}) {
  const navItems = [
    { id: 'welcome', icon: MessageSquare, label: 'Consult' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'profile', icon: User, label: 'Profile' },
  ]

  return (
    <div className="fixed bottom-10 left-0 right-0 flex justify-center z-40 lg:hidden px-8">
      <nav className="glass rounded-[40px] px-5 py-4 flex items-center gap-3 premium-shadow border border-white/60">
        {navItems.map((item) => {
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={`relative flex items-center gap-3 px-5 py-3 rounded-[24px] transition-all duration-500 ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill-premium"
                  className="absolute inset-0 bg-primary/10 rounded-[24px] border border-primary/20"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
                />
              )}
              <item.icon className={`w-6 h-6 relative z-10 transition-transform duration-500 ${isActive ? 'scale-110 fill-primary/10' : 'scale-100'}`} />
              {isActive && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[11px] font-black relative z-10 uppercase tracking-[0.2em]"
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
