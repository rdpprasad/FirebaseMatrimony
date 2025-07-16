import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { allProfiles } from '@/lib/mock-data.tsx';
import { CheckCircle, MessageSquare, User } from 'lucide-react';

function ProfileCard({ profile }: { profile: (typeof allProfiles)[0] }) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative">
          <Avatar className="w-full h-48 rounded-none">
            <AvatarImage src={profile.avatar} alt={profile.name} className="object-cover" data-ai-hint="portrait person" />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {profile.verified &&
            <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
              <CheckCircle className="h-4 w-4" />
            </div>
          }
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="font-headline text-xl">{profile.name}</CardTitle>
        <CardDescription className="mt-1">{profile.age}, {profile.location}</CardDescription>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{profile.profileDetails}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button size="sm" className="flex-1"><User className="mr-2 h-4 w-4" /> View Profile</Button>
        <Button size="sm" variant="outline" className="flex-1"><MessageSquare className="mr-2 h-4 w-4" /> Connect</Button>
      </CardFooter>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Welcome back, Aditi!</h1>
        <p className="text-muted-foreground">Here are some profiles we think you might like.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProfiles.slice(1).map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
