"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BuildingIcon, MapPinIcon, SearchIcon, PhoneIcon, ClockIcon } from "lucide-react";

interface BloodBank {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  availableGroups: string[];
}

export default function BloodBanksPage() {
  const [location, setLocation] = useState("");
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([
    {
      id: 1,
      name: "City Blood Bank #1",
      address: "123 Healthcare Street, Delhi, India",
      phone: "+91 98765-43210",
      hours: "Open 24/7",
      availableGroups: ["A+", "B+", "O+", "AB+"]
    },
    {
      id: 2,
      name: "Metro Blood Center",
      address: "456 Medical Avenue, Mumbai, India",
      phone: "+91 98765-43211",
      hours: "8:00 AM - 8:00 PM",
      availableGroups: ["A+", "A-", "B+", "O+"]
    },
    {
      id: 3,
      name: "Regional Blood Bank",
      address: "789 Hospital Road, Bangalore, India",
      phone: "+91 98765-43212",
      hours: "Open 24/7",
      availableGroups: ["O+", "O-", "AB+", "AB-"]
    }
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter blood banks based on location
    const filteredBanks = bloodBanks.filter(bank => 
      !location || bank.address.toLowerCase().includes(location.toLowerCase())
    );
    setBloodBanks(filteredBanks);
  };

  const handleReset = () => {
    setLocation("");
    // Reset to original blood banks list
    setBloodBanks([
      {
        id: 1,
        name: "City Blood Bank #1",
        address: "123 Healthcare Street, Delhi, India",
        phone: "+91 98765-43210",
        hours: "Open 24/7",
        availableGroups: ["A+", "B+", "O+", "AB+"]
      },
      {
        id: 2,
        name: "Metro Blood Center",
        address: "456 Medical Avenue, Mumbai, India",
        phone: "+91 98765-43211",
        hours: "8:00 AM - 8:00 PM",
        availableGroups: ["A+", "A-", "B+", "O+"]
      },
      {
        id: 3,
        name: "Regional Blood Bank",
        address: "789 Hospital Road, Bangalore, India",
        phone: "+91 98765-43212",
        hours: "Open 24/7",
        availableGroups: ["O+", "O-", "AB+", "AB-"]
      }
    ]);
  };

  const handleGetDirections = (bank: BloodBank) => {
    // Open Google Maps with the bank's address
    const address = encodeURIComponent(bank.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  return (
    <div className="container max-w-6xl py-6">
      <h1 className="text-3xl font-bold mb-8">Find Blood Banks</h1>
      
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Search Blood Banks</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
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

              <div className="space-y-2">
                <Button type="submit" className="w-full">
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search Blood Banks
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={handleReset}>
                  Reset Search
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Blood Banks</h2>
          
          {bloodBanks.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                No blood banks found in this location. Try searching in a different area.
              </CardContent>
            </Card>
          ) : (
            bloodBanks.map((bank) => (
              <Card key={bank.id}>
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <BuildingIcon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{bank.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPinIcon className="h-4 w-4" />
                          {bank.address}
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <PhoneIcon className="h-4 w-4" />
                            {bank.phone}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <ClockIcon className="h-4 w-4" />
                            {bank.hours}
                          </p>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {bank.availableGroups.map((group) => (
                            <span key={group} className="rounded-full bg-green-100 px-2 py-0.5 text-sm font-medium text-green-600">
                              {group} Available
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleGetDirections(bank)}
                      >
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 