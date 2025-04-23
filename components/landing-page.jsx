"use client"

import { Award, Clock, Target, CheckCircle, Users, Star, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LandingPage({ navigateTo }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Forge Your Skills, Build Your Reputation</h1>
              <p className="text-gray-600 mb-6 text-lg">
                The premier certification platform for skilled trade professionals. Level up your career with verified
                certifications based on real assessments and work experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => navigateTo("signup")}
                >
                  Get Started <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.scrollTo({
                      top: document.getElementById("how-it-works").offsetTop - 100,
                      behavior: "smooth",
                    })
                  }
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div>
              <Card className="bg-orange-100 border-none shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-orange-500" />
                      <span className="font-bold">SkillForge</span>
                    </div>
                    <div className="flex">
                      {[1, 2, 3].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className="text-xl font-bold">Master Electrician</h3>
                  <p className="text-sm text-gray-600 mb-4">Level 3 Certification</p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Assessment Score: 92/100</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Work Hours: 1,250 / 1,500</span>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6 text-sm">
                    <span>John Doe</span>
                    <span>ID: EL-12345</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Who Uses SkillForge?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-orange-200 hover:border-orange-500 transition-colors">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="bg-orange-100 p-4 rounded-full mb-4">
                    <Target className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">For Workers</h3>
                  <p className="text-gray-600 mb-6">
                    Skilled trade professionals looking to certify their expertise and find quality work opportunities.
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Get certified based on your real skills and experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Track your work hours and professional growth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Connect with clients looking for verified professionals</span>
                  </li>
                </ul>

                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => navigateTo("workerRegistration", "worker")}
                >
                  Register as a Worker <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:border-blue-500 transition-colors">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">For Clients</h3>
                  <p className="text-gray-600 mb-6">
                    Individuals and businesses looking to hire verified and skilled trade professionals.
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Find certified professionals with verified skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Review work history and certification levels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Hire with confidence based on verified credentials</span>
                  </li>
                </ul>

                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => navigateTo("clientRegistration", "client")}
                >
                  Register as a Client <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">How SkillForge Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Our certification system combines assessments and real work experience to provide a comprehensive evaluation
            of your skills.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <Target className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Complete Assessments</h3>
              <p className="text-gray-600">Take standardized assessments to demonstrate your knowledge and skills.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Log Work Hours</h3>
              <p className="text-gray-600">Record and verify your professional work experience in the field.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <Award className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Earn Certifications</h3>
              <p className="text-gray-600">Receive industry-recognized certifications that validate your expertise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Michael Rodriguez",
                role: "Master Plumber",
                quote:
                  "SkillForge helped me showcase my 15 years of experience and find better clients who value quality work.",
              },
              {
                name: "Sarah Johnson",
                role: "Homeowner",
                quote:
                  "As a client, I love being able to verify a tradesperson's skills before hiring. It gives me peace of mind.",
              },
              {
                name: "David Chen",
                role: "Electrician",
                quote:
                  "The assessment process was thorough and fair. My certification has opened doors to commercial projects.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who are building their careers with verified certifications.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => navigateTo("workerRegistration", "worker")}
            >
              Register as a Worker
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => navigateTo("clientRegistration", "client")}
            >
              Register as a Client
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
