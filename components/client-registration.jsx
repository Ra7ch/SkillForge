"use client"

import { useState } from "react"
import { Award, ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ClientRegistration({ navigateTo, onComplete }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    companyName: "",
    clientType: "",
    servicesNeeded: [],
    projectDescription: "",
    preferredContactMethod: "",
    howDidYouHear: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleServiceChange = (value) => {
    setFormData((prev) => {
      const services = [...prev.servicesNeeded]

      if (services.includes(value)) {
        return {
          ...prev,
          servicesNeeded: services.filter((item) => item !== value),
        }
      } else {
        return {
          ...prev,
          servicesNeeded: [...services, value],
        }
      }
    })
  }

  const validateStep = (currentStep) => {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      if (!formData.password) newErrors.password = "Password is required"
      else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
      }
    } else if (currentStep === 2) {
      if (!formData.clientType) newErrors.clientType = "Please select a client type"
      if (formData.servicesNeeded.length === 0) newErrors.servicesNeeded = "Please select at least one service"
      if (!formData.projectDescription.trim()) newErrors.projectDescription = "Please provide a brief description"
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

  const handleSubmit = () => {
    if (validateStep(step)) {
      // In a real app, you would submit to a server here
      onComplete(formData)
    }
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  stepNumber === step
                    ? "bg-blue-500 text-white"
                    : stepNumber < step
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNumber < step ? <Check size={16} /> : stepNumber}
              </div>
              {stepNumber < 3 && (
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
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Please provide your contact details</CardDescription>
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
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

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name (Optional)</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="Your Company Ltd."
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </>
        )

      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>Tell us about your project needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Client Type</Label>
                <RadioGroup
                  value={formData.clientType}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, clientType: value }))
                    if (errors.clientType) {
                      setErrors((prev) => ({ ...prev, clientType: "" }))
                    }
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Individual" id="type-individual" />
                    <Label htmlFor="type-individual">Individual/Homeowner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Business" id="type-business" />
                    <Label htmlFor="type-business">Business/Commercial</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Contractor" id="type-contractor" />
                    <Label htmlFor="type-contractor">Contractor/Builder</Label>
                  </div>
                </RadioGroup>
                {errors.clientType && <p className="text-red-500 text-sm">{errors.clientType}</p>}
              </div>

              <div className="space-y-2">
                <Label>Services Needed</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Plumbing",
                    "Electrical",
                    "Carpentry",
                    "Painting",
                    "HVAC",
                    "Masonry",
                    "Roofing",
                    "General Maintenance",
                  ].map((service) => (
                    <div key={service} className="flex items-start space-x-2">
                      <Checkbox
                        id={service}
                        checked={formData.servicesNeeded.includes(service)}
                        onCheckedChange={() => handleServiceChange(service)}
                      />
                      <Label htmlFor={service} className="font-normal">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.servicesNeeded && <p className="text-red-500 text-sm">{errors.servicesNeeded}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDescription">Brief Project Description</Label>
                <Textarea
                  id="projectDescription"
                  name="projectDescription"
                  placeholder="Please describe your project or service needs..."
                  value={formData.projectDescription}
                  onChange={handleChange}
                  className={errors.projectDescription ? "border-red-500" : ""}
                  rows={4}
                />
                {errors.projectDescription && <p className="text-red-500 text-sm">{errors.projectDescription}</p>}
              </div>
            </CardContent>
          </>
        )

      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Help us serve you better</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
                <Select
                  value={formData.preferredContactMethod}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredContactMethod: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="howDidYouHear">How did you hear about us?</Label>
                <Select
                  value={formData.howDidYouHear}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, howDidYouHear: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="search">Search Engine</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="friend">Friend/Referral</SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium text-blue-800 mb-2">What happens next?</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
                  <li>Our team will review your information</li>
                  <li>We'll match you with qualified professionals</li>
                  <li>You'll receive profiles of available workers within 24 hours</li>
                  <li>You can review their certifications and experience before making a decision</li>
                </ul>
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
          <div className="bg-blue-100 p-3 rounded-full">
            <Award className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Client Registration</h1>
        <p className="text-gray-600 text-center mb-6">Find qualified professionals for your projects</p>

        {renderStepIndicator()}

        <Card>
          {renderStep()}
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={step === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {step < 3 ? (
              <Button onClick={handleNext} className="bg-blue-500 hover:bg-blue-600">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                Complete Registration <Check className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
