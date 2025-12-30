'use client'

import { motion } from 'framer-motion'
import { User, Mail, Calendar, BarChart2, Shield, LogOut, ChevronRight, Award, Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export function ProfileScreen() {
  return (
    <div className="flex flex-col h-screen bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">Medical <span className="text-primary">Profile</span></h1>
        <p className="text-muted-foreground text-sm font-medium">Your professional pediatric dashboard</p>
      </header>

      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="space-y-8 pb-32">
          <div className="flex flex-col items-center p-8 bg-white rounded-[32px] border border-border premium-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                <Star className="w-3 h-3 fill-primary" />
                Premium
              </div>
            </div>
            <Avatar className="w-28 h-28 border-4 border-white shadow-2xl mb-6">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-white text-3xl font-black">DZ</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-black text-foreground">Dr. Zee</h2>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mt-1">Pediatric Resident</p>
            <div className="flex items-center gap-2 mt-4 text-muted-foreground">
              <Award className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Verified Professional</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white border-border rounded-[24px] premium-shadow overflow-hidden group">
              <CardContent className="p-6 flex flex-col items-center relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
                <BarChart2 className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-3xl font-black text-foreground">124</span>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Consultations</span>
              </CardContent>
            </Card>
            <Card className="bg-white border-border rounded-[24px] premium-shadow overflow-hidden group">
              <CardContent className="p-6 flex flex-col items-center relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
                <Calendar className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-3xl font-black text-foreground">12</span>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">Day Streak</span>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-2">Account Details</h3>
            <div className="space-y-3">
              {[
                { icon: Mail, label: 'Email Address', value: 'drzee1205@pm.me' },
                { icon: Shield, label: 'Privacy & Security', value: 'Managed by Nelson-GPT' },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-5 bg-white rounded-[24px] border border-border premium-shadow group hover:bg-primary/5 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-foreground">{item.label}</p>
                      {item.value && <p className="text-xs font-medium text-muted-foreground mt-0.5">{item.value}</p>}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            <Button variant="outline" className="w-full justify-between p-5 h-auto rounded-[24px] border-border bg-white premium-shadow hover:bg-destructive/5 group text-destructive hover:text-destructive mt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-destructive/5 flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-destructive" />
                </div>
                <span className="font-bold text-base">Sign Out</span>
              </div>
              <ChevronRight className="w-5 h-5 text-destructive/30 group-hover:text-destructive transition-colors" />
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
