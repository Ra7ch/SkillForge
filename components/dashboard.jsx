"use client"

import { useState } from "react"
import { Award, Clock, Users, Calendar, CheckCircle, ArrowRight, FileText, Briefcase, Star, Brain, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AIAssessmentGenerator from "@/components/ai-assessment-generator"
import AIMentoringAssistant from "@/components/ai-mentoring-assistant"
import dynamic from "next/dynamic"

// Dynamically import the JobMarketplace component
const JobMarketplace = dynamic(() => import("@/app/job-marketplace/page").then(mod => mod.default), {
  loading: () => <p>Loading Job Marketplace...</p>,
})

// Dynamically import the Client Job Marketplace
const ClientJobMarketplace = dynamic(() => import("@/app/job-marketplace/client-page").then(mod => mod.default), {
  loading: () => <p>Loading Job Marketplace...</p>,
})

export default function Dashboard({ userData, userType, navigateTo }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Worker dashboard content
  const renderWorkerDashboard = () => {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-orange-500">
            <img 
              src={userData?.profileImage || "/placeholder-user.jpg"} 
              alt={userData?.name || "Worker"} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome back, {userData?.name || "Worker"}</h1>
            <p className="text-gray-600">Track your certification progress and professional growth</p>
          </div>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="ai-tools">AI Mentor</TabsTrigger>
            <TabsTrigger value="worklog">Work Log</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
            <TabsTrigger value="jobs">Job Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600 flex items-center">
                    Current Level
                    <Award className="h-4 w-4 text-orange-500 ml-auto" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold">Level 2</h3>
                  <p className="text-sm text-gray-600">{userData?.profession || "Professional"}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600 flex items-center">
                    Work Hours
                    <Clock className="h-4 w-4 text-blue-500 ml-auto" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold">450</h3>
                  <p className="text-sm text-gray-600">Total verified hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600 flex items-center">
                    Ranking
                    <Users className="h-4 w-4 text-green-500 ml-auto" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold">#42</h3>
                  <p className="text-sm text-gray-600">Among {userData?.profession || "professionals"}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                  <div className="flex items-start gap-3 mb-4 md:mb-0">
                    <div className="bg-orange-100 p-2 rounded-md">
                      <Calendar className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Upcoming Assessment</h3>
                      <h4 className="text-lg font-semibold">
                        Level 3 {userData?.profession || "Professional"} Assessment
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {userData?.assessmentDate
                              ? new Date(userData.assessmentDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "May 15, 2025"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>10:00 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">Level Progress</h2>
                  <p className="text-gray-600 text-sm">Track your progress to Level 3</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Work Hours</span>
                    <span className="text-sm font-medium">450 / 750</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Assessment Score</span>
                    <span className="text-sm font-medium">85 / 100</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Level 3 Requirements:</h3>
                    </div>
                  </div>
                  <ul className="ml-7 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="block w-1 h-1 rounded-full bg-gray-500 mt-2"></span>
                      <span>Complete Level 3 Assessment (Scheduled)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="block w-1 h-1 rounded-full bg-gray-500 mt-2"></span>
                      <span>Accumulate 750 verified work hours (450/750)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="block w-1 h-1 rounded-full bg-gray-500 mt-2"></span>
                      <span>Submit 3 project case studies (1/3)</span>
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-gray-900 hover:bg-gray-800">View Detailed Requirements</Button>
              </div>
            </div>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">New: Mentorship Program</h3>
                    <p className="text-gray-700 mb-4">
                      Share your expertise and earn additional income by mentoring junior professionals in your field.
                    </p>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => navigateTo("mentorshipManagement")}
                    >
                      Manage Your Mentorship
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming & Past Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 p-2 rounded-md">
                        <Calendar className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full inline-block mb-1">
                          Upcoming
                        </div>
                        <h4 className="text-lg font-semibold">
                          Level 3 {userData?.profession || "Professional"} Assessment
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {userData?.assessmentDate
                                ? new Date(userData.assessmentDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : "May 15, 2025"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>10:00 AM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-tools">
            <div className="space-y-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">AI-Powered Learning Tools</h2>
                <p className="text-gray-600">
                  Use our AI assistants to accelerate your learning and prepare for certifications
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-semibold">Practice Assessments</h3>
                  </div>
                  <AIAssessmentGenerator 
                    userProfession={userData?.profession || "Crop Production"} 
                    userSpecializations={userData?.specializations || []}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-semibold">AI Learning Assistant</h3>
                  </div>
                  <AIMentoringAssistant 
                    userProfession={userData?.profession || "Crop Production"} 
                    userSpecializations={userData?.specializations || []}
                  />
                </div>
              </div>
              
              <Card className="bg-blue-50 border-blue-200 mt-8">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Benefits of AI-Powered Learning</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full mt-0.5">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">24/7 Learning Support</p>
                        <p className="text-sm text-gray-600">Access learning resources any time</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full mt-0.5">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Personalized Practice</p>
                        <p className="text-sm text-gray-600">Customized to your specialization</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full mt-0.5">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Immediate Feedback</p>
                        <p className="text-sm text-gray-600">Get instant explanations and answers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full mt-0.5">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Certification Readiness</p>
                        <p className="text-sm text-gray-600">Build confidence before formal assessment</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="worklog">
            <Card>
              <CardHeader>
                <CardTitle>Work Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">Log New Work Hours</Button>
                  <p className="text-gray-500 text-sm">
                    No work logs found. Start logging your work hours to track your progress.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications">
            <Card>
              <CardHeader>
                <CardTitle>My Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 border rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 p-2 rounded-md">
                        <Award className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">Level 2 {userData?.profession || "Professional"}</h4>
                        <p className="text-sm text-gray-600">Issued: January 15, 2023</p>
                      </div>
                      <Button size="sm" variant="outline" className="ml-auto">
                        View Certificate
                      </Button>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Next Certification:</h4>
                    <p className="text-sm">Complete all Level 3 requirements to earn your Level 3 Certification.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentorship">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">Mentorship Program</h2>
                  <p className="text-gray-600 text-sm">Connect with professionals for skill development</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="bg-orange-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 text-orange-500 mr-2" />
                      Become a Mentor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Share your expertise and earn additional income by mentoring junior professionals in your field.</p>
                    <div className="bg-white p-4 rounded-md mb-4">
                      <h4 className="font-medium mb-2">Benefits of being a mentor:</h4>
                      <ul className="space-y-2 ml-5 list-disc">
                        <li>Earn income from training sessions</li>
                        <li>Gain additional certification points</li>
                        <li>Build your professional reputation</li>
                        <li>Expand your professional network</li>
                      </ul>
                    </div>
                    <Button 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => navigateTo("mentorshipManagement")}
                    >
                      Manage Mentorship
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 text-blue-500 mr-2" />
                      Find a Mentor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Accelerate your growth by learning from experienced professionals in your field.</p>
                    <div className="bg-white p-4 rounded-md mb-4">
                      <h4 className="font-medium mb-2">Benefits of having a mentor:</h4>
                      <ul className="space-y-2 ml-5 list-disc">
                        <li>Learn industry best practices</li>
                        <li>Get personalized guidance for certification</li>
                        <li>Build valuable industry connections</li>
                        <li>Progress faster in your career</li>
                      </ul>
                    </div>
                    <Button 
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => navigateTo("browseMentors")}
                    >
                      Browse Available Mentors
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Your Upcoming Mentorship Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6">
                    <p className="text-gray-500 mb-4">You have no upcoming mentorship sessions.</p>
                    <Button 
                      variant="outline"
                      onClick={() => navigateTo("mentorshipManagement")}
                    >
                      View All Mentorship Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <JobMarketplace />
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  // Client dashboard content
  const renderClientDashboard = () => {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-blue-500">
            <img 
              src={userData?.profileImage || "/placeholder-user.jpg"} 
              alt={userData?.name || "Client"} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome back, {userData?.name || "Client"}</h1>
            <p className="text-gray-600">Find verified professionals for your projects</p>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="professionals">Professionals</TabsTrigger>
            <TabsTrigger value="jobs">Job Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600 flex items-center">
                    Active Projects
                    <Briefcase className="h-4 w-4 text-blue-500 ml-auto" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold">2</h3>
                  <p className="text-sm text-gray-600">In progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600 flex items-center">
                    Total Hires
                    <Users className="h-4 w-4 text-green-500 ml-auto" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold">5</h3>
                  <p className="text-sm text-gray-600">Across 3 projects</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-600 flex items-center">
                    Upcoming Appointments
                    <Calendar className="h-4 w-4 text-orange-500 ml-auto" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold">1</h3>
                  <p className="text-sm text-gray-600">This week</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Current Projects</span>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">Kitchen Renovation</h4>
                        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">In Progress</div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Plumbing and electrical work for kitchen remodel</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>2 professionals assigned</span>
                        <span>Due: June 30, 2025</span>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">Bathroom Repair</h4>
                        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">In Progress</div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Fixing tile work and plumbing issues</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>1 professional assigned</span>
                        <span>Due: May 15, 2025</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Professionals</span>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">JD</span>
                        </div>
                        <div>
                          <h4 className="font-medium">John Doe</h4>
                          <p className="text-sm text-gray-600 mb-1">Level 3 Plumber</p>
                          <div className="flex items-center text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 text-gray-300" />
                            <span className="text-xs text-gray-600 ml-1">4.0</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">AS</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Anna Smith</h4>
                          <p className="text-sm text-gray-600 mb-1">Level 4 Electrician</p>
                          <div className="flex items-center text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">5.0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">New: Get Expert Mentorship</h3>
                    <p className="text-gray-700 mb-4">
                      Learn from verified professionals and gain insights that will help you understand your projects better.
                    </p>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => navigateTo("browseMentors")}
                    >
                      Browse Mentors
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Your Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Coming soon: Manage your projects in one place.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professionals">
            <Card>
              <CardHeader>
                <CardTitle>Find Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Coming soon: Browse and search for verified professionals.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <ClientJobMarketplace />
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {userType === "worker" ? renderWorkerDashboard() : renderClientDashboard()}
    </div>
  )
}
