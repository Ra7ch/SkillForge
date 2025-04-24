"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MapPin, DollarSign, Clock, Briefcase, Calendar, ArrowRight, MoreHorizontal, CalendarDays, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

// Sample job data
const sampleJobs = [
  {
    id: "job-001",
    title: "Crop Rotation Planning Consultant",
    description: "Looking for an experienced agronomist to develop a 3-year crop rotation plan for our 500-acre farm. Must have knowledge of sustainable farming practices and local growing conditions.",
    location: "Iowa City, Iowa",
    locationType: "hybrid",
    budget: "2500",
    budgetType: "fixed",
    timeline: "3 weeks",
    requiredSpecializations: ["Crop Production", "Soil and Environmental Sciences"],
    skills: ["Crop rotation planning", "Soil fertility management", "Sustainable agriculture"],
    createdAt: "2023-06-12T14:30:00Z",
    status: "open",
    client: {
      name: "Green Valley Farms",
      rating: 4.8,
      jobsPosted: 12
    }
  },
  {
    id: "job-002",
    title: "Dairy Barn Design Consultant",
    description: "Need professional guidance on optimal dairy barn design that maximizes animal welfare and operational efficiency. The project involves designing a new facility for 200 dairy cows.",
    location: "Madison, Wisconsin",
    locationType: "on-site",
    budget: "75",
    budgetType: "hourly",
    timeline: "2 months",
    requiredSpecializations: ["Animal Production", "Agricultural Engineering"],
    skills: ["Dairy facility design", "Animal welfare", "Ventilation systems"],
    createdAt: "2023-06-10T09:15:00Z",
    status: "open",
    client: {
      name: "Hillside Dairy Cooperative",
      rating: 4.9,
      jobsPosted: 5
    }
  },
  {
    id: "job-003",
    title: "Organic Certification Advisor",
    description: "Seeking an expert in organic certification to guide our vegetable farm through the USDA organic certification process. Help with documentation and preparation for inspection.",
    location: "Burlington, Vermont",
    locationType: "remote",
    budget: "1800",
    budgetType: "fixed",
    timeline: "3 months",
    requiredSpecializations: ["Sustainable and Organic Agriculture", "Food Science and Technology"],
    skills: ["USDA organic regulations", "Certification documentation", "Organic farming practices"],
    createdAt: "2023-06-08T11:45:00Z",
    status: "open",
    client: {
      name: "Sunrise Organic Farms",
      rating: 4.7,
      jobsPosted: 3
    }
  },
  {
    id: "job-004",
    title: "Irrigation System Upgrade Specialist",
    description: "Looking for an agricultural engineer to modernize our irrigation system to improve water efficiency on a 200-acre vegetable farm. Need expertise in drip irrigation and smart controllers.",
    location: "Fresno, California",
    locationType: "on-site",
    budget: "5000",
    budgetType: "fixed",
    timeline: "1 month",
    requiredSpecializations: ["Agricultural Engineering", "Crop Production"],
    skills: ["Drip irrigation", "Water management", "Irrigation controllers"],
    createdAt: "2023-06-07T16:20:00Z",
    status: "open",
    client: {
      name: "Valley Fresh Produce",
      rating: 4.5,
      jobsPosted: 8
    }
  },
  {
    id: "job-005",
    title: "Soil Health Assessment Consultant",
    description: "Need a soil scientist to conduct comprehensive soil health assessments on our 300-acre farm. Includes soil sampling, lab testing coordination, and detailed recommendations for improvement.",
    location: "Columbia, Missouri",
    locationType: "on-site",
    budget: "60",
    budgetType: "hourly",
    timeline: "2 weeks",
    requiredSpecializations: ["Soil and Environmental Sciences", "Crop Production"],
    skills: ["Soil testing", "Nutrient management", "Soil biology"],
    createdAt: "2023-06-05T10:30:00Z",
    status: "open",
    client: {
      name: "Heartland Grains LLC",
      rating: 4.6,
      jobsPosted: 4
    }
  }
];

// Sample specializations for filter options
const SPECIALIZATIONS = [
  "Crop Management",
  "Livestock Management",
  "Agricultural Engineering",
  "Organic Farming",
  "Sustainable Agriculture",
  "Soil Science",
  "Irrigation Management",
  "Precision Agriculture",
  "Pest Management",
  "Agricultural Economics"
];

