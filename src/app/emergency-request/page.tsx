"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Clock, MapPin, Phone, User, HeartPulse, Hospital } from "lucide-react";

interface EmergencyRequest {
  id: number;
  patientName: string;
  bloodGroup: string;
  hospital: string;
  location: string;
  unitsNeeded: number;
  contactName: string;
  contactPhone: string;
  urgencyLevel: string;
  postedTime: string;
}

export default function EmergencyRequestPage() {
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    unitsNeeded: "",
    hospital: "",
    location: "",
    contactName: "",
    contactPhone: "",
    urgencyLevel: "urgent",
    additionalInfo: ""
  });

  const [activeRequests, setActiveRequests] = useState<EmergencyRequest[]>([
    {
      id: 1,
      patientName: "Amit Kumar",
      bloodGroup: "O+",
      hospital: "City General Hospital",
      location: "Sector 12, Delhi",
      unitsNeeded: 2,
      contactName: "Rajesh Kumar",
      contactPhone: "+91 98765 43210",
      urgencyLevel: "Critical",
      postedTime: "10 minutes ago"
    },
    {
      id: 2,
      patientName: "Priya Shah",
      bloodGroup: "A-",
      hospital: "Apollo Hospital",
      location: "Bandra, Mumbai",
      unitsNeeded: 3,
      contactName: "Suresh Shah",
      contactPhone: "+91 98765 43211",
      urgencyLevel: "Urgent",
      postedTime: "1 hour ago"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    alert("Emergency request submitted! We will notify nearby donors immediately.");
    // Add the new request to active requests
    const newRequest: EmergencyRequest = {
      id: activeRequests.length + 1,
      patientName: formData.patientName,
      bloodGroup: formData.bloodGroup,
      hospital: formData.hospital,
      location: formData.location,
      unitsNeeded: parseInt(formData.unitsNeeded),
      contactName: formData.contactName,
      contactPhone: formData.contactPhone,
      urgencyLevel: formData.urgencyLevel,
      postedTime: "Just now"
    };
    setActiveRequests([newRequest, ...activeRequests]);
    // Reset form
    setFormData({
      patientName: "",
      bloodGroup: "",
      unitsNeeded: "",
      hospital: "",
      location: "",
      contactName: "",
      contactPhone: "",
      urgencyLevel: "urgent",
      additionalInfo: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHelp = (request: EmergencyRequest) => {
    // In a real app, this would connect the donor with the requester
    alert(`Thank you for offering to help! We will connect you with ${request.contactName} immediately.`);
  };

  return (
    <div className="container max-w-6xl py-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Emergency Blood Request</h1>
        <p className="text-gray-600">Submit an urgent blood requirement or view active requests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Emergency Request Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Submit Emergency Request
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group Needed</Label>
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
                  <Label htmlFor="unitsNeeded">Units Required</Label>
                  <Input
                    id="unitsNeeded"
                    name="unitsNeeded"
                    type="number"
                    min="1"
                    value={formData.unitsNeeded}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospital">Hospital Name</Label>
                  <Input
                    id="hospital"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgencyLevel">Urgency Level</Label>
                  <select
                    id="urgencyLevel"
                    name="urgencyLevel"
                    className="w-full p-2 border rounded-md"
                    value={formData.urgencyLevel}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="urgent">Urgent</option>
                    <option value="critical">Critical</option>
                    <option value="immediate">Immediate</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Person Name</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Input
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
                Submit Emergency Request
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Active Emergency Requests */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-red-500" />
            Active Emergency Requests
          </h2>
          <div className="space-y-4">
            {activeRequests.map((request) => (
              <Card key={request.id} className="border-red-100">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {request.patientName}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {request.postedTime}
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium">
                      {request.bloodGroup}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm flex items-center gap-2">
                      <Hospital className="h-4 w-4 text-gray-500" />
                      {request.hospital}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      {request.location}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      {request.contactPhone}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {request.unitsNeeded} units needed
                    </span>
                    <Button
                      onClick={() => handleHelp(request)}
                      variant="outline"
                      className="border-red-200 hover:bg-red-50"
                    >
                      I Can Help
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 