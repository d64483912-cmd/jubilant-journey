'use client'

import { motion } from 'framer-motion'
import { Search, Pin, Trash2, MessageSquare, Clock, ChevronRight, Sparkles } from 'lucide-react'
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
    <div className="flex flex-col h-screen bg-background p-8">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Consultation Archive</span>
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-gradient">History</h1>
      </header>

      <div className="relative mb-10">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground/30">
          <Search className="w-full h-full" />
        </div>
        <Input 
          className="h-16 pl-14 rounded-[24px] bg-white border-primary/5 premium-shadow focus-visible:ring-primary/20 text-lg font-medium placeholder:text-muted-foreground/30" 
          placeholder="Search consultations..." 
        />
      </div>

      <ScrollArea className="flex-1 -mx-4 px-4">
        <div className="space-y-5 pb-40">
          {mockHistory.map((chat, i) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02, x: 8 }}
              className="p-6 bg-white rounded-[32px] border border-primary/5 premium-shadow flex items-center justify-between cursor-pointer group transition-all duration-500 hover:border-primary/20"
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-[20px] bg-primary/5 flex items-center justify-center shrink-0 group-hover:gold-gradient transition-all duration-500">
                  <MessageSquare className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors tracking-tight">
                      {chat.title}
                    </h3>
                    {chat.pinned && <Pin className="w-3.5 h-3.5 text-primary fill-primary" />}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">
                      <Clock className="w-3.5 h-3.5" />
                      {chat.date}
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                    <div className="text-[10px] font-black text-primary uppercase tracking-widest">
                      {chat.mode}
                    </div>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
