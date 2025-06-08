"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const skillOptions = [
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "TypeScript",
  "GraphQL",
  "MongoDB",
];

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "",
    title: "",
    bio: "",
    skills: [],
    level: "",
    location: "",
    rate: "",
    availability: "",
  });

  const handleChange = (field) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleSkill = (skill) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Freelancer Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={profile.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Profile Title</Label>
            <Input
              id="title"
              placeholder="Full Stack Developer"
              value={profile.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about your experience..."
              value={profile.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => (
                <Badge
                  key={skill}
                  variant={profile.skills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Experience Level</Label>
            <Select value={profile.level} onValueChange={(v) => handleChange("level", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g. Mumbai, India"
              value={profile.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate">Hourly Rate (USD)</Label>
            <Input
              id="rate"
              type="number"
              placeholder="e.g. 25"
              value={profile.rate}
              onChange={(e) => handleChange("rate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Availability</Label>
            <Select
              value={profile.availability}
              onValueChange={(v) => handleChange("availability", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="not-available">Not Available</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Button onClick={() => console.log(profile)}>Save Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
