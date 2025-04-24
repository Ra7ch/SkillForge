"use client"

import { useState } from "react"
import { Plus, Briefcase, Clock, MapPin, Users, CalendarClock, MessagesSquare, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import dynamic from "next/dynamic"

// Lazy load the job post form component
const JobPostingForm = dynamic(() => import("@/components/job-posting-form"), {
  loading: () => <p>Loading job form...</p>,
})

// Mock data for posted jobs
const MOCK_POSTED_JOBS = [
  {
    id: "1",
    title: "Seasonal Farm Workers Needed",
    description: "Looking for experienced seasonal workers for our apple harvest.",
    location: "Yakima, WA",
    locationType: "on-site",
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    budget: {
      type: "hourly",
      amount: 18
    },
    timeline: "3 months",
    status: "active",
    applications: 7,
    views: 42
  },
  {
    id: "2",
    title: "Agricultural Engineer Consultant",
    description: "Need an experienced engineer to help with irrigation system design.",
    location: "Remote",
    locationType: "remote",
    postedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    budget: {
      type: "fixed",
      amount: 5000
    },
    timeline: "1 month",
    status: "active",
    applications: 3,
    views: 28
  },
  {
    id: "3",
    title: "Dairy Operations Assistant",
    description: "Looking for part-time help with our dairy operations.",
    location: "Madison, WI",
    locationType: "on-site",
    postedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    budget: {
      type: "hourly",
      amount: 22
    },
    timeline: "Ongoing",
    status: "active",
    applications: 12,
    views: 85
  }
];

// Mock data for job applications
const MOCK_APPLICATIONS = [
  {
    id: "app1",
    jobId: "1",
    jobTitle: "Seasonal Farm Workers Needed",
    applicant: {
      id: "user1",
      name: "John Smith",
      profilePic: "",
      rating: 4.8,
      level: 3,
      location: "Yakima, WA"
    },
    coverLetter: "I have 5 years of experience with apple harvesting and am available for the full season.",
    bidAmount: 20,
    bidType: "hourly",
    submittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending"
  },
  {
    id: "app2",
    jobId: "1",
    jobTitle: "Seasonal Farm Workers Needed",
    applicant: {
      id: "user2",
      name: "Maria Garcia",
      profilePic: "",
      rating: 4.9,
      level: 2,
      location: "Portland, OR"
    },
    coverLetter: "I've worked three harvest seasons and can start immediately. I have reliable transportation.",
    bidAmount: 19,
    bidType: "hourly",
    submittedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending"
  },
  {
    id: "app3",
    jobId: "2",
    jobTitle: "Agricultural Engineer Consultant",
    applicant: {
      id: "user3",
      name: "David Wilson",
      profilePic: "",
      rating: 5.0,
      level: 4,
      location: "Boise, ID"
    },
    coverLetter: "I'm an agricultural engineer with 12 years of experience designing irrigation systems for various types of farms.",
    bidAmount: 5500,
    bidType: "fixed",
    submittedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending"
  }
];

export default function ClientJobMarketplace() {
  const [isPostingJob, setIsPostingJob] = useState(false);
  const [activeTab, setActiveTab] = useState("posted");
  const [postedJobs, setPostedJobs] = useState(MOCK_POSTED_JOBS);
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [selectedJob, setSelectedJob] = useState(null);

  // Format date to show as "X days ago"
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else {
      return `${diffInDays} days ago`;
    }
  };

  // Format budget to display nicely
  const formatBudget = (budget) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    if (budget.type === "hourly") {
      return `${formatter.format(budget.amount)}/hr`;
    } else {
      return formatter.format(budget.amount);
    }
  };

  // Handle job submission from form
  const handleJobSubmit = (jobData) => {
    const newJob = {
      id: `job-${Date.now()}`,
      title: jobData.title,
      description: jobData.description,
      location: jobData.location,
      locationType: jobData.locationType,
      postedDate: new Date().toISOString(),
      budget: {
        type: jobData.budgetType,
        amount: Number(jobData.budgetAmount)
      },
      timeline: jobData.timeline,
      status: "active",
      applications: 0,
      views: 0
    };
    
    setPostedJobs([newJob, ...postedJobs]);
    setIsPostingJob(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Job Marketplace</h2>
          <p className="text-gray-600">Post jobs and manage applications from agricultural professionals</p>
        </div>
        <Button 
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => setIsPostingJob(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </div>
      
      <Tabs defaultValue="posted" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="posted">Posted Jobs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posted">
          <div className="space-y-4">
            {postedJobs.length > 0 ? (
              postedJobs.map(job => (
                <Card key={job.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-grow space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <Badge
                            variant={job.status === "active" ? "default" : "secondary"}
                            className={job.status === "active" ? "bg-green-500" : ""}
                          >
                            {job.status === "active" ? "Active" : "Closed"}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-700 line-clamp-2">{job.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{job.location} ({job.locationType})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{job.timeline}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarClock size={14} />
                            <span>Posted {formatTimeAgo(job.postedDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{job.applications} applications</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t text-sm">
                          <div className="flex items-center gap-4">
                            <span className="font-medium">{formatBudget(job.budget)}</span>
                            <span className="text-gray-500">{job.views} views</span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-orange-500 hover:bg-orange-600"
                              onClick={() => setSelectedJob(job.id)}
                            >
                              View Applications
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No active job postings</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start by posting your first job to find agricultural professionals
                </p>
                <Button 
                  className="mt-4 bg-orange-500 hover:bg-orange-600"
                  onClick={() => setIsPostingJob(true)}
                >
                  Post a Job
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="applications">
          <div className="space-y-4">
            {applications.length > 0 ? (
              applications.map(app => (
                <Card key={app.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-grow space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {app.jobTitle}
                            </Badge>
                            <h3 className="text-lg font-bold">{app.applicant.name}</h3>
                            <div className="flex items-center gap-2 text-sm">
                              <Badge variant="secondary">Level {app.applicant.level}</Badge>
                              <span className="text-gray-500">{app.applicant.location}</span>
                              <div className="flex items-center">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span>{app.applicant.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{app.bidType === "hourly" ? `$${app.bidAmount}/hr` : `$${app.bidAmount}`}</p>
                            <p className="text-sm text-gray-500">Received {formatTimeAgo(app.submittedDate)}</p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-gray-700 italic">"{app.coverLetter}"</p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                          >
                            <MessagesSquare className="h-4 w-4" />
                            Message
                          </Button>
                          <div className="flex gap-2">
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 gap-2"
                            >
                              <UserCheck className="h-4 w-4" />
                              Hire
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No applications yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  When professionals apply to your jobs, you'll see their applications here
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Job posting dialog */}
      <Dialog open={isPostingJob} onOpenChange={setIsPostingJob}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Post a New Job</DialogTitle>
            <DialogDescription>
              Fill out the form below to post a new job for agricultural professionals
            </DialogDescription>
          </DialogHeader>
          <Separator className="my-4" />
          <JobPostingForm onSubmit={handleJobSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
} 