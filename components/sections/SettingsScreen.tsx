'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from 'framer-motion'
import { Moon, Sun, Type, Brain, Shield, Info, LogOut, Download, ChevronRight } from 'lucide-react'
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
    <div className="flex flex-col h-screen bg-background p-6">
      <header className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">App <span className="text-primary">Settings</span></h1>
        <p className="text-muted-foreground text-sm font-medium">Personalize your Nelson-GPT experience</p>
      </header>

      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="space-y-10 max-w-2xl pb-32">
          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-2">Appearance</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-5 bg-white rounded-[24px] border border-border premium-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                    {theme === 'dark' ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
                  </div>
                  <Label className="font-bold text-base">Dark Mode</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch 
                    checked={theme === 'dark'} 
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-5 bg-white rounded-[24px] border border-border premium-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                    <Type className="w-5 h-5 text-primary" />
                  </div>
                  <Label className="font-bold text-base">Font Size</Label>
                </div>
                <Select 
                  value={settings.fontSize} 
                  onValueChange={(val: any) => updateSettings({ fontSize: val })}
                >
                  <SelectTrigger className="w-32 rounded-xl border-border bg-background font-bold text-xs uppercase tracking-wider">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-2">AI Intelligence</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-5 bg-white rounded-[24px] border border-border premium-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <Label className="font-bold text-base">Response Style</Label>
                </div>
                <Select 
                  value={settings.aiStyle} 
                  onValueChange={(val: any) => updateSettings({ aiStyle: val })}
                >
                  <SelectTrigger className="w-32 rounded-xl border-border bg-background font-bold text-xs uppercase tracking-wider">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="concise">Concise</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                    <SelectItem value="evidence">Evidence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between p-5 bg-white rounded-[24px] border border-border premium-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <Label className="font-bold text-base">Show Disclaimers</Label>
                </div>
                <Switch 
                  checked={settings.showDisclaimers} 
                  onCheckedChange={(checked) => updateSettings({ showDisclaimers: checked })} 
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-2">Data & Privacy</h2>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                onClick={handleExport}
                className="w-full justify-between p-5 h-auto rounded-[24px] border-border bg-white premium-shadow hover:bg-primary/5 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                    <Download className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold text-base">Export Consultation Data</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="w-full justify-between p-5 h-auto rounded-[24px] border-border bg-white premium-shadow hover:bg-destructive/5 group text-destructive hover:text-destructive"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-destructive/5 flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-destructive" />
                  </div>
                  <span className="font-bold text-base">Sign Out</span>
                </div>
                <ChevronRight className="w-5 h-5 text-destructive/30 group-hover:text-destructive transition-colors" />
              </Button>
            </div>
          </section>

          <div className="pt-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-primary mb-4">
              <Info className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Nelson-GPT v1.0.0 Gold</span>
            </div>
            <p className="text-[10px] text-muted-foreground/50 font-medium leading-relaxed max-w-xs mx-auto">
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
