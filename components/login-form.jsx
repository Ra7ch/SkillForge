"use client"

import { useState } from "react"
import { Award, Eye, EyeOff, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getUserByCredentials } from "@/lib/data/users"
import { users } from "@/lib/data/users"

export default function LoginForm({ navigateTo, onLogin }) {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear errors when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
    if (loginError) {
      setLoginError("")
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.identifier) {
      newErrors.identifier = "Email or username is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoginError("")

    if (validateForm()) {
      // Use the identifier as email for mock authentication
      const user = getUserByCredentials(formData.identifier, formData.password)
      
      if (user) {
        onLogin(user)
      } else {
        setLoginError("Invalid email or password")
      }
    }
  }

  // Direct login handlers for test accounts
  const loginAsWorker = () => {
    const workerUser = users.find(user => user.type === "worker");
    if (workerUser) {
      onLogin(workerUser);
    }
  };

  const loginAsClient = () => {
    const clientUser = users.find(user => user.type === "client");
    if (clientUser) {
      onLogin(clientUser);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <Award className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {loginError}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="identifier">Email</Label>
              <Input
                id="identifier"
                name="identifier"
                type="email"
                placeholder="your.email@example.com"
                value={formData.identifier}
                onChange={handleChange}
                className={errors.identifier ? "border-red-500" : ""}
              />
              {errors.identifier && <p className="text-red-500 text-sm">{errors.identifier}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 font-medium mb-3">Test Account Access:</p>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2"
                onClick={loginAsWorker}
              >
                <User size={16} />
                <span>Login as Worker</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2"
                onClick={loginAsClient}
              >
                <Building size={16} />
                <span>Login as Client</span>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-500">
            <a href="#" className="text-orange-500 hover:underline">
              Forgot your password?
            </a>
          </div>
          <div className="text-sm text-center">
            Don't have an account?{" "}
            <button className="text-orange-500 hover:underline" onClick={() => navigateTo("signup")}>
              Sign up
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
