"use client"

import { useState } from "react"
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Briefcase, 
  Calendar, 
  ArrowLeft, 
  Star, 
  Download, 
  FileText, 
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function JobDetail({ job, onBack, userData }) {
  const [activeTab, setActiveTab] = useState("description");
  const [coverLetter, setCoverLetter] = useState("");
  const [hourlyRate, setHourlyRate] = useState(job?.budgetType === "hourly" ? job.budget : "");
  const [fixedBid, setFixedBid] = useState(job?.budgetType === "fixed" ? job.budget : "");
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  
  if (!job) {
    return (
      <div className="text-center py-12">
        <p>Job not found</p>
        <Button onClick={onBack} className="mt-4">Back to Jobs</Button>
      </div>
    );
  }
  
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours > 0) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
  };
  
  const formatBudget = (job) => {
    if (job.budgetType === "fixed") {
      return `$${job.budget} fixed price`;
    } else if (job.budgetType === "hourly") {
      return `$${job.budget}/hour`;
    } else {
      return "Negotiable";
    }
  };
  
  const handleAttachmentChange = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        // In a real app, you would upload the file to a server
        // and get a URL. For now we'll simulate with a local object URL
        url: URL.createObjectURL(file)
      }));
      
      setAttachments([...attachments, ...newFiles]);
    }
  };
  
  const removeAttachment = (index) => {
    const updated = [...attachments];
    updated.splice(index, 1);
    setAttachments(updated);
  };
  
  const handleApply = () => {
    setIsSubmitting(true);
    
    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setApplicationSubmitted(true);
    }, 1500);
  };
  
  // Check if the user is a client or the same client who posted this job
  const isClient = userData?.type === "client";
  const isJobPoster = isClient && userData?.name === job.client.name;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-1 text-gray-600 hover:text-gray-900" 
        onClick={onBack}
      >
        <ArrowLeft size={18} />
        Back to Jobs
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                    <div className="flex items-center gap-2 text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} />
                        {job.client.name}
                      </span>
                      <span>•</span>
                      <span>Posted {formatTimeAgo(job.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {job.requiredSpecializations.map((spec) => (
                    <Badge key={spec} variant="outline" className="bg-orange-50 text-orange-800 hover:bg-orange-100">
                      {spec}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <MapPin size={14} />
                      Location
                    </span>
                    <span className="font-medium">{job.location}</span>
                    <span className="text-sm text-gray-500 capitalize">{job.locationType}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <DollarSign size={14} />
                      Budget
                    </span>
                    <span className="font-medium">{formatBudget(job)}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Clock size={14} />
                      Timeline
                    </span>
                    <span className="font-medium">{job.timeline}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full rounded-none">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="skills">Required Skills</TabsTrigger>
                  <TabsTrigger value="client">About Client</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                      <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="skills" className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Required Specializations</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.requiredSpecializations.map((spec) => (
                          <Badge key={spec} variant="outline" className="bg-orange-50 text-orange-800 hover:bg-orange-100">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Specific Skills</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {job.skills.map((skill) => (
                          <li key={skill} className="flex items-center gap-2">
                            <Check size={16} className="text-green-500" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="client" className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg bg-orange-100 text-orange-800">
                          {job.client.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="text-lg font-semibold">{job.client.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={`${
                                  star <= job.client.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-gray-600 text-sm">
                            {job.client.rating.toFixed(1)} ({job.client.jobsPosted} jobs)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Activity on SkillForge</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-500 text-sm">Jobs Posted</p>
                          <p className="font-semibold">{job.client.jobsPosted}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Member Since</p>
                          <p className="font-semibold">June 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar - Application Form or Client Controls */}
        <div>
          {isJobPoster ? (
            <Card>
              <CardHeader>
                <CardTitle>Manage Your Job Post</CardTitle>
                <CardDescription>
                  Controls for your job listing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">View Applications</Button>
                <Button variant="outline" className="w-full">Edit Job Posting</Button>
                <Button variant="outline" className="w-full text-red-500 hover:text-red-700 hover:bg-red-50">Close Job Posting</Button>
              </CardContent>
            </Card>
          ) : applicationSubmitted ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Application Submitted!</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="bg-green-50 border-green-200">
                  <Check className="h-5 w-5 text-green-600" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Your application has been submitted successfully. The client will review it and get back to you soon.
                  </AlertDescription>
                </Alert>
                
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">What happens next?</h4>
                  <ol className="space-y-3 text-sm">
                    <li className="flex gap-2">
                      <span className="bg-orange-100 text-orange-800 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">1</span>
                      <span>The client reviews your application</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-orange-100 text-orange-800 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">2</span>
                      <span>If interested, they'll contact you through the platform</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-orange-100 text-orange-800 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">3</span>
                      <span>You can discuss details and finalize the contract</span>
                    </li>
                  </ol>
                </div>
                
                <Button onClick={onBack} className="w-full mt-6">
                  Browse More Jobs
                </Button>
              </CardContent>
            </Card>
          ) : isClient ? (
            <Card>
              <CardHeader>
                <CardTitle>Client View</CardTitle>
                <CardDescription>
                  You're viewing this job as a client
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  As a client, you can't apply to other jobs. You can post your own jobs for agricultural professionals to find.
                </p>
                <Button onClick={onBack} className="w-full">
                  Back to Job Listings
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Apply for this Job</CardTitle>
                <CardDescription>
                  Submit your application to {job.client.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.budgetType === "fixed" ? (
                  <div className="space-y-2">
                    <Label htmlFor="fixed-bid">Your Bid (USD)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="fixed-bid"
                        type="number"
                        placeholder="Enter your bid"
                        className="pl-8"
                        value={fixedBid}
                        onChange={(e) => setFixedBid(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Client's budget: ${job.budget}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="hourly-rate">Your Hourly Rate (USD)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="hourly-rate"
                        type="number"
                        placeholder="Enter your rate"
                        className="pl-8"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Client's budget: ${job.budget}/hour
                    </p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="cover-letter">Cover Letter</Label>
                  <Textarea
                    id="cover-letter"
                    placeholder="Introduce yourself and explain why you're a great fit for this job..."
                    rows={6}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Attachments</Label>
                  
                  {attachments.length > 0 && (
                    <div className="space-y-2 mb-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-gray-500" />
                            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500"
                            onClick={() => removeAttachment(index)}
                          >
                            &times;
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center border-2 border-dashed rounded-md p-4">
                    <label htmlFor="file-upload" className="cursor-pointer text-center w-full">
                      <div className="flex flex-col items-center gap-1">
                        <Download size={24} className="text-gray-400" />
                        <span className="text-sm font-medium">
                          Upload Files
                        </span>
                        <span className="text-xs text-gray-500">
                          Drag files here or click to browse
                        </span>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleAttachmentChange}
                      />
                    </label>
                  </div>
                </div>
                
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 mt-2"
                  disabled={isSubmitting || !coverLetter.trim()}
                  onClick={handleApply}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 