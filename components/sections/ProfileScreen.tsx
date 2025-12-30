'use client'

import { motion } from 'framer-motion'
import { User, Mail, Calendar, BarChart2, Shield, LogOut, ChevronRight, Award, Star, Sparkles } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export function ProfileScreen() {
  return (
    <div className="flex flex-col h-screen bg-background p-8">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Professional Identity</span>
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-gradient">Profile</h1>
      </header>

      <ScrollArea className="flex-1 -mx-4 px-4">
        <div className="space-y-10 pb-40">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center p-10 bg-white rounded-[40px] border border-primary/5 premium-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6">
              <div className="gold-gradient text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-primary/20">
                <Star className="w-3.5 h-3.5 fill-white" />
                Premium
              </div>
            </div>
            
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
              <Avatar className="w-32 h-32 border-4 border-white shadow-2xl relative z-10">
                <AvatarImage src="" />
                <AvatarFallback className="gold-gradient text-white text-4xl font-black">DZ</AvatarFallback>
              </Avatar>
            </div>

            <h2 className="text-3xl font-black text-foreground tracking-tight mb-1">Dr. Zee</h2>
            <p className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-6">Pediatric Resident</p>
            
            <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/5 rounded-2xl text-muted-foreground border border-primary/10">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-[11px] font-black uppercase tracking-widest">Verified Professional</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-white border-primary/5 rounded-[32px] premium-shadow overflow-hidden group hover:border-primary/20 transition-all duration-500">
              <CardContent className="p-8 flex flex-col items-center relative">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-primary/10 group-hover:gold-gradient transition-all duration-500" />
                <BarChart2 className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-500" />
                <span className="text-4xl font-black text-foreground tracking-tighter">124</span>
                <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] mt-2">Consultations</span>
              </CardContent>
            </Card>
            <Card className="bg-white border-primary/5 rounded-[32px] premium-shadow overflow-hidden group hover:border-primary/20 transition-all duration-500">
              <CardContent className="p-8 flex flex-col items-center relative">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-primary/10 group-hover:gold-gradient transition-all duration-500" />
                <Calendar className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-500" />
                <span className="text-4xl font-black text-foreground tracking-tighter">12</span>
                <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] mt-2">Day Streak</span>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] px-4">Account Details</h3>
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email Address', value: 'drzee1205@pm.me' },
                { icon: Shield, label: 'Privacy & Security', value: 'Managed by Nelson-GPT Gold' },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-6 bg-white rounded-[32px] border border-primary/5 premium-shadow group hover:bg-primary/5 transition-all duration-500">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-[20px] bg-primary/5 flex items-center justify-center group-hover:gold-gradient transition-all duration-500">
                      <item.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-black text-foreground tracking-tight">{item.label}</p>
                      {item.value && <p className="text-xs font-bold text-muted-foreground/60 mt-0.5 uppercase tracking-wider">{item.value}</p>}
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-500" />
                </button>
              ))}
            </div>

            <Button variant="outline" className="w-full justify-between p-6 h-auto rounded-[32px] border-primary/5 bg-white premium-shadow hover:bg-destructive/5 group text-destructive hover:text-destructive transition-all duration-500 mt-8">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-[20px] bg-destructive/5 flex items-center justify-center group-hover:bg-destructive transition-all duration-500">
                  <LogOut className="w-6 h-6 text-destructive group-hover:text-white transition-colors" />
                </div>
                <span className="font-black text-lg tracking-tight">Sign Out</span>
              </div>
              <ChevronRight className="w-6 h-6 text-destructive/20 group-hover:text-destructive group-hover:translate-x-1 transition-all duration-500" />
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
