import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, MessageSquare, Code2, Brain, Sparkles, Send, X,
  Mic, MicOff, Terminal, FileCode, Zap, Cpu, Globe,
  Copy, Check, Volume2, Download, Play, Pause, RotateCcw, // Changed Refresh to RotateCcw
  ChevronRight, BookOpen, GitBranch, Database, Cloud
} from 'lucide-react';

// Types
interface Message {
  text: string;
  isBot: boolean;
  timestamp?: Date;
  type?: 'text' | 'code' | 'link' | 'skill';
}

interface AIFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  demoQuestions: string[];
  endpoint?: string;
  isLive?: boolean;
}

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'ai' | 'tools';
}

// Mock data with more variety
const mockAIResponses = [
  {
    question: "Tell me about your AI Email Responder project",
    answer: "The AI Email Responder uses OpenAI's GPT-4o-mini model to generate context-aware email replies. Built with Python, Streamlit, and OpenAI API. Features: sentiment analysis, tone matching, multi-language support. Reduces response time by 60%.",
    type: "project" as const,
    tags: ["Python", "OpenAI", "Streamlit"]
  },
  {
    question: "How do you integrate AI with web applications?",
    answer: "Three-layer architecture: 1) React/TypeScript frontend 2) Node.js/Express API 3) AI services (OpenAI, LangChain). Implement secure API calls, rate limiting, and fallback mechanisms. Use WebSocket for real-time updates.",
    type: "architecture" as const,
    tags: ["React", "Node.js", "OpenAI"]
  },
  {
    question: "What's your experience with LangChain?",
    answer: "Extensive experience building AI workflows: conversational agents with memory, document loaders, vector stores, and tool usage. Built a Task Management Agent that can interact with Google Sheets and Calendar APIs.",
    type: "skill" as const,
    tags: ["LangChain", "Python", "AI"]
  },
  {
    question: "Show me a React component example",
    answer: `import React, { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const CustomButton: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <button
      onClick={async () => {
        setIsLoading(true);
        await onClick();
        setIsLoading(false);
      }}
      className={\`px-4 py-2 rounded-lg font-medium transition-all \${
        variant === 'primary' 
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
      }\`}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : label}
    </button>
  );
};

export default CustomButton;`,
    type: "code" as const,
    language: "typescript"
  }
];

