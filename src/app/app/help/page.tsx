
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LifeBuoy, Phone, Bot, SendHorizonal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: "How do I update my profile information?",
    answer: "You can update your profile by navigating to the 'My Profile' page from the sidebar. There you can edit your personal details, photos, and preferences. Remember to click 'Save Changes' when you're done."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take your privacy very seriously. All personal data is encrypted and we have strict policies in place to ensure your information is protected. We will never share your contact details without your consent."
  },
  {
    question: "How does the AI Smart Match work?",
    answer: "Our AI Smart Match tool analyzes your profile, interests, and preferences to find the most compatible partners for you. It goes beyond simple filters to understand deeper compatibility, increasing your chances of finding a meaningful connection."
  },
  {
    question: "Can I report a suspicious profile?",
    answer: "Absolutely. If you encounter a profile that seems fake or is behaving inappropriately, please use the 'Report' button on their profile page. Our moderation team will review the report and take necessary action."
  },
  {
    question: "How do I delete my account?",
    answer: "We're sad to see you go! You can delete your account from the 'Settings' section within your profile page. Please be aware that this action is irreversible and all your data will be permanently removed."
  }
];

const ChatMessage = ({ from, text, avatar }: { from: 'user' | 'bot', text: string, avatar: React.ReactNode }) => (
    <div className={cn("flex items-end gap-2", from === 'user' ? "justify-end" : "justify-start")}>
      {from === 'bot' && avatar}
      <div className={cn("max-w-xs rounded-2xl px-4 py-2", from === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none')}>
        <p className="text-sm">{text}</p>
      </div>
       {from === 'user' && avatar}
    </div>
);

export default function HelpPage() {
    const [messages, setMessages] = useState([
        { from: 'bot', text: "Hello! I'm the support bot. How can I assist you today?" }
    ]);
    const [input, setInput] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '') return;

        const newMessages = [...messages, { from: 'user', text: input }];
        setMessages(newMessages);
        setInput('');

        // Mock bot response
        setTimeout(() => {
            setMessages(prev => [...prev, { from: 'bot', text: "Thanks for your message. A support agent will review your query and get back to you shortly." }]);
        }, 1000);
    };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight flex items-center gap-2">
            <LifeBuoy className="text-primary h-8 w-8"/>
            Help & Support
        </h1>
        <p className="text-muted-foreground">We're here to help you on your journey to finding a partner.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Find quick answers to common questions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                             <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bot /> Chat with Support</CardTitle>
                    <CardDescription>Get instant help from our support bot.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col h-96">
                    <ScrollArea className="flex-1 mb-4 p-4 border rounded-md bg-background">
                         <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <ChatMessage 
                                    key={index} 
                                    from={msg.from as 'user' | 'bot'} 
                                    text={msg.text} 
                                    avatar={
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{msg.from === 'bot' ? <Bot size={18}/> : 'U'}</AvatarFallback>
                                        </Avatar>
                                    }
                                />
                            ))}
                         </div>
                    </ScrollArea>
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <Input 
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Type your message..." 
                        />
                        <Button type="submit" size="icon"><SendHorizonal/></Button>
                    </form>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Phone /> Need to talk?</CardTitle>
                    <CardDescription>Our support team is just a call away.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>For urgent matters, you can call our support line at:</p>
                    <p className="text-xl font-bold text-primary tracking-wider">+91 1800 123 4567</p>
                    <p className="text-xs text-muted-foreground">Available from 9 AM to 6 PM IST, Monday - Friday.</p>
                    <Button className="w-full">Call Now</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
