'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Gem, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { smartMatch, SmartMatchOutput } from '@/ai/flows/smart-match';
import { mainUserProfile, candidateProfiles } from '@/lib/mock-data.tsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SmartMatchPage() {
  const [matches, setMatches] = useState<SmartMatchOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSmartMatch = async () => {
    setIsLoading(true);
    setError(null);
    setMatches(null);
    try {
      const result = await smartMatch({
        userProfile: mainUserProfile,
        candidateProfiles: candidateProfiles,
      });
      setMatches(result);
    } catch (err) {
      setError('An error occurred while finding matches. Please try again.');
      console.error(err);
    }
    setIsLoading(false);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="flex flex-col md:flex-row items-center gap-6 p-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="flex-1 space-y-3 w-full">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="w-full md:w-1/4 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight flex items-center gap-2">
          <Gem className="text-primary" /> AI Smart Match
        </h1>
        <p className="text-muted-foreground">
          Let our AI find the most compatible partners for you based on deep profile analysis.
        </p>
      </div>

      <Card className="text-center p-8 shadow-lg">
        <CardContent className="space-y-4">
          <p className="max-w-2xl mx-auto text-lg">
            Ready to meet your most compatible matches? Our advanced AI will analyze your profile and preferences against thousands of others to bring you the best possible connections.
          </p>
          <Button size="lg" onClick={handleSmartMatch} disabled={isLoading}>
            {isLoading ? (
              <>
                <Bot className="mr-2 h-5 w-5 animate-spin" />
                Finding Your Matches...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Find My Smart Matches
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      {error && (
         <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading && <LoadingSkeleton />}

      {matches && (
        <div>
          <h2 className="text-2xl font-headline font-bold mb-4">Your Top Matches</h2>
          <div className="space-y-4">
            {matches.map((match, index) => (
              <Card key={index} className="flex flex-col md:flex-row items-center gap-6 p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="portrait person"/>
                  <AvatarFallback>{match.profile.age}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="font-headline text-xl">{`Anonymous User`}</CardTitle>
                  <CardDescription>{match.profile.age} years, {match.profile.location}, {match.profile.education}</CardDescription>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{match.profile.profileDetails}</p>
                </div>
                <div className="w-full md:w-1/4">
                  <h3 className="font-semibold mb-1">Compatibility: {Math.round(match.matchScore * 100)}%</h3>
                  <Progress value={match.matchScore * 100} className="h-3" />
                  <p className="text-xs text-muted-foreground italic mt-2">{match.reason}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
