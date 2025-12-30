'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, BookOpen, Stethoscope, Sparkles, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useChatStore } from '@/store/useChatStore'
import Image from 'next/image'

export function WelcomeScreen({ onStartChat }: { onStartChat: (query: string) => void }) {
  const [input, setInput] = useState('')
  const { mode, setMode, settings } = useChatStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onStartChat(input)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Ultra-premium background effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />

      <motion.div 
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center mb-16 relative z-10"
      >
        <motion.div 
          className="relative w-28 h-28 mb-8 animate-float"
        >
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
          <Image src="/images/logo.png" alt="Logo" fill className="object-contain relative z-10" priority />
        </motion.div>
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-6 border border-primary/20">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Verified Medical Intelligence</span>
        </div>

        <h1 className="text-6xl font-black tracking-tighter text-gradient mb-4 text-center">
          Nelson<span className="text-primary">GPT</span>
        </h1>
        
        <p className="text-muted-foreground text-xl font-medium flex items-center gap-3 opacity-80">
          <Sparkles className="w-5 h-5 text-primary" />
          The Gold Standard in Pediatric AI
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl glass rounded-[40px] p-10 premium-shadow relative z-10 group"
      >
        <div className="flex gap-4 mb-8">
          <Button 
            variant={mode === 'academic' ? 'default' : 'ghost'}
            size="lg"
            onClick={() => setMode('academic')}
            className={`rounded-2xl px-8 h-12 transition-all duration-500 ${
              mode === 'academic' 
                ? 'gold-gradient shadow-xl shadow-primary/30 border-none' 
                : 'hover:bg-primary/5 text-muted-foreground'
            }`}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Academic
          </Button>
          <Button 
            variant={mode === 'clinical' ? 'default' : 'ghost'}
            size="lg"
            onClick={() => setMode('clinical')}
            className={`rounded-2xl px-8 h-12 transition-all duration-500 ${
              mode === 'clinical' 
                ? 'gold-gradient shadow-xl shadow-primary/30 border-none' 
                : 'hover:bg-primary/5 text-muted-foreground'
            }`}
          >
            <Stethoscope className="w-5 h-5 mr-2" />
            Clinical
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How can I assist your pediatric practice today?"
            className="min-h-[180px] text-2xl font-medium resize-none border-none focus-visible:ring-0 p-0 bg-transparent placeholder:text-muted-foreground/30 leading-tight"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-primary/5">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground/40 font-bold uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
              Ready for consultation
            </div>
            <Button 
              type="submit" 
              size="icon" 
              className="rounded-[20px] w-16 h-16 gold-gradient shadow-2xl shadow-primary/40 transition-all duration-500 hover:scale-110 active:scale-95 group-hover:rotate-[-2deg]"
              disabled={!input.trim()}
            >
              <Send className="w-7 h-7 text-white" />
            </Button>
          </div>
        </form>
      </motion.div>

      {settings.showDisclaimers && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 max-w-md text-center"
        >
          <div className="h-[1px] w-12 bg-primary/20 mx-auto mb-4" />
          <p className="text-[10px] text-muted-foreground/40 leading-relaxed font-bold uppercase tracking-[0.3em]">
            Professional Medical Resource
          </p>
          <p className="mt-3 text-[10px] text-muted-foreground/30 leading-relaxed italic">
            Nelson-GPT is an advanced AI resource for healthcare professionals. It is not a substitute for clinical judgment. Always verify critical information with the Nelson Textbook of Pediatrics.
          </p>
        </motion.div>
      )}
    </div>
  )
}
