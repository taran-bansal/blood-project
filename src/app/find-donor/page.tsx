"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropletIcon, MapPinIcon, SearchIcon } from "lucide-react";

export default function FindDonorPage() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="container max-w-6xl py-6">
      <h1 className="text-3xl font-bold mb-8">Find Blood Donors</h1>
      
      {/* Search Section */}
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city or PIN code"
                    className="w-full p-2 pl-8 border rounded-md bg-background"
                  />
                  <MapPinIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>

              <Button className="w-full">
                <SearchIcon className="mr-2 h-4 w-4" />
                Search Donors
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Donors</h2>
          
          {/* Sample donor cards - In real app, this would be populated from backend */}
          {[1, 2, 3].map((donor) => (
            <Card key={donor}>
              <CardContent className="flex items-start gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <DropletIcon className="h-6 w-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">Donor #{donor}</h3>
                      <p className="text-sm text-gray-500">Location: Delhi, India</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-sm font-medium text-red-600">
                          O+
                        </span>
                        <span className="text-sm text-gray-500">Last donated: 3 months ago</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 