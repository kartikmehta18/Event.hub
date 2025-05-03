"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Plus, Users, Clock, BarChart, ListChecks, User } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getUserEvents } from "@/lib/actions"
import { formatDate } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [events, setEvents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/dashboard")
    }
  }, [user, loading, router])

  useEffect(() => {
    async function fetchEvents() {
      if (user) {
        try {
          const userEvents = await getUserEvents()
          setEvents(userEvents)
        } catch (error) {
          console.error("Failed to fetch events:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    if (user) {
      fetchEvents()
    }
  }, [user])

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

  // Filter events by date
  const now = new Date()
  const upcomingEvents = events.filter((event) => new Date(event.date) >= now)
  const pastEvents = events.filter((event) => new Date(event.date) < now)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="flex-1 container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
            <p className="text-gray-500">Manage your events and account settings</p>
          </div>
          <Link href="/submit">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
              <Plus className="mr-2 h-4 w-4" /> Create New Event
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Events</p>
                  <h3 className="text-2xl font-bold">{events.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Attendees</p>
                  <h3 className="text-2xl font-bold">-</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Upcoming Events</p>
                  <h3 className="text-2xl font-bold">{upcomingEvents.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BarChart className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Past Events</p>
                  <h3 className="text-2xl font-bold">{pastEvents.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:text-purple-500">
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-white data-[state=active]:text-purple-500">
              Past Events
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-6">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="border-b border-gray-100 bg-muted/30 px-6">
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events that are scheduled in the future</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-6 space-y-4">
                    <div className="h-16 bg-gray-100 rounded-md animate-pulse"></div>
                    <div className="h-16 bg-gray-100 rounded-md animate-pulse"></div>
                  </div>
                ) : upcomingEvents.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                            <Calendar className="h-6 w-6 text-purple-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{event.name}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="mr-1 h-3 w-3" /> {formatDate(event.date)} • {event.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/events/${event.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-purple-200 text-purple-500 hover:bg-purple-50"
                            >
                              View
                            </Button>
                          </Link>
                          <Link href={`/events/${event.id}/edit`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-purple-200 text-purple-500 hover:bg-purple-50"
                            >
                              Edit
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <ListChecks className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      You haven't created any upcoming events yet. Click the "Create New Event" button to get started.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="past" className="mt-6">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="border-b border-gray-100 bg-muted/30 px-6">
                <CardTitle>Past Events</CardTitle>
                <CardDescription>Events that have already taken place</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-6 space-y-4">
                    <div className="h-16 bg-gray-100 rounded-md animate-pulse"></div>
                    <div className="h-16 bg-gray-100 rounded-md animate-pulse"></div>
                  </div>
                ) : pastEvents.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {pastEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                            <Calendar className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{event.name}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="mr-1 h-3 w-3" /> {formatDate(event.date)} • {event.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/events/${event.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-200 text-gray-500 hover:bg-gray-50"
                            >
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <ListChecks className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No past events</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      You don't have any past events yet. Events that have already taken place will appear here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-gray-100 shadow-sm md:col-span-2">
            <CardHeader className="border-b border-gray-100 bg-muted/30 px-6">
              <CardTitle>Event Analytics</CardTitle>
              <CardDescription>Overview of your event performance</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <BarChart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Analytics coming soon</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  We're working on providing detailed analytics for your events. Check back soon!
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="border-b border-gray-100 bg-muted/30 px-6">
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used actions</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Link href="/submit">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-200 hover:bg-purple-50 hover:text-purple-500"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Create New Event
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-200 hover:bg-purple-50 hover:text-purple-500"
                  >
                    <User className="mr-2 h-4 w-4" /> Update Profile
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-200 hover:bg-purple-50 hover:text-purple-500"
                  >
                    <Calendar className="mr-2 h-4 w-4" /> Explore Events
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}
