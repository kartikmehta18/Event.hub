"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { submitEvent } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function SubmitEventPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to submit an event.",
        variant: "destructive",
      })
      router.push("/login?redirect=/submit")
    }
  }, [user, loading, router, toast])

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      await submitEvent(formData)
      toast({
        title: "Event submitted successfully!",
        description: "Your event has been submitted and will appear on the platform.",
      })

      // Reset form
      const form = document.getElementById("event-form") as HTMLFormElement
      form.reset()
    } catch (error) {
      toast({
        title: "Error submitting event",
        description:
          error instanceof Error ? error.message : "There was a problem submitting your event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header />
        <main className="flex-1 container py-12 flex items-center justify-center">
          <div className="w-full max-w-md p-8 rounded-xl bg-white/50 backdrop-blur-sm animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="flex-1 container py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-purple-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm text-purple-600 mb-4">
              <Sparkles className="mr-1 h-3 w-3" /> Share with the community
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Submit an Event</h1>
            <p className="text-gray-500 max-w-md mx-auto">
              Fill out the form below to submit a new tech event to our platform. Your event will be published
              immediately.
            </p>
          </div>

          <Card className="border border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Provide information about your tech event</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form id="event-form" action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Event Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Enter the event name"
                    className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      required
                      className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Event Type</Label>
                    <Select name="type" required>
                      <SelectTrigger className="border-gray-200 focus:border-purple-300 focus:ring-purple-200">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hackathon">Hackathon</SelectItem>
                        <SelectItem value="tech-talk">Tech Talk</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      required
                      placeholder="City, State or Online"
                      className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="college">College/Organization (Optional)</Label>
                    <Input
                      id="college"
                      name="college"
                      placeholder="Hosting college or organization"
                      className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Event Link</Label>
                  <Input
                    id="link"
                    name="link"
                    type="url"
                    required
                    placeholder="https://example.com/event"
                    className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Event Image URL (Optional)</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                  />
                  <p className="text-xs text-gray-500">
                    Provide a URL to an image for your event. Recommended size: 800x400 pixels.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    placeholder="Provide details about the event"
                    rows={5}
                    className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Information (Optional)</Label>
                  <Input
                    id="contact"
                    name="contact"
                    placeholder="Email or phone number of event organizer"
                    className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Event"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}
