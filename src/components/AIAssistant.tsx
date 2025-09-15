import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react';

const AIAssistant = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI Emergency Response Assistant. How can I help you coordinate disaster relief efforts today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const quickActions = [
    { id: 1, text: 'What\'s the current situation?', icon: AlertTriangle },
    { id: 2, text: 'Recommend resource allocation', icon: TrendingUp },
    { id: 3, text: 'Generate evacuation plan', icon: Lightbulb },
    { id: 4, text: 'Analyze damage reports', icon: Bot }
  ];

  const handleSendMessage = async (messageText = null) => {
    const message = messageText || inputMessage.trim();
    if (!message) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        "What's the current situation?": "Based on real-time data analysis:\n\n• Hurricane Category 3 approaching Florida Coast (87% probability)\n• 3 active emergency zones requiring immediate attention\n• 127 response teams deployed, 89% operational capacity\n• 1,247 people successfully evacuated to safety\n\nI recommend maintaining current evacuation protocols and preparing additional medical resources for Zone Alpha.",
        
        "Recommend resource allocation": "AI Analysis suggests optimal resource distribution:\n\n**High Priority:**\n• Deploy 2 additional medical teams to Hurricane Zone Alpha\n• Redistribute 2,000 water bottles from low-risk to high-risk areas\n• Position rescue boats at strategic coastal points\n\n**Efficiency Gains:**\n• Current routing saves 12% travel time vs manual planning\n• Predictive modeling shows 40% casualty increase without intervention\n\nShall I initiate these deployments?",
        
        "Generate evacuation plan": "Generating optimized evacuation plan:\n\n**Phase 1 (Immediate):**\n• Evacuate coastal Zone A - 15,420 residents\n• Primary routes: Highway 23, Route 101 (if accessible)\n• Shelter capacity: 18,000 people across 12 centers\n\n**Phase 2 (6-12 hours):**\n• Expand to Zone B if hurricane intensifies\n• Activate secondary shelters\n• Deploy additional transportation resources\n\n**Contingency:** Alternative routes prepared for flooding scenarios",
        
        "Analyze damage reports": "Analysis of recent damage assessments:\n\n**Miami Beach, FL:**\n• 247 structures damaged, 89 destroyed\n• AI Confidence: 94%\n• Infrastructure: 12 roads blocked, 34 damaged\n\n**Key Insights:**\n• Damage pattern consistent with Category 3 winds\n• Hospital access routes maintained\n• Recommend immediate debris clearing on Main St.\n\nDetailed reports available for download."
      };

      const response = responses[message] || 
        "I understand you need assistance with " + message.toLowerCase() + ". Based on current data, I recommend:\n\n• Prioritizing safety protocols\n• Coordinating with local response teams\n• Monitoring situation updates\n\nWould you like me to provide more specific guidance on any aspect of emergency response?";

      const aiMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-sm text-green-600">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'assistant' && (
                  <Bot className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 border border-gray-200 px-4 py-2 rounded-lg max-w-xs">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-blue-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => handleSendMessage(action.text)}
                className="p-2 text-xs text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Icon className="w-3 h-3 text-gray-600" />
                <span className="text-gray-700 truncate">{action.text}</span>
              </button>
            );
          })}
        </div>

        {/* Input */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={() => handleSendMessage()}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;