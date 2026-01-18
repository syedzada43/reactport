import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { ThemeConfig, ChatMessage } from '../types';
import { AI_SYSTEM_INSTRUCTION } from '../constants';

interface ChatBotProps {
  theme: ThemeConfig;
}

export const ChatBot: React.FC<ChatBotProps> = ({ theme }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm Abdullah's AI Assistant. Ask me about his projects, skills, or anything else about the world!",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            ...messages.map(m => ({ 
                role: m.role, 
                parts: [{ text: m.text }] 
            })),
            { role: 'user', parts: [{ text: input }] }
        ],
        config: {
            systemInstruction: AI_SYSTEM_INSTRUCTION
        }
      });

      const text = response.text || "I couldn't generate a response at the moment.";

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: text,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I encountered an error connecting to the AI brain. Please try again later.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple formatter for bold and italic
  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index} className="italic">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  return (
    <div className={`flex flex-col h-[65vh] md:h-[600px] w-full max-w-2xl mx-auto ${theme.colors.surface} ${theme.colors.border} border ${theme.radius} overflow-hidden shadow-xl`}>
      {/* Header */}
      <div className={`p-4 ${theme.colors.secondary} border-b ${theme.colors.border} flex items-center gap-3`}>
        <div className={`p-2 rounded-full ${theme.colors.bg} ${theme.colors.accent} border ${theme.colors.border}`}>
            <Sparkles size={20} />
        </div>
        <div>
            <h3 className={`font-bold ${theme.colors.text}`}>AI Assistant</h3>
            <p className={`text-xs ${theme.colors.muted}`}>Powered by Gemini 3</p>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${theme.colors.bg}`}
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? `${theme.colors.primary} text-white` : `${theme.colors.surface} border ${theme.colors.border} ${theme.colors.accent}`
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>

              <div className={`p-3 rounded-lg text-sm whitespace-pre-wrap shadow-sm ${
                msg.role === 'user' 
                  ? `${theme.colors.primary} text-white` 
                  : `${theme.colors.surface} ${theme.colors.text} border ${theme.colors.border}`
              }`}>
                {formatText(msg.text)}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className={`${theme.colors.surface} border ${theme.colors.border} p-3 rounded-lg flex items-center gap-2`}>
                <Loader2 size={16} className={`animate-spin ${theme.colors.accent}`} />
                <span className={`text-xs ${theme.colors.muted}`}>Thinking...</span>
             </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className={`p-3 ${theme.colors.secondary} border-t ${theme.colors.border}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className={`flex-1 ${theme.colors.surface} ${theme.colors.text} placeholder-${theme.colors.muted} border ${theme.colors.border} rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-${theme.colors.accent}`}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`${theme.colors.primary} text-white p-2 rounded-md hover:opacity-90 disabled:opacity-50 transition-all`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};