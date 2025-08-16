import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AppIcon from "@/components/common/app-icon";

export default function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm border-b supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo (left) */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              <AppIcon
                src="/icons/logo.svg#id"
                width={220}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
          
          {/* Center navigation links */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center bg-muted rounded-full p-1">
              <Link
                href="/"
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive("/")
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Tag
              </Link>
              <Link
                href="/timeline"
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive("/timeline")
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Timeline
              </Link>
            </div>
          </div>
          
          {/* Theme toggle (right) */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