// Function to format time (e.g., "2 days ago")
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

// Function to format budget
const formatBudget = (budget, budgetType) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return budgetType === 'hourly' 
    ? `${formatter.format(budget)}/hr` 
    : formatter.format(budget);
};

export default function JobListings({ userData, navigateTo, onSelectJob }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    specializations: [],
    locationType: [], // on-site, remote, hybrid
    budgetRange: [0, 10000],
    postedWithin: "all", // all, day, week, month
    onlyVerifiedClients: false
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [displayJobs, setDisplayJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("browse");
  
  useEffect(() => {
    // In a real app, you would fetch jobs from an API
    // For now, we'll use the sample data
    let filteredJobs = [...sampleJobs];
    
    // Apply search term filter
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) || 
        job.description.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply specialization filter
    if (filters.specializations.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        job.requiredSpecializations.some(spec => filters.specializations.includes(spec))
      );
    }
    
    // Apply location type filter
    if (filters.locationType.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        filters.locationType.includes(job.locationType)
      );
    }
    
    // Apply budget range filter
    filteredJobs = filteredJobs.filter(job => {
      const jobBudget = job.budgetType === 'hourly' 
        ? job.budget * 40 * 4 // Estimate monthly income for hourly rate
        : job.budget;
      return jobBudget >= filters.budgetRange[0] && jobBudget <= filters.budgetRange[1];
    });
    
    // Apply posted date filter
    if (filters.postedWithin !== 'all') {
      const now = new Date();
      let cutoff = new Date();
      
      switch (filters.postedWithin) {
        case 'day':
          cutoff.setDate(now.getDate() - 1);
          break;
        case 'week':
          cutoff.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoff.setMonth(now.getMonth() - 1);
          break;
      }
      
      filteredJobs = filteredJobs.filter(job => new Date(job.createdAt) >= cutoff);
    }
    
    // Apply verified client filter
    if (filters.onlyVerifiedClients) {
      filteredJobs = filteredJobs.filter(job => job.client.rating >= 4.5);
    }
    
    // Apply sorting
    if (sortOption === "newest") {
      filteredJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "oldest") {
      filteredJobs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOption === "budget_high_to_low") {
      filteredJobs.sort((a, b) => {
        const budgetA = a.budgetType === 'hourly' ? a.budget * 40 * 4 : a.budget;
        const budgetB = b.budgetType === 'hourly' ? b.budget * 40 * 4 : b.budget;
        return budgetB - budgetA;
      });
    } else if (sortOption === "budget_low_to_high") {
      filteredJobs.sort((a, b) => {
        const budgetA = a.budgetType === 'hourly' ? a.budget * 40 * 4 : a.budget;
        const budgetB = b.budgetType === 'hourly' ? b.budget * 40 * 4 : b.budget;
        return budgetA - budgetB;
      });
    }
    
    setDisplayJobs(filteredJobs);
  }, [searchQuery, filters, sortOption]);
  
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSkillFilterChange = (skill) => {
    setFilters(prev => {
      const current = [...prev.skills];
      
      if (current.includes(skill)) {
        return { ...prev, skills: current.filter(s => s !== skill) };
      } else {
        return { ...prev, skills: [...current, skill] };
      }
    });
  };
  
  const toggleSpecialization = (specialization) => {
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
  
  const toggleFilterDisplay = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const commonSkills = [
    "Soil testing",
    "Irrigation",
    "Sustainable farming",
    "Organic certification",
    "Livestock management",
    "Crop rotation",
    "Pest management",
    "Fertilization"
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Agricultural Jobs</h1>
          
          {userData?.type === "client" && (
            <Button 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => navigateTo("postJob")}
            >
              Post a New Job
            </Button>
          )}
        </div>
        <p className="text-gray-600">
          Find opportunities that match your agricultural expertise
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters - Desktop */}
        <div className="hidden lg:block">
          <Card className="sticky top-24">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Select
                  value={filters.specialization}
                  onValueChange={(value) => handleFilterChange("specialization", value)}
                >
                  <SelectTrigger id="specialization" className="mt-2">
                    <SelectValue placeholder="All Specializations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    {specializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="locationType">Location Type</Label>
                <Select
                  value={filters.locationType}
                  onValueChange={(value) => handleFilterChange("locationType", value)}
                >
                  <SelectTrigger id="locationType" className="mt-2">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="on-site">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Budget Range</Label>
                <div className="pt-6 px-2">
                  <Slider
                    value={filters.budgetRange}
                    min={0}
                    max={5000}
                    step={100}
                    onValueChange={(value) => handleFilterChange("budgetRange", value)}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>${filters.budgetRange[0]}</span>
                    <span>${filters.budgetRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="mb-2 block">Common Skills</Label>
                <div className="space-y-2">
                  {commonSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={filters.skills.includes(skill)}
                        onCheckedChange={() => handleSkillFilterChange(skill)}
                      />
                      <Label
                        htmlFor={`skill-${skill}`}
                        className="text-sm font-normal"
                      >
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setFilters({
                  specialization: "all",
                  locationType: "all",
                  budgetRange: [0, 5000],
                  skills: []
                })}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Jobs List and Mobile Filters */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
              <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
              <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                placeholder="Search jobs by title, skill, or keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-1 lg:hidden"
                onClick={toggleFilterDisplay}
              >
                <Filter size={16} />
                Filters
              </Button>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="budget-high">Highest Budget</SelectItem>
                  <SelectItem value="budget-low">Lowest Budget</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Mobile Filters (hidden on desktop) */}
          {isFilterOpen && (
            <Card className="mb-6 lg:hidden">
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-3">
                  <Label>Specialization</Label>
                  <Select
                    value={filters.specialization}
                    onValueChange={(value) => handleFilterChange("specialization", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Specializations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specializations</SelectItem>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Label>Location Type</Label>
                  <Select
                    value={filters.locationType}
                    onValueChange={(value) => handleFilterChange("locationType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="on-site">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Label>Common Skills</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {commonSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-skill-${skill}`}
                          checked={filters.skills.includes(skill)}
                          onCheckedChange={() => handleSkillFilterChange(skill)}
                        />
                        <Label
                          htmlFor={`mobile-skill-${skill}`}
                          className="text-sm font-normal"
                        >
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setFilters({
                      specialization: "all",
                      locationType: "all",
                      budgetRange: [0, 5000],
                      skills: []
                    })}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Job Listings */}
          <TabsContent value="browse" className="mt-0">
            <div className="space-y-4">
              {displayJobs.length === 0 ? (
                <Card className="text-center p-8">
                  <CardContent className="pt-6">
                    <p className="text-gray-500 mb-4">No jobs match your search criteria.</p>
                    <Button variant="outline" onClick={() => {
                      setSearchTerm("");
                      setFilters({
                        specialization: "all",
                        locationType: "all",
                        budgetRange: [0, 5000],
                        skills: []
                      });
                    }}>
                      Clear Search & Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                displayJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-grow space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-bold hover:text-orange-500 cursor-pointer" onClick={() => onSelectJob(job)}>
                                {job.title}
                              </h3>
                              <p className="text-gray-500 text-sm">{job.client.name}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Save Job</DropdownMenuItem>
                                <DropdownMenuItem>Share Job</DropdownMenuItem>
                                <DropdownMenuItem>Report Job</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <p className="text-gray-700 line-clamp-2">{job.description}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {job.requiredSpecializations.map((spec) => (
                              <Badge key={spec} variant="outline" className="bg-orange-50 text-orange-800 hover:bg-orange-100">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span>{job.location} ({job.locationType})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign size={14} />
                              <span>{formatBudget(job)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{job.timeline}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t text-sm">
                            <span className="text-gray-500">Posted {formatTimeAgo(job.createdAt)}</span>
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-orange-500 hover:bg-orange-600"
                              onClick={() => onSelectJob(job)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="applied" className="mt-0">
            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Applied Jobs Yet</h3>
                <p className="text-gray-500 mb-4">When you apply for jobs, they will appear here for easy tracking.</p>
                <Button onClick={() => setActiveTab("browse")}>
                  Browse Available Jobs
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="saved" className="mt-0">
            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Saved Jobs Yet</h3>
                <p className="text-gray-500 mb-4">Save jobs you're interested in to revisit them later.</p>
                <Button onClick={() => setActiveTab("browse")}>
                  Browse Available Jobs
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  );
} 