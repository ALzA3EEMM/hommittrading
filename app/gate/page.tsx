"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Lock, User, Phone, Mail, ArrowRight } from 'lucide-react'
import { useRouter } from "next/navigation"
import { submitGateSignup } from "./actions"

export default function GatePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await submitGateSignup(formData)
      // Set a flag in localStorage to indicate user has signed up
      localStorage.setItem("hommit_access", "granted")
      router.push("/")
    } catch (error) {
      console.error("Signup failed:", error)
      alert("Signup failed. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 flex items-center justify-center p-4">
      {/* Hidden Admin Button - Top Right Corner */}
      <div className="fixed top-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-500 z-50">
        <Button
          type="button"
          onClick={() => (window.location.href = "/admin/login")}
          className="w-8 h-8 p-0 bg-slate-800/20 border border-slate-600/30 text-slate-500 hover:bg-slate-700 hover:text-white text-xs rounded-full"
        >
          A
        </Button>
      </div>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <h1 className="text-3xl font-bold text-white">HOMMIT</h1>
          </div>
          <div className="inline-flex items-center bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-4">
            <Shield className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-300 text-sm font-medium">Exclusive Access Required</span>
          </div>
        </div>

        <Card className="bg-slate-800/90 border-slate-700 shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white mb-2">Join HOMMIT</CardTitle>
            <CardDescription className="text-gray-300 leading-relaxed">
              Enter your details to access Nepal's premier memecoin trading platform and start your journey to financial
              freedom.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300 font-medium">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 font-medium">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300 font-medium">
                  Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+977 98XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 font-medium">
                  Create Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-green-300 font-medium text-sm mb-1">What You'll Get:</h4>
                    <ul className="text-green-200 text-xs space-y-1">
                      <li>{""}</li>
                      <li>{""}</li>
                      <li>• Exclusive memecoin opportunities</li>
                      <li>• Community of successful traders</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Creating Access..." : "Get Exclusive Access"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                By signing up, you agree to our terms and conditions. Your information is secure and will never be
                shared.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
