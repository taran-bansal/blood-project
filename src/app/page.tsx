import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropletIcon, HeartPulseIcon, HospitalIcon, UsersIcon } from "lucide-react";

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
            <Button size="lg" asChild>
              <Link href="/emergency">
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
          <Card>
            <CardHeader>
              <DropletIcon className="w-10 h-10 text-red-500" />
              <CardTitle>Find Blood Donors</CardTitle>
              <CardDescription>
                Quickly locate willing blood donors in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              Search by blood type, location, and availability to find matching donors.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <HospitalIcon className="w-10 h-10 text-red-500" />
              <CardTitle>Blood Bank Network</CardTitle>
              <CardDescription>
                Access blood banks across India
              </CardDescription>
            </CardHeader>
            <CardContent>
              Find blood banks near you with real-time inventory information.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <HeartPulseIcon className="w-10 h-10 text-red-500" />
              <CardTitle>Emergency Support</CardTitle>
              <CardDescription>
                24/7 emergency blood request system
              </CardDescription>
            </CardHeader>
            <CardContent>
              Quick response system for urgent blood requirements with priority handling.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <UsersIcon className="w-10 h-10 text-red-500" />
              <CardTitle>Community</CardTitle>
              <CardDescription>
                Join our network of donors
              </CardDescription>
            </CardHeader>
            <CardContent>
              Be part of a community dedicated to saving lives through blood donation.
            </CardContent>
          </Card>
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
            <Button size="lg" asChild>
              <Link href="/register">
                Register Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
