"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Star, Calendar, Clock, Award, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Helper function to safely render star ratings
const StarRating = ({ rating, size = 4, className = "" }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-${size} w-${size} ${
            i < Math.floor(rating) 
              ? "text-yellow-400 fill-current" 
              : "text-gray-300"
          } ${className}`}
        />
      ))}
    </div>
  );
};

export default function MentorProfile({ mentor, navigateBack }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState("hourly")
  const [bookingStep, setBookingStep] = useState(1)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // Fix hydration issue by only rendering date-dependent content on client-side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Use provided mentor data or fallback to default if not available
  const mentorData = mentor ?? {
    id: "m1",
    name: "Maria Smith",
    level: 5,
    profession: "Crop Production",
    specialty: "Agronomy",
    rating: 4.9,
    reviewCount: 42,
    hourlyRate: 60,
    packageRates: isClient ? {
      hourly: 60,
      "5-sessions": 275, // $55/hour
      "10-sessions": 500, // $50/hour
    } : {},
    about: "Master Agronomist with over 15 years of experience in crop production and soil management. Certified instructor for agricultural training programs with expertise in sustainable farming practices.",
    certifications: isClient ? ["Advanced Agronomy Certification", "Sustainable Farming Practices", "Agricultural Education Certification"] : [],
    availableTimeSlots: isClient ? [
      { date: new Date(Date.now() + 86400000), slots: ["09:00", "13:00", "15:00"] },
      { date: new Date(Date.now() + 86400000 * 2), slots: ["10:00", "14:00"] },
      { date: new Date(Date.now() + 86400000 * 3), slots: ["09:00", "11:00", "16:00"] },
    ] : []
  }

  // Filter time slots based on selected date - only run when on client
  const availableTimeSlots = (isClient && selectedDate)
    ? mentorData.availableTimeSlots.find(
        (day) => format(day.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : []

  // Calculate total price based on selected package
  const calculateTotal = () => {
    if (!isClient || !mentorData.packageRates) {
      return { sessionPrice: 0, platformFee: 0, total: 0 }
    }
    const basePrice = mentorData.packageRates[selectedPackage] || mentorData.hourlyRate || 0
    const platformFee = basePrice * 0.15 // 15% platform fee
    
    return {
      sessionPrice: basePrice,
      platformFee,
      total: basePrice + platformFee
    }
  }

  const handleBookSession = () => {
    if (bookingStep === 1 && selectedDate && selectedTimeSlot) {
      setBookingStep(2)
    } else if (bookingStep === 2) {
      setShowPaymentDialog(true)
    }
  }

  const handleConfirmPayment = () => {
    // In a real app, this would process the payment
    // and create the booking in the database
    setShowPaymentDialog(false)
    // Show confirmation or redirect to bookings page
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center text-gray-600"
        onClick={navigateBack}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mentor Info Section */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-gray-600">
                    {mentorData.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h2 className="text-xl font-bold">{mentorData.name}</h2>
                <p className="text-gray-600 mb-2">
                  Level {mentorData.level} {mentorData.profession}
                </p>
                <p className="text-sm text-gray-500 mb-3">{mentorData.specialty}</p>
                
                <div className="flex items-center mb-4">
                  <StarRating rating={mentorData.rating} />
                  <span className="text-sm ml-2">
                    {mentorData.rating} ({mentorData.reviewCount} reviews)
                  </span>
                </div>

                <div className="bg-orange-50 px-4 py-2 rounded-md mb-4 w-full">
                  <p className="font-bold">${mentorData.hourlyRate}/hour</p>
                </div>
              </div>

              <div className="text-left">
                <h3 className="font-bold mb-2">About</h3>
                <p className="text-sm text-gray-600 mb-4">{mentorData.about}</p>

                <h3 className="font-bold mb-2">Certifications</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 mb-6">
                  {isClient && mentorData.certifications && mentorData.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Section */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Book a Mentorship Session</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="booking" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="booking">Book Session</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="booking">
                  {bookingStep === 1 ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">1. Select Date & Time</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label className="mb-2 block">Select Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !selectedDate && "text-gray-400"
                                  )}
                                >
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <CalendarComponent
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={setSelectedDate}
                                  initialFocus
                                  disabled={(date) => 
                                    date < new Date() || 
                                    !(isClient && mentorData.availableTimeSlots && mentorData.availableTimeSlots.some(
                                      (day) => format(day.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                                    ))
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div>
                            <Label className="mb-2 block">Select Time Slot</Label>
                            <div className="grid grid-cols-3 gap-2">
                              {availableTimeSlots.length > 0 ? (
                                availableTimeSlots.map((time) => (
                                  <Button
                                    key={time}
                                    variant={selectedTimeSlot === time ? "default" : "outline"}
                                    className={
                                      selectedTimeSlot === time
                                        ? "bg-orange-500 hover:bg-orange-600"
                                        : ""
                                    }
                                    onClick={() => setSelectedTimeSlot(time)}
                                  >
                                    {time}
                                  </Button>
                                ))
                              ) : (
                                <div className="col-span-3 text-gray-500 text-sm">
                                  {selectedDate
                                    ? "No available time slots for selected date"
                                    : "Select a date first"}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t">
                        <Button 
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          disabled={!selectedDate || !selectedTimeSlot}
                          onClick={handleBookSession}
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">2. Select Package & Review</h3>
                        
                        <div className="mb-6">
                          <Label className="mb-2 block">Select Package</Label>
                          <RadioGroup 
                            value={selectedPackage} 
                            onValueChange={setSelectedPackage}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2 border rounded-md p-3">
                              <RadioGroupItem value="hourly" id="hourly" />
                              <Label htmlFor="hourly" className="flex flex-1 justify-between">
                                <span>Single Session</span>
                                <span className="font-medium">${isClient && mentorData.packageRates ? mentorData.packageRates.hourly : 0}/hr</span>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-md p-3">
                              <RadioGroupItem value="5-sessions" id="5-sessions" />
                              <Label htmlFor="5-sessions" className="flex flex-1 justify-between">
                                <div>
                                  <span>5 Session Package</span>
                                  <p className="text-xs text-gray-500">Save 8%</p>
                                </div>
                                <span className="font-medium">${isClient && mentorData.packageRates ? mentorData.packageRates["5-sessions"] : 0}</span>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-md p-3">
                              <RadioGroupItem value="10-sessions" id="10-sessions" />
                              <Label htmlFor="10-sessions" className="flex flex-1 justify-between">
                                <div>
                                  <span>10 Session Package</span>
                                  <p className="text-xs text-gray-500">Save 17%</p>
                                </div>
                                <span className="font-medium">${isClient && mentorData.packageRates ? mentorData.packageRates["10-sessions"] : 0}</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-md mb-6">
                          <h4 className="font-medium mb-3">Booking Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date:</span>
                              <span>{selectedDate ? format(selectedDate, "PPP") : ""}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Time:</span>
                              <span>{selectedTimeSlot}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Mentor:</span>
                              <span>{mentorData.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Package:</span>
                              <span>
                                {selectedPackage === "hourly" 
                                  ? "Single Session" 
                                  : selectedPackage === "5-sessions" 
                                    ? "5 Session Package" 
                                    : "10 Session Package"}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-orange-50 p-4 rounded-md mb-6">
                          <h4 className="font-medium mb-3">Payment Summary</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Session Price:</span>
                              <span>${calculateTotal().sessionPrice}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Platform Fee (15%):</span>
                              <span>${calculateTotal().platformFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold pt-2 border-t mt-2">
                              <span>Total:</span>
                              <span>${calculateTotal().total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-3">
                        <Button 
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={handleBookSession}
                        >
                          Proceed to Payment
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setBookingStep(1)}
                        >
                          Back to Calendar
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="space-y-4">
                    {[
                      {
                        name: "Alex Johnson",
                        date: "April 2, 2023",
                        rating: 5,
                        comment: "Maria's expertise in residential wiring is exceptional. She explained complex concepts in simple terms and helped me prepare for my certification exam. Worth every penny!",
                      },
                      {
                        name: "Taylor R.",
                        date: "March 15, 2023",
                        rating: 5,
                        comment: "Great mentor with extensive knowledge. Very patient and thorough in her explanations.",
                      },
                      {
                        name: "Sam Williams",
                        date: "February 28, 2023",
                        rating: 4,
                        comment: "Very knowledgeable and professional. The sessions were well structured and informative.",
                      },
                    ].map((review, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">{review.name}</div>
                            <div className="text-sm text-gray-500">{review.date}</div>
                          </div>
                          <div className="flex mb-2">
                            <StarRating rating={review.rating} />
                          </div>
                          <p className="text-gray-600 text-sm">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              Your session will be confirmed once payment is completed.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-bold">${calculateTotal().total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Mock Payment Form - would integrate with Stripe or another provider */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <input 
                  type="text" 
                  id="card-number" 
                  placeholder="1234 5678 9012 3456" 
                  className="w-full p-2 border rounded-md mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <input 
                    type="text" 
                    id="expiry" 
                    placeholder="MM/YY" 
                    className="w-full p-2 border rounded-md mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <input 
                    type="text" 
                    id="cvc" 
                    placeholder="123" 
                    className="w-full p-2 border rounded-md mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setShowPaymentDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleConfirmPayment}
            >
              Pay & Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 