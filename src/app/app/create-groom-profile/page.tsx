
'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allProfiles } from '@/lib/mock-data.tsx';
import { Camera, Save, Upload, Video } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const user = allProfiles[1];

const profileFormSchema = z.object({
  name: z.string().min(1, { message: "Full Name is required." }),
  dob: z.date({
    required_error: "Date of birth is required.",
  }),
  religion: z.string().min(1, { message: "Religion is required." }),
  height: z.string().min(1, { message: "Height is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  education: z.string().min(1, { message: "Highest Education is required." }),
  occupation: z.string().min(1, { message: "Occupation is required." }),
  interests: z.string().optional(),
  profileDetails: z.string().optional(),
  preferences: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  name: user.name,
  religion: "",
  height: "",
  location: user.location,
  education: user.education,
  occupation: "",
  interests: user.interests.join(', '),
  profileDetails: user.profileDetails,
  preferences: user.preferences,
};


const educationLevels = [
  {
    "category": "School Education",
    "items": [
        "10th Class",
        "12th Class"
    ]
  },
  {
    "category": "After 10th",
    "items": [
      "Diploma in Engineering (Polytechnic)",
      "Diploma in Pharmacy (D.Pharm)",
      "Diploma in Computer Applications (DCA)",
      "Diploma in Fashion Designing",
      "Diploma in Hotel Management",
      "Diploma in Agriculture",
      "Diploma in Web Designing",
      "Diploma in Photography",
      "Industrial Training Institute (ITI) Courses"
    ]
  },
  {
    "category": "Bachelor's Degrees (After 12th)",
    "items": [
      "B.A. (Bachelor of Arts)",
      "B.Sc. (Bachelor of Science)",
      "B.Com. (Bachelor of Commerce)",
      "BBA (Bachelor of Business Administration)",
      "BCA (Bachelor of Computer Applications)",
      "BSW (Bachelor of Social Work)",
      "BMS (Bachelor of Management Studies)",
      "BFA (Bachelor of Fine Arts)",
      "BHM (Bachelor of Hotel Management)",
      "B.E. / B.Tech (Engineering)",
      "MBBS (Medicine)",
      "BDS (Dental Surgery)",
      "BAMS (Ayurveda)",
      "BHMS (Homeopathy)",
      "B.Pharm (Pharmacy)",
      "B.Arch (Architecture)",
      "LLB (Bachelor of Law – 5-year integrated course)",
      "B.Ed (Bachelor of Education – after graduation)"
    ]
  },
  {
    "category": "Postgraduate Degrees (After Bachelor's)",
    "items": [
      "M.A. (Master of Arts)",
      "M.Sc. (Master of Science)",
      "M.Com. (Master of Commerce)",
      "MBA (Master of Business Administration)",
      "MCA (Master of Computer Applications)",
      "M.Tech / M.E. (Engineering)",
      "M.Ed. (Education)",
      "MSW (Master of Social Work)",
      "LL.M (Master of Law)",
      "M.Pharm (Pharmacy)",
      "M.Arch (Architecture)",
      "M.Des (Design)"
    ]
  },
  {
    "category": "Doctoral Degrees (After PG)",
    "items": [
      "Ph.D. (Doctor of Philosophy)",
      "M.Phil. (Master of Philosophy)",
      "D.Litt. (Doctor of Literature)",
      "D.Sc. (Doctor of Science)",
      "MD/MS (Postgraduate Medicine)",
      "DM/M.Ch (Super-Speciality in Medicine)"
    ]
  },
  {
    "category": "Vocational & Certificate Courses",
    "items": [
      "Computer Basics / Tally / Excel",
      "Foreign Language Courses",
      "Spoken English",
      "Graphic Design",
      "Digital Marketing",
      "Animation & Multimedia",
      "Mobile Repairing",
      "Beauty & Wellness",
      "Fashion Designing (Short Term)"
    ]
  },
  {
    "category": "Distance & Online Education",
    "items": [
      "IGNOU (Indira Gandhi National Open University)",
      "Swayam (GOI e-learning platform)",
      "State Open Universities",
      "Online MBA",
      "Online BBA",
      "Online MCA",
      "Certificate MOOCs (Coursera, edX, etc.)"
    ]
  }
];

const occupationCategories = [
    {
        "category": "Government Jobs",
        "items": ["IAS", "IPS", "IFS", "Bank PO (SBI, IBPS, RBI)", "School Teacher (Govt)", "College Professor (Govt)", "Defence (Army, Navy, Air Force)", "Police Services", "Railway Jobs", "Public Sector Undertakings (PSUs)", "Judiciary (Judge, Public Prosecutor)"]
    },
    {
        "category": "Private Sector Jobs",
        "items": ["Software Engineer", "Data Analyst", "Chartered Accountant", "Company Secretary", "HR Manager", "Marketing Executive", "Sales Executive", "Customer Support / BPO", "Legal Associate", "Private School Teacher", "Graphic Designer", "UI/UX Designer", "Architect", "Interior Designer", "Hotel Manager", "Chef"]
    },
    {
        "category": "Freelance & Professional Careers",
        "items": ["Lawyer / Legal Consultant", "Doctor / Dentist", "Physiotherapist", "Freelance Writer / Blogger", "YouTuber", "Social Media Influencer", "Photographer / Videographer", "Event Planner", "Fitness Trainer", "Yoga Instructor", "Voiceover Artist", "Actor / Actress", "Therapist / Counselor", "Astrologer / Numerologist", "Makeup Artist / Beautician"]
    },
    {
        "category": "Online Businesses",
        "items": ["E-commerce Seller (Amazon, Flipkart)", "Dropshipping", "Digital Marketing Agency", "SEO Services", "Online Course Creator", "Affiliate Marketing", "App Development", "Stock Market Trader", "Crypto Trader", "Blogger (AdSense Revenue)"]
    },
    {
        "category": "Offline Businesses",
        "items": ["Retail Store Owner", "Grocery Store", "Clothing Shop", "Restaurant / Cafe", "Food Truck", "Salon / Spa", "Tuition / Coaching Center", "Courier / Delivery Franchise", "Printing / Xerox Shop", "Travel Agency", "Real Estate Broker", "Gym / Fitness Studio", "Bookstore / Stationery Shop", "Pet Shop / Pet Breeding"]
    },
    {
        "category": "Skilled Trades & Labour",
        "items": ["Electrician", "Plumber", "Auto Mechanic", "Tailor", "Carpenter", "Mason", "Driver (Cab, Auto)", "Cook / Caterer", "Housekeeping", "Security Guard", "Delivery Boy (Zomato, Swiggy, Amazon)"]
    },
    {
        "category": "Home-Based & Remote Work",
        "items": ["Data Entry Operator", "Online Tutor", "Virtual Assistant", "Online Survey Taker", "Transcriptionist", "Voiceover Freelancer", "Proofreader", "Remote Tech Support", "Online Reseller (Meesho, GlowRoad)"]
    },
    {
        "category": "Creative & Artistic Careers",
        "items": ["Fashion Designer", "Handicraft Maker", "Calligraphy Artist", "Jewelry Designer", "Pottery Artist", "Musician", "Singer / DJ", "Dance Instructor"]
    },
    {
        "category": "Agriculture & Rural Work",
        "items": ["Farmer (Crop Farming)", "Organic Farming", "Poultry Farming", "Goat / Sheep Farming", "Beekeeping", "Fish Farming", "Dairy Business", "Rural Handicrafts", "Agri-Tech Startups"]
    },
    {
        "category": "Modern / Emerging Fields",
        "items": ["AI Engineer", "Machine Learning Specialist", "Cybersecurity Analyst", "Blockchain Developer", "UI/UX Designer", "Ethical Hacker", "Game Streamer", "Drone Operator", "EdTech Entrepreneur", "HealthTech Founder"]
    },
    {
        "category": "Religious / Spiritual Services",
        "items": ["Purohit / Pandit", "Priest", "Vastu Consultant", "Motivational Speaker", "Spiritual Guru", "Reiki Healer", "Meditation Teacher", "Yoga Guru"]
    },
    {
        "category": "Miscellaneous Income Sources",
        "items": ["Rental Income (Property)", "Book Royalties", "Music Royalties", "Pension / Annuity", "Cashback / Rewards", "MLM / Network Marketing (Caution Advised)", "Affiliate Commissions"]
    }
];

const religionOptions = [
    "Hinduism",
    "Islam",
    "Christianity",
    "Sikhism",
    "Buddhism",
    "Jainism",
    "Judaism",
    "Zoroastrianism",
    "Baháʼí Faith",
    "Spiritual - not religious",
    "No Religion",
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

export default function CreateGroomProfilePage() {
  const [photos, setPhotos] = useState<(string | null)[]>([user.avatar, null, null, null, null]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedPhotoIndex = useRef<number | null>(null);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    toast({
      title: "Profile Saved!",
      description: "The groom's profile has been successfully saved.",
    })
  }

  const handlePhotoClick = (index: number) => {
    selectedPhotoIndex.current = index;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && selectedPhotoIndex.current !== null) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhotos = [...photos];
        newPhotos[selectedPhotoIndex.current!] = e.target?.result as string;
        setPhotos(newPhotos);
      };
      reader.readAsDataURL(file);
    }
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
    selectedPhotoIndex.current = null;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Create Groom's Profile</h1>
        <p className="text-muted-foreground">A complete and authentic profile gets the best matches.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Groom's Photos</CardTitle>
                    <CardDescription>Add up to 5 photos.</CardDescription>
                </CardHeader>
                <CardContent>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <div className="grid grid-cols-3 gap-2">
                        {photos.map((photo, i) => (
                             <div key={i} className="aspect-square bg-muted rounded-md flex items-center justify-center relative group cursor-pointer" onClick={() => handlePhotoClick(i)}>
                                {photo ? (
                                    <Image src={photo} alt={`User photo ${i + 1}`} layout="fill" className="rounded-md object-cover" data-ai-hint="portrait person" />
                                ) : (
                                    <Camera className="h-6 w-6 text-muted-foreground" />
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 pointer-events-none">
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
                    <CardDescription>Let his personality shine!</CardDescription>
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
                    <CardTitle className="font-headline text-2xl">Groom's Information</CardTitle>
                    <CardDescription>This is how other members will see the groom. Make it count!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="sm:col-span-2">
                            <h3 className="text-lg font-semibold font-headline">Personal Details</h3>
                        </div>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dob"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date of Birth</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    captionLayout="dropdown-buttons"
                                    fromYear={1970}
                                    toYear={new Date().getFullYear() - 18}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                            control={form.control}
                            name="religion"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Religion</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Select religion" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {religionOptions.map(religion => (
                                                <SelectItem key={religion} value={religion}>{religion}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                          control={form.control}
                          name="height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Height</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger><SelectValue placeholder="Select height" /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent>{heightOptions()}</SelectContent>
                                </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="sm:col-span-2 mt-4">
                             <h3 className="text-lg font-semibold font-headline">Education & Career</h3>
                        </div>
                        <FormField
                          control={form.control}
                          name="education"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Highest Education</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-80">
                                    {educationLevels.map(group => (
                                        <SelectGroup key={group.category}>
                                            <SelectLabel className="bg-muted m-1 p-2 rounded-md font-bold">{group.category}</SelectLabel>
                                            {group.items.map(item => (
                                                <SelectItem key={item} value={item}>{item}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    ))}
                                </SelectContent>
                                </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="occupation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Occupation</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger><SelectValue placeholder="Select occupation"/></SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-80">
                                    {occupationCategories.map(group => (
                                        <SelectGroup key={group.category}>
                                            <SelectLabel className="bg-muted m-1 p-2 rounded-md font-bold">{group.category}</SelectLabel>
                                            {group.items.map(item => (
                                                <SelectItem key={item} value={item}>{item}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    ))}
                                </SelectContent>
                                </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="sm:col-span-2 mt-4">
                            <h3 className="text-lg font-semibold font-headline">About & Preferences</h3>
                        </div>
                        <FormField
                            control={form.control}
                            name="interests"
                            render={({ field }) => (
                                <FormItem className="sm:col-span-2">
                                <FormLabel>Interests (comma separated)</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="profileDetails"
                            render={({ field }) => (
                                <FormItem className="sm:col-span-2">
                                <FormLabel>About the Groom</FormLabel>
                                <FormControl>
                                    <Textarea rows={4} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="preferences"
                            render={({ field }) => (
                                <FormItem className="sm:col-span-2">
                                <FormLabel>Partner Preferences</FormLabel>
                                <FormControl>
                                    <Textarea rows={4} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="sm:col-span-2 flex justify-end">
                            <Button type="submit"><Save className="mr-2 h-4 w-4"/> Save Profile</Button>
                        </div>
                    </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

    