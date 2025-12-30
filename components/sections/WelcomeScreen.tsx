'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, BookOpen, Stethoscope, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useChatStore } from '@/store/useChatStore'
import Image from 'next/image'

export function WelcomeScreen({ onStartChat }: { onStartChat: (query: string) => void }) {
  const [input, setInput] = useState('')
  const { mode, setMode } = useChatStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onStartChat(input)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center mb-16 relative z-10"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="relative w-24 h-24 mb-6 drop-shadow-2xl"
        >
          <Image src="/images/logo.png" alt="Logo" fill className="object-contain" priority />
        </motion.div>
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-2">
          Nelson<span className="text-primary">-GPT</span>
        </h1>
        <p className="text-muted-foreground text-lg font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          The Gold Standard in Pediatric AI
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="w-full max-w-2xl glass rounded-[32px] p-8 premium-shadow relative z-10"
      >
        <div className="flex gap-3 mb-6">
          <Button 
            variant={mode === 'academic' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setMode('academic')}
            className={`rounded-full px-6 transition-all ${mode === 'academic' ? 'shadow-lg shadow-primary/20' : 'hover:bg-primary/5'}`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Academic
          </Button>
          <Button 
            variant={mode === 'clinical' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setMode('clinical')}
            className={`rounded-full px-6 transition-all ${mode === 'clinical' ? 'shadow-lg shadow-primary/20' : 'hover:bg-primary/5'}`}
          >
            <Stethoscope className="w-4 h-4 mr-2" />
            Clinical
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Nelson-GPT anything..."
            className="min-h-[160px] text-xl resize-none border-none focus-visible:ring-0 p-0 bg-transparent placeholder:text-muted-foreground/50"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <div className="flex justify-between items-center mt-6">
            <div className="text-xs text-muted-foreground font-medium">
              Press Enter to send
            </div>
            <Button 
              type="submit" 
              size="icon" 
              className="rounded-2xl w-14 h-14 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95"
              disabled={!input.trim()}
            >
              <Send className="w-6 h-6 text-white" />
            </Button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 max-w-lg text-center"
      >
        <p className="text-[11px] text-muted-foreground/60 leading-relaxed uppercase tracking-widest font-bold">
          Medical Disclaimer
        </p>
        <p className="mt-2 text-[10px] text-muted-foreground/50 leading-relaxed">
          Nelson-GPT is an AI assistant for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
        </p>
      </motion.div>
    </div>
  )
}
