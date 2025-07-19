
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Bot, Sparkles, AlertCircle, MessageSquare, User, HelpingHand } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { AstrologyIcon } from '@/components/astrology-icon';
import { kundaliMatch, KundaliMatchInput, KundaliMatchOutput } from '@/ai/flows/kundali-match';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

function BirthDetailsForm({ title, details, setDetails, gender }: { title: string, details: any, setDetails: any, gender: 'female' | 'male' }) {
    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setDetails({ ...details, dob: format(date, 'yyyy-MM-dd') });
        }
    };

    return (
        <Card className="shadow-lg flex-1">
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <User className="text-primary" /> {title}
                </CardTitle>
                <CardDescription>Enter the birth details accurately.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor={`${gender}-name`}>Full Name</Label>
                    <Input id={`${gender}-name`} placeholder="e.g. Priya Singh" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor={`${gender}-dob`}>Date of Birth</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn("w-full justify-start text-left font-normal", !details.dob && "text-muted-foreground")}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {details.dob ? format(new Date(details.dob), "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={details.dob ? new Date(details.dob) : undefined}
                                    onSelect={handleDateChange}
                                    captionLayout="dropdown-buttons"
                                    fromYear={1950}
                                    toYear={new Date().getFullYear()}
                                    disabled={(date) => date > new Date() || date < new Date("1950-01-01")}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`${gender}-tob`}>Time of Birth</Label>
                        <Input id={`${gender}-tob`} type="time" value={details.tob} onChange={(e) => setDetails({ ...details, tob: e.target.value })} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`${gender}-pob`}>Place of Birth</Label>
                    <Input id={`${gender}-pob`} placeholder="e.g. Mumbai, India" value={details.pob} onChange={(e) => setDetails({ ...details, pob: e.target.value })} />
                </div>
            </CardContent>
        </Card>
    );
}

function LoadingSkeleton() {
    return (
        <Card className="p-6 md:p-8">
            <div className="animate-pulse">
                <div className="text-center space-y-4">
                    <div className="h-8 bg-muted rounded w-1/2 mx-auto"></div>
                    <div className="h-6 bg-muted rounded w-1/4 mx-auto"></div>
                </div>
                <Separator className="my-6" />
                <div className="space-y-6">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="space-y-2">
                        {[...Array(3)].map((_, i) => <div key={i} className="h-10 bg-muted rounded"></div>)}
                    </div>
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="space-y-2">
                       <div className="h-20 bg-muted rounded"></div>
                    </div>
                </div>
            </div>
        </Card>
    )
}


