import { create } from 'zustand'

interface Message {
  id: string
  sender: 'user' | 'ai'
  content: string
  mode: 'academic' | 'clinical'
  citations?: any[]
}

interface ChatState {
  messages: Message[]
  isStreaming: boolean
  mode: 'academic' | 'clinical'
  addMessage: (message: Message) => void
  setStreaming: (streaming: boolean) => void
  setMode: (mode: 'academic' | 'clinical') => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isStreaming: false,
  mode: 'academic',
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setStreaming: (streaming) => set({ isStreaming: streaming }),
  setMode: (mode) => set({ mode }),
  clearMessages: () => set({ messages: [] }),
}))
