"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, DollarSign, Users, Video, CheckSquare, AlertTriangle, Award, ChevronDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format, addDays } from "date-fns"
import { Progress } from "@/components/ui/progress"

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

export default function MentorshipManagement({ userType = "mentor" }) {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [isClient, setIsClient] = useState(false)
  
  // Fix hydration issue by only rendering on client-side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Conditionally render star ratings to avoid hydration issues
  const renderStarRating = (rating, size = 4, className = "") => {
    if (!isClient) return null;
    return <StarRating rating={rating} size={size} className={className} />;
  }

  // Mock data for mentor/mentee
  const mockData = {
    mentor: {
      earnings: {
        total: 2840,
        thisMonth: 720,
        pending: 180,
      },
      stats: {
        totalSessions: 47,
        completionRate: 98,
        averageRating: 4.8,
        sessionsThisMonth: 12,
      },
      upcoming: [
        {
          id: "s1",
          mentee: "John Davis",
          profession: "Crop Production",
          date: addDays(new Date(), 1),
          time: "14:00",
          duration: 60,
          status: "confirmed",
          amount: 60,
          meetingLink: "https://meet.google.com/abc-defg-hij",
        },
        {
          id: "s2",
          mentee: "Lisa Johnson",
          profession: "Crop Production",
          date: addDays(new Date(), 3),
          time: "10:00",
          duration: 90,
          status: "confirmed",
          amount: 90,
          meetingLink: "https://meet.google.com/klm-nopq-rst",
        },
      ],
      history: [
        {
          id: "h1",
          mentee: "Robert Chen",
          profession: "Crop Production",
          date: addDays(new Date(), -5),
          time: "13:00",
          duration: 60,
          status: "completed",
          amount: 60,
          rating: 5,
          feedback: "Excellent session! Maria explained everything clearly and answered all my questions about crop rotation techniques.",
        },
        {
          id: "h2",
          mentee: "Sarah Miller",
          profession: "Crop Production",
          date: addDays(new Date(), -12),
          time: "11:00",
          duration: 60,
          status: "completed",
          amount: 60,
          rating: 5,
          feedback: "Very helpful and knowledgeable about agricultural practices. I learned a lot of practical tips for pest management.",
        },
        {
          id: "h3",
          mentee: "Michael Brown",
          profession: "Crop Production",
          date: addDays(new Date(), -20),
          time: "15:00",
          duration: 60,
          status: "completed",
          amount: 60,
          rating: 4,
          feedback: "Good session with useful information about soil health. Would book again.",
        },
      ],
      earnings_history: [
        {
          id: "p1",
          date: addDays(new Date(), -5),
          description: "Session with Robert Chen",
          amount: 60,
          platform_fee: 9,
          net_amount: 51,
          status: "paid",
        },
        {
          id: "p2",
          date: addDays(new Date(), -12),
          description: "Session with Sarah Miller",
          amount: 60,
          platform_fee: 9,
          net_amount: 51,
          status: "paid",
        },
        {
          id: "p3",
          date: addDays(new Date(), -20),
          description: "Session with Michael Brown",
          amount: 60,
          platform_fee: 9,
          net_amount: 51,
          status: "paid",
        },
        {
          id: "p4",
          date: addDays(new Date(), 1),
          description: "Session with John Davis",
          amount: 60,
          platform_fee: 9,
          net_amount: 51,
          status: "pending",
        },
        {
          id: "p5",
          date: addDays(new Date(), 3),
          description: "Session with Lisa Johnson",
          amount: 90,
          platform_fee: 13.5,
          net_amount: 76.5,
          status: "pending",
        },
      ]
    },
    mentee: {
      stats: {
        totalSessions: 8,
        completedSessions: 6,
        upcomingSessions: 2,
        mentors: 3,
      },
      upcoming: [
        {
          id: "ms1",
          mentor: "Maria Smith",
          profession: "Crop Production",
          level: 5,
          date: addDays(new Date(), 2),
          time: "15:00",
          duration: 60,
          status: "confirmed",
          amount: 60,
          meetingLink: "https://meet.google.com/abc-defg-hij",
        },
        {
          id: "ms2",
          mentor: "David Johnson",
          profession: "Animal Production",
          level: 4,
          date: addDays(new Date(), 5),
          time: "11:00",
          duration: 60,
          status: "confirmed",
          amount: 55,
          meetingLink: "https://meet.google.com/uvw-xyz-123",
        },
      ],
      history: [
        {
          id: "mh1",
          mentor: "Maria Smith",
          profession: "Crop Production",
          level: 5,
          date: addDays(new Date(), -8),
          time: "14:00",
          duration: 60,
          status: "completed",
          amount: 60,
          yourRating: 5,
        },
        {
          id: "mh2",
          mentor: "Michael Chen",
          profession: "Agricultural Engineering",
          level: 4,
          date: addDays(new Date(), -15),
          time: "10:00",
          duration: 60,
          status: "completed",
          amount: 70,
          yourRating: 4,
        },
      ],
      payments: [
        {
          id: "mp1",
          date: addDays(new Date(), -8),
          description: "Session with Maria Smith",
          amount: 60,
          platform_fee: 9,
          total_charged: 69,
          status: "completed",
        },
        {
          id: "mp2",
          date: addDays(new Date(), -15),
          description: "Session with Michael Chen",
          amount: 70,
          platform_fee: 10.5,
          total_charged: 80.5,
          status: "completed",
        },
        {
          id: "mp3",
          date: addDays(new Date(), 2),
          description: "Session with Maria Smith",
          amount: 60,
          platform_fee: 9,
          total_charged: 69,
          status: "upcoming",
        },
      ]
    }
  }

  const data = mockData[userType]

  // Render the Mentor's view
  const renderMentorView = () => {
    return (
      <div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                  <h3 className="text-2xl font-bold">${data.earnings.total.toFixed(2)}</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">This Month</p>
                  <h3 className="text-2xl font-bold">${data.earnings.thisMonth.toFixed(2)}</h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending Earnings</p>
                  <h3 className="text-2xl font-bold">${data.earnings.pending.toFixed(2)}</h3>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Sessions</p>
                  <h3 className="text-2xl font-bold">{data.stats.totalSessions}</h3>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions and Earnings Tabs */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="history">Session History</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Mentorship Sessions</CardTitle>
                <CardDescription>
                  You have {data.upcoming.length} upcoming sessions scheduled.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {data.upcoming.length > 0 ? (
                  <div className="space-y-6">
                    {data.upcoming.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h3 className="font-medium text-lg">{session.mentee}</h3>
                            <p className="text-gray-500 text-sm">{session.profession}</p>
                          </div>
                          <Badge className="bg-blue-500 self-start md:self-center mt-2 md:mt-0">
                            {session.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>{format(session.date, "MMMM d, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{session.time} ({session.duration} minutes)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span>${session.amount.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button className="flex gap-2 items-center">
                            <Video className="h-4 w-4" />
                            Join Meeting
                          </Button>
                          <Button variant="outline">
                            Reschedule
                          </Button>
                          <Button variant="outline" className="text-red-500 hover:text-red-700">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No upcoming sessions scheduled.</p>
                    <Button className="mt-4">Set Your Availability</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Session History</CardTitle>
                <CardDescription>
                  Review your past mentorship sessions and feedback.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {data.history.length > 0 ? (
                  <div className="space-y-6">
                    {data.history.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h3 className="font-medium text-lg">{session.mentee}</h3>
                            <p className="text-gray-500 text-sm">{session.profession}</p>
                          </div>
                          <Badge className="bg-green-500 self-start md:self-center mt-2 md:mt-0">
                            {session.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>{format(session.date, "MMMM d, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{session.time} ({session.duration} minutes)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span>${session.amount.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            {renderStarRating(session.rating)}
                            <span className="text-sm text-gray-600">
                              Rating: {session.rating}/5
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm italic">"{session.feedback}"</p>
                        </div>

                        <Button variant="outline" className="w-full sm:w-auto">
                          Session Notes
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No past sessions to display.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Earnings History</CardTitle>
                <CardDescription>
                  Track your earnings from mentorship sessions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Description</th>
                        <th className="text-right py-3 px-4">Amount</th>
                        <th className="text-right py-3 px-4">Platform Fee</th>
                        <th className="text-right py-3 px-4">Net Amount</th>
                        <th className="text-right py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.earnings_history.map((payment) => (
                        <tr key={payment.id} className="border-b">
                          <td className="py-3 px-4">{format(payment.date, "MMM d, yyyy")}</td>
                          <td className="py-3 px-4">{payment.description}</td>
                          <td className="py-3 px-4 text-right">${payment.amount.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right text-gray-500">${payment.platform_fee.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right font-medium">${payment.net_amount.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right">
                            <Badge className={`${
                              payment.status === "paid" ? "bg-green-500" : "bg-yellow-500"
                            }`}>
                              {payment.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Performance Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="font-medium">{data.stats.completionRate}%</span>
                </div>
                <Progress value={data.stats.completionRate} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{data.stats.averageRating}</span>
                    {renderStarRating(data.stats.averageRating)}
                  </div>
                </div>
                <Progress value={data.stats.averageRating * 20} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Sessions This Month</span>
                  <span className="font-medium">{data.stats.sessionsThisMonth}</span>
                </div>
                <Progress value={(data.stats.sessionsThisMonth / 20) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render the Mentee's view
  const renderMenteeView = () => {
    return (
      <div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Sessions</p>
                  <h3 className="text-2xl font-bold">{data.stats.totalSessions}</h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <h3 className="text-2xl font-bold">{data.stats.completedSessions}</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckSquare className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Upcoming</p>
                  <h3 className="text-2xl font-bold">{data.stats.upcomingSessions}</h3>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Your Mentors</p>
                  <h3 className="text-2xl font-bold">{data.stats.mentors}</h3>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions and Payments Tabs */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="history">Session History</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>
                  You have {data.upcoming.length} upcoming mentorship sessions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {data.upcoming.length > 0 ? (
                  <div className="space-y-6">
                    {data.upcoming.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h3 className="font-medium text-lg">{session.mentor}</h3>
                            <div className="flex items-center">
                              <Award className="h-4 w-4 text-orange-500 mr-1" />
                              <p className="text-gray-500 text-sm">
                                Level {session.level} {session.profession}
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-blue-500 self-start md:self-center mt-2 md:mt-0">
                            {session.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>{format(session.date, "MMMM d, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{session.time} ({session.duration} minutes)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span>${session.amount.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button className="flex gap-2 items-center">
                            <Video className="h-4 w-4" />
                            Join Meeting
                          </Button>
                          <Button variant="outline">
                            Message Mentor
                          </Button>
                          <Button variant="outline" className="text-red-500 hover:text-red-700">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No upcoming sessions scheduled.</p>
                    <Button className="mt-4">Find a Mentor</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Session History</CardTitle>
                <CardDescription>
                  Review your past mentorship sessions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {data.history.length > 0 ? (
                  <div className="space-y-6">
                    {data.history.map((session) => (
                      <div key={session.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div>
                            <h3 className="font-medium text-lg">{session.mentor}</h3>
                            <div className="flex items-center">
                              <Award className="h-4 w-4 text-orange-500 mr-1" />
                              <p className="text-gray-500 text-sm">
                                Level {session.level} {session.profession}
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-green-500 self-start md:self-center mt-2 md:mt-0">
                            {session.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>{format(session.date, "MMMM d, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{session.time} ({session.duration} minutes)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span>${session.amount.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            {renderStarRating(session.yourRating)}
                            <span className="text-sm text-gray-600">
                              Rating: {session.yourRating}/5
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button variant="outline">
                            View Notes
                          </Button>
                          <Button variant="outline">
                            Book Again
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No past sessions to display.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  Track your payments for mentorship sessions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Description</th>
                        <th className="text-right py-3 px-4">Session Price</th>
                        <th className="text-right py-3 px-4">Platform Fee</th>
                        <th className="text-right py-3 px-4">Total</th>
                        <th className="text-right py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.payments.map((payment) => (
                        <tr key={payment.id} className="border-b">
                          <td className="py-3 px-4">{format(payment.date, "MMM d, yyyy")}</td>
                          <td className="py-3 px-4">{payment.description}</td>
                          <td className="py-3 px-4 text-right">${payment.amount.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right text-gray-500">${payment.platform_fee.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right font-medium">${payment.total_charged.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right">
                            <Badge className={`${
                              payment.status === "completed" ? "bg-green-500" : 
                              payment.status === "upcoming" ? "bg-blue-500" : "bg-yellow-500"
                            }`}>
                              {payment.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-orange-500" />
                    <span className="font-medium">Path to Level 3 Certification</span>
                  </div>
                  <span className="text-sm text-gray-500">60% complete</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <h4 className="font-medium">Next Steps to Advance</h4>
                </div>
                <ul className="space-y-2 pl-8 list-disc text-gray-600">
                  <li>Complete 3 more mentorship sessions</li>
                  <li>Submit your portfolio for review</li>
                  <li>Schedule your skills assessment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-2xl font-bold">
          {userType === "mentor" ? "Mentor Dashboard" : "Your Mentorship Sessions"}
        </h1>
        <p className="text-gray-600">
          {userType === "mentor" 
            ? "Manage your mentorship sessions and track your earnings" 
            : "Track your progress and manage your mentorship sessions"
          }
        </p>
      </div>

      {isClient ? (
        userType === "mentor" ? renderMentorView() : renderMenteeView()
      ) : (
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse">Loading dashboard...</div>
        </div>
      )}
    </div>
  )
} 