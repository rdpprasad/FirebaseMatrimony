
import { cn } from "@/lib/utils";

export function AstrologyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-sparkles", className)}
    >
      <path d="M9.42 4.62A3.5 3.5 0 0 1 12 3a3.5 3.5 0 0 1 2.58 1.62" />
      <path d="M14.58 19.38A3.5 3.5 0 0 1 12 21a3.5 3.5 0 0 1-2.58-1.62" />
      <path d="M3 12a3.5 3.5 0 0 1 1.62-2.58" />
      <path d="M21 12a3.5 3.5 0 0 1-1.62 2.58" />
      <path d="M4.62 9.42A3.5 3.5 0 0 1 3 12" />
      <path d="M19.38 14.58A3.5 3.5 0 0 1 21 12" />
      <path d="m12 3-1.5 6 6-1.5" />
      <path d="m12 21 1.5-6-6 1.5" />
      <path d="M3 12l6 1.5-1.5 6" />
      <path d="M21 12l-6-1.5 1.5-6" />
      <path d="M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
    </svg>
  );
}
