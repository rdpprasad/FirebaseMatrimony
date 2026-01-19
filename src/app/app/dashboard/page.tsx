'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import Link from 'next/link';

function CurrentUserProfileCard() {
  const { user } = useAuth();
  const userName = user?.email?.split('@')[0] || 'User';
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Your Profile</CardTitle>
        <CardDescription>This is a summary of your profile. Keep it updated to attract the best matches.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-center gap-6">
        <Avatar className="h-24 w-24 border-4 border-primary/20">
          <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold font-headline">{userName}</h3>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
        <Button asChild>
          <Link href="/app/create-bride-profile">
            <Edit className="mr-2 h-4 w-4"/>
            Complete Your Profile
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const userName = user?.email?.split('@')[0] || 'User';
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          Welcome back, {userName}!
        </h1>
        <p className="text-muted-foreground">Complete your profile to start finding matches.</p>
      </div>

      <CurrentUserProfileCard />
    </div>
  );
}
