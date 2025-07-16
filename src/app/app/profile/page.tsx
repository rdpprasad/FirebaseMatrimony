

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allProfiles } from '@/lib/mock-data.tsx';
import { Camera, Save, Upload, Video } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const user = allProfiles[0];

const indianBachelorDegrees = [
  "Bachelor of Arts (B.A.)",
  "Bachelor of Science (B.Sc.)",
  "Bachelor of Commerce (B.Com.)",
  "Bachelor of Engineering (B.E.)",
  "Bachelor of Technology (B.Tech.)",
  "Bachelor of Architecture (B.Arch.)",
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Computer Applications (BCA)",
  "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
  "Bachelor of Dental Surgery (BDS)",
  "Bachelor of Ayurvedic Medicine and Surgery (BAMS)",
  "Bachelor of Homeopathic Medicine and Surgery (BHMS)",
  "Bachelor of Laws (LLB)",
  "Bachelor of Education (B.Ed.)",
  "Bachelor of Pharmacy (B.Pharm)",
  "Bachelor of Fine Arts (BFA)",
  "Bachelor of Design (B.Des.)",
];

const indianDiplomaCourses = [
  "Diploma in Civil Engineering",
  "Diploma in Mechanical Engineering",
  "Diploma in Electrical Engineering",
  "Diploma in Computer Science Engineering",
  "Diploma in Information Technology",
  "Diploma in Electronics and Communication",
  "Diploma in Chemical Engineering",
  "Diploma in Automobile Engineering",
  "Diploma in Pharmacy (D.Pharm)",
  "Diploma in Nursing",
  "Diploma in Medical Laboratory Technology (DMLT)",
  "Diploma in Hotel Management",
  "Diploma in Journalism and Mass Communication",
  "Diploma in Education (D.Ed.)",
  "Diploma in Fine Arts",
  "Diploma in Graphic Design",
  "Diploma in Web Designing",
];

const occupationCategories = [
    "Accounting & Finance",
    "Administration & Office Support",
    "Advertising, Arts & Media",
    "Banking & Financial Services",
    "Business Owner / Entrepreneur",
    "Construction",
    "Consulting & Strategy",
    "Design & Architecture",
    "Education & Training",
    "Engineering",
    "Farming, Animals & Conservation",
    "Government & Defence",
    "Healthcare & Medical",
    "Hospitality & Tourism",
    "Human Resources & Recruitment",
    "Information & Communication Technology",
    "Insurance & Superannuation",
    "Legal",
    "Manufacturing, Transport & Logistics",
    "Marketing & Communications",
    "Real Estate & Property",
    "Retail & Consumer Products",
    "Sales",
    "Science & Technology",
    "Sports & Recreation",
    "Trades & Services",
    "Not Currently Working",
    "Other"
];

const heightOptions = () => {
    const options = [];
    for (let feet = 4; feet <= 7; feet++) {
        for (let inches = 0; inches < 12; inches++) {
            if (feet === 7 && inches > 0) break;
            const heightInCm = Math.round((feet * 12 + inches) * 2.54);
            const label = `${feet}' ${inches}" (${heightInCm} cm)`;
            options.push(<SelectItem key={label} value={label}>{label}</SelectItem>);
        }
    }
    return options;
}

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Keep your profile updated to get the best matches.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>My Photos</CardTitle>
                    <CardDescription>Add up to 5 photos.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                        {[...Array(5)].map((_, i) => (
                             <div key={i} className="aspect-square bg-muted rounded-md flex items-center justify-center relative group">
                                {i === 0 ? (
                                    <Image src={user.avatar} alt="User photo" layout="fill" className="rounded-md object-cover" data-ai-hint="portrait person" />
                                ) : (
                                    <Camera className="h-6 w-6 text-muted-foreground" />
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                        <Upload className="h-5 w-5" />
                                    </Button>
                                </div>
                             </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Video Introduction</CardTitle>
                    <CardDescription>Let your personality shine!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <Video className="h-10 w-10 text-muted-foreground" />
                     </div>
                     <Button variant="outline" className="w-full"><Upload className="mr-2 h-4 w-4"/> Upload Video</Button>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Profile Information</CardTitle>
                    <CardDescription>This is how other members will see you. Make it count!</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Personal Details */}
                        <div className="sm:col-span-2">
                            <h3 className="text-lg font-semibold font-headline">Personal Details</h3>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={user.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !user.age && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {user.age ? format(new Date(new Date().setFullYear(new Date().getFullYear() - user.age)), "PPP") : <span>Pick a date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    captionLayout="dropdown-buttons"
                                    fromYear={1970}
                                    toYear={new Date().getFullYear() - 18}
                                    // onSelect={field.onChange}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="height">Height</Label>
                            <Select>
                                <SelectTrigger id="height">
                                    <SelectValue placeholder="Select your height" />
                                </SelectTrigger>
                                <SelectContent>
                                    {heightOptions()}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" defaultValue={user.location} />
                        </div>

                        {/* Professional & Education Details */}
                        <div className="sm:col-span-2 mt-4">
                             <h3 className="text-lg font-semibold font-headline">Education & Career</h3>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="education">Highest Education</Label>
                            <Select defaultValue={user.education}>
                                <SelectTrigger id="education">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                    <p className="p-2 text-xs font-bold text-muted-foreground">Bachelors Degrees</p>
                                    {indianBachelorDegrees.map(degree => <SelectItem key={degree} value={degree}>{degree}</SelectItem>)}
                                    <p className="p-2 text-xs font-bold text-muted-foreground">Diplomas</p>
                                    {indianDiplomaCourses.map(diploma => <SelectItem key={diploma} value={diploma}>{diploma}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="occupation">Occupation</Label>
                            <Select>
                                <SelectTrigger id="occupation">
                                    <SelectValue placeholder="Select your occupation"/>
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                    {occupationCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        {/* About Me & Preferences */}
                        <div className="sm:col-span-2 mt-4">
                            <h3 className="text-lg font-semibold font-headline">About & Preferences</h3>
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
      </div>
    </div>
  );
}
