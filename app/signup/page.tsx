"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState, useEffect } from "react"
import { registerUser } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      await registerUser(formData)
      toast({
        title: "Registration successful!",
        description: "Your account has been created. You are now logged in.",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Registration failed",
        description:
          error instanceof Error ? error.message : "There was a problem creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (loading || user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-12 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
          <div className="w-full max-w-md p-8 rounded-xl bg-white/50 backdrop-blur-sm animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container py-12 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <Card className="w-full max-w-md border-gray-100 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create an account to submit and track events</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form id="signup-form" action={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="Enter your first name"
                    className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Enter your last name"
                    className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Create a password"
                  className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm your password"
                  className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col bg-gradient-to-r from-purple-50/50 to-pink-50/50 border-t border-gray-100">
            <div className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-500 hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}
