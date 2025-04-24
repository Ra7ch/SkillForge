"use client"

import { useState } from "react"
import { Search, Filter, MapPin, DollarSign, Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import JobDetails from "@/components/job-details"

// Mock data for jobs
const MOCK_JOBS = [
  {
    id: "1",
    title: "Seasonal Harvest Worker Needed",
    description: "Looking for experienced harvest workers for our apple orchard. Must be able to work long hours during harvest season.",
    client: {
      name: "Green Valley Farms",
      rating: 4.7,
      reviews: 18,
      location: "Yakima, WA",
      verified: true
    },
    location: "Yakima, WA",
    locationType: "on-site",
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    budget: {
      type: "hourly",
      amount: 18
    },
    timeline: "3-6 months",
    skills: ["Harvesting", "Pruning", "Physical Stamina", "Attention to Detail"],
    specializations: ["Harvest Operations", "Crop Cultivation"],
    proposals: 7,
    saved: false
  },
  {
    id: "2",
    title: "Dairy Farm Assistant Manager",
    description: "We're seeking an assistant manager for our dairy operation. The ideal candidate will have experience in dairy production and team leadership.",
    client: {
      name: "Sunshine Dairy Co-op",
      rating: 4.9,
      reviews: 27,
      location: "Madison, WI",
      verified: true
    },
    location: "Madison, WI",
    locationType: "on-site",
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    budget: {
      type: "fixed",
      amount: 4500
    },
    timeline: "Ongoing",
    skills: ["Animal Care", "Dairy Production", "Team Management", "Milking Systems"],
    specializations: ["Dairy Production", "Animal Husbandry"],
    proposals: 3,
    saved: true
  },
  {
    id: "3",
    title: "Tractor Operator for Spring Planting",
    description: "Experienced tractor operator needed for spring planting season. Must have experience with modern agricultural equipment.",
    client: {
      name: "Heartland Crops",
      rating: 4.2,
      reviews: 11,
      location: "Des Moines, IA",
      verified: true
    },
    location: "Des Moines, IA",
    locationType: "on-site",
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    budget: {
      type: "hourly",
      amount: 22
    },
    timeline: "1-3 months",
    skills: ["Tractor Operation", "Equipment Maintenance", "Planting", "GPS Technology"],
    specializations: ["Agricultural Machinery", "Crop Cultivation"],
    proposals: 12,
    saved: false
  },
  {
    id: "4",
    title: "Agricultural Consultant for Organic Transition",
    description: "Seeking an agricultural consultant to help with transitioning our conventional farm to organic certification.",
    client: {
      name: "Future Organics LLC",
      rating: 4.5,
      reviews: 4,
      location: "Portland, OR",
      verified: false
    },
    location: "Remote",
    locationType: "remote",
    postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    budget: {
      type: "fixed",
      amount: 5000
    },
    timeline: "3-6 months",
    skills: ["Organic Certification", "Soil Management", "Crop Rotation", "Pest Management"],
    specializations: ["Organic Farming", "Soil Management"],
    proposals: 5,
    saved: false
  },
  {
    id: "5",
    title: "Irrigation Specialist Needed",
    description: "Looking for an irrigation specialist to design and implement a more efficient irrigation system for our vegetable farm.",
    client: {
      name: "Fresh Greens Farm",
      rating: 4.1,
      reviews: 8,
      location: "Fresno, CA",
      verified: true
    },
    location: "Fresno, CA",
    locationType: "on-site",
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    budget: {
      type: "fixed",
      amount: 3000
    },
    timeline: "Less than 1 month",
    skills: ["Irrigation Systems", "Water Management", "System Design", "Drip Irrigation"],
    specializations: ["Irrigation Systems"],
    proposals: 9,
    saved: false
  }
];

// Specializations for filter
const SPECIALIZATIONS = [
  "Crop Cultivation",
  "Animal Husbandry",
  "Agricultural Machinery",
  "Irrigation Systems",
  "Organic Farming",
  "Pest Management",
  "Soil Management",
  "Harvest Operations",
  "Post-Harvest",
  "Dairy Production"
];

export default function JobMarketplace() {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [sortOption, setSortOption] = useState("newest");
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [filters, setFilters] = useState({
    budgetMin: 0,
    budgetMax: 10000,
    hourlyMin: 10,
    hourlyMax: 100,
    specializations: [],
    locationType: "all",
    clientRating: 0
  });

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

  // Toggle job saved status
  const toggleSaved = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, saved: !job.saved } : job
    ));
  };

  // Apply search and filtering
  const filteredJobs = jobs.filter(job => {
    // Search query filter
    const matchesSearch = searchQuery.trim() === "" || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Budget filter
    const matchesBudget = job.budget.type === "fixed" 
      ? job.budget.amount >= filters.budgetMin && job.budget.amount <= filters.budgetMax
      : job.budget.amount >= filters.hourlyMin && job.budget.amount <= filters.hourlyMax;
    
    // Location type filter
    const matchesLocationType = filters.locationType === "all" || 
      job.locationType === filters.locationType;
    
    // Specializations filter
    const matchesSpecializations = filters.specializations.length === 0 ||
      job.specializations.some(spec => filters.specializations.includes(spec));
    
    // Client rating filter
    const matchesRating = job.client.rating >= filters.clientRating;
    
    return matchesSearch && matchesBudget && matchesLocationType && 
           matchesSpecializations && matchesRating;
  });

  // Sort filtered jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.postedDate) - new Date(a.postedDate);
      case "oldest":
        return new Date(a.postedDate) - new Date(b.postedDate);
      case "budget_high":
        return b.budget.amount - a.budget.amount;
      case "budget_low":
        return a.budget.amount - b.budget.amount;
      case "proposals_high":
        return b.proposals - a.proposals;
      case "proposals_low":
        return a.proposals - b.proposals;
      default:
        return 0;
    }
  });

  // Handle specialization toggle in filter
  const toggleSpecialization = (specialization) => {
    setFilters(prev => {
      const current = [...prev.specializations];
      const index = current.indexOf(specialization);
      
      if (index === -1) {
        current.push(specialization);
      } else {
        current.splice(index, 1);
      }
      
      return { ...prev, specializations: current };
    });
  };

  // Handle job application
  const handleApplyToJob = (applicationData) => {
    console.log("Application submitted:", applicationData);
    // In a real application, you would send this data to your API
    setApplicationSubmitted(true);
    
    // Close the job details after a short delay
    setTimeout(() => {
      setSelectedJob(null);
      setApplicationSubmitted(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Job Marketplace</h1>
            <p className="text-gray-500">
              Find agricultural work that matches your skills and experience
            </p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for jobs..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-0">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Location Type</h3>
                <Select 
                  value={filters.locationType} 
                  onValueChange={(val) => setFilters({...filters, locationType: val})}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="on-site">On-site</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm font-medium py-2">
                    Specializations
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {SPECIALIZATIONS.map((specialization) => (
                        <div key={specialization} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`specialization-${specialization}`} 
                            checked={filters.specializations.includes(specialization)}
                            onCheckedChange={() => toggleSpecialization(specialization)}
                          />
                          <Label 
                            htmlFor={`specialization-${specialization}`}
                            className="text-sm"
                          >
                            {specialization}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm font-medium py-2">
                    Fixed Budget
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          Min: ${filters.budgetMin}
                        </span>
                        <span>
                          Max: ${filters.budgetMax}
                        </span>
                      </div>
                      <Slider
                        value={[filters.budgetMin, filters.budgetMax]}
                        min={0}
                        max={10000}
                        step={100}
                        onValueChange={(value) => {
                          setFilters({
                            ...filters,
                            budgetMin: value[0],
                            budgetMax: value[1]
                          });
                        }}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-sm font-medium py-2">
                    Hourly Rate
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          Min: ${filters.hourlyMin}/hr
                        </span>
                        <span>
                          Max: ${filters.hourlyMax}/hr
                        </span>
                      </div>
                      <Slider
                        value={[filters.hourlyMin, filters.hourlyMax]}
                        min={10}
                        max={100}
                        step={1}
                        onValueChange={(value) => {
                          setFilters({
                            ...filters,
                            hourlyMin: value[0],
                            hourlyMax: value[1]
                          });
                        }}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-sm font-medium py-2">
                    Client Rating
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {[0, 3, 4, 4.5].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`rating-${rating}`} 
                            checked={filters.clientRating === rating}
                            onCheckedChange={() => 
                              setFilters({...filters, clientRating: rating})
                            }
                          />
                          <Label 
                            htmlFor={`rating-${rating}`}
                            className="text-sm"
                          >
                            {rating === 0 ? 'Any rating' : `${rating}+ stars`}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">
              {sortedJobs.length} jobs found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="h-8 w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="budget_high">Budget: High to Low</SelectItem>
                  <SelectItem value="budget_low">Budget: Low to High</SelectItem>
                  <SelectItem value="proposals_high">Most Proposals</SelectItem>
                  <SelectItem value="proposals_low">Least Proposals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            {sortedJobs.length > 0 ? (
              sortedJobs.map((job) => (
                <Card 
                  key={job.id} 
                  className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedJob?.id === job.id ? 'border-orange-500' : ''
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaved(job.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={job.saved ? "currentColor" : "none"}
                              stroke={job.saved ? "none" : "currentColor"}
                              className={`h-5 w-5 ${job.saved ? "text-yellow-500" : "text-gray-500"}`}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                            </svg>
                          </Button>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="text-sm text-gray-500 font-medium">
                            {job.client.name} 
                            {job.client.verified && (
                              <span className="inline-flex items-center ml-1">
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
                              </span>
                            )}
                          </div>
                          <div className="flex items-center ml-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4 text-yellow-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm ml-1">{job.client.rating}</span>
                            <span className="text-xs text-gray-500 ml-1">
                              ({job.client.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-sm line-clamp-2">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {job.skills.slice(0, 4).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="font-normal">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 4 && (
                          <Badge variant="secondary" className="font-normal">
                            +{job.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap justify-between text-sm pt-2">
                        <div className="flex items-center text-gray-500 mr-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                          <Badge 
                            variant="outline" 
                            className="ml-2 h-5 text-xs font-normal capitalize"
                          >
                            {job.locationType}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center text-gray-500 mr-4">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>{formatBudget(job.budget)}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatTimeAgo(job.postedDate)}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 mt-4 border-t flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {job.proposals} proposals so far
                        </span>
                        <Button 
                          size="sm" 
                          className="bg-orange-500 hover:bg-orange-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedJob(job);
                          }}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-12 w-12 text-gray-400 mx-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({
                      budgetMin: 0,
                      budgetMax: 10000,
                      hourlyMin: 10,
                      hourlyMax: 100,
                      specializations: [],
                      locationType: "all",
                      clientRating: 0
                    });
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {selectedJob && (
        <Sheet open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <SheetContent className="w-full sm:max-w-xl lg:max-w-2xl overflow-y-auto">
            <SheetHeader className="mb-4">
              <SheetTitle>Job Details</SheetTitle>
              <SheetDescription>
                {applicationSubmitted 
                  ? "Your application has been submitted successfully!" 
                  : "Review the details and submit your application"}
              </SheetDescription>
            </SheetHeader>
            <JobDetails 
              job={selectedJob} 
              onClose={() => setSelectedJob(null)}
              onApply={handleApplyToJob}
            />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
} 