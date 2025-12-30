'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ArrowLeft, MoreVertical, User, Share2, Trash2, Edit2, BookOpen, Sparkles, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useChatStore } from '@/store/useChatStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

export function ChatInterface({ onBack }: { onBack: () => void }) {
  const { messages, isStreaming, addMessage, mode, setStreaming, settings } = useChatStore()
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user' as const,
      content: input,
      mode
    }
    addMessage(userMsg)
    setInput('')
    
    setStreaming(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg], mode, aiStyle: settings.aiStyle }),
      })

      if (!response.ok) throw new Error("Failed to fetch")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let aiContent = ""
      let citations: any[] = []
      const aiMsgId = (Date.now() + 1).toString()

      addMessage({
        id: aiMsgId,
        sender: "ai",
        content: "",
        mode,
        citations: []
      })

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        
        if (chunk.includes('__CITATIONS__:')) {
          const parts = chunk.split('__END_CITATIONS__')
          const citationPart = parts[0].replace('__CITATIONS__:', '')
          try {
            citations = JSON.parse(citationPart)
          } catch (e) {}
          aiContent += parts[1] || ""
        } else {
          aiContent += chunk
        }
        
        useChatStore.setState((state) => ({
          messages: state.messages.map((m) =>
            m.id === aiMsgId ? { ...m, content: aiContent, citations } : m
          ),
        }))
      }
    } catch (error) {
      console.error("Chat error:", error)
    } finally {
      setStreaming(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-5 glass sticky top-0 z-30 border-b border-primary/5">
        <div className="flex items-center gap-5">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-2xl hover:bg-primary/5 transition-all duration-300">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex flex-col">
            <h2 className="font-black text-lg tracking-tight text-gradient truncate max-w-[220px]">
              {messages[0]?.content || 'New Consultation'}
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                {mode} Mode
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-primary/5">
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-primary/5">
                <MoreVertical className="w-6 h-6 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-[24px] p-3 glass border-primary/10 premium-shadow">
              <DropdownMenuItem className="rounded-xl font-bold text-xs uppercase tracking-wider py-3"><Edit2 className="w-4 h-4 mr-3" /> Rename</DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl font-bold text-xs uppercase tracking-wider py-3 text-destructive"><Trash2 className="w-4 h-4 mr-3" /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <ScrollArea className="flex-1 px-6" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-10 py-10 pb-40">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-5 max-w-[92%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-12 h-12 rounded-[20px] flex items-center justify-center shrink-0 shadow-lg ${
                    msg.sender === 'user' ? 'bg-secondary border border-white' : 'gold-gradient'
                  }`}>
                    {msg.sender === 'user' ? (
                      <User className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <div className="relative w-8 h-8">
                        <Image src="/images/logo.png" alt="N" fill className="object-contain brightness-0 invert" />
                      </div>
                    )}
                  </div>
                  <div className={`p-6 rounded-[32px] premium-shadow relative ${
                    msg.sender === 'user' 
                      ? 'bg-[#F4EFEA] text-foreground rounded-tr-none border border-white/50' 
                      : 'bg-white border border-primary/5 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-[16px] font-medium">{msg.content}</p>
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-primary/5">
                        <div className="flex items-center gap-2 text-[10px] font-black text-primary mb-4 uppercase tracking-[0.3em]">
                          <ShieldCheck className="w-4 h-4" />
                          Nelson Evidence
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {msg.citations.map((c, i) => (
                            <div key={i} className="text-[11px] bg-primary/5 border border-primary/10 text-primary px-4 py-2 rounded-2xl font-bold tracking-tight">
                              [{i + 1}] Ch. {c.chapter}, p. {c.page}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isStreaming && (
            <div className="flex justify-start">
              <div className="bg-white border border-primary/5 p-6 rounded-[32px] rounded-tl-none premium-shadow">
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" />
                  <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background via-background to-transparent z-20">
        <div className="max-w-3xl mx-auto relative">
          <div className="glass rounded-[36px] p-3 premium-shadow flex items-end gap-3 border border-white/60">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a follow-up consultation..."
              className="min-h-[60px] max-h-48 border-none bg-transparent resize-none py-4 px-6 text-lg font-medium focus-visible:ring-0 placeholder:text-muted-foreground/30"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            <Button 
              size="icon" 
              className="rounded-[24px] w-14 h-14 gold-gradient shadow-2xl shadow-primary/30 shrink-0 mb-1 mr-1 transition-all duration-500 hover:scale-110 active:scale-95"
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
            >
              <Send className="w-6 h-6 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