// Skills data
const skillsData: Skill[] = [
  { name: "React/Next.js", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Node.js", level: 88, category: "backend" },
  { name: "Python", level: 92, category: "backend" },
  { name: "OpenAI API", level: 87, category: "ai" },
  { name: "LangChain", level: 82, category: "ai" },
  { name: "PostgreSQL", level: 80, category: "backend" },
  { name: "Docker", level: 75, category: "tools" },
  { name: "AWS", level: 78, category: "tools" },
];

const AIFeatures = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your AI portfolio assistant. Ask me about projects, skills, or request code examples!", isBot: true, timestamp: new Date() }
  ]);
  const [selectedDemo, setSelectedDemo] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'skills' | 'code'>('chat');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aiChatHistory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChatHistory(parsed);
      } catch (e) {
        console.error('Error loading chat history:', e);
      }
    }
  }, []);

  // Enhanced AI features
  const aiFeatures: AIFeature[] = [
    {
      icon: <Bot className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Project Q&A",
      description: "Interactive Q&A about projects with technical details and live demos",
      color: "from-blue-500 to-cyan-500",
      demoQuestions: [
        "Explain AI Email Responder architecture",
        "Show me the tech stack",
        "What was the biggest challenge?"
      ],
      endpoint: "/api/ai/project-qa",
      isLive: true
    },
    {
      icon: <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Code Generator",
      description: "Generate production-ready code snippets based on my coding patterns",
      color: "from-purple-500 to-pink-500",
      demoQuestions: [
        "Generate a React hook for API calls",
        "Show Python FastAPI endpoint",
        "Create a TypeScript utility function"
      ],
      endpoint: "/api/ai/code-gen",
      isLive: true
    },
    {
      icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Skills Explorer",
      description: "Interactive visualization of skills and experience levels",
      color: "from-green-500 to-emerald-500",
      demoQuestions: [
        "Show my backend skills",
        "Compare AI frameworks",
        "What's my strongest area?"
      ],
      endpoint: "/api/ai/skills",
      isLive: true
    },
    {
      icon: <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Live Terminal",
      description: "Execute code snippets and see real-time output",
      color: "from-orange-500 to-red-500",
      demoQuestions: [
        "Run a sorting algorithm",
        "Test API endpoint",
        "Calculate complexity"
      ],
      endpoint: "/api/ai/terminal",
      isLive: false
    }
  ];

  // Enhanced message handling with different types
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: Message = { 
      text: userInput, 
      isBot: false, 
      timestamp: new Date() 
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    // Save to history
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    localStorage.setItem('aiChatHistory', JSON.stringify(updatedHistory));

    // Simulate AI processing with different response types
    setTimeout(() => {
      const matchedResponse = mockAIResponses.find(r => 
        userInput.toLowerCase().includes(r.question.toLowerCase().split(' ')[0]) ||
        r.tags?.some(tag => userInput.toLowerCase().includes(tag.toLowerCase()))
      );

      let botResponse: Message;
      
      if (matchedResponse) {
        botResponse = {
          text: matchedResponse.answer,
          isBot: true,
          timestamp: new Date(),
          type: matchedResponse.type
        };
      } else if (userInput.toLowerCase().includes('skill') || userInput.toLowerCase().includes('experience')) {
        botResponse = {
          text: generateSkillsResponse(),
          isBot: true,
          timestamp: new Date(),
          type: 'skill'
        };
      } else if (userInput.toLowerCase().includes('code') || userInput.toLowerCase().includes('generate')) {
        botResponse = {
          text: generateCodeResponse(),
          isBot: true,
          timestamp: new Date(),
          type: 'code'
        };
      } else {
        botResponse = {
          text: "I can help you with: \n\n1. **Project Details**: Ask about AI Email Responder, Task Agent, etc.\n2. **Code Generation**: Request React/Python/TypeScript code\n3. **Skills Analysis**: Explore my technical expertise\n4. **Architecture**: Learn about my system designs\n\nTry: 'Show me a React component example' or 'What are your strongest skills?'",
          isBot: true,
          timestamp: new Date()
        };
      }

      setMessages([...newMessages, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const generateSkillsResponse = () => {
    const categories = ['frontend', 'backend', 'ai'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categorySkills = skillsData.filter(s => s.category === randomCategory);
    
    return `**${randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1)} Skills:**\n\n` +
      categorySkills.map(s => 
        `${s.name}: ${'⭐'.repeat(Math.floor(s.level / 20))} (${s.level}%)`
      ).join('\n') +
      `\n\n*Top skill in this category: ${categorySkills.sort((a, b) => b.level - a.level)[0].name}*`;
  };

  const generateCodeResponse = () => {
    const codeSnippets = [
      `// Custom React Hook for API calls
import { useState, useEffect } from 'react';

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};`,

      `# Python FastAPI Endpoint
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: Optional[bool] = None

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/items/")
def create_item(item: Item):
    return {
        "message": "Item created",
        "item": item.dict(),
        "status": "success"
    }`
    ];

    return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in your browser');
      return;
    }

    setIsListening(!isListening);
    // Implement actual speech recognition here
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([{ text: "Chat cleared! How can I help you today?", isBot: true, timestamp: new Date() }]);
    localStorage.removeItem('aiChatHistory');
    setChatHistory([]);
  };

  const renderMessageContent = (msg: Message) => {
    if (msg.type === 'code') {
      return (
        <div className="relative group">
          <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
            <code>{msg.text}</code>
          </pre>
          <button
            onClick={() => handleCopyCode(msg.text)}
            className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {copiedCode === msg.text ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      );
    }

    if (msg.type === 'skill') {
      return (
        <div className="space-y-2">
          {msg.text.split('\n').map((line, idx) => (
            <div key={idx} className="text-sm sm:text-base">
              {line.includes('**') ? (
                <strong className="text-primary-600 dark:text-primary-400">
                  {line.replace(/\*\*/g, '')}
                </strong>
              ) : (
                line
              )}
            </div>
          ))}
        </div>
      );
    }

    return <div className="whitespace-pre-line text-sm sm:text-base">{msg.text}</div>;
  };

  return (
    <section id="ai" className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-3 sm:mb-4">
            <Sparkles className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">AI-Powered Features</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Interactive AI features with voice input, code generation, and skills analysis
          </p>
        </motion.div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { icon: <MessageSquare />, label: "Questions Answered", value: "247" },
            { icon: <Code2 />, label: "Code Snippets", value: "89" },
            { icon: <Brain />, label: "Skills Mapped", value: "32" },
            { icon: <Zap />, label: "Response Time", value: "<1s" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-sm"
            >
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-3">
                  <div className="text-primary-600 dark:text-primary-400">
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden group cursor-pointer min-h-[180px] sm:min-h-[200px] flex flex-col justify-between`}
              onClick={() => setSelectedDemo(index)}
            >
              {!feature.isLive && (
                <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                  Coming Soon
                </div>
              )}
              
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-white/20 rounded-lg mr-3 sm:mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold">{feature.title}</h3>
              </div>
              
              <p className="mb-4 sm:mb-6 opacity-90 text-sm sm:text-base flex-grow">{feature.description}</p>
              
              <div className="space-y-1.5 sm:space-y-2">
                {feature.demoQuestions.slice(0, 2).map((q, idx) => (
                  <div key={idx} className="text-xs sm:text-sm bg-white/10 rounded-lg p-2 sm:p-3 truncate">
                    "{q}"
                  </div>
                ))}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo Area with Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl"
        >
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(['chat', 'skills', 'code'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tab === 'chat' && <MessageSquare className="inline w-4 h-4 mr-2" />}
                {tab === 'skills' && <Brain className="inline w-4 h-4 mr-2" />}
                {tab === 'code' && <Code2 className="inline w-4 h-4 mr-2" />}
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === 'chat' && (
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Live AI Assistant</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Ask questions and get intelligent responses about my work
                </p>
                <button
                  onClick={() => setChatOpen(true)}
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow w-full sm:w-auto"
                >
                  <MessageSquare className="mr-2" />
                  Open Live Chat
                </button>
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Skills Explorer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['frontend', 'backend', 'ai', 'tools'].map(category => {
                    const categorySkills = skillsData.filter(s => s.category === category);
                    return (
                      <div key={category} className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                        <h4 className="font-bold mb-3 capitalize">{category}</h4>
                        <div className="space-y-3">
                          {categorySkills.map(skill => (
                            <div key={skill.name}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{skill.name}</span>
                                <span>{skill.level}%</span>
                              </div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                                  style={{ width: `${skill.level}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Code Generator</h3>
                <div className="bg-gray-900 rounded-xl p-4 font-mono">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <button
                      onClick={() => handleCopyCode(generateCodeResponse())}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <pre className="text-gray-100 text-xs sm:text-sm overflow-x-auto">
                    <code>{generateCodeResponse()}</code>
                  </pre>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => setChatOpen(true)}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Request custom code →
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Enhanced AI Chat Modal */}
      <AnimatePresence>
        {chatOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col h-[80vh]"
            >
              {/* Enhanced Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg mr-3">
                    <Bot className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">AI Portfolio Assistant</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isTyping ? 'Typing...' : 'Powered by GPT-4 & Custom Knowledge Base'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleVoiceInput}
                    className={`p-2 rounded-lg ${
                      isListening
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    title={isListening ? 'Stop listening' : 'Voice input'}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={handleClearChat}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    title="Clear chat"
                  >
                    <RotateCcw className="w-5 h-5" /> {/* Changed from Refresh */}
                  </button>
                  <button
                    onClick={() => setChatOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl p-4 ${
                        msg.isBot
                          ? 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                          : 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-tr-none'
                      }`}
                    >
                      {renderMessageContent(msg)}
                      <div className="text-xs opacity-50 mt-2">
                        {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Chat Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about projects, skills, or request code..."
                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!userInput.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-sm text-gray-500">Quick prompts:</span>
                  {['Show code example', 'Skills analysis', 'Project architecture'].map(prompt => (
                    <button
                      key={prompt}
                      onClick={() => setUserInput(prompt)}
                      className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Selected Demo Modal */}
      <AnimatePresence>
        {selectedDemo !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl w-full max-w-md sm:max-w-lg p-4 sm:p-6"
            >
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <div className="flex items-center">
                  <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg mr-3">
                    {aiFeatures[selectedDemo].icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    {aiFeatures[selectedDemo].title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDemo(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <p className="text-gray-600 dark:text-gray-400">
                  {aiFeatures[selectedDemo].description}
                </p>
                
                {aiFeatures[selectedDemo].endpoint && (
                  <div className="text-sm text-gray-500">
                    API Endpoint: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {aiFeatures[selectedDemo].endpoint}
                    </code>
                  </div>
                )}

                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                  <h4 className="font-bold mb-3">Try These Questions:</h4>
                  <div className="space-y-2">
                    {aiFeatures[selectedDemo].demoQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setUserInput(q);
                          setChatOpen(true);
                          setSelectedDemo(null);
                          inputRef.current?.focus();
                        }}
                        className="w-full text-left p-3 bg-white dark:bg-gray-900 rounded-lg hover:shadow-md transition-shadow flex items-center justify-between group"
                      >
                        <span>"{q}"</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedDemo(null)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setChatOpen(true);
                      setSelectedDemo(null);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    Open in Chat
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AIFeatures;