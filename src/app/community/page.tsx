"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartIcon, UsersIcon, TrophyIcon, MessageSquareIcon, ShareIcon } from "lucide-react";

interface Story {
  id: number;
  author: string;
  title: string;
  content: string;
  lives: number;
  date: string;
}

export default function CommunityPage() {
  const [stories, setStories] = useState<Story[]>([
    {
      id: 1,
      author: "Rahul Singh",
      title: "My First Blood Donation Experience",
      content: "I was nervous at first, but the experience was incredibly rewarding. The staff was supportive, and knowing that my donation could save up to three lives made it all worth it.",
      lives: 3,
      date: "2 days ago"
    },
    {
      id: 2,
      author: "Priya Patel",
      title: "Regular Donor Journey",
      content: "I've been donating blood every 3 months for the past 2 years. It's become a meaningful part of my life, and I've inspired several friends to join the cause.",
      lives: 24,
      date: "1 week ago"
    },
    {
      id: 3,
      author: "Dr. Sharma",
      title: "The Impact of Regular Donations",
      content: "As a healthcare professional, I've witnessed countless lives saved through blood donations. Every donor is a hero in their own right.",
      lives: 100,
      date: "2 weeks ago"
    }
  ]);

  const stats = [
    { title: "Active Donors", value: "10,000+", icon: UsersIcon },
    { title: "Lives Saved", value: "50,000+", icon: HeartIcon },
    { title: "Success Stories", value: "5,000+", icon: TrophyIcon }
  ];

  const handleShare = (story: Story) => {
    // In a real app, this would open a share dialog
    alert(`Sharing story: ${story.title}`);
  };

  const handleJoinCommunity = () => {
    // In a real app, this would open a registration form
    alert("Thank you for your interest! Registration form will be available soon.");
  };

  return (
    <div className="container max-w-6xl py-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Blood Donation Community</h1>
        <p className="text-gray-600">Join our community of life-savers and make a difference</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-red-100">
                  <stat.icon className="h-6 w-6 text-red-500" />
                </div>
              </div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Success Stories Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Success Stories</h2>
        <div className="grid gap-6">
          {stories.map((story) => (
            <Card key={story.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{story.title}</h3>
                    <p className="text-sm text-gray-500">By {story.author} • {story.date}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleShare(story)}>
                    <ShareIcon className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                <p className="text-gray-600 mb-4">{story.content}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <HeartIcon className="h-4 w-4 text-red-500 mr-2" />
                  {story.lives} lives impacted
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Join Community Section */}
      <Card className="bg-red-50">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-red-100">
              <UsersIcon className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">
            Become part of our growing community of blood donors. Share your experiences,
            inspire others, and help save lives together.
          </p>
          <Button onClick={handleJoinCommunity} className="bg-red-500 hover:bg-red-600">
            <UsersIcon className="h-4 w-4 mr-2" />
            Join Community
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 