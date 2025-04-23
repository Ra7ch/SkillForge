"use client"

import { useState } from "react"
import { Award, Briefcase, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupForm({ navigateTo, setUserType }) {
  const [selectedType, setSelectedType] = useState(null)

  const handleContinue = () => {
    if (selectedType === "worker") {
      setUserType("worker")
      navigateTo("workerRegistration")
    } else if (selectedType === "client") {
      setUserType("client")
      navigateTo("clientRegistration")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <Award className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">Choose your account type to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                selectedType === "worker" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"
              }`}
              onClick={() => setSelectedType("worker")}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full mb-3 ${selectedType === "worker" ? "bg-orange-100" : "bg-gray-100"}`}>
                  <Briefcase className={`h-6 w-6 ${selectedType === "worker" ? "text-orange-500" : "text-gray-500"}`} />
                </div>
                <h3 className="font-semibold mb-2">Worker</h3>
                <p className="text-sm text-gray-600">I want to showcase my skills and get certified</p>
              </div>
            </div>

            <div
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                selectedType === "client" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => setSelectedType("client")}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full mb-3 ${selectedType === "client" ? "bg-blue-100" : "bg-gray-100"}`}>
                  <User className={`h-6 w-6 ${selectedType === "client" ? "text-blue-500" : "text-gray-500"}`} />
                </div>
                <h3 className="font-semibold mb-2">Client</h3>
                <p className="text-sm text-gray-600">I want to hire skilled professionals</p>
              </div>
            </div>
          </div>

          <Button
            className="w-full"
            disabled={!selectedType}
            onClick={handleContinue}
            style={{
              backgroundColor:
                selectedType === "worker" ? "#f97316" : selectedType === "client" ? "#3b82f6" : "#d1d5db",
              color: "white",
            }}
          >
            Continue
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-center">
            Already have an account?{" "}
            <button className="text-orange-500 hover:underline" onClick={() => navigateTo("login")}>
              Sign in
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
