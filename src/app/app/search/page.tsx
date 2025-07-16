'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { allProfiles } from '@/lib/mock-data.tsx';
import { CheckCircle, MessageSquare, User, SearchIcon } from 'lucide-react';

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

const allInterests = [...new Set(allProfiles.flatMap(p => p.interests))];
const allEducations = [...new Set(allProfiles.map(p => p.education))];

export default function SearchPage() {
  const [ageRange, setAgeRange] = useState([25, 35]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <Card className="sticky top-20 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2"><SearchIcon className="h-6 w-6"/> Find Your Match</CardTitle>
            <CardDescription>Use filters to narrow down your search.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="age-range">Age Range: {ageRange[0]} - {ageRange[1]}</Label>
              <Slider
                id="age-range"
                min={18}
                max={50}
                step={1}
                value={ageRange}
                onValueChange={setAgeRange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., Mumbai" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Select>
                <SelectTrigger id="education">
                  <SelectValue placeholder="Any Education" />
                </SelectTrigger>
                <SelectContent>
                  {allEducations.map(edu => <SelectItem key={edu} value={edu}>{edu}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Interests</Label>
              <div className="space-y-2">
                {allInterests.slice(0, 5).map(interest => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox id={`interest-${interest}`} />
                    <label htmlFor={`interest-${interest}`} className="text-sm font-medium leading-none capitalize">
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            </div>
             <Button className="w-full"><SearchIcon className="mr-2 h-4 w-4"/> Search</Button>
          </CardContent>
        </Card>
      </aside>
      <main className="lg:col-span-3">
        <h1 className="text-3xl font-headline font-bold tracking-tight mb-6">Search Results</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {allProfiles.slice(1).map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </main>
    </div>
  );
}
