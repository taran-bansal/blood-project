"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeartIcon, ShieldCheckIcon, CalendarIcon, UserIcon } from "lucide-react";

export default function DonatePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    bloodGroup: "",
    phone: "",
    email: "",
    address: "",
    lastDonation: "",
    medicalConditions: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    alert("Thank you for registering as a donor! We will contact you soon.");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const benefits = [
    {
      icon: HeartIcon,
      title: "Save Lives",
      description: "One donation can save up to three lives"
    },
    {
      icon: ShieldCheckIcon,
      title: "Health Check",
      description: "Free mini health check-up with every donation"
    },
    {
      icon: CalendarIcon,
      title: "Flexible Schedule",
      description: "Choose your convenient time to donate"
    },
    {
      icon: UserIcon,
      title: "Community",
      description: "Join a network of life-saving heroes"
    }
  ];

  return (
    <div className="container max-w-6xl py-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Become a Blood Donor</h1>
        <p className="text-gray-600">Join our community of heroes and help save lives</p>
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {benefits.map((benefit, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-red-100">
                  <benefit.icon className="h-6 w-6 text-red-500" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Registration Form */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Donor Registration Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="18"
                  max="65"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  className="w-full p-2 border rounded-md"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastDonation">Last Donation Date</Label>
                <Input
                  id="lastDonation"
                  name="lastDonation"
                  type="date"
                  value={formData.lastDonation}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Medical Conditions (if any)</Label>
              <Input
                id="medicalConditions"
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
              Register as Donor
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 