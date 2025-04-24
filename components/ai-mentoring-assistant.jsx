"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, Send, RefreshCw, BookOpen, Lightbulb, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AIMentoringAssistant({ userProfession, userSpecializations = [] }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your agricultural mentoring assistant. I can help you prepare for assessments, answer questions about agricultural practices, or explain concepts. What would you like to learn about today?"
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSpecialization, setSelectedSpecialization] = useState(userSpecializations[0] || "")
  
  const messagesEndRef = useRef(null)
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
  
  // Sample AI responses by topic (in a real implementation, these would come from an LLM API)
  const topicResponses = {
    "soil": "Soil health is foundational to successful agriculture. The key components to monitor are pH level (ideally between 5.5-7.0 for most crops), organic matter content, nutrient levels (N-P-K), and soil structure. Regular soil testing is recommended to track these parameters. Would you like me to explain more about any specific aspect of soil health?",
    
    "crop rotation": "Crop rotation is a systematic approach to deciding which crops to plant where in your fields each season. Benefits include:\n\n- Breaking pest and disease cycles\n- Improving soil structure\n- Managing soil fertility\n- Reducing dependence on synthetic inputs\n- Diversifying income streams\n\nA typical rotation might include alternating between legumes (which fix nitrogen) and heavy nitrogen users like corn. Would you like an example rotation plan?",
    
    "irrigation": "Effective irrigation depends on understanding both crop water requirements and your specific soil conditions. Modern approaches focus on precision application to conserve water while maximizing yield. Key systems include:\n\n- Drip irrigation (90-95% efficiency)\n- Micro-sprinklers (80-90% efficiency)\n- Center pivot (75-85% efficiency)\n- Flood irrigation (40-50% efficiency)\n\nWhat specific irrigation challenges are you facing in your operation?",
    
    "fertilization": "Successful fertilization strategies balance crop nutritional needs with environmental stewardship. The 4R approach is recommended: Right source, Right rate, Right time, Right place. Soil testing should guide application rates. Consider combining organic inputs (manure, compost) with targeted synthetic fertilizers for optimal results. Would you like specific fertilization recommendations for a particular crop?",

    "pests": "Integrated Pest Management (IPM) is the most sustainable approach to pest control, involving:\n\n1. Prevention: crop rotation, resistant varieties\n2. Monitoring: regular scouting for early detection\n3. Identification: correctly identifying pests before treatment\n4. Intervention thresholds: treating only when economic damage is likely\n5. Combined methods: biological, cultural, mechanical, and chemical controls\n\nWhat specific pest issues are you dealing with?"
  }
  
  // Quick study resources
  const studyResources = [
    {
      title: "Soil Science Fundamentals",
      description: "Core concepts in soil structure, chemistry, and management",
      topics: ["Soil pH", "Organic matter", "Nutrient cycling", "Soil texture"]
    },
    {
      title: "Sustainable Farming Practices",
      description: "Modern approaches to environmentally responsible agriculture",
      topics: ["Cover cropping", "Minimal tillage", "Integrated pest management", "Water conservation"]
    },
    {
      title: "Crop Production Essentials",
      description: "Key knowledge for successful plant cultivation",
      topics: ["Germination factors", "Growth stages", "Nutrient requirements", "Harvest timing"]
    },
    {
      title: "Agricultural Economics",
      description: "Business aspects of farming operations",
      topics: ["Market analysis", "Cost calculations", "Risk management", "Value chains"]
    }
  ]
  
  // Practice questions
  const practiceQuestions = [
    "What are the primary macronutrients needed by plants?",
    "How does crop rotation benefit soil health?",
    "What factors determine optimal irrigation scheduling?",
    "What are the key principles of integrated pest management?",
    "How do you calculate fertilizer application rates?"
  ]
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: inputValue }])
    
    // Clear input
    setInputValue("")
    
    // Simulate AI processing
    setIsLoading(true)
    
    setTimeout(() => {
      // Generate AI response (in a real app, this would call an LLM API)
      let response = "I'm not sure about that topic yet. Could you provide more details or ask about another agricultural concept?"
      
      // Check for keywords in the user's input to provide relevant responses
      const userInput = inputValue.toLowerCase()
      for (const [topic, answer] of Object.entries(topicResponses)) {
        if (userInput.includes(topic)) {
          response = answer
          break
        }
      }
      
      // Add AI response
      setMessages(prev => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1500)
  }
  
  const handleQuickQuestion = (question) => {
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: question }])
    
    // Simulate AI processing
    setIsLoading(true)
    
    setTimeout(() => {
      // Generate AI response
      let response = ""
      
      if (question.includes("macronutrients")) {
        response = "The primary macronutrients needed by plants are:\n\n1. Nitrogen (N): Essential for leaf and vegetative growth\n2. Phosphorus (P): Important for root development and flowering\n3. Potassium (K): Critical for overall plant health and stress resistance\n\nThese are commonly referred to as 'NPK' and form the basis of most fertilization programs."
      } else if (question.includes("crop rotation")) {
        response = "Crop rotation benefits soil health in multiple ways:\n\n• Disrupts pest and disease cycles\n• Improves soil structure through diverse root systems\n• Balances nutrient use and replenishment\n• Reduces soil erosion and compaction\n• Increases biodiversity in the soil microbiome\n\nA typical rotation might alternate nitrogen-fixing legumes with heavy nitrogen users like corn or wheat."
      } else if (question.includes("irrigation")) {
        response = "Optimal irrigation scheduling depends on several factors:\n\n• Crop type and growth stage\n• Soil moisture content and texture\n• Weather conditions (temperature, rainfall, wind)\n• Available water capacity\n• Evapotranspiration rates\n\nModern approaches use soil moisture sensors and weather data to precisely time irrigation events, maximizing efficiency while ensuring plant needs are met."
      } else {
        response = "That's an excellent question about agricultural practices. In a full implementation, I would provide a detailed answer using an agricultural knowledge base and AI language model. Would you like to ask about another topic?"
      }
      
      // Add AI response
      setMessages(prev => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1500)
  }
  
  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hello! I'm your agricultural mentoring assistant. I can help you prepare for assessments, answer questions about agricultural practices, or explain concepts. What would you like to learn about today?"
      }
    ])
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-orange-500" />
          <CardTitle>AI Mentoring Assistant</CardTitle>
        </div>
        <CardDescription>
          Your personal coach for agricultural knowledge and certification prep
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="chat">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="resources">Study Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="space-y-4">
          <CardContent className="p-4">
            <div className="mb-4">
              <Select
                value={selectedSpecialization}
                onValueChange={setSelectedSpecialization}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your focus area" />
                </SelectTrigger>
                <SelectContent>
                  {userSpecializations.length > 0 ? (
                    userSpecializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                    ))
                  ) : (
                    <>
                      <SelectItem value="Agronomy">Agronomy</SelectItem>
                      <SelectItem value="Horticulture">Horticulture</SelectItem>
                      <SelectItem value="Plant Breeding">Plant Breeding</SelectItem>
                      <SelectItem value="Soil Science">Soil Science</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="border rounded-md h-[350px] overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index}
                      className={`flex ${message.role === "assistant" ? "flex-row" : "flex-row-reverse"}`}
                    >
                      <div className={`
                        ${message.role === "assistant" ? "bg-gray-100" : "bg-orange-100"} 
                        rounded-lg p-3 max-w-[80%]
                      `}>
                        <div className="flex items-center gap-2 mb-1">
                          {message.role === "assistant" ? (
                            <Bot size={16} className="text-orange-500" />
                          ) : (
                            <User size={16} className="text-orange-500" />
                          )}
                          <p className="text-xs font-medium">
                            {message.role === "assistant" ? "AI Assistant" : "You"}
                          </p>
                        </div>
                        <div className="whitespace-pre-line">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Bot size={16} className="text-orange-500" />
                          <Loader2 size={16} className="animate-spin" />
                          <p className="text-xs font-medium">AI Assistant is thinking...</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="p-3 border-t">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about agricultural concepts, practices, or exam prep..."
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Send size={18} />
                  </Button>
                </form>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Quick Questions:</p>
              <div className="flex flex-wrap gap-2">
                {practiceQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    disabled={isLoading}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={clearChat} disabled={isLoading}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Clear Chat
            </Button>
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="resources">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studyResources.map((resource, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-orange-500" />
                      <CardTitle className="text-base">{resource.title}</CardTitle>
                    </div>
                    <CardDescription className="text-xs">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-xs font-medium mb-1">Key Topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {resource.topics.map((topic, topicIndex) => (
                        <span 
                          key={topicIndex}
                          className="text-xs bg-orange-50 text-orange-800 px-2 py-1 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-orange-600 border-orange-200 hover:bg-orange-50"
                    >
                      <Lightbulb className="mr-2 h-3 w-3" />
                      Study This Topic
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
} 