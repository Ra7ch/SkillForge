"use client"

import { useState } from "react"
import { Award, ArrowLeft, ArrowRight, CalendarIcon, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import axios from "axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WorkerRegistration({ navigateTo, onComplete }) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    age: "",
    password: "",
    profession: "",
    experience: "",
    specializations: [],
    formalTraining: "",
    trainingDuration: "",
    assessmentDate: null,
  })
  const [showSpecializationPopup, setShowSpecializationPopup] = useState(false)
  const [errors, setErrors] = useState({})

  // Agricultural specializations
  const professions = [
    "Crop Production",
    "Animal Production",
    "Forestry and Agroforestry",
    "Specialized Agriculture",
    "Soil and Environmental Sciences",
    "Agricultural Engineering",
    "Agribusiness and Economics",
    "Food Science and Technology",
    "Sustainable and Organic Agriculture",
    "Agricultural Education and Extension"
  ]

  // Subspecializations for each profession
  const subspecializations = {
    "Crop Production": [
      "Agronomy",
      "Horticulture",
      "Plant Breeding and Genetics",
      "Plant Pathology",
      "Entomology"
    ],
    "Animal Production": [
      "Animal Husbandry",
      "Dairy Science",
      "Poultry Science",
      "Aquaculture"
    ],
    "Forestry and Agroforestry": [
      "Forestry",
      "Agroforestry"
    ],
    "Specialized Agriculture": [
      "Apiculture",
      "Sericulture",
      "Mushroom Cultivation"
    ],
    "Soil and Environmental Sciences": [
      "Soil Science",
      "Agricultural Chemistry",
      "Environmental Science"
    ],
    "Agricultural Engineering": [
      "Farm Machinery",
      "Irrigation Engineering",
      "Post-Harvest Technology"
    ],
    "Agribusiness and Economics": [
      "Agricultural Economics",
      "Agribusiness Management",
      "Rural Development"
    ],
    "Food Science and Technology": [
      "Food Processing",
      "Food Safety and Quality",
      "Nutrition Science"
    ],
    "Sustainable and Organic Agriculture": [
      "Organic Farming",
      "Permaculture",
      "Climate-Smart Agriculture"
    ],
    "Agricultural Education and Extension": [
      "Agricultural Extension",
      "Agricultural Education",
      "Communication and Outreach"
    ]
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSpecializationChange = (value) => {
    let updatedSpecializations = [...formData.specializations]
    
    if (updatedSpecializations.includes(value)) {
      updatedSpecializations = updatedSpecializations.filter(spec => spec !== value)
    } else {
      updatedSpecializations.push(value)
    }
    
    setFormData(prev => ({
      ...prev,
      specializations: updatedSpecializations
    }))
    
    if (errors.specializations) {
      setErrors(prev => ({ ...prev, specializations: "" }))
    }
  }

  const validateStep = (currentStep) => {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }
      if (!formData.whatsapp.trim()) newErrors.whatsapp = "WhatsApp number is required"
      if (!formData.age.trim()) newErrors.age = "Age is required"
      else if (isNaN(formData.age) || Number.parseInt(formData.age) < 18 || Number.parseInt(formData.age) > 100) {
        newErrors.age = "Please enter a valid age between 18 and 100"
      }
      if (!formData.password) newErrors.password = "Password is required"
      else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
      }
    } else if (currentStep === 2) {
      if (!formData.profession) newErrors.profession = "Please select a profession"
      if (!formData.experience) newErrors.experience = "Please select your experience level"
      if (formData.specializations.length === 0) newErrors.specializations = "Please select at least one specialization"
    } else if (currentStep === 3) {
      if (!formData.formalTraining) newErrors.formalTraining = "Please select an option"
      if (formData.formalTraining === "Yes" && !formData.trainingDuration) {
        newErrors.trainingDuration = "Please enter training duration"
      }
    } else if (currentStep === 4) {
      if (!formData.assessmentDate) newErrors.assessmentDate = "Please select an assessment date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async () => {
    if (validateStep(step)) {
      setIsSubmitting(true);
      
      try {
        // Generate a Google Meet link (in a real app, you'd use the Google Calendar API)
        const meetingId = Math.random().toString(36).substring(2, 10);
        const googleMeetLink = `https://meet.google.com/${meetingId}`;
        
        // Format date to a readable string
        const formattedDate = format(formData.assessmentDate, "PPP p");
        
        // Send data to n8n webhook
        await axios.post("https://ra7ch.app.n8n.cloud/webhook-test/lead-submission", {
          name: formData.name,
          phone: formData.whatsapp,
          email: formData.email,
          assessmentDate: formattedDate,
          profession: formData.profession,
          specializations: formData.specializations,
          meetingLink: googleMeetLink
        });
        
        // Update formData with the meeting link before completing
        const updatedFormData = {
          ...formData,
          googleMeetLink
        };
        
        // In a real app, you would submit to a server here
        onComplete(updatedFormData);
        
      } catch (error) {
        console.error("Error sending data to webhook:", error);
        // Still complete the registration even if webhook fails
        onComplete(formData);
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  stepNumber === step
                    ? "bg-orange-500 text-white"
                    : stepNumber < step
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNumber < step ? <Check size={16} /> : stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`h-1 w-10 ${stepNumber < step ? "bg-green-500" : "bg-gray-200"}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Please provide your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="+1 234 567 8900"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className={errors.whatsapp ? "border-red-500" : ""}
                />
                {errors.whatsapp && <p className="text-red-500 text-sm">{errors.whatsapp}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="30"
                  value={formData.age}
                  onChange={handleChange}
                  className={errors.age ? "border-red-500" : ""}
                />
                {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                <p className="text-xs text-gray-500">Must be at least 6 characters</p>
              </div>
            </CardContent>
          </>
        )

      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Tell us about your agricultural specialization and experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Select Agricultural Specialization</Label>
                <div className="grid grid-cols-2 gap-2">
                  {professions.map((profession) => (
                    <div
                      key={profession}
                      className={`border rounded-md p-3 cursor-pointer transition-all ${
                        formData.profession === profession
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          profession,
                          specializations: [], // Reset specializations when profession changes
                        }));
                        setShowSpecializationPopup(true);
                        if (errors.profession) {
                          setErrors((prev) => ({ ...prev, profession: "" }));
                        }
                      }}
                    >
                      <div className="text-center">
                        <span className="text-sm">{profession}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.profession && <p className="text-red-500 text-sm">{errors.profession}</p>}
              </div>

              {formData.profession && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Your Specializations</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowSpecializationPopup(true)}
                    >
                      Edit
                    </Button>
                  </div>
                  
                  {formData.specializations.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.specializations.map((spec) => (
                        <div key={spec} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                          {spec}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No specializations selected yet</p>
                  )}
                  {errors.specializations && <p className="text-red-500 text-sm">{errors.specializations}</p>}
                </div>
              )}

              {/* Specialization Popup */}
              {showSpecializationPopup && formData.profession && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg w-full max-w-md p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Select Your Specializations</h3>
                      <button 
                        type="button" 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setShowSpecializationPopup(false)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      {subspecializations[formData.profession]?.map((spec) => (
                        <div 
                          key={spec}
                          className={`border p-3 rounded-md cursor-pointer transition-all ${
                            formData.specializations.includes(spec)
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-200 hover:border-orange-100"
                          }`}
                          onClick={() => handleSpecializationChange(spec)}
                        >
                          <div className="flex justify-between items-center">
                            <span>{spec}</span>
                            {formData.specializations.includes(spec) && (
                              <Check className="h-4 w-4 text-orange-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={() => setShowSpecializationPopup(false)}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  placeholder="5"
                  value={formData.experience}
                  onChange={handleChange}
                  className={errors.experience ? "border-red-500" : ""}
                />
                {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
              </div>

            </CardContent>
          </>
        )

      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Training Information</CardTitle>
              <CardDescription>Tell us about your formal training</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Have you received formal training?</Label>
                <RadioGroup
                  value={formData.formalTraining}
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      formalTraining: value,
                      // Reset training duration if "No" is selected
                      trainingDuration: value === "No" ? "" : prev.trainingDuration,
                    }))
                    if (errors.formalTraining) {
                      setErrors((prev) => ({ ...prev, formalTraining: "" }))
                    }
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="training-yes" />
                    <Label htmlFor="training-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id="training-no" />
                    <Label htmlFor="training-no">No</Label>
                  </div>
                </RadioGroup>
                {errors.formalTraining && <p className="text-red-500 text-sm">{errors.formalTraining}</p>}
              </div>

              {formData.formalTraining === "Yes" && (
                <div className="space-y-2">
                  <Label htmlFor="trainingDuration">Training Duration</Label>
                  <Input
                    id="trainingDuration"
                    name="trainingDuration"
                    placeholder="e.g., 6 months, 2 years"
                    value={formData.trainingDuration}
                    onChange={handleChange}
                    className={errors.trainingDuration ? "border-red-500" : ""}
                  />
                  {errors.trainingDuration && <p className="text-red-500 text-sm">{errors.trainingDuration}</p>}
                </div>
              )}
            </CardContent>
          </>
        )

      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle>Schedule Assessment</CardTitle>
              <CardDescription>Choose a date for your skill assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Assessment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.assessmentDate && "text-muted-foreground",
                        errors.assessmentDate && "border-red-500",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.assessmentDate ? format(formData.assessmentDate, "PPP p") : <span>Select a date and time</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <div className="p-3">
                      <Calendar
                        mode="single"
                        selected={formData.assessmentDate}
                        onSelect={(date) => {
                          // Preserve the time if already set
                          if (date) {
                            const currentTime = formData.assessmentDate ? 
                              new Date(formData.assessmentDate) : 
                              new Date(date);
                            if (formData.assessmentDate) {
                              date.setHours(currentTime.getHours());
                              date.setMinutes(currentTime.getMinutes());
                            }
                          }
                          setFormData((prev) => ({ ...prev, assessmentDate: date }))
                          if (errors.assessmentDate) {
                            setErrors((prev) => ({ ...prev, assessmentDate: "" }))
                          }
                        }}
                        initialFocus
                        disabled={(date) => {
                          // Disable dates in the past and weekends
                          const today = new Date()
                          today.setHours(0, 0, 0, 0)
                          const day = date.getDay()
                          return date < today || day === 0 || day === 6
                        }}
                      />
                      
                      {formData.assessmentDate && (
                        <div className="border-t pt-3 mt-3">
                          <Label className="mb-2 block">Time</Label>
                          <div className="flex space-x-2">
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={formData.assessmentDate ? formData.assessmentDate.getHours() : 9}
                              onChange={(e) => {
                                const newDate = new Date(formData.assessmentDate);
                                newDate.setHours(parseInt(e.target.value));
                                setFormData((prev) => ({ ...prev, assessmentDate: newDate }));
                              }}
                            >
                              {Array.from({ length: 10 }, (_, i) => i + 9).map((hour) => (
                                <option key={hour} value={hour}>
                                  {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
                {errors.assessmentDate && <p className="text-red-500 text-sm">{errors.assessmentDate}</p>}

                <div className="mt-4 bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-2">What to expect:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
                    <li>The assessment will take approximately 2 hours</li>
                    <li>Bring your identification and any relevant certifications</li>
                    <li>Both theoretical knowledge and practical skills will be evaluated</li>
                    <li>Results will be available within 5 business days</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-3 rounded-full">
            <Award className="h-8 w-8 text-orange-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Worker Registration</h1>
        <p className="text-gray-600 text-center mb-6">Complete your profile to get certified</p>

        {renderStepIndicator()}

        <Card>
          {renderStep()}

          {step === 4 && (
            <div className="px-6 pb-0">
              <div className="bg-blue-50 p-4 rounded-md mt-2">
                <p className="text-sm text-blue-700">
                  After registration, you'll receive a WhatsApp message with your assessment details and a Google Meet link for the virtual assessment.
                </p>
              </div>
            </div>
          )}

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={step === 1 || isSubmitting}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {step < 4 ? (
              <Button onClick={handleNext} className="bg-orange-500 hover:bg-orange-600" disabled={isSubmitting}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                className="bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Registration <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
