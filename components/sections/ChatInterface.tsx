'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ArrowLeft, MoreVertical, User, Share2, Trash2, Edit2, BookOpen, Sparkles } from 'lucide-react'
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
  const { messages, isStreaming, addMessage, mode, setStreaming } = useChatStore()
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
        body: JSON.stringify({ messages: [...messages, userMsg], mode }),
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
      <header className="flex items-center justify-between p-4 border-b glass sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-primary/5">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex flex-col">
            <h2 className="font-bold text-base truncate max-w-[180px]">
              {messages[0]?.content || 'New Consultation'}
            </h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                {mode} Mode Active
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5">
            <Share2 className="w-4 h-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl p-2">
              <DropdownMenuItem className="rounded-xl"><Edit2 className="w-4 h-4 mr-2" /> Rename</DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <ScrollArea className="flex-1 px-4" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-8 py-8 pb-32">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-4 max-w-[90%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    msg.sender === 'user' ? 'bg-secondary' : 'bg-primary'
                  }`}>
                    {msg.sender === 'user' ? (
                      <User className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <div className="relative w-7 h-7">
                        <Image src="/images/logo.png" alt="N" fill className="object-contain brightness-0 invert" />
                      </div>
                    )}
                  </div>
                  <div className={`p-5 rounded-[24px] premium-shadow ${
                    msg.sender === 'user' 
                      ? 'bg-[#F4EFEA] text-foreground rounded-tr-none' 
                      : 'bg-white border border-border rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{msg.content}</p>
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-[10px] font-extrabold text-primary mb-3 uppercase tracking-widest">
                          <Sparkles className="w-3 h-3" />
                          Evidence Sources
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {msg.citations.map((c, i) => (
                            <div key={i} className="text-[11px] bg-primary/5 border border-primary/10 text-primary px-3 py-1.5 rounded-xl font-medium">
                              [{i + 1}] Nelson Textbook, Ch. {c.chapter}
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
              <div className="bg-white border border-border p-5 rounded-[24px] rounded-tl-none premium-shadow">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent z-20">
        <div className="max-w-3xl mx-auto relative">
          <div className="glass rounded-[28px] p-2 premium-shadow flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a follow-up..."
              className="min-h-[52px] max-h-40 border-none bg-transparent resize-none py-3 px-4 text-base focus-visible:ring-0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            <Button 
              size="icon" 
              className="rounded-2xl w-12 h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 shrink-0 mb-1 mr-1"
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
            >
              <Send className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
