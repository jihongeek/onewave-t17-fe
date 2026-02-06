"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Lightbulb,
  Users,
  Clock,
  TrendingUp,
  Settings,
  Bell,
  Edit3,
} from "lucide-react";

const MOCK_USER = {
  name: "Kim Minsu",
  email: "minsu@example.com",
  joinedAt: "2025. 12",
  ideasCount: 3,
  upvotesReceived: 287,
  projectsJoined: 2,
};

const MOCK_IDEAS = [
  {
    id: "1",
    title: "AI Healthcare Chatbot",
    score: 87,
    upvotes: 142,
    status: "active",
    createdAt: "2 days ago",
  },
  {
    id: "2",
    title: "Smart Diet Management App",
    score: 72,
    upvotes: 56,
    status: "active",
    createdAt: "1 week ago",
  },
  {
    id: "3",
    title: "Remote Team Collaboration Tool",
    score: 68,
    upvotes: 89,
    status: "done",
    createdAt: "2 weeks ago",
  },
];

const MOCK_PROJECTS = [
  {
    id: "p1",
    title: "Freelancer Tax Calculator",
    role: "Frontend Dev",
    owner: "Lee Jiyeon",
    members: 4,
  },
  {
    id: "p2",
    title: "AI Resume Optimizer",
    role: "Backend Dev",
    owner: "Jung Harin",
    members: 3,
  },
];

const MOCK_ACTIVITIES = [
  {
    id: "a1",
    text: "AI Healthcare Chatbot received a new comment.",
    time: "1 hour ago",
  },
  {
    id: "a2",
    text: "Your team join request for Freelancer Tax Calculator was approved.",
    time: "3 hours ago",
  },
  {
    id: "a3",
    text: "Smart Diet Management App received 12 upvotes.",
    time: "1 day ago",
  },
  {
    id: "a4",
    text: "A new team member joined AI Resume Optimizer.",
    time: "2 days ago",
  },
];

export default function MyPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 md:flex-row md:items-start">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                K
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-foreground">
                {MOCK_USER.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {MOCK_USER.email}
              </p>
              <p className="text-xs text-muted-foreground">
                Joined: {MOCK_USER.joinedAt}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-6 md:justify-start">
                <div className="flex items-center gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Ideas</span>
                  <span className="font-semibold text-foreground">
                    {MOCK_USER.ideasCount}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Upvotes</span>
                  <span className="font-semibold text-foreground">
                    {MOCK_USER.upvotesReceived}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Projects</span>
                  <span className="font-semibold text-foreground">
                    {MOCK_USER.projectsJoined}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 className="mr-1.5 h-4 w-4" />
              {isEditing ? "Done" : "Edit Profile"}
            </Button>
          </div>

          {isEditing && (
            <div className="mb-8 rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Edit Profile
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input id="edit-name" defaultValue={MOCK_USER.name} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    defaultValue={MOCK_USER.email}
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label htmlFor="edit-bio">Bio</Label>
                  <Input id="edit-bio" placeholder="Tell us about yourself" />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button size="sm">Save Changes</Button>
              </div>
            </div>
          )}

          <Tabs defaultValue="ideas" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="ideas">
                <Lightbulb className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">My Ideas</span>
              </TabsTrigger>
              <TabsTrigger value="projects">
                <Users className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">Projects</span>
              </TabsTrigger>
              <TabsTrigger value="activity">
                <Clock className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ideas">
              <div className="flex flex-col gap-3">
                {MOCK_IDEAS.map((idea) => (
                  <div
                    key={idea.id}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                      <span className="text-lg font-bold text-primary">
                        {idea.score}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground">
                        {idea.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {idea.upvotes}
                        </span>
                        <span>{idea.createdAt}</span>
                      </div>
                    </div>
                    <Badge
                      variant={idea.status === "active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {idea.status === "active" ? "Active" : "Done"}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects">
              <div className="flex flex-col gap-3">
                {MOCK_PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>Role: {project.role}</span>
                        <span>|</span>
                        <span>Lead: {project.owner}</span>
                        <span>|</span>
                        <span>{project.members} members</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="flex flex-col gap-3">
                {MOCK_ACTIVITIES.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.text}</p>
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-6 text-lg font-semibold text-foreground">
                  Notification Settings
                </h2>
                <div className="flex flex-col gap-5">
                  {[
                    {
                      title: "Comment Notifications",
                      desc: "Get notified when someone comments on your idea.",
                    },
                    {
                      title: "Upvote Notifications",
                      desc: "Get notified when your idea receives upvotes.",
                    },
                    {
                      title: "Team Notifications",
                      desc: "Get notified about team join requests and approvals.",
                    },
                    {
                      title: "Email Digest",
                      desc: "Receive a weekly email summary of your activity.",
                    },
                  ].map((setting, idx) => (
                    <div
                      key={setting.title}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <h3 className="text-sm font-medium text-foreground">
                          {setting.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {setting.desc}
                        </p>
                      </div>
                      <Switch defaultChecked={idx < 3} />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
