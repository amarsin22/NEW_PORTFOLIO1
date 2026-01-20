import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Code2, Brain, Sparkles, Send, X } from 'lucide-react';

// Mock AI responses for demo
const mockAIResponses = [
  {
    question: "Tell me about your AI Email Responder project",
    answer: "The AI Email Responder uses OpenAI's GPT-4o-mini model to generate context-aware email replies. It analyzes incoming emails for tone, intent, and content, then suggests appropriate responses. Built with Python and Streamlit, it reduces email response time by 60%."
  },
  {
    question: "How do you integrate AI with web applications?",
    answer: "I typically use a three-layer approach: 1) Frontend (React/TypeScript) for user interaction, 2) Backend API (Node.js/Express) for business logic, and 3) AI Services (OpenAI API/LangChain) for intelligent features. All integrated with secure API calls and proper error handling."
  },
  {
    question: "What's your experience with LangChain?",
    answer: "I've used LangChain for building AI workflows, particularly in my Task Management Agent project. I've implemented chains for natural language processing, memory management for conversation context, and agents that can use tools like Google Sheets API."
  }
];

const AIFeatures = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI portfolio assistant. Ask me anything about Amar's projects, skills, or experience!", isBot: true }
  ]);
  const [selectedDemo, setSelectedDemo] = useState<number | null>(null);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: userInput, isBot: false }];
    setMessages(newMessages);
    
    // Find matching response or give default
    const matchedResponse = mockAIResponses.find(r => 
      userInput.toLowerCase().includes(r.question.toLowerCase().split(' ')[0])
    );
    
    setTimeout(() => {
      const botResponse = matchedResponse 
        ? matchedResponse.answer 
        : "I can answer questions about Amar's AI projects (Email Responder, Task Agent, Weather Dashboard), technical skills, or work experience. Try asking something like 'Tell me about the AI Email project'.";
      
      setMessages([...newMessages, { text: botResponse, isBot: true }]);
    }, 1000);
    
    setUserInput('');
  };

  const aiFeatures = [
    {
      icon: <Bot className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Project Q&A",
      description: "Ask questions about any project and get detailed technical explanations",
      color: "from-blue-500 to-cyan-500",
      demoQuestions: [
        "How does the email responder work?",
        "What AI models did you use?"
      ]
    },
    {
      icon: <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Code Generator",
      description: "Generate code snippets based on my coding patterns and best practices",
      color: "from-purple-500 to-pink-500",
      demoQuestions: [
        "Show API integration code",
        "Generate React component"
      ]
    },
    {
      icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Skills Matcher",
      description: "See which of my skills match your project requirements",
      color: "from-green-500 to-emerald-500",
      demoQuestions: [
        "Do you know React + Node?",
        "What AI tools do you use?"
      ]
    }
  ];

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
            Interactive AI features that make my portfolio come alive. Try them out!
          </p>
        </motion.div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedDemo(index)}
              className={`bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 min-h-[180px] sm:min-h-[200px] flex flex-col justify-between`}
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-white/20 rounded-lg mr-3 sm:mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold">{feature.title}</h3>
              </div>
              <p className="mb-4 sm:mb-6 opacity-90 text-sm sm:text-base">{feature.description}</p>
              <div className="space-y-1.5 sm:space-y-2">
                {feature.demoQuestions.map((q, idx) => (
                  <div key={idx} className="text-xs sm:text-sm bg-white/10 rounded-lg p-2 sm:p-3">
                    "{q}"
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demo Area */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Try the AI Assistant</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Ask questions about my projects, skills, or experience
              </p>
            </div>
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow min-h-[44px] w-full sm:w-auto"
            >
              <MessageSquare className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Open AI Chat
            </button>
          </div>

          {/* Demo Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-lg font-semibold">Sample Questions:</h4>
              {mockAIResponses.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setUserInput(item.question);
                    setChatOpen(true);
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full mr-2 sm:mr-3"></div>
                    <span className="font-medium text-sm sm:text-base">{item.question}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 rounded-xl p-3 sm:p-4 font-mono text-xs sm:text-sm">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-green-400">AI Assistant Terminal</span>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="text-cyan-400">$ ask --skill="AI Integration"</div>
                <div className="text-gray-300">
                  › OpenAI API: Beginner to Intermediate level experience
                  <br />
                  › LangChain: Workflow orchestration
                  <br />
                  › n8n: Automation pipelines
                  <br />
                  › 4 production AI projects
                </div>
                <div className="text-cyan-400 mt-3 sm:mt-4">$ ask --project="Email Responder"</div>
                <div className="text-gray-300">
                  › Tech: Python, Streamlit, GPT-4o-mini
                  <br />
                  › Impact: 60% faster email responses
                  <br />
                  › Status: Live demo available
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl w-full max-w-md shadow-2xl"
          >
            {/* Chat Header */}
            <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg mr-3">
                  <Bot className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base">AI Portfolio Assistant</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Ask me anything!</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg min-h-[44px] min-w-[44px]"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-64 sm:h-80 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-3 text-sm sm:text-base ${
                      msg.isBot
                        ? 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                        : 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-tr-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about projects, skills, or experience..."
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Try: "Tell me about the AI Email Responder project"
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Selected Demo Overlay */}
      {selectedDemo !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl w-full max-w-md sm:max-w-lg p-4 sm:p-6"
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold">
                {aiFeatures[selectedDemo].title} Demo
              </h3>
              <button
                onClick={() => setSelectedDemo(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg min-h-[44px] min-w-[44px]"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{aiFeatures[selectedDemo].description}</p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 sm:p-4">
                <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Try These Questions:</h4>
                <div className="space-y-2 sm:space-y-3">
                  {aiFeatures[selectedDemo].demoQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setUserInput(q);
                        setChatOpen(true);
                        setSelectedDemo(null);
                      }}
                      className="w-full text-left p-3 sm:p-4 bg-white dark:bg-gray-900 rounded-lg hover:shadow-md transition-shadow text-sm sm:text-base"
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setChatOpen(true)}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold text-sm sm:text-base min-h-[44px]"
                >
                  Open in AI Chat
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default AIFeatures;
