import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/ThemeToggle";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export default function LunaChatBot() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Luna, your AI companion for mental wellness. I'm here to listen, support, and help you navigate your emotions. How are you feeling today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const goBack = () => {
    setLocation("/");
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand how you're feeling. It's completely normal to experience these emotions. Would you like to talk more about what's troubling you?",
        "Thank you for sharing that with me. Your feelings are valid, and I'm here to support you through this. What would help you feel better right now?",
        "That sounds challenging. Remember that every small step forward is progress. What's one thing that usually brings you comfort?",
        "I can sense the strength in your words. Acknowledging these feelings takes courage. How can we work together to help you feel more balanced?",
        "It's okay to feel this way. Emotions are temporary, and you don't have to go through this alone. What support do you need right now?"
      ];

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen aura-background relative">
      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-20">
        <ThemeToggle />
      </div>
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-white/8 dark:bg-white/4 rounded-full floating-animation gentle-pulse" />
        <div className="absolute bottom-40 right-16 w-16 h-16 bg-white/5 dark:bg-white/3 rounded-full floating-animation" />
      </div>
      <div className="relative z-10 min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              onClick={goBack}
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-gray-900 hover:bg-white/20 glassmorphism font-medium"
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-light mb-4 drop-shadow-lg">
              <span className="bg-gradient-to-r from-gray-800 to-purple-900 bg-clip-text text-transparent font-semibold">
                Luna ChatBot Assistant
              </span>
            </h1>
            <p className="text-lg font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm text-[#968894]">
              Your AI companion trained on emotional intelligence and wellness support
            </p>
          </div>

          {/* Chat Interface */}
          <Card className="glassmorphism border-white/20 bg-card/90 backdrop-blur-xl max-w-4xl mx-auto" data-testid="card-chat-interface">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Bot className="w-6 h-6 text-primary" />
                Chat with Luna
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Messages Area */}
              <ScrollArea className="h-96 w-full rounded-lg border border-white/20 bg-white/10 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user' ? 'bg-primary' : 'bg-accent'}`}>
                          {message.sender === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${message.sender === 'user' ? 'bg-primary text-white' : 'bg-white/20 text-card-foreground'}`}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="flex gap-3 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-accent">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white/20 text-card-foreground rounded-2xl px-4 py-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your thoughts or feelings..."
                  className="flex-1 bg-white/20 border-white/30 text-card-foreground placeholder:text-muted-foreground"
                  data-testid="input-chat-message"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-primary hover:bg-primary/90"
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Features Notice */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Luna is trained on GoEmotions and Mood Logs datasets for emotional intelligence
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}