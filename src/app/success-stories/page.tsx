import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { successStories } from '@/lib/mock-data.tsx';
import { Logo } from '@/components/logo';

function SuccessHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button asChild>
              <Link href="/app/dashboard">Get Started</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

function SuccessFooter() {
  return (
    <footer className="border-t">
      <div className="container py-8 flex justify-between items-center">
        <Logo />
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Bandhan Forever. All rights reserved.</p>
      </div>
    </footer>
  );
}


export default function SuccessStoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SuccessHeader />
      <main className="flex-1 bg-secondary py-12 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Journeys of Love</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover the beautiful stories of couples who found their forever love on Bandhan Forever. Your story could be next.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <Card key={story.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <Image 
                  src={`https://placehold.co/600x400.png`} 
                  alt={story.name} 
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint="couple smiling"
                />
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-16 w-16 border-2 border-primary">
                      <AvatarImage src={story.avatar} alt={story.name} data-ai-hint="couple portrait" />
                      <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-headline text-xl font-semibold">{story.name}</p>
                      <p className="text-sm text-muted-foreground">{story.location}</p>
                    </div>
                  </div>
                  <blockquote className="italic text-muted-foreground flex-1">"{story.story}"</blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <SuccessFooter />
    </div>
  );
}
