"use client"

import { useState } from "react"
import { Award, Clock, Users, Calendar, CheckCircle, ArrowRight, FileText, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard({ userData, userType }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Worker dashboard content
  const renderWorkerDashboard = () => {
    return (
      <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Welcome back, {userData?.name || "Worker"}</h1>
          <p className="text-gray-600">Track your certification progress and professional growth</p>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="worklog">Work Log</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
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
                        <div className="mt-3">
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm">No past assessments found.</p>
                </div>
              </CardContent>
            </Card>
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
        </Tabs>
      </div>
    )
  }

  // Client dashboard content
  const renderClientDashboard = () => {
    return (
      <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Welcome, {userData?.name || "Client"}</h1>
          <p className="text-gray-600">Find and hire certified professionals for your projects</p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="professionals">Find Professionals</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <Briefcase className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Find Qualified Professionals</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Browse our directory of certified professionals for your project needs.
                      </p>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Find Professionals <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="bg-green-100 p-2 rounded-md">
                      <FileText className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Post a Project</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Describe your project and receive proposals from qualified professionals.
                      </p>
                    </div>
                  </div>
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    Post a Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center text-gray-600 font-medium">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Complete Your Profile</h4>
                      <p className="text-sm text-gray-600">
                        Add more details about your project needs and preferences.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center text-gray-600 font-medium">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Browse Professionals</h4>
                      <p className="text-sm text-gray-600">
                        Search for certified professionals by skill, location, and rating.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center text-gray-600 font-medium">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Post Your First Project</h4>
                      <p className="text-sm text-gray-600">
                        Describe your project in detail to receive qualified proposals.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professionals">
            <Card>
              <CardHeader>
                <CardTitle>Find Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">
                  This feature will be available soon. You'll be able to search and filter professionals by skill,
                  location, and certification level.
                </p>
                <Button disabled>Coming Soon</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>My Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">Post a New Project</Button>
                  <p className="text-gray-500 text-sm">No projects found. Start by posting your first project.</p>
                </div>
              </CardContent>
            </Card>
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
