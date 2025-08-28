import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { MessageSquare, X, Send } from "lucide-react";
import { useWebSocket } from "../Utills/websocket";

interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: "Hello! I'm your AI travel assistant. I can help you find the perfect Maldivian experience, check ferry schedules, or connect you with our certified agents. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(Math.random().toString(36).substring(7));

  const { sendMessage, isConnected } = useWebSocket();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Send message via WebSocket
    sendMessage({
      type: 'chat_message',
      sessionId: sessionId.current,
      message: newMessage,
      userId: null // For anonymous users
    });

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: generateAIResponse(newMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('booking') || message.includes('book')) {
      return "I'd be happy to help you with bookings! I can assist you in finding the perfect guest house or experience. Would you like me to show you our featured properties or connect you with one of our certified agents for personalized assistance?";
    }
    
    if (message.includes('ferry') || message.includes('transport')) {
      return "For ferry schedules and inter-island transport, I can help you find the best routes. Our system shows real-time availability for speedboats, seaplanes, and ferries. What's your departure and destination?";
    }
    
    if (message.includes('flight') || message.includes('airline') || message.includes('domestic') || message.includes('seaplane')) {
      return "Great! We offer domestic flights and seaplane services connecting islands across the Maldives. Our airlines include Maldivian, Trans Maldivian Airways, and FlyMe with routes to popular destinations like Gan, Hanimaadhoo, and Fuvahmulah. Prices start from $95. Would you like to see available flights for specific dates and destinations?";
    }
    
    if (message.includes('price') || message.includes('cost')) {
      return "Our guest houses range from $320-$890 per night depending on the property and season. Experiences start from $95 for cultural tours. Would you like me to show you options within a specific budget range?";
    }
    
    if (message.includes('atoll') || message.includes('destination')) {
      return "The Maldives has 26 beautiful atolls! Popular choices include Dhaalu Atoll for luxury experiences, North Malé for easy access, and Ari Atoll for whale shark encounters. What type of experience are you looking for?";
    }

    if (message.includes('vr') || message.includes('virtual')) {
      return "Yes! We offer virtual reality tours for all our featured guest houses. You can take a 360-degree tour before booking. Would you like me to start a VR preview for any specific property?";
    }
    
    return "Thank you for your question! I'm here to help with guest house bookings, ferry schedules, experiences, and travel planning. Feel free to ask about anything related to your Maldivian adventure, or I can connect you with one of our expert agents.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      <div 
        className={`bg-niyali-gradient p-4 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'block'}`}
        onClick={() => setIsOpen(true)}
        data-testid="chat-toggle-button"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </div>
      
      {/* Chat Window */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border overflow-hidden">
          {/* Chat Header */}
          <div className="bg-niyali-gradient p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-niyali-navy font-bold text-sm">AI</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Niyali Assistant</div>
                  <div className="text-white text-xs opacity-90 flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-1 ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    {isConnected ? 'Online' : 'Offline'} • Powered by AI
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white hover:bg-opacity-20 p-1"
                onClick={() => setIsOpen(false)}
                data-testid="chat-close-button"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="h-80 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 chat-bubble ${message.sender === 'user' ? 'ml-auto' : ''}`}
                data-testid={`chat-message-${message.id}`}
              >
                <div className={`p-3 rounded-lg max-w-xs ${
                  message.sender === 'user' 
                    ? 'bg-niyali-gradient text-white ml-auto' 
                    : 'bg-white border'
                }`}>
                  <div className="text-sm">{message.message}</div>
                  <div className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white text-opacity-70' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="typing-indicator mb-4">
                <div className="bg-white border p-3 rounded-lg max-w-xs">
                  <div className="flex items-center space-x-1">
                    <div className="typing-dot bg-gray-400"></div>
                    <div className="typing-dot bg-gray-400" style={{ animationDelay: '0.2s' }}></div>
                    <div className="typing-dot bg-gray-400" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 focus:ring-2 focus:ring-niyali-gold focus:border-transparent"
                data-testid="chat-input"
              />
              <Button 
                size="sm"
                className="bg-niyali-gradient text-white hover:opacity-90 transition-opacity"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                data-testid="chat-send-button"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
