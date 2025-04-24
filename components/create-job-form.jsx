"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function CreateJobForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: [],
    specializations: [],
    location: "",
    locationType: "remote",
    budgetType: "fixed",
    budgetAmount: "",
    timeline: "",
    workType: "contract",
  });
  
  const [errors, setErrors] = useState({});
  
  // Agricultural skill options
  const skillOptions = [
    { id: "crop-management", label: "Crop Management" },
    { id: "livestock-care", label: "Livestock Care" },
    { id: "machinery-operation", label: "Machinery Operation" },
    { id: "irrigation", label: "Irrigation Systems" },
    { id: "pest-management", label: "Pest Management" },
    { id: "organic-farming", label: "Organic Farming" },
    { id: "food-processing", label: "Food Processing" },
    { id: "agricultural-engineering", label: "Agricultural Engineering" },
  ];
  
  // Specialization options
  const specializationOptions = [
    { id: "dairy", label: "Dairy" },
    { id: "grain", label: "Grain" },
    { id: "fruits", label: "Fruits & Orchards" },
    { id: "vegetables", label: "Vegetables" },
    { id: "livestock", label: "Livestock" },
    { id: "poultry", label: "Poultry" },
    { id: "aquaculture", label: "Aquaculture" },
    { id: "greenhouse", label: "Greenhouse" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };
  
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };
  
  const handleCheckboxChange = (category, id) => {
    const currentItems = [...formData[category]];
    
    if (currentItems.includes(id)) {
      setFormData({
        ...formData,
        [category]: currentItems.filter(itemId => itemId !== id),
      });
    } else {
      setFormData({
        ...formData,
        [category]: [...currentItems, id],
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Job title is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Job description is required";
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    
    if (!formData.budgetAmount || Number(formData.budgetAmount) <= 0) {
      newErrors.budgetAmount = "Valid budget amount is required";
    }
    
    if (!formData.timeline.trim()) {
      newErrors.timeline = "Timeline is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-base">Job Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Seasonal Harvest Workers Needed"
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>
        
        <div>
          <Label htmlFor="description" className="text-base">Job Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the job responsibilities, requirements, and any other relevant details..."
            className={`min-h-[150px] ${errors.description ? "border-red-500" : ""}`}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location" className="text-base">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Sacramento, CA"
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>
          
          <div>
            <Label className="text-base">Location Type</Label>
            <RadioGroup
              value={formData.locationType}
              onValueChange={(value) => handleSelectChange("locationType", value)}
              className="flex space-x-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="remote" id="remote" />
                <Label htmlFor="remote">Remote</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="on-site" id="on-site" />
                <Label htmlFor="on-site">On-site</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid">Hybrid</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-base">Budget Type</Label>
            <RadioGroup
              value={formData.budgetType}
              onValueChange={(value) => handleSelectChange("budgetType", value)}
              className="flex space-x-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fixed" id="fixed" />
                <Label htmlFor="fixed">Fixed Price</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hourly" id="hourly" />
                <Label htmlFor="hourly">Hourly Rate</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="budgetAmount" className="text-base">
              {formData.budgetType === "fixed" ? "Budget Amount ($)" : "Hourly Rate ($/hr)"}
            </Label>
            <Input
              id="budgetAmount"
              name="budgetAmount"
              type="number"
              min="1"
              value={formData.budgetAmount}
              onChange={handleInputChange}
              placeholder={formData.budgetType === "fixed" ? "e.g., 5000" : "e.g., 25"}
              className={errors.budgetAmount ? "border-red-500" : ""}
            />
            {errors.budgetAmount && <p className="text-red-500 text-xs mt-1">{errors.budgetAmount}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="timeline" className="text-base">Timeline</Label>
            <Input
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              placeholder="e.g., 3 months, Ongoing, etc."
              className={errors.timeline ? "border-red-500" : ""}
            />
            {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline}</p>}
          </div>
          
          <div>
            <Label className="text-base">Work Type</Label>
            <RadioGroup
              value={formData.workType}
              onValueChange={(value) => handleSelectChange("workType", value)}
              className="flex space-x-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="contract" id="contract" />
                <Label htmlFor="contract">Contract</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="part-time" id="part-time" />
                <Label htmlFor="part-time">Part-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full-time" id="full-time" />
                <Label htmlFor="full-time">Full-time</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <Label className="text-base font-medium">Required Skills</Label>
              <p className="text-sm text-gray-500 mb-3">Select the skills required for this job</p>
              <div className="grid grid-cols-2 gap-2">
                {skillOptions.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill.id}
                      checked={formData.skills.includes(skill.id)}
                      onCheckedChange={() => handleCheckboxChange("skills", skill.id)}
                    />
                    <Label htmlFor={skill.id} className="text-sm font-normal">
                      {skill.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <Label className="text-base font-medium">Agricultural Specializations</Label>
              <p className="text-sm text-gray-500 mb-3">Select relevant specializations</p>
              <div className="grid grid-cols-2 gap-2">
                {specializationOptions.map((spec) => (
                  <div key={spec.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={spec.id}
                      checked={formData.specializations.includes(spec.id)}
                      onCheckedChange={() => handleCheckboxChange("specializations", spec.id)}
                    />
                    <Label htmlFor={spec.id} className="text-sm font-normal">
                      {spec.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          Post Job
        </Button>
      </div>
    </form>
  );
} 