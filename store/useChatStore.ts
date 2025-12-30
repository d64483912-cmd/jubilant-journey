import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Message {
  id: string
  sender: 'user' | 'ai'
  content: string
  mode: 'academic' | 'clinical'
  citations?: any[]
}

interface Settings {
  theme: 'light' | 'dark'
  fontSize: 'small' | 'medium' | 'large'
  aiStyle: 'concise' | 'detailed' | 'evidence'
  showDisclaimers: boolean
}

interface ChatState {
  messages: Message[]
  isStreaming: boolean
  mode: 'academic' | 'clinical'
  settings: Settings
  addMessage: (message: Message) => void
  setStreaming: (streaming: boolean) => void
  setMode: (mode: 'academic' | 'clinical') => void
  updateSettings: (settings: Partial<Settings>) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isStreaming: false,
      mode: 'academic',
      settings: {
        theme: 'light',
        fontSize: 'medium',
        aiStyle: 'detailed',
        showDisclaimers: true,
      },
      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
      setStreaming: (streaming) => set({ isStreaming: streaming }),
      setMode: (mode) => set({ mode }),
      updateSettings: (newSettings) => 
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'nelson-gpt-storage',
    }
  )
)
