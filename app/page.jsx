"use client"

import { useState, useEffect } from "react"
import { Award, Settings, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import LandingPage from "@/components/landing-page"
import LoginForm from "@/components/login-form"
import SignupForm from "@/components/signup-form"
import WorkerRegistration from "@/components/worker-registration"
import ClientRegistration from "@/components/client-registration"
import Dashboard from "@/components/dashboard"
import MentorBrowse from "@/components/mentor-browse"
import MentorProfile from "@/components/mentor-profile"
import MentorshipManagement from "@/components/mentorship-management"
import dynamic from "next/dynamic"

// Dynamically import the JobMarketplace component
const JobMarketplace = dynamic(() => import("@/app/job-marketplace/page").then(mod => mod.default), {
  loading: () => <p>Loading Job Marketplace...</p>,
})

export default function SkillForge() {
  const [currentView, setCurrentView] = useState("landing")
  const [userType, setUserType] = useState(null) // "worker" or "client"
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [navigationHistory, setNavigationHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [isHistoryNavigation, setIsHistoryNavigation] = useState(false)

  // Initialize history and handle browser back/forward buttons
  useEffect(() => {
    // Set initial history
    if (navigationHistory.length === 0) {
      setNavigationHistory([{ view: currentView, type: userType }])
    }

    // Handle popstate event (when browser back/forward buttons are clicked)
    const handlePopState = (event) => {
      if (event.state) {
        setIsHistoryNavigation(true)
        setCurrentView(event.state.view)
        if (event.state.type) {
          setUserType(event.state.type)
        }
      }
    }

    // Listen for popstate events
    window.addEventListener('popstate', handlePopState)

    // Initialize history state
    if (!window.history.state) {
      window.history.replaceState(
        { view: currentView, type: userType },
        '',
        `#${currentView}`
      )
    }

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // Update history when navigation changes
  useEffect(() => {
    if (!isHistoryNavigation && currentView) {
      // Add new state to browser history
      window.history.pushState(
        { view: currentView, type: userType },
        '',
        `#${currentView}`
      )

      // Update our navigation history
      const newHistory = [...navigationHistory.slice(0, historyIndex + 1), { view: currentView, type: userType }]
      setNavigationHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }

    // Reset flag after handling
    setIsHistoryNavigation(false)
  }, [currentView, userType])

  // Handle navigation
  const navigateTo = (view, type = null) => {
    setCurrentView(view)
    if (type) setUserType(type)

    // Scroll to top when changing views
    window.scrollTo(0, 0)
  }

  // Handle backward navigation
  const navigateBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1
      const prevState = navigationHistory[prevIndex]
      
      setIsHistoryNavigation(true)
      setHistoryIndex(prevIndex)
      setCurrentView(prevState.view)
      if (prevState.type) {
        setUserType(prevState.type)
      }
      
      // Update browser history
      window.history.back()
    }
  }

  // Handle forward navigation
  const navigateForward = () => {
    if (historyIndex < navigationHistory.length - 1) {
      const nextIndex = historyIndex + 1
      const nextState = navigationHistory[nextIndex]
      
      setIsHistoryNavigation(true)
      setHistoryIndex(nextIndex)
      setCurrentView(nextState.view)
      if (nextState.type) {
        setUserType(nextState.type)
      }
      
      // Update browser history
      window.history.forward()
    }
  }

  // Handle login
  const handleLogin = (user) => {
    setUserData(user)
    setIsLoggedIn(true)
    setUserType(user.type || "worker") // Ensure userType is set from login data
    navigateTo("dashboard")
  }

  // Handle logout
  const handleLogout = () => {
    setUserData(null)
    setIsLoggedIn(false)
    setUserType(null)
    navigateTo("landing")
  }

  // Handle registration completion
  const handleRegistrationComplete = (formData) => {
    setUserData({ ...formData, type: userType })
    setIsLoggedIn(true)
    navigateTo("dashboard")
  }

  // Handle mentor selection
  const handleSelectMentor = (mentor) => {
    setSelectedMentor(mentor)
    navigateTo("mentorProfile")
  }

  // Render the appropriate view
  const renderView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage navigateTo={navigateTo} />
      case "login":
        return <LoginForm navigateTo={navigateTo} onLogin={handleLogin} />
      case "signup":
        return <SignupForm navigateTo={navigateTo} setUserType={setUserType} />
      case "workerRegistration":
        return <WorkerRegistration navigateTo={navigateTo} onComplete={handleRegistrationComplete} />
      case "clientRegistration":
        return <ClientRegistration navigateTo={navigateTo} onComplete={handleRegistrationComplete} />
      case "dashboard":
        return <Dashboard userData={userData} userType={userType} navigateTo={navigateTo} />
      case "browseMentors":
        return <MentorBrowse onSelectMentor={handleSelectMentor} />
      case "mentorProfile":
        return <MentorProfile 
          mentor={selectedMentor} 
          navigateBack={navigateBack}
        />
      case "mentorshipManagement":
        return <MentorshipManagement userType={userType === "worker" ? "mentor" : "mentee"} />
      case "job-marketplace":
        return (
          <div className="container mx-auto py-8">
            <Button 
              variant="ghost" 
              className="mb-6 flex items-center gap-1" 
              onClick={() => navigateTo("dashboard")}
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </Button>
            <JobMarketplace />
          </div>
        )
      default:
        return <LandingPage navigateTo={navigateTo} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigateTo(isLoggedIn ? "dashboard" : "landing")}
          >
            <Award className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-xl">SkillForge</span>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-600">{userData?.name ? userData.name.charAt(0) : "U"}</span>
                </div>
                <span className="hidden md:inline text-sm">{userData?.name || "User"}</span>
              </div>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigateTo("login")}>
                Log in
              </Button>
              <Button
                variant="default"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => navigateTo("signup")}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">{renderView()}</main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Award className="h-5 w-5 text-orange-500" />
              <span className="font-bold">SkillForge</span>
            </div>
            <div className="text-sm text-gray-600">© {new Date().getFullYear()} SkillForge. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
