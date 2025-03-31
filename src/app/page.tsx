import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropletIcon, HeartPulseIcon, HospitalIcon, UsersIcon, ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Save Lives Through Blood Donation
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Connect with blood donors, find blood banks, and help save lives. Join our network of heroes making a difference.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Button size="lg" className="bg-red-500 hover:bg-red-600" asChild>
              <Link href="/emergency-request">
                Emergency Request
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/donate">
                Become a Donor
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/find-donor" className="transition-transform hover:scale-105">
            <Card className="h-full cursor-pointer hover:border-red-200">
              <CardHeader>
                <DropletIcon className="w-10 h-10 text-red-500" />
                <CardTitle className="flex items-center justify-between">
                  Find Blood Donors
                  <ArrowRightIcon className="w-5 h-5 text-red-500" />
                </CardTitle>
                <CardDescription>
                  Quickly locate willing blood donors in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Search by blood type, location, and availability to find matching donors.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["A+", "B+", "O+", "AB+"].map(group => (
                    <span key={group} className="rounded-full bg-red-50 px-2 py-0.5 text-sm text-red-600">
                      {group}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/blood-banks" className="transition-transform hover:scale-105">
            <Card className="h-full cursor-pointer hover:border-red-200">
              <CardHeader>
                <HospitalIcon className="w-10 h-10 text-red-500" />
                <CardTitle className="flex items-center justify-between">
                  Blood Bank Network
                  <ArrowRightIcon className="w-5 h-5 text-red-500" />
                </CardTitle>
                <CardDescription>
                  Access blood banks across India
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Find blood banks near you with real-time inventory information.</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    24/7 Available Banks
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    Live Stock Updates
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/emergency-request" className="transition-transform hover:scale-105">
            <Card className="h-full cursor-pointer hover:border-red-200">
              <CardHeader>
                <HeartPulseIcon className="w-10 h-10 text-red-500" />
                <CardTitle className="flex items-center justify-between">
                  Emergency Support
                  <ArrowRightIcon className="w-5 h-5 text-red-500" />
                </CardTitle>
                <CardDescription>
                  24/7 emergency blood request system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Quick response system for urgent blood requirements with priority handling.</p>
                <div className="mt-4">
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-600">
                    Urgent Requests Available
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/community" className="transition-transform hover:scale-105">
            <Card className="h-full cursor-pointer hover:border-red-200">
              <CardHeader>
                <UsersIcon className="w-10 h-10 text-red-500" />
                <CardTitle className="flex items-center justify-between">
                  Community
                  <ArrowRightIcon className="w-5 h-5 text-red-500" />
                </CardTitle>
                <CardDescription>
                  Join our network of donors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Be part of a community dedicated to saving lives through blood donation.</p>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Active Donors</span>
                    <span className="font-semibold">1,000+</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                    <div className="h-2 w-3/4 rounded-full bg-red-500"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-red-50 dark:bg-red-950">
        <div className="container flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Make a Difference?
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Join our network of blood donors and help save lives in your community.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" className="bg-red-500 hover:bg-red-600" asChild>
              <Link href="/donate">
                Register as Donor
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/find-donor">
                Find Donors
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
