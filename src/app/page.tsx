import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Users, Search, MessageSquare, Gem, CheckCircle } from 'lucide-react';
import { successStories, howItWorks } from '@/lib/mock-data.tsx';
import { Logo } from '@/components/logo';

function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/success-stories">Success Stories</Link>
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

function LandingFooter() {
  return (
    <footer className="border-t">
      <div className="container py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-2">
          <Logo />
        </div>
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Bandhan Forever. All rights reserved.</p>
        <div className="flex items-center space-x-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-primary">Find your forever, together.</h1>
              <p className="text-lg text-muted-foreground">
                Welcome to Bandhan Forever, a modern platform for the Indian community to discover genuine connections. We believe in love and compatibility, beyond boundaries.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/app/dashboard">Find Your Partner</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Happy couple"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                data-ai-hint="happy couple"
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-secondary">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Your Journey to 'Happily Ever After'</h2>
              <p className="mt-4 text-lg text-muted-foreground">Finding your soulmate is a journey. Here’s how we make it beautiful and simple.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step) => (
                <Card key={step.id} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      {step.icon}
                    </div>
                    <CardTitle className="font-headline text-2xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Features Designed for You</h2>
              <p className="mt-4 text-lg text-muted-foreground">We provide the tools you need to find a meaningful and lasting relationship.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center space-y-3">
                <Search className="h-10 w-10 text-primary" />
                <h3 className="font-headline text-xl font-semibold">Advanced Search</h3>
                <p className="text-muted-foreground">Filter by age, education, interests and more to find your perfect match.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <Gem className="h-10 w-10 text-primary" />
                <h3 className="font-headline text-xl font-semibold">Smart Match Tool</h3>
                <p className="text-muted-foreground">Our AI-powered tool suggests compatible profiles based on your preferences.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <MessageSquare className="h-10 w-10 text-primary" />
                <h3 className="font-headline text-xl font-semibold">Secure Messaging</h3>
                <p className="text-muted-foreground">Communicate with potential partners safely and securely on our platform.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <CheckCircle className="h-10 w-10 text-primary" />
                <h3 className="font-headline text-xl font-semibold">Verified Profiles</h3>
                <p className="text-muted-foreground">We ensure authenticity with a robust profile verification system.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="success-stories" className="py-20 bg-secondary">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Love Found on Bandhan Forever</h2>
              <p className="mt-4 text-lg text-muted-foreground">Don't just take our word for it. Read stories from couples who found their forever love with us.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successStories.slice(0, 3).map((story) => (
                <Card key={story.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={story.avatar} alt={story.name} data-ai-hint="couple portrait" />
                        <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-lg">{story.name}</p>
                        <p className="text-sm text-muted-foreground">{story.location}</p>
                      </div>
                    </div>
                    <blockquote className="italic text-muted-foreground">"{story.story}"</blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild>
                <Link href="/success-stories">View More Success Stories</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
