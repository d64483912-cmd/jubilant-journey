'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from 'framer-motion'
import { Moon, Sun, Type, Brain, Shield, Info, LogOut, Download, ChevronRight, Sparkles } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { useChatStore } from '@/store/useChatStore'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'

export function SettingsScreen() {
  const { settings, updateSettings, clearMessages } = useChatStore()
  const { setTheme, theme } = useTheme()

  const handleExport = () => {
    const data = JSON.stringify(useChatStore.getState().messages, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'nelson-gpt-consultations.json'
    a.click()
    toast.success('Data exported successfully')
  }

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out? This will clear your local session.')) {
      clearMessages()
      window.location.reload()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background p-8">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">System Configuration</span>
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-gradient">Settings</h1>
      </header>

      <ScrollArea className="flex-1 -mx-4 px-4">
        <div className="space-y-12 max-w-2xl pb-40">
          <section className="space-y-6">
            <h2 className="text-[11px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] px-4">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-white rounded-[32px] border border-primary/5 premium-shadow">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-[20px] bg-primary/5 flex items-center justify-center">
                    {theme === 'dark' ? <Moon className="w-6 h-6 text-primary" /> : <Sun className="w-6 h-6 text-primary" />}
                  </div>
                  <Label className="font-black text-lg tracking-tight">Dark Mode</Label>
                </div>
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
                />
              </div>
              <div className="flex items-center justify-between p-6 bg-white rounded-[32px] border border-primary/5 premium-shadow">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-[20px] bg-primary/5 flex items-center justify-center">
                    <Type className="w-6 h-6 text-primary" />
                  </div>
                  <Label className="font-black text-lg tracking-tight">Font Size</Label>
                </div>
                <Select 
                  value={settings.fontSize} 
                  onValueChange={(val: any) => updateSettings({ fontSize: val })}
                >
                  <SelectTrigger className="w-36 h-12 rounded-2xl border-primary/10 bg-background font-black text-[10px] uppercase tracking-widest">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl glass border-primary/10">
                    <SelectItem value="small" className="font-bold text-xs uppercase tracking-wider">Small</SelectItem>
                    <SelectItem value="medium" className="font-bold text-xs uppercase tracking-wider">Medium</SelectItem>
                    <SelectItem value="large" className="font-bold text-xs uppercase tracking-wider">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-[11px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] px-4">AI Intelligence</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-white rounded-[32px] border border-primary/5 premium-shadow">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-[20px] bg-primary/5 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <Label className="font-black text-lg tracking-tight">Response Style</Label>
                </div>
                <Select 
                  value={settings.aiStyle} 
                  onValueChange={(val: any) => updateSettings({ aiStyle: val })}
                >
                  <SelectTrigger className="w-36 h-12 rounded-2xl border-primary/10 bg-background font-black text-[10px] uppercase tracking-widest">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl glass border-primary/10">
                    <SelectItem value="concise" className="font-bold text-xs uppercase tracking-wider">Concise</SelectItem>
                    <SelectItem value="detailed" className="font-bold text-xs uppercase tracking-wider">Detailed</SelectItem>
                    <SelectItem value="evidence" className="font-bold text-xs uppercase tracking-wider">Evidence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between p-6 bg-white rounded-[32px] border border-primary/5 premium-shadow">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-[20px] bg-primary/5 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <Label className="font-black text-lg tracking-tight">Medical Safety</Label>
                </div>
                <Switch 
                  checked={settings.showDisclaimers} 
                  onCheckedChange={(checked) => updateSettings({ showDisclaimers: checked })} 
                />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-[11px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] px-4">Data & Privacy</h2>
            <div className="space-y-4">
              <Button 
                variant="outline" 
                onClick={handleExport}
                className="w-full justify-between p-6 h-auto rounded-[32px] border-primary/5 bg-white premium-shadow hover:bg-primary/5 group transition-all duration-500"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-[20px] bg-primary/5 flex items-center justify-center group-hover:gold-gradient transition-all duration-500">
                    <Download className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-black text-lg tracking-tight">Export Consultations</span>
                </div>
                <ChevronRight className="w-6 h-6 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-500" />
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="w-full justify-between p-6 h-auto rounded-[32px] border-primary/5 bg-white premium-shadow hover:bg-destructive/5 group text-destructive hover:text-destructive transition-all duration-500"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-[20px] bg-destructive/5 flex items-center justify-center group-hover:bg-destructive group-hover:text-white transition-all duration-500">
                    <LogOut className="w-6 h-6 text-destructive group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-black text-lg tracking-tight">Sign Out</span>
                </div>
                <ChevronRight className="w-6 h-6 text-destructive/20 group-hover:text-destructive group-hover:translate-x-1 transition-all duration-500" />
              </Button>
            </div>
          </section>

          <div className="pt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/5 rounded-full text-primary mb-6 border border-primary/10">
              <Info className="w-5 h-5" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">Nelson-GPT Gold Edition</span>
            </div>
            <p className="text-[11px] text-muted-foreground/30 font-bold leading-relaxed max-w-xs mx-auto uppercase tracking-widest">
              Inspired by the Nelson Textbook of Pediatrics.
              <br />
              © 2025 Nelson-GPT Medical Systems.
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
