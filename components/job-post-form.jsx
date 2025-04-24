"use client"

import { useState } from "react"
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Check, 
  Save,
  Info,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

// Agricultural specializations for dropdown options
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

// Sample skills for each specialization
const SPECIALIZATION_SKILLS = {
  "Crop Management": ["Crop Rotation", "Fertilization", "Harvesting", "Planting", "Seed Selection", "Crop Monitoring"],
  "Livestock Management": ["Animal Husbandry", "Breeding", "Nutrition Management", "Health Monitoring", "Grazing Management"],
  "Agricultural Engineering": ["Farm Equipment", "Machinery Maintenance", "Facility Design", "Land Development", "Automation"],
  "Organic Farming": ["Organic Certification", "Natural Pest Control", "Composting", "Crop Rotation", "Soil Health"],
  "Sustainable Agriculture": ["Conservation Practices", "Renewable Energy", "Water Management", "Biodiversity", "Carbon Farming"],
  "Soil Science": ["Soil Testing", "Erosion Control", "Nutrient Management", "pH Balancing", "Soil Health Assessment"],
  "Irrigation Management": ["Drip Irrigation", "Sprinkler Systems", "Water Conservation", "Scheduling", "Equipment Maintenance"],
  "Precision Agriculture": ["GPS Mapping", "Data Analysis", "Drone Operation", "Remote Sensing", "Variable Rate Application"],
  "Pest Management": ["Integrated Pest Management", "Disease Identification", "Pesticide Application", "Biological Controls", "Monitoring"],
  "Agricultural Economics": ["Market Analysis", "Risk Management", "Budget Planning", "Supply Chain", "Farm Business Planning"]
};

