import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allProfiles } from '@/lib/mock-data.tsx';
import { Camera, Save } from 'lucide-react';

const user = allProfiles[0];

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Keep your profile updated to get the best matches.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Profile Information</CardTitle>
            <CardDescription>This is how other members will see you. Make it count!</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 flex flex-col items-center space-y-4">
                <div className="relative">
                    <Avatar className="h-40 w-40 border-4 border-primary/20 shadow-md">
                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="portrait person" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="icon" className="absolute bottom-2 right-2 rounded-full">
                        <Camera className="h-5 w-5"/>
                    </Button>
                </div>
                <h2 className="text-2xl font-bold font-headline">{user.name}</h2>
                <p className="text-muted-foreground">{user.age}, {user.location}</p>
            </div>

            <form className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" defaultValue={user.age} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue={user.location} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Select defaultValue={user.education}>
                        <SelectTrigger id="education">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Bachelors in Design">Bachelors in Design</SelectItem>
                            <SelectItem value="Masters in Computer Science">Masters in Computer Science</SelectItem>
                            <SelectItem value="MBA">MBA</SelectItem>
                            <SelectItem value="PhD in Literature">PhD in Literature</SelectItem>
                            <SelectItem value="Masters in Finance">Masters in Finance</SelectItem>
                            <SelectItem value="Doctor (MD)">Doctor (MD)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="interests">Interests (comma separated)</Label>
                    <Input id="interests" defaultValue={user.interests.join(', ')} />
                </div>
                 <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="profile-details">About Me</Label>
                    <Textarea id="profile-details" rows={4} defaultValue={user.profileDetails} />
                </div>
                <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="preferences">Partner Preferences</Label>
                    <Textarea id="preferences" rows={4} defaultValue={user.preferences} />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                    <Button><Save className="mr-2 h-4 w-4"/> Save Changes</Button>
                </div>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}
