import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User as UserIcon, Sparkles } from "lucide-react";
import { useData } from "@/lib/dataContext";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatBox() {
  const { user } = useData();
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      role: "assistant", 
      content: "Hello! I'm your Research Assistant. I can help you refine your thesis topic, suggest methodologies, or review your writing. What are you working on today?", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate AI Response
    setTimeout(() => {
      const responses = [
        "That's an interesting perspective. Have you considered how this aligns with the latest findings in the field?",
        "I recommend structuring this chapter by starting with a broad overview before narrowing down to your specific case study.",
        "Your methodology seems sound, but make sure to address potential biases in your data collection phase.",
        "Here is a list of potential sources that could support your argument...",
        "Great progress! Remember to check the formatting guidelines for citations."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: randomResponse,
        timestamp: new Date()
      }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="h-[600px] flex flex-col shadow-lg border-primary/10">
      <CardHeader className="bg-primary/5 border-b border-primary/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-serif">Research Assistant</CardTitle>
            <CardDescription>AI-powered guidance for your thesis</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-hidden bg-background/50">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <Avatar className={`h-8 w-8 ${msg.role === "assistant" ? "bg-primary/10" : "bg-secondary"}`}>
                  {msg.role === "assistant" ? (
                    <div className="h-full w-full flex items-center justify-center text-primary">
                      <Bot className="h-4 w-4" />
                    </div>
                  ) : (
                    <AvatarImage src={user?.avatar} />
                  )}
                  <AvatarFallback>{msg.role === "user" ? "U" : "AI"}</AvatarFallback>
                </Avatar>
                
                <div 
                  className={`
                    max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm
                    ${msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-white dark:bg-muted border border-border rounded-tl-none"
                    }
                  `}
                >
                  {msg.content}
                  <div className={`text-[10px] mt-1 opacity-70 ${msg.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-4 border-t border-border bg-background">
        <form 
          className="flex w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input 
            placeholder="Ask for research help..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 shadow-sm"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
