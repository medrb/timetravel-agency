'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Loader2, MessageCircle, Send, X } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_QUESTIONS = [
  'Quelle destination me conseillez-vous ?',
  'Quels sont les prix ?',
  "Paris 1889, c'est pour qui ?",
  'Le Crétacé est-il dangereux ?',
]

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    'Bienvenue à bord, voyageur. Je suis votre Contrôleur Temporel. ' +
    'Vers quelle époque souhaitez-vous vous évader ? ' +
    "Paris 1889, la Renaissance de Florence, ou l'ère des dinosaures vous tentent-ils ?",
}

/**
 * @component ChatWidget
 * @description Floating AI chat widget connected to /api/chat with suggestions, async replies, and auto-scroll.
 * @state isOpen, messages, input, isLoading, showSuggestions
 * @sideeffects Listens for the window event open-chat and keeps focus/scroll synchronized while chatting.
 * @example
 * <ChatWidget />
 */
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener('open-chat', handler)
    return () => window.removeEventListener('open-chat', handler)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    return () => window.clearTimeout(timeoutId)
  }, [isOpen])

  const sendMessage = async (content: string) => {
    const trimmedContent = content.trim()

    if (!trimmedContent || isLoading) {
      return
    }

    const userMessage: Message = { role: 'user', content: trimmedContent }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)
    setShowSuggestions(false)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('API error')
      }

      const data = (await response.json()) as { message?: string }

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: 'assistant',
          content:
            data.message ?? 'Je consulte les archives temporelles et reviens à vous.',
        },
      ])
    } catch {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: 'assistant',
          content:
            'Les lignes temporelles sont perturbées. Veuillez réessayer dans un instant.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void sendMessage(input)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((previousState) => !previousState)}
        aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full gold-gradient text-primary-foreground shadow-[0_12px_32px_rgba(201,168,76,0.35)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:bottom-8 sm:right-8"
      >
        {isOpen ? <X className="h-5 w-5" /> : <span className="text-2xl">🎩</span>}
      </button>

      {isOpen ? (
        <div className="fixed bottom-24 right-4 z-50 flex h-[min(34rem,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-[1.25rem] border border-primary/20 bg-background/95 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:bottom-28 sm:right-8">
          <div className="flex items-center gap-3 border-b border-primary/15 bg-secondary/70 px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/12 text-xl">
              🎩
            </div>
            <div>
              <p className="font-medium text-primary">Contrôleur Temporel</p>
              <p className="text-xs text-muted-foreground">TimeTravel Agency · En ligne</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}-${message.content.slice(0, 24)}`}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'rounded-br-md gold-gradient font-medium text-primary-foreground'
                      : 'rounded-bl-md border border-primary/15 bg-secondary/55 text-foreground'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading ? (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-primary/15 bg-secondary/55 px-4 py-3 text-xs text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Consultation des archives...
                </div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>

          {showSuggestions ? (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => void sendMessage(question)}
                  className="rounded-full border border-primary/35 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/10"
                >
                  {question}
                </button>
              ))}
            </div>
          ) : null}

          <div className="border-t border-primary/15 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <MessageCircle className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez votre question..."
                  disabled={isLoading}
                  className="h-11 w-full rounded-full border border-primary/20 bg-secondary/45 pl-10 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
              <button
                type="button"
                onClick={() => void sendMessage(input)}
                disabled={!input.trim() || isLoading}
                aria-label="Envoyer le message"
                className="flex h-11 w-11 items-center justify-center rounded-full gold-gradient text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
