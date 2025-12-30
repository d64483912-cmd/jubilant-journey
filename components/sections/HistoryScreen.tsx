'use client'

import { motion } from 'framer-motion'
import { Search, Pin, Trash2, MessageSquare, Clock, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

const mockHistory = [
  { id: '1', title: 'Pediatric Asthma Management', date: '2 hours ago', pinned: true, mode: 'Clinical' },
  { id: '2', title: 'Neonatal Jaundice Guidelines', date: 'Yesterday', pinned: false, mode: 'Academic' },
  { id: '3', title: 'Vaccination Schedule 2024', date: '3 days ago', pinned: false, mode: 'Clinical' },
]

export function HistoryScreen({ onSelectChat }: { onSelectChat: (id: string) => void }) {
  return (
    <div className="flex flex-col h-screen bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">Consultation <span className="text-primary">History</span></h1>
        <p className="text-muted-foreground text-sm font-medium">Access your previous pediatric insights</p>
      </header>

      <div className="relative mb-8">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50">
          <Search className="w-full h-full" />
        </div>
        <Input 
          className="h-14 pl-12 rounded-2xl bg-white border-border premium-shadow focus-visible:ring-primary/20 text-base" 
          placeholder="Search consultations..." 
        />
      </div>

      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="space-y-4 pb-32">
          {mockHistory.map((chat, i) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="p-5 bg-white rounded-[24px] border border-border premium-shadow flex items-center justify-between cursor-pointer group transition-all hover:border-primary/30"
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {chat.title}
                    </h3>
                    {chat.pinned && <Pin className="w-3 h-3 text-primary fill-primary" />}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                      <Clock className="w-3 h-3" />
                      {chat.date}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <div className="text-[10px] font-bold text-primary uppercase tracking-wider">
                      {chat.mode}
                    </div>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
