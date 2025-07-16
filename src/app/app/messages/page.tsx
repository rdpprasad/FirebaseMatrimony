
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { allProfiles } from '@/lib/mock-data.tsx';
import { cn } from '@/lib/utils';
import { SendHorizonal, Smile, Phone, Video } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState(allProfiles[1]);

  const messages = [
    { from: 'other', text: "Hey! I saw your profile and was really impressed. Your love for hiking caught my eye." },
    { from: 'me', text: "Hi! Thanks for reaching out. Yes, I love hiking! Any favorite trails?" },
    { from: 'other', text: "Definitely! There's a beautiful one just outside the city. We should go sometime if you're up for it." },
    { from: 'me', text: "I'd love that! What's your schedule like next weekend?" },
  ];

  return (
    <div className="h-[calc(100vh-theme(spacing.20))]">
      <h1 className="text-3xl font-headline font-bold tracking-tight mb-6">Messages</h1>
      <Card className="h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 shadow-lg">
        <div className="col-span-1 md:border-r">
          <CardHeader>
            <Input placeholder="Search messages..." />
          </CardHeader>
          <ScrollArea className="h-[calc(100%-8rem)]">
            <CardContent className="p-2">
              <div className="space-y-1">
                {allProfiles.slice(1).map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={cn(
                      "w-full text-left flex items-center gap-3 p-2 rounded-lg transition-colors",
                      selectedUser.id === user.id ? "bg-accent" : "hover:bg-muted"
                    )}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} data-ai-hint="portrait person" />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 truncate">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{messages[messages.length - 2].text}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </ScrollArea>
        </div>
        <div className="col-span-2 lg:col-span-3 flex flex-col h-full">
          {selectedUser ? (
            <>
              <div className="border-b p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={selectedUser.avatar} data-ai-hint="portrait person" />
                    <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold text-lg">{selectedUser.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                    </Button>
                     <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5" />
                    </Button>
                </div>
              </div>
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={cn("flex", message.from === 'me' ? 'justify-end' : 'justify-start')}>
                      <div className={cn("max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2", message.from === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none')}>
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="border-t p-4">
                <div className="relative">
                  <Input placeholder="Type a message..." className="pr-20" />
                  <div className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Smile className="h-5 w-5"/></Button>
                    <Button size="icon"><SendHorizonal className="h-5 w-5"/></Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
