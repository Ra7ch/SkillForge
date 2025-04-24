"use client"

import { useState } from "react"
import { Search, Filter, MapPin, DollarSign, Calendar, ChevronDown, Plus, Edit, Trash2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for client's posted jobs
const MOCK_CLIENT_JOBS = [
  {
    id: "1",
    title: "Seasonal Harvest Worker Needed",
    description: "Looking for experienced harvest workers for our apple orchard. Must be able to work long hours during harvest season.",
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
    status: "active"
  },
  {
    id: "2",
    title: "Irrigation Specialist Needed",
    description: "Looking for an irrigation specialist to design and implement a more efficient irrigation system for our vegetable farm.",
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
    status: "active"
  },
  {
    id: "3",
    title: "Agricultural Consultant for Organic Transition",
    description: "Seeking an agricultural consultant to help with transitioning our conventional farm to organic certification.",
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
    status: "closed"
  }
];

// Mock data for proposals
const MOCK_PROPOSALS = [
  {
    id: "p1",
    jobId: "1",
    worker: {
      id: "w1",
      name: "John Smith",
      title: "Agricultural Expert",
      rating: 4.8,
      level: 3,
      verified: true,
      location: "Spokane, WA",
      completedJobs: 12
    },
    coverLetter: "I have 5 years of experience in apple harvesting and would be a perfect fit for this role.",
    proposedBudget: 20,
    estimatedCompletion: "Can start immediately and work through the entire season",
    submitDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending"
  },
  {
    id: "p2",
    jobId: "1",
    worker: {
      id: "w2",
      name: "Maria Garcia",
      title: "Seasonal Harvest Specialist",
      rating: 4.9,
      level: 4,
      verified: true,
      location: "Portland, OR",
      completedJobs: 24
    },
    coverLetter: "I've worked on apple orchards for over 7 seasons and can manage teams of harvesters efficiently.",
    proposedBudget: 22,
    estimatedCompletion: "Available for the entire season with optional extension",
    submitDate: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    status: "pending"
  },
  {
    id: "p3",
    jobId: "2",
    worker: {
      id: "w3",
      name: "Alex Johnson",
      title: "Irrigation Engineer",
      rating: 4.7,
      level: 3,
      verified: true,
      location: "Sacramento, CA",
      completedJobs: 15
    },
    coverLetter: "I've designed and implemented irrigation systems for over 20 farms across California.",
    proposedBudget: 3200,
    estimatedCompletion: "Can complete within 3 weeks from start",
    submitDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending"
  }
];

// Specializations for job posting
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

export default function ClientJobMarketplace() {
  const [jobs, setJobs] = useState(MOCK_CLIENT_JOBS);
  const [proposals, setProposals] = useState(MOCK_PROPOSALS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("active");
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewingProposals, setViewingProposals] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  
  // New job form state
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    locationType: "on-site",
    budget: {
      type: "fixed",
      amount: 0
    },
    timeline: "",
    skills: [],
    specializations: []
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

  // Filter jobs by search and tab selection
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchQuery.trim() === "" || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = selectedTab === "all" || job.status === selectedTab;
    
    return matchesSearch && matchesTab;
  });

  // Get proposals for a specific job
  const getJobProposals = (jobId) => {
    return proposals.filter(proposal => proposal.jobId === jobId);
  };

  // Handle creating a new job
  const handleCreateJob = () => {
    const newJobWithId = {
      ...newJob,
      id: (jobs.length + 1).toString(),
      postedDate: new Date().toISOString(),
      proposals: 0,
      status: "active"
    };
    
    setJobs([newJobWithId, ...jobs]);
    
    // Reset the form
    setNewJob({
      title: "",
      description: "",
      location: "",
      locationType: "on-site",
      budget: {
        type: "fixed",
        amount: 0
      },
      timeline: "",
      skills: [],
      specializations: []
    });
  };

  // Handle updating job
  const handleUpdateJob = (jobId, updatedData) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, ...updatedData } : job
    ));
  };

  // Handle deleting job
  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  // Handle adding a skill to new job
  const handleAddSkill = (skill) => {
    if (skill && !newJob.skills.includes(skill)) {
      setNewJob({
        ...newJob,
        skills: [...newJob.skills, skill]
      });
    }
  };

  // Handle removing a skill from new job
  const handleRemoveSkill = (skill) => {
    setNewJob({
      ...newJob,
      skills: newJob.skills.filter(s => s !== skill)
    });
  };

  // Handle toggling a specialization
  const handleToggleSpecialization = (specialization) => {
    if (newJob.specializations.includes(specialization)) {
      setNewJob({
        ...newJob,
        specializations: newJob.specializations.filter(s => s !== specialization)
      });
    } else {
      setNewJob({
        ...newJob,
        specializations: [...newJob.specializations, specialization]
      });
    }
  };

  // Handle approving a proposal
  const handleApproveProposal = (proposalId) => {
    setProposals(proposals.map(proposal => 
      proposal.id === proposalId 
        ? { ...proposal, status: "approved" } 
        : proposal.jobId === getProposalById(proposalId).jobId 
          ? { ...proposal, status: "rejected" } 
          : proposal
    ));
    
    // Close the job since a proposal was approved
    const approvedProposal = getProposalById(proposalId);
    handleUpdateJob(approvedProposal.jobId, { status: "in-progress" });
  };

  // Get proposal by ID
  const getProposalById = (proposalId) => {
    return proposals.find(proposal => proposal.id === proposalId);
  };

  // View for job posting form
  const JobPostingForm = ({ isEditing = false, existingJob = null }) => {
    const [jobForm, setJobForm] = useState(existingJob || newJob);
    const [newSkill, setNewSkill] = useState("");
    
    const handleFormChange = (field, value) => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        setJobForm({
          ...jobForm,
          [parent]: {
            ...jobForm[parent],
            [child]: value
          }
        });
      } else {
        setJobForm({
          ...jobForm,
          [field]: value
        });
      }
    };
    
    const handleSubmit = () => {
      if (isEditing && existingJob) {
        handleUpdateJob(existingJob.id, jobForm);
      } else {
        setNewJob(jobForm);
        handleCreateJob();
      }
    };
    
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="job-title">Job Title</Label>
            <Input 
              id="job-title" 
              value={jobForm.title}
              onChange={(e) => handleFormChange('title', e.target.value)}
              placeholder="e.g., Seasonal Harvest Worker Needed"
            />
          </div>
          
          <div>
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea 
              id="job-description" 
              value={jobForm.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              placeholder="Describe the job requirements, responsibilities, and qualifications..."
              className="h-32"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="job-location">Location</Label>
              <Input 
                id="job-location" 
                value={jobForm.location}
                onChange={(e) => handleFormChange('location', e.target.value)}
                placeholder="City, State"
              />
            </div>
            
            <div>
              <Label htmlFor="location-type">Location Type</Label>
              <Select 
                value={jobForm.locationType}
                onValueChange={(value) => handleFormChange('locationType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on-site">On-site</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget-type">Budget Type</Label>
              <Select 
                value={jobForm.budget.type}
                onValueChange={(value) => handleFormChange('budget.type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="budget-amount">Budget Amount (USD)</Label>
              <Input 
                id="budget-amount" 
                type="number"
                value={jobForm.budget.amount}
                onChange={(e) => handleFormChange('budget.amount', parseInt(e.target.value) || 0)}
                placeholder="Enter amount"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="job-timeline">Timeline</Label>
            <Select 
              value={jobForm.timeline}
              onValueChange={(value) => handleFormChange('timeline', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Less than 1 month">Less than 1 month</SelectItem>
                <SelectItem value="1-3 months">1-3 months</SelectItem>
                <SelectItem value="3-6 months">3-6 months</SelectItem>
                <SelectItem value="6+ months">6+ months</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Required Skills</Label>
            <div className="flex space-x-2 mt-2">
              <Input 
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
              />
              <Button 
                variant="outline" 
                onClick={() => {
                  if (newSkill.trim()) {
                    if (isEditing) {
                      handleFormChange('skills', [...jobForm.skills, newSkill.trim()]);
                    } else {
                      handleAddSkill(newSkill.trim());
                    }
                    setNewSkill("");
                  }
                }}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {(isEditing ? jobForm.skills : newJob.skills).map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {skill}
                  <button 
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      if (isEditing) {
                        handleFormChange('skills', jobForm.skills.filter(s => s !== skill));
                      } else {
                        handleRemoveSkill(skill);
                      }
                    }}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <Label>Specializations</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {SPECIALIZATIONS.map((specialization, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`specialization-${index}`}
                    checked={isEditing 
                      ? jobForm.specializations.includes(specialization) 
                      : newJob.specializations.includes(specialization)
                    }
                    onCheckedChange={() => {
                      if (isEditing) {
                        const newSpecializations = jobForm.specializations.includes(specialization)
                          ? jobForm.specializations.filter(s => s !== specialization)
                          : [...jobForm.specializations, specialization];
                        handleFormChange('specializations', newSpecializations);
                      } else {
                        handleToggleSpecialization(specialization);
                      }
                    }}
                  />
                  <Label htmlFor={`specialization-${index}`}>{specialization}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <SheetClose asChild>
            <Button onClick={handleSubmit}>
              {isEditing ? 'Update Job' : 'Post Job'}
            </Button>
          </SheetClose>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Job Marketplace</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Post a New Job
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg overflow-auto">
            <SheetHeader>
              <SheetTitle>Post a New Job</SheetTitle>
              <SheetDescription>
                Create a new job listing to find qualified professionals
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <JobPostingForm />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input 
            placeholder="Search jobs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="active" className="w-full md:w-auto" onValueChange={setSelectedTab}>
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="active">Active Jobs</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
            <TabsTrigger value="all">All Jobs</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewingProposals ? (
        <div>
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              className="flex items-center gap-1"
              onClick={() => setViewingProposals(false)}
            >
              <ChevronDown className="h-4 w-4 rotate-90" />
              Back to Jobs
            </Button>
            <h2 className="text-lg font-medium ml-2">
              Proposals for {selectedJob?.title}
            </h2>
          </div>
          
          <div className="space-y-4">
            {getJobProposals(selectedJob?.id).length > 0 ? (
              getJobProposals(selectedJob?.id).map((proposal) => (
                <Card key={proposal.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium">{proposal.worker.name}</h3>
                          <p className="text-sm text-gray-600">{proposal.worker.title}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end mb-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(proposal.worker.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                            <span className="ml-1 text-sm text-gray-600">{proposal.worker.rating}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            Level {proposal.worker.level} Worker
                            {proposal.worker.verified && 
                              <Badge variant="outline" className="ml-2 px-1 py-0 text-xs">Verified</Badge>
                            }
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Proposed Budget</p>
                          <p className="font-medium">
                            {selectedJob?.budget.type === "hourly" 
                              ? `$${proposal.proposedBudget}/hr` 
                              : `$${proposal.proposedBudget}`
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Estimated Completion</p>
                          <p className="font-medium">{proposal.estimatedCompletion}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Cover Letter</p>
                        <p className="text-sm">{proposal.coverLetter}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{proposal.worker.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Briefcase className="h-4 w-4" />
                          <span>{proposal.worker.completedJobs} jobs completed</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Submitted {formatTimeAgo(proposal.submitDate)}</span>
                        </div>
                      </div>
                      
                      {proposal.status === "pending" ? (
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1" 
                            onClick={() => handleApproveProposal(proposal.id)}
                          >
                            Approve Proposal
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => {
                              setSelectedProposal(proposal);
                              // Open message dialog (not implemented)
                            }}
                          >
                            Message
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Badge className={proposal.status === "approved" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                            {proposal.status === "approved" ? "Approved" : "Rejected"}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-8 border rounded-lg">
                <p className="text-gray-500">No proposals received yet for this job.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-medium">{job.title}</h3>
                      <Badge className={
                        job.status === "active" ? "bg-green-100 text-green-800" :
                        job.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }>
                        {job.status === "active" ? "Active" : 
                         job.status === "in-progress" ? "In Progress" : "Closed"}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{job.location} ({job.locationType})</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span>{formatBudget(job.budget)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Posted {formatTimeAgo(job.postedDate)}</span>
                      </div>
                      {job.status === "active" && (
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{job.proposals} {job.proposals === 1 ? 'proposal' : 'proposals'}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 3 && (
                        <Badge variant="secondary">+{job.skills.length - 3} more</Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.status === "active" && (
                        <Button 
                          className="flex items-center gap-2"
                          onClick={() => {
                            setSelectedJob(job);
                            setViewingProposals(true);
                          }}
                        >
                          View {job.proposals} {job.proposals === 1 ? 'Proposal' : 'Proposals'}
                        </Button>
                      )}
                      
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-lg overflow-auto">
                          <SheetHeader>
                            <SheetTitle>Edit Job Listing</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <JobPostingForm isEditing={true} existingJob={job} />
                          </div>
                        </SheetContent>
                      </Sheet>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Job Listing</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this job listing? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => {}}>Cancel</Button>
                            <Button 
                              variant="destructive" 
                              onClick={() => handleDeleteJob(job.id)}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center p-8 border rounded-lg">
              <p className="text-gray-500 mb-4">No job listings found. Post a new job to get started.</p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Post a New Job
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg overflow-auto">
                  <SheetHeader>
                    <SheetTitle>Post a New Job</SheetTitle>
                    <SheetDescription>
                      Create a new job listing to find qualified professionals
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <JobPostingForm />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 