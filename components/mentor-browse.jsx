"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Star, ChevronDown, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function MentorBrowse({ onSelectMentor }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    profession: "all",
    priceRange: [0, 100],
    rating: 0,
    availability: "any",
    level: []
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // Fix hydration issue by only rendering on client-side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Conditionally render star ratings to avoid hydration issues
  const renderStarRating = (rating) => {
    if (!isClient) return null;
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300 fill-current"
            }`}
          />
        ))}
      </div>
    );
  }

  // Mock mentors data - would be fetched from API in a real app
  const mentors = [
    {
      id: "m1",
      name: "Maria Smith",
      level: 5,
      profession: "Electrician",
      specialty: "Residential wiring",
      rating: 4.9,
      reviewCount: 42,
      hourlyRate: 60,
      availability: ["weekdays", "evenings"]
    },
    {
      id: "m2",
      name: "David Johnson",
      level: 4,
      profession: "Plumber",
      specialty: "Commercial plumbing",
      rating: 4.7,
      reviewCount: 28,
      hourlyRate: 55,
      availability: ["weekdays", "weekends"]
    },
    {
      id: "m3",
      name: "James Wilson",
      level: 3,
      profession: "Carpenter",
      specialty: "Cabinet making",
      rating: 4.5,
      reviewCount: 15,
      hourlyRate: 45,
      availability: ["weekends"]
    },
    {
      id: "m4",
      name: "Ana Rodriguez",
      level: 5,
      profession: "Painter",
      specialty: "Interior painting",
      rating: 5.0,
      reviewCount: 37,
      hourlyRate: 65,
      availability: ["weekdays", "evenings", "weekends"]
    },
    {
      id: "m5",
      name: "Michael Chen",
      level: 4,
      profession: "Electrician",
      specialty: "Industrial electrical",
      rating: 4.8,
      reviewCount: 31,
      hourlyRate: 70,
      availability: ["weekdays", "evenings"]
    },
    {
      id: "m6",
      name: "Sarah Miller",
      level: 3,
      profession: "HVAC Technician",
      specialty: "Residential HVAC",
      rating: 4.6,
      reviewCount: 23,
      hourlyRate: 50,
      availability: ["weekdays", "weekends"]
    }
  ]

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  // Handle level checkbox changes
  const handleLevelChange = (level) => {
    setFilters(prev => {
      const newLevels = [...prev.level]
      
      if (newLevels.includes(level)) {
        return { ...prev, level: newLevels.filter(l => l !== level) }
      } else {
        return { ...prev, level: [...newLevels, level] }
      }
    })
  }

  // Filter mentors based on search and filters
  const filteredMentors = mentors.filter(mentor => {
    // Search term filter
    if (searchTerm && !mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !mentor.profession.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !mentor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Profession filter
    if (filters.profession !== "all" && mentor.profession !== filters.profession) {
      return false
    }

    // Price range filter
    if (mentor.hourlyRate < filters.priceRange[0] || mentor.hourlyRate > filters.priceRange[1]) {
      return false
    }

    // Rating filter
    if (mentor.rating < filters.rating) {
      return false
    }

    // Level filter
    if (filters.level.length > 0 && !filters.level.includes(mentor.level)) {
      return false
    }

    // Availability filter (simplified for the example)
    if (filters.availability !== "any") {
      if (!mentor.availability.includes(filters.availability)) {
        return false
      }
    }

    return true
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-2xl font-bold">Find a Mentor</h1>
        <p className="text-gray-600">Connect with experienced professionals to accelerate your skill development</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters - Desktop */}
        <div className="hidden md:block">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Filters</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Profession</Label>
                      <Select 
                        value={filters.profession} 
                        onValueChange={(value) => handleFilterChange("profession", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Professions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Professions</SelectItem>
                          <SelectItem value="Electrician">Electrician</SelectItem>
                          <SelectItem value="Plumber">Plumber</SelectItem>
                          <SelectItem value="Carpenter">Carpenter</SelectItem>
                          <SelectItem value="Painter">Painter</SelectItem>
                          <SelectItem value="HVAC Technician">HVAC Technician</SelectItem>
                          <SelectItem value="Mason">Mason</SelectItem>
                          <SelectItem value="Roofer">Roofer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-2 block">Price Range (hourly)</Label>
                      <div className="pt-4 px-2">
                        <Slider 
                          value={filters.priceRange} 
                          min={0} 
                          max={100} 
                          step={5}
                          onValueChange={(value) => handleFilterChange("priceRange", value)}
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                          <span>${filters.priceRange[0]}</span>
                          <span>${filters.priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">Minimum Rating</Label>
                      <RadioGroup 
                        value={filters.rating.toString()} 
                        onValueChange={(value) => handleFilterChange("rating", Number(value))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="rating-any" />
                          <Label htmlFor="rating-any">Any rating</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4" id="rating-4" />
                          <Label htmlFor="rating-4" className="flex">
                            <span>4.0+</span>
                            <div className="flex ml-2">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                              <Star className="h-4 w-4 text-gray-300" />
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4.5" id="rating-4.5" />
                          <Label htmlFor="rating-4.5" className="flex">
                            <span>4.5+</span>
                            <div className="flex ml-2">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="mb-2 block">Mentor Level</Label>
                      <div className="space-y-2">
                        {[3, 4, 5].map((level) => (
                          <div key={level} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`level-${level}`} 
                              checked={filters.level.includes(level)}
                              onCheckedChange={() => handleLevelChange(level)}
                            />
                            <Label htmlFor={`level-${level}`} className="flex items-center">
                              <span>Level {level}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">Availability</Label>
                      <Select 
                        value={filters.availability} 
                        onValueChange={(value) => handleFilterChange("availability", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any Availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Availability</SelectItem>
                          <SelectItem value="weekdays">Weekdays</SelectItem>
                          <SelectItem value="evenings">Evenings</SelectItem>
                          <SelectItem value="weekends">Weekends</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setFilters({
                    profession: "all",
                    priceRange: [0, 100],
                    rating: 0,
                    availability: "any",
                    level: []
                  })}
                >
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Search and Filter Bar */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, profession, or specialty"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Mobile Filter Button */}
              <div className="md:hidden">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Mobile Filters */}
            {isFilterOpen && (
              <div className="md:hidden mt-4 p-4 border rounded-md bg-white">
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Profession</Label>
                    <Select 
                      value={filters.profession} 
                      onValueChange={(value) => handleFilterChange("profession", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Professions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Professions</SelectItem>
                        <SelectItem value="Electrician">Electrician</SelectItem>
                        <SelectItem value="Plumber">Plumber</SelectItem>
                        <SelectItem value="Carpenter">Carpenter</SelectItem>
                        <SelectItem value="Painter">Painter</SelectItem>
                        <SelectItem value="HVAC Technician">HVAC Technician</SelectItem>
                        <SelectItem value="Mason">Mason</SelectItem>
                        <SelectItem value="Roofer">Roofer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">Price Range (hourly)</Label>
                    <div className="pt-4 px-2">
                      <Slider 
                        value={filters.priceRange} 
                        min={0} 
                        max={100} 
                        step={5}
                        onValueChange={(value) => handleFilterChange("priceRange", value)}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setFilters({
                        profession: "all",
                        priceRange: [0, 100],
                        rating: 0,
                        availability: "any",
                        level: []
                      });
                      setIsFilterOpen(false);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">Showing {filteredMentors.length} mentors</p>
          </div>

          {/* Mentors List */}
          <div className="space-y-4">
            {filteredMentors.length > 0 ? (
              filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="overflow-hidden hover:border-orange-300 transition-all">
                  <CardContent className="p-0">
                    <Button 
                      variant="ghost" 
                      className="w-full h-auto p-0 block text-left"
                      onClick={() => onSelectMentor(mentor)}
                    >
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl font-bold text-gray-600">
                              {mentor.name.split(" ").map(n => n[0]).join("")}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-lg">{mentor.name}</h3>
                                <div className="flex items-center gap-2 mb-1">
                                  <Award className="h-4 w-4 text-orange-500" />
                                  <p className="text-gray-600">
                                    Level {mentor.level} {mentor.profession}
                                  </p>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">{mentor.specialty}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-lg">${mentor.hourlyRate}/hr</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-2">
                              {renderStarRating(mentor.rating)}
                              <span className="text-sm text-gray-600">
                                {mentor.rating} ({mentor.reviewCount} reviews)
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {mentor.availability.map((avail) => (
                                <span 
                                  key={avail} 
                                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                >
                                  Available {avail}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-2">No mentors match your current filters</p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({
                      profession: "all",
                      priceRange: [0, 100],
                      rating: 0,
                      availability: "any",
                      level: []
                    });
                  }}
                >
                  Reset all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 