"use client"

import { useState } from "react"
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText,
  Plus,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

// Specializations for agricultural work
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

// Common agricultural skills
const COMMON_SKILLS = [
  "Tractor Operation",
  "Harvesting",
  "Irrigation",
  "Planting",
  "Fertilization",
  "Pesticide Application",
  "Animal Care",
  "Equipment Maintenance",
  "Crop Rotation",
  "Soil Testing",
  "Pruning",
  "Greenhouse Management"
];

export default function JobPostingForm({ onSubmit, initialValues }) {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    responsibilities: [""],
    qualifications: [""],
    specializations: [],
    skills: [],
    customSkills: [],
    location: "",
    locationType: "remote",
    budgetType: "fixed",
    budgetAmount: 1000,
    timeline: "Less than 1 month",
    screeningQuestions: [],
    showScreeningQuestions: false,
    workType: "contract",
    ...initialValues
  });

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [customSkill, setCustomSkill] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [customBudgetAmount, setCustomBudgetAmount] = useState(
    formState.budgetType === "fixed" ? formState.budgetAmount : 20
  );

  // Handle form field changes
  const handleChange = (field, value) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle adding/removing array items
  const handleArrayItemChange = (field, index, value) => {
    const newArray = [...formState[field]];
    newArray[index] = value;
    handleChange(field, newArray);
  };

  const addArrayItem = (field) => {
    handleChange(field, [...formState[field], ""]);
  };

  const removeArrayItem = (field, index) => {
    const newArray = [...formState[field]];
    newArray.splice(index, 1);
    handleChange(field, newArray);
  };

  // Handle specializations toggle
  const toggleSpecialization = (specialization) => {
    const current = [...formState.specializations];
    const index = current.indexOf(specialization);
    
    if (index === -1) {
      current.push(specialization);
    } else {
      current.splice(index, 1);
    }
    
    handleChange("specializations", current);
  };

  // Handle skills toggle
  const toggleSkill = (skill) => {
    const current = [...formState.skills];
    const index = current.indexOf(skill);
    
    if (index === -1) {
      current.push(skill);
    } else {
      current.splice(index, 1);
    }
    
    handleChange("skills", current);
  };

  // Handle custom skill add
  const addCustomSkill = () => {
    if (customSkill.trim() === "") return;
    
    const newCustomSkills = [...formState.customSkills, customSkill.trim()];
    handleChange("customSkills", newCustomSkills);
    setCustomSkill("");
  };

  // Handle custom skill remove
  const removeCustomSkill = (index) => {
    const newCustomSkills = [...formState.customSkills];
    newCustomSkills.splice(index, 1);
    handleChange("customSkills", newCustomSkills);
  };

  // Handle screening question add
  const addScreeningQuestion = () => {
    if (currentQuestion.trim() === "") return;
    
    const newQuestions = [...formState.screeningQuestions, currentQuestion.trim()];
    handleChange("screeningQuestions", newQuestions);
    setCurrentQuestion("");
  };

  // Handle screening question remove
  const removeScreeningQuestion = (index) => {
    const newQuestions = [...formState.screeningQuestions];
    newQuestions.splice(index, 1);
    handleChange("screeningQuestions", newQuestions);
  };

  // Handle budget type change and adjust amounts
  const handleBudgetTypeChange = (type) => {
    // When switching budget types, adjust the amount to something reasonable for that type
    let amount = type === "fixed" ? 1000 : 20;
    setCustomBudgetAmount(amount);
    handleChange("budgetType", type);
    handleChange("budgetAmount", amount);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combine all skills
    const allSkills = [...formState.skills, ...formState.customSkills];
    
    // Create the job posting object
    const jobPosting = {
      ...formState,
      skills: allSkills,
      postedDate: new Date().toISOString(),
      clientId: "current-user-id", // This would come from auth context in a real app
    };
    
    // Call the onSubmit prop with the job posting data
    onSubmit(jobPosting);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Post a New Job</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="details">Job Details</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="screening">Screening</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {activeTab === "details" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Experienced Tractor Operator Needed"
                  value={formState.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the job, including the work to be done and what you're looking for in a worker..."
                  value={formState.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="mt-1 min-h-32"
                  required
                />
              </div>
              
              <div>
                <Label>Responsibilities</Label>
                <div className="space-y-2 mt-1">
                  {formState.responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Responsibility ${index + 1}`}
                        value={responsibility}
                        onChange={(e) => handleArrayItemChange("responsibilities", index, e.target.value)}
                        className="flex-1"
                      />
                      {formState.responsibilities.length > 1 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeArrayItem("responsibilities", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem("responsibilities")}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Responsibility
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Location & Budget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="flex mt-1">
                    <div className="relative flex-1">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        placeholder="e.g., Portland, Oregon"
                        value={formState.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Location Type</Label>
                  <RadioGroup
                    value={formState.locationType}
                    onValueChange={(value) => handleChange("locationType", value)}
                    className="flex gap-4 mt-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="remote" id="remote" />
                      <Label htmlFor="remote" className="cursor-pointer">Remote</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="on-site" id="on-site" />
                      <Label htmlFor="on-site" className="cursor-pointer">On-site</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="hybrid" />
                      <Label htmlFor="hybrid" className="cursor-pointer">Hybrid</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Budget Type</Label>
                  <RadioGroup
                    value={formState.budgetType}
                    onValueChange={handleBudgetTypeChange}
                    className="flex gap-4 mt-1"
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
                  <div className="flex justify-between">
                    <Label>
                      {formState.budgetType === "fixed" ? "Budget Amount" : "Hourly Rate"}
                    </Label>
                    <span className="text-sm font-medium">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(customBudgetAmount)}
                      {formState.budgetType === "hourly" && "/hr"}
                    </span>
                  </div>
                  <Slider
                    value={[customBudgetAmount]}
                    min={formState.budgetType === "fixed" ? 100 : 10}
                    max={formState.budgetType === "fixed" ? 10000 : 100}
                    step={formState.budgetType === "fixed" ? 100 : 1}
                    className="mt-2"
                    onValueChange={(value) => {
                      setCustomBudgetAmount(value[0]);
                      handleChange("budgetAmount", value[0]);
                    }}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="timeline">Timeline</Label>
                <Select
                  value={formState.timeline}
                  onValueChange={(value) => handleChange("timeline", value)}
                >
                  <SelectTrigger id="timeline" className="mt-1">
                    <SelectValue placeholder="Select timeline" />
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
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === "requirements" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Qualifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Qualifications</Label>
                <div className="space-y-2 mt-1">
                  {formState.qualifications.map((qualification, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Qualification ${index + 1}`}
                        value={qualification}
                        onChange={(e) => handleArrayItemChange("qualifications", index, e.target.value)}
                        className="flex-1"
                      />
                      {formState.qualifications.length > 1 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeArrayItem("qualifications", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem("qualifications")}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Qualification
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="mb-1 block">Specializations (Select all that apply)</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {SPECIALIZATIONS.map((specialization) => {
                    const isSelected = formState.specializations.includes(specialization);
                    return (
                      <Badge
                        key={specialization}
                        variant={isSelected ? "default" : "outline"}
                        className={`px-3 py-1 cursor-pointer ${isSelected ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                        onClick={() => toggleSpecialization(specialization)}
                      >
                        {specialization}
                      </Badge>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Select specializations to help qualified workers find your job
                </p>
              </div>
              
              <div>
                <Label className="mb-1 block">Required Skills</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
                  {COMMON_SKILLS.map((skill) => {
                    const isSelected = formState.skills.includes(skill);
                    return (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={isSelected}
                          onCheckedChange={() => toggleSkill(skill)}
                        />
                        <Label
                          htmlFor={`skill-${skill}`}
                          className="cursor-pointer"
                        >
                          {skill}
                        </Label>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4">
                  <Label className="mb-1 block">Custom Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formState.customSkills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1"
                      >
                        {skill}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeCustomSkill(index)}
                        />
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex mt-2 gap-2">
                    <Input
                      placeholder="Add another skill"
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addCustomSkill();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={addCustomSkill}
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === "screening" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Screening Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enableScreening"
                  checked={formState.showScreeningQuestions}
                  onCheckedChange={(checked) => handleChange("showScreeningQuestions", checked)}
                />
                <Label htmlFor="enableScreening" className="cursor-pointer">
                  Include screening questions for applicants
                </Label>
              </div>
              
              {formState.showScreeningQuestions && (
                <div className="space-y-4 mt-2">
                  <div className="space-y-2">
                    {formState.screeningQuestions.map((question, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="flex-1 p-3 bg-gray-50 rounded-md">
                          <p className="font-medium">{question}</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeScreeningQuestion(index)}
                          className="mt-1.5"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <Label htmlFor="screeningQuestion">Add a Question</Label>
                    <div className="flex gap-2 mt-1">
                      <Textarea
                        id="screeningQuestion"
                        placeholder="e.g., How many years of experience do you have working with livestock?"
                        value={currentQuestion}
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={addScreeningQuestion}
                      className="mt-2 bg-orange-500 hover:bg-orange-600"
                      disabled={currentQuestion.trim() === ""}
                    >
                      Add Question
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="flex justify-between items-center pt-4 border-t">
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        
        <div className="flex gap-2">
          {activeTab === "details" ? (
            <Button
              type="button"
              onClick={() => setActiveTab("requirements")}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Continue to Requirements
            </Button>
          ) : activeTab === "requirements" ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab("details")}
              >
                Back to Details
              </Button>
              <Button
                type="button"
                onClick={() => setActiveTab("screening")}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Continue to Screening
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab("requirements")}
              >
                Back to Requirements
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Post Job
              </Button>
            </>
          )}
        </div>
      </div>
    </form>
  );
} 