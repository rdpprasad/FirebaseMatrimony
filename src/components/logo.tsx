import { Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Heart className="h-6 w-6 text-primary" />
      <span className="font-headline text-xl font-bold tracking-tight">
        Sign Without Caste
      </span>
    </div>
  );
}