export default function JobPostForm({ onSubmitSuccess }) {
  // Form state
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    location: "",
    locationType: "on-site", // on-site, remote, hybrid
    budgetType: "fixed", // fixed, hourly
    budget: "",
    timeline: "",
    requiredSpecializations: [],
    skills: [],
    attachments: [],
    isHidden: false,
    screeningQuestions: []
  });
  
  // States for UI management
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when field is changed
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Handle checkbox/toggle change
  const handleToggleChange = (name, checked) => {
    setFormState(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Handle radio option change
  const handleRadioChange = (name, value) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle specialization selection
  const handleSpecializationChange = (value) => {
    setSelectedSpecialization(value);
    
    // Add to required specializations if not already included
    if (!formState.requiredSpecializations.includes(value)) {
      setFormState(prev => ({
        ...prev,
        requiredSpecializations: [...prev.requiredSpecializations, value]
      }));
    }
  };
  
  // Remove a specialization
  const removeSpecialization = (spec) => {
    setFormState(prev => ({
      ...prev,
      requiredSpecializations: prev.requiredSpecializations.filter(s => s !== spec),
      // Also remove skills associated with this specialization
      skills: prev.skills.filter(skill => !SPECIALIZATION_SKILLS[spec]?.includes(skill))
    }));
  };
  
  // Add a skill
  const addSkill = (skill) => {
    if (skill && !formState.skills.includes(skill)) {
      setFormState(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
    setNewSkill("");
  };
  
  // Remove a skill
  const removeSkill = (skill) => {
    setFormState(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };
  
  // Add a screening question
  const addQuestion = () => {
    if (newQuestion.trim()) {
      setFormState(prev => ({
        ...prev,
        screeningQuestions: [...prev.screeningQuestions, newQuestion]
      }));
      setNewQuestion("");
    }
  };
  
  // Remove a screening question
  const removeQuestion = (index) => {
    setFormState(prev => ({
      ...prev,
      screeningQuestions: prev.screeningQuestions.filter((_, i) => i !== index)
    }));
  };
  
  // Handle file attachment
  const handleAttachmentChange = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      }));
      
      setFormState(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }));
    }
  };
  
  // Remove an attachment
  const removeAttachment = (index) => {
    setFormState(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };
  
  // Validate the form
  const validateForm = () => {
    const errors = {};
    
    if (!formState.title.trim()) {
      errors.title = "Job title is required";
    }
    
    if (!formState.description.trim()) {
      errors.description = "Job description is required";
    }
    
    if (!formState.location.trim()) {
      errors.location = "Location is required";
    }
    
    if (!formState.budget) {
      errors.budget = "Budget is required";
    } else if (isNaN(Number(formState.budget)) || Number(formState.budget) <= 0) {
      errors.budget = "Budget must be a positive number";
    }
    
    if (!formState.timeline.trim()) {
      errors.timeline = "Timeline is required";
    }
    
    if (formState.requiredSpecializations.length === 0) {
      errors.requiredSpecializations = "At least one specialization is required";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Call success callback with form data
      onSubmitSuccess?.(formState);
    }, 1500);
  };
  
  // Toggle preview mode
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Post a New Job</CardTitle>
          <CardDescription>
            Fill out the form below to post a new job for agricultural professionals.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Job Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-base">
                    Job Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formState.title}
                    onChange={handleChange}
                    placeholder="e.g., Farm Manager, Crop Consultant, Irrigation Specialist"
                    className={validationErrors.title ? "border-red-500" : ""}
                  />
                  {validationErrors.title && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-base">
                    Job Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    placeholder="Describe the job responsibilities, requirements, and other important details..."
                    rows={6}
                    className={validationErrors.description ? "border-red-500" : ""}
                  />
                  {validationErrors.description && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="text-base">
                      Location <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <MapPin size={16} />
                      </span>
                      <Input
                        id="location"
                        name="location"
                        value={formState.location}
                        onChange={handleChange}
                        placeholder="City, State or Region"
                        className={`pl-9 ${validationErrors.location ? "border-red-500" : ""}`}
                      />
                    </div>
                    {validationErrors.location && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.location}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-base">Location Type</Label>
                    <RadioGroup 
                      value={formState.locationType} 
                      onValueChange={(value) => handleRadioChange("locationType", value)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="on-site" id="on-site" />
                        <Label htmlFor="on-site" className="cursor-pointer">On-site</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="remote" id="remote" />
                        <Label htmlFor="remote" className="cursor-pointer">Remote</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hybrid" id="hybrid" />
                        <Label htmlFor="hybrid" className="cursor-pointer">Hybrid</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Budget and Timeline */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Budget & Timeline</h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Budget Type</Label>
                  <RadioGroup 
                    value={formState.budgetType} 
                    onValueChange={(value) => handleRadioChange("budgetType", value)}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed" className="cursor-pointer">Fixed Price</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hourly" id="hourly" />
                      <Label htmlFor="hourly" className="cursor-pointer">Hourly Rate</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="budget" className="text-base">
                    {formState.budgetType === "fixed" ? "Fixed Budget" : "Hourly Rate"} (USD) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="budget"
                      name="budget"
                      type="number"
                      value={formState.budget}
                      onChange={handleChange}
                      placeholder={formState.budgetType === "fixed" ? "Enter total budget" : "Enter hourly rate"}
                      className={`pl-8 ${validationErrors.budget ? "border-red-500" : ""}`}
                    />
                  </div>
                  {validationErrors.budget && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.budget}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="timeline" className="text-base">
                    Expected Timeline <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Clock size={16} />
                    </span>
                    <Input
                      id="timeline"
                      name="timeline"
                      value={formState.timeline}
                      onChange={handleChange}
                      placeholder="e.g., 2 weeks, 3 months, Ongoing"
                      className={`pl-9 ${validationErrors.timeline ? "border-red-500" : ""}`}
                    />
                  </div>
                  {validationErrors.timeline && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.timeline}</p>
                  )}
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Skills and Specializations */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Skills & Specializations</h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-base">
                    Required Specializations <span className="text-red-500">*</span>
                  </Label>
                  
                  <Select
                    value={selectedSpecialization}
                    onValueChange={handleSpecializationChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPECIALIZATIONS.map(spec => (
                        <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {validationErrors.requiredSpecializations && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.requiredSpecializations}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formState.requiredSpecializations.map(spec => (
                      <Badge 
                        key={spec} 
                        variant="secondary"
                        className="px-3 py-1 bg-orange-50 hover:bg-orange-100 text-orange-800 cursor-pointer"
                        onClick={() => removeSpecialization(spec)}
                      >
                        {spec} <span className="ml-1">×</span>
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-base">Required Skills</Label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <div className="relative">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Enter a specific skill"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addSkill(newSkill);
                            }
                          }}
                        />
                        <Button 
                          type="button"
                          variant="ghost" 
                          className="absolute right-0 top-0 px-3 text-gray-500"
                          onClick={() => addSkill(newSkill)}
                        >
                          Add
                        </Button>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-1">
                        Press Enter to add a skill
                      </p>
                    </div>
                    
                    <div>
                      {formState.requiredSpecializations.length > 0 && (
                        <div>
                          <Select
                            onValueChange={(value) => addSkill(value)}
                            value=""
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select from suggested skills" />
                            </SelectTrigger>
                            <SelectContent>
                              {formState.requiredSpecializations.flatMap(spec => 
                                SPECIALIZATION_SKILLS[spec]?.filter(
                                  skill => !formState.skills.includes(skill)
                                ) || []
                              )
                              .map(skill => (
                                <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formState.skills.map(skill => (
                      <Badge 
                        key={skill} 
                        variant="outline"
                        className="px-3 py-1 cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill} <span className="ml-1">×</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Additional Options */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Additional Options</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Private Job Posting</Label>
                    <p className="text-sm text-gray-500">
                      Job will only be visible to workers you invite
                    </p>
                  </div>
                  <Switch
                    checked={formState.isHidden}
                    onCheckedChange={(checked) => handleToggleChange("isHidden", checked)}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label className="text-base">Screening Questions (Optional)</Label>
                  
                  <div className="flex gap-2">
                    <Input
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Add a question for applicants to answer"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addQuestion();
                        }
                      }}
                    />
                    <Button 
                      type="button"
                      onClick={addQuestion}
                      disabled={!newQuestion.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  
                  {formState.screeningQuestions.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {formState.screeningQuestions.map((question, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-2 border rounded-md"
                        >
                          <span className="text-sm">Q: {question}</span>
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeQuestion(index)}
                            className="text-gray-500"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Label className="text-base">Attachments (Optional)</Label>
                  
                  <div className="flex items-center justify-center border-2 border-dashed rounded-md p-4">
                    <label htmlFor="file-upload" className="cursor-pointer text-center w-full">
                      <div className="flex flex-col items-center gap-1">
                        <Save size={24} className="text-gray-400" />
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
                  
                  {formState.attachments.length > 0 && (
                    <div className="space-y-2">
                      {formState.attachments.map((file, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-2 border rounded-md"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm truncate max-w-[250px]">{file.name}</span>
                            <span className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(1)} KB
                            </span>
                          </div>
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeAttachment(index)}
                            className="text-gray-500"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle>Important Note</AlertTitle>
              <AlertDescription>
                By posting this job, you agree to our Terms of Service and confirm that this job complies with all applicable laws and regulations.
              </AlertDescription>
            </Alert>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={togglePreview}
          >
            {showPreview ? "Edit Job" : "Preview Job"}
          </Button>
          
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting Job...
              </>
            ) : (
              "Post Job"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 