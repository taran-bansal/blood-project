"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropletIcon, MenuIcon } from "lucide-react";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <DropletIcon className="h-6 w-6 text-red-500" />
              <span className="font-bold">Blood Network</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="/find-donor" className="transition-colors hover:text-foreground/80">
                Find Donor
              </Link>
              <Link href="/blood-banks" className="transition-colors hover:text-foreground/80">
                Blood Banks
              </Link>
              <Link href="/donate" className="transition-colors hover:text-foreground/80">
                Donate
              </Link>
              <Link href="/emergency-request" className="text-red-500 font-bold">
                Emergency
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button variant="outline" className="hidden md:flex" asChild>
                <Link href="/donate">Register as Donor</Link>
              </Button>
            </div>
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="fixed inset-0 top-14 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
          <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              <Link
                href="/find-donor"
                className="flex w-full items-center rounded-md p-2 hover:underline"
              >
                Find Donor
              </Link>
              <Link
                href="/blood-banks"
                className="flex w-full items-center rounded-md p-2 hover:underline"
              >
                Blood Banks
              </Link>
              <Link
                href="/donate"
                className="flex w-full items-center rounded-md p-2 hover:underline"
              >
                Donate
              </Link>
              <Link
                href="/emergency-request"
                className="flex w-full items-center rounded-md p-2 text-red-500 font-bold"
              >
                Emergency
              </Link>
              <Button className="mt-4" asChild>
                <Link href="/donate">Register as Donor</Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
      <main className="container py-6">{children}</main>
      <footer className="border-t">
        <div className="container py-6 text-center text-sm">
          <p>© 2024 Blood Network. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 