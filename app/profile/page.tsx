"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, Bell, CreditCard, Settings } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { updateUserPassword, updateUserProfile } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/profile")
    }
  }, [user, loading, router])

  async function handleProfileUpdate(formData: FormData) {
    setIsUpdating(true)
    try {
      await updateUserProfile(formData)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "There was a problem updating your profile.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  async function handlePasswordUpdate(formData: FormData) {
    setIsUpdatingPassword(true)
    try {
      await updateUserPassword(formData)
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
      // Reset form
      const form = document.getElementById("password-form") as HTMLFormElement
      form.reset()
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "There was a problem updating your password.",
        variant: "destructive",
      })
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header />
        <main className="flex-1 container py-12">
          <div className="w-full max-w-3xl mx-auto p-8 rounded-xl bg-white/50 backdrop-blur-sm animate-pulse">
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="flex-1 container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Profile Settings</h1>
            <p className="text-gray-500">Manage your account preferences and settings</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          <Card className="border-gray-100 shadow-sm h-fit">
            <CardContent className="p-4">
              <nav className="flex flex-col space-y-1">
                <Button variant="ghost" className="justify-start hover:bg-purple-50 hover:text-purple-500">
                  <User className="mr-2 h-4 w-4" /> Personal Info
                </Button>
                <Button variant="ghost" className="justify-start hover:bg-purple-50 hover:text-purple-500">
                  <Lock className="mr-2 h-4 w-4" /> Password & Security
                </Button>
                <Button variant="ghost" className="justify-start hover:bg-purple-50 hover:text-purple-500">
                  <Bell className="mr-2 h-4 w-4" /> Notifications
                </Button>
                <Button variant="ghost" className="justify-start hover:bg-purple-50 hover:text-purple-500">
                  <CreditCard className="mr-2 h-4 w-4" /> Billing
                </Button>
                <Button variant="ghost" className="justify-start hover:bg-purple-50 hover:text-purple-500">
                  <Settings className="mr-2 h-4 w-4" /> Account Settings
                </Button>
              </nav>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="border-b border-gray-100 bg-muted/30 px-6">
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <form action={handleProfileUpdate} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        defaultValue={user.firstName}
                        className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        defaultValue={user.lastName}
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
                      defaultValue={user.email}
                      className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="border-b border-gray-100 bg-muted/30 px-6">
                <CardTitle>Password & Security</CardTitle>
                <CardDescription>Update your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <form id="password-form" action={handlePasswordUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      placeholder="Enter your current password"
                      className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                    disabled={isUpdatingPassword}
                  >
                    {isUpdatingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}