function KundaliResults({ results }: { results: KundaliMatchOutput }) {
    const { gunMilan, manglikReport, conclusion } = results;
    const scoreColor = gunMilan.totalPoints > 24 ? 'text-green-600' : gunMilan.totalPoints > 17 ? 'text-yellow-600' : 'text-red-600';

    return (
        <Card className="shadow-2xl mt-8 border-primary/20">
            <CardHeader className="text-center bg-muted/50 p-6 rounded-t-lg">
                <CardTitle className="font-headline text-3xl">Kundali Match Report</CardTitle>
                <CardDescription className="text-base">Compatibility analysis for {results.brideName} & {results.groomName}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
                <div className="text-center mb-8">
                    <p className="text-muted-foreground text-lg">Gun Milan Score</p>
                    <p className={`font-bold text-7xl font-headline ${scoreColor}`}>{gunMilan.totalPoints}<span className="text-3xl text-muted-foreground">/36</span></p>
                    <div className="max-w-md mx-auto mt-4">
                         <Progress value={(gunMilan.totalPoints / 36) * 100} className="h-3" />
                    </div>
                    <p className="mt-4 text-lg font-semibold">{gunMilan.conclusion}</p>
                </div>
                
                <Separator className="my-8" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <h3 className="text-xl font-headline font-bold mb-4">Ashta Koot Milan Details</h3>
                        <div className="space-y-4">
                            {gunMilan.kootDetails.map(koot => (
                                <div key={koot.name}>
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="font-semibold">{koot.name} ({koot.description})</p>
                                        <p className="font-bold">{koot.receivedPoints}/{koot.totalPoints}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{koot.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div>
                         <h3 className="text-xl font-headline font-bold mb-4">Dosha Analysis</h3>
                         <Card className="bg-muted/50">
                             <CardHeader>
                                 <CardTitle className="text-lg">Manglik (Mars) Dosha</CardTitle>
                             </CardHeader>
                             <CardContent className="space-y-2">
                                <p><span className="font-semibold">Bride:</span> {manglikReport.brideManglikStatus}</p>
                                <p><span className="font-semibold">Groom:</span> {manglikReport.groomManglikStatus}</p>
                                <Separator className="my-3"/>
                                <p className="text-sm text-muted-foreground italic">{manglikReport.conclusion}</p>
                             </CardContent>
                         </Card>
                     </div>
                </div>

                <Separator className="my-8" />

                <div>
                    <h3 className="text-xl font-headline font-bold mb-4">Astrologer's Conclusion</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{conclusion}</p>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-muted-foreground mb-4">For a personalized consultation, chat with one of our verified astrologers.</p>
                    <Button size="lg"><HelpingHand className="mr-2"/> Chat with an Astrologer</Button>
                </div>

            </CardContent>
        </Card>
    )
}

export default function KundaliMatchPage() {
    const [brideDetails, setBrideDetails] = useState({ name: '', dob: '', tob: '', pob: '' });
    const [groomDetails, setGroomDetails] = useState({ name: '', dob: '', tob: '', pob: '' });
    const [results, setResults] = useState<KundaliMatchOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleMatchmaking = async () => {
        setIsLoading(true);
        setError(null);
        setResults(null);

        if (!brideDetails.name || !brideDetails.dob || !brideDetails.tob || !brideDetails.pob || !groomDetails.name || !groomDetails.dob || !groomDetails.tob || !groomDetails.pob) {
            setError("Please fill in all birth details for both the Bride and Groom.");
            setIsLoading(false);
            return;
        }

        const input: KundaliMatchInput = {
            brideDetails: { name: brideDetails.name, gender: 'female', datetimeOfBirth: `${brideDetails.dob}T${brideDetails.tob}`, placeOfBirth: brideDetails.pob },
            groomDetails: { name: groomDetails.name, gender: 'male', datetimeOfBirth: `${groomDetails.dob}T${groomDetails.tob}`, placeOfBirth: groomDetails.pob },
        }

        try {
            const matchResult = await kundaliMatch(input);
            setResults(matchResult);
        } catch (err) {
            setError("An error occurred while matching Kundalis. Please check the details and try again.");
            console.error(err);
        }
        setIsLoading(false);
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold tracking-tight flex items-center gap-2">
                    <AstrologyIcon className="text-primary h-8 w-8" />
                    Kundali Matching
                </h1>
                <p className="text-muted-foreground">
                    Check the astrological compatibility between a bride and groom using the ancient Vedic method.
                </p>
            </div>

            {!results && !isLoading && (
                 <div className="space-y-8">
                     <div className="flex flex-col md:flex-row gap-8">
                        <BirthDetailsForm title="Bride's Details" details={brideDetails} setDetails={setBrideDetails} gender="female" />
                        <BirthDetailsForm title="Groom's Details" details={groomDetails} setDetails={setGroomDetails} gender="male" />
                    </div>
                     <div className="text-center">
                        <Button size="lg" onClick={handleMatchmaking} disabled={isLoading}>
                             <Sparkles className="mr-2 h-5 w-5" />
                            Match Kundalis
                        </Button>
                    </div>
                 </div>
            )}
            
            {error && (
                 <Alert variant="destructive" className="mt-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {isLoading && <LoadingSkeleton />}

            {results && <KundaliResults results={results} />}

        </div>
    );
}
