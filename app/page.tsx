import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Sparkles } from "lucide-react"
import Link from "next/link"
import EventCard from "@/components/event-card"
import FeaturedEvent from "@/components/featured-event"
import HeroSection from "@/components/hero-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getEvents } from "@/lib/actions"

export default async function Home() {
  const events = await getEvents()

  // Sort events by date (upcoming first)
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  // Get upcoming events (events with dates in the future)
  const now = new Date()
  const upcomingEvents = sortedEvents.filter((event) => new Date(event.date) >= now)

  // Use the first upcoming event as featured, or the first event if no upcoming events
  const featuredEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : events.length > 0 ? events[0] : null

  // Get other events (excluding the featured one)
  const otherEvents = featuredEvent ? events.filter((event) => event.id !== featuredEvent.id).slice(0, 6) : []

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <section className="container py-12">
          <div className="relative w-full max-w-3xl mx-auto mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30"></div>
            <div className="relative bg-white border border-gray-100 rounded-full shadow-sm flex items-center p-1.5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="w-full pl-9 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="hidden md:flex gap-2 px-2">
                <Select>
                  <SelectTrigger className="w-[130px] border-0 focus:ring-0">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="tech-talk">Tech Talk</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[130px] border-0 focus:ring-0">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="san-francisco">San Francisco</SelectItem>
                    <SelectItem value="boston">Boston</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                Search
              </Button>
            </div>
          </div>

          {featuredEvent && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Featured Event</h2>
                <Link href="/explore" className="text-sm font-medium text-purple-500 hover:underline">
                  View all events
                </Link>
              </div>
              <FeaturedEvent event={featuredEvent} />
            </div>
          )}

          {otherEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-8">Upcoming Events</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center mt-12">
            <Link href="/explore">
              <Button variant="outline" className="rounded-full border-purple-200 text-purple-500 hover:bg-purple-50">
                View All Events
              </Button>
            </Link>
          </div>
        </section>

        <section className="w-full py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-30"></div>
          </div>
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Have an event to share?</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Know about a tech event that's not listed? Help the community by adding it to our platform.
              </p>
              <Link href="/submit">
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                >
                  Submit Your Event
                </Button>
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Create Events</h3>
                <p className="text-gray-500">Submit tech events from your college or organization to our platform.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Discover Events</h3>
                <p className="text-gray-500">Find the perfect tech events that match your interests and skills.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Attend Events</h3>
                <p className="text-gray-500">Register for events and connect with like-minded tech enthusiasts.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
