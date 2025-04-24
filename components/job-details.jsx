"use client"

import { useState } from "react"
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  User, 
  MessageSquare, 
  Check, 
  ArrowLeft, 
  Bookmark, 
  Share2,
  Star,
  StarHalf,
  AlertCircle,
  CalendarClock,
  Users,
  Briefcase,
  Shield,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function JobDetails({ job, onBack, onApply, onClose }) {
  const [coverLetter, setCoverLetter] = useState("")
  const [activeTab, setActiveTab] = useState("description")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [applicationStep, setApplicationStep] = useState("details")
  const [relevantExperience, setRelevantExperience] = useState("")

  // Get budget amount, handling different formats
  const getBudgetAmount = () => {
    return job.budget?.amount || job.budgetAmount || 0;
  };

  // Get budget type, handling different formats
  const getBudgetType = () => {
    return job.budget?.type || job.budgetType || "fixed";
  };

  const [bidAmount, setBidAmount] = useState(getBudgetType() === "hourly" ? getBudgetAmount() : "");
  const [bidType, setBidType] = useState(getBudgetType());

  // Format budget display
  const formatBudget = (budget, budgetType) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    const amount = typeof budget === 'object' ? budget.amount : budget;
    const type = budgetType || (typeof budget === 'object' ? budget.type : 'fixed');
    
    return type === 'hourly' 
      ? `${formatter.format(amount)}/hr` 
      : formatter.format(amount);
  };

  // Format time posted
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  // Get client rating stars
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Handle application
  const handleApply = (e) => {
    if (e) e.preventDefault();
    
    onApply({
      jobId: job.id,
      coverLetter: coverLetter,
      bidAmount: bidAmount,
      bidType: bidType,
      relevantExperience: relevantExperience
    });
  };

  // Extract initials for avatar
  const getInitials = (name) => {
    if (!name) return "NA";
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Get the client name, handling both job.client.name and job.clientName formats
  const getClientName = () => {
    return job.client?.name || job.clientName || "Unknown Client";
  };

  // Get the client rating, handling both formats
  const getClientRating = () => {
    return job.client?.rating || job.clientRating || 0;
  };

  // Get the client reviews count, handling both formats
  const getClientReviews = () => {
    return job.client?.reviews || job.clientReviews || 0;
  };

  // Check if client is verified, handling both formats
  const isClientVerified = () => {
    return job.client?.verified || job.isClientVerified || false;
  };

  if (!job) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Select a job to view details</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {applicationStep === "details" && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{job.title}</h2>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {job.locationType}
              </Badge>
              <Badge variant={getBudgetType() === "hourly" ? "secondary" : "outline"}>
                Hourly
              </Badge>
              <Badge variant={getBudgetType() === "fixed" ? "secondary" : "outline"}>
                Fixed Price
              </Badge>
              <Badge variant="outline" className="bg-orange-50">
                {job.timeline}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarClock className="h-4 w-4" />
              <span>Posted {formatTimeAgo(job.postedDate)}</span>
              <Users className="h-4 w-4 ml-2" />
              <span>{job.proposals} proposals</span>
            </div>
            
            <Separator />
            
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border">
                <AvatarFallback className="bg-orange-100 text-orange-800">
                  {getInitials(job.clientName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-medium">{getClientName()}</h3>
                  {isClientVerified() && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 text-blue-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{job.clientLocation || job.client?.location || job.location}</span>
                  <span className="mx-2">•</span>
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span className="ml-1">{getClientRating()}</span>
                  <span className="ml-1">({getClientReviews()} reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base font-medium py-2">
                Job Description
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 space-y-4">
                <p>{job.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardHeader className="py-3">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-orange-500" />
                        <h4 className="font-medium text-sm">Job Details</h4>
                      </div>
                    </CardHeader>
                    <CardContent className="py-0 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Budget</span>
                        <span className="font-medium">{formatBudget(job.budget || getBudgetAmount(), getBudgetType())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Timeline</span>
                        <span className="font-medium">{job.timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Location</span>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{job.location}</span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {job.locationType}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <h4 className="font-medium text-sm">Client Details</h4>
                      </div>
                    </CardHeader>
                    <CardContent className="py-0 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Member since</span>
                        <span className="font-medium">Jan 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Rating</span>
                        {renderRatingStars(getClientRating())}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Verified</span>
                        <span className="font-medium">
                          {isClientVerified() ? "Yes" : "No"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-3 mt-4">
                  <h4 className="font-medium">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="font-normal">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" className="font-normal">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack || onClose}>
              Back to Jobs
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => setApplicationStep("apply")}
            >
              Apply Now
            </Button>
          </div>
        </>
      )}
      
      {applicationStep === "apply" && (
        <form onSubmit={handleApply} className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold">Submit Your Application</h2>
            <p className="text-sm text-gray-500">
              Complete the form below to apply for this job
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <Card className="border-orange-200">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-orange-500 mr-2" />
                  <h3 className="font-medium">Message to {getClientName()}</h3>
                </div>
                <p className="text-sm text-gray-500">
                  Introduce yourself and explain why you're a good fit for this position. This message will be sent directly to the client.
                </p>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="coverLetter"
                  placeholder="Hello! I'm interested in your job posting and believe I'm a great fit because of my experience with..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="min-h-32"
                  required
                />
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="font-medium">Your Bid</span>
              </Label>
              <RadioGroup 
                defaultValue={bidType} 
                onValueChange={setBidType}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hourly" id="hourly" />
                  <Label htmlFor="hourly">Hourly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed">Fixed</Label>
                </div>
              </RadioGroup>
              
              <div className="flex items-center">
                <span className="mr-2">$</span>
                <Input
                  type="number"
                  placeholder={bidType === "hourly" ? "Hourly Rate" : "Fixed Price"}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-32"
                  required
                />
                {bidType === "hourly" && <span className="ml-2">/hr</span>}
              </div>
            </div>
            
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="font-medium">Relevant Experience</h3>
                </div>
                <p className="text-sm text-gray-500">
                  Share your specific experience related to this job to stand out from other applicants
                </p>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="experience"
                  placeholder="I have X years of experience with [skill], and have worked on similar projects like..."
                  value={relevantExperience}
                  onChange={(e) => setRelevantExperience(e.target.value)}
                  className="min-h-24"
                  required
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setApplicationStep("details")}
            >
              Back
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Submit Application
            </Button>
          </div>
        </form>
      )}
    </div>
  );
} 