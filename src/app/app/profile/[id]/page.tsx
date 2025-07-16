
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { allProfiles } from '@/lib/mock-data.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Briefcase, Calendar, CheckCircle, GraduationCap, Heart, Locate, MapPin, MessageSquare, Phone, User, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfileDetailPage({ params }: { params: { id: string } }) {
  const profile = allProfiles.find((p) => p.id === params.id);

  if (!profile) {
    return <div className="text-center">Profile not found.</div>;
  }

  // Mock data for photo gallery
  const photos = [
    profile.avatar,
    'https://placehold.co/600x400.png',
    'https://placehold.co/600x400.png',
    'https://placehold.co/600x400.png',
    'https://placehold.co/600x400.png',
  ];

  return (
    <div className="space-y-8">
        <div>
            <Button variant="ghost" asChild>
                <Link href="/app/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
            </Button>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card className="shadow-lg">
            <CardContent className="p-0">
                 <div className="grid grid-cols-1 gap-2">
                    <div className="aspect-w-1 aspect-h-1">
                        <Image src={photos[0]} alt={`Photo of ${profile.name}`} width={400} height={400} className="rounded-t-lg object-cover w-full h-full" data-ai-hint="portrait person" />
                    </div>
                    <div className="grid grid-cols-4 gap-2 p-2">
                        {photos.slice(1).map((photo, i) => (
                            <div key={i} className="aspect-square">
                                <Image src={photo} alt={`Thumbnail ${i + 1}`} width={100} height={100} className="rounded-md object-cover w-full h-full" data-ai-hint="portrait person" />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Video Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <Video className="h-10 w-10 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-3xl flex items-center gap-2">
                            {profile.name}
                            {profile.verified && <CheckCircle className="h-6 w-6 text-green-500" />}
                        </CardTitle>
                        <CardDescription className="text-base mt-1">
                            {profile.age} years old
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                         <Button><MessageSquare className="mr-2 h-4 w-4" /> Connect</Button>
                         <Button variant="outline" size="icon"><Heart/></Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 text-base">
              <div>
                <h3 className="text-lg font-semibold font-headline mb-2">About {profile.name.split(' ')[0]}</h3>
                <p className="text-muted-foreground">{profile.profileDetails}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold font-headline">Personal Details</h3>
                    <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-primary"/>
                        <span>{profile.age} years old</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary"/>
                        <span>{profile.location}</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <GraduationCap className="h-5 w-5 text-primary"/>
                        <span>{profile.education}</span>
                    </div>
                </div>

                 <div className="space-y-4">
                    <h3 className="text-lg font-semibold font-headline">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                        {profile.interests.map(interest => (
                            <div key={interest} className="bg-accent text-accent-foreground text-sm px-3 py-1 rounded-full capitalize">{interest}</div>
                        ))}
                    </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold font-headline mb-2">Partner Preferences</h3>
                <p className="text-muted-foreground">{profile.preferences}</p>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
