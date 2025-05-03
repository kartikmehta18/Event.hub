import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Filter, ArrowLeft } from "lucide-react"
import Link from "next/link"
import EventCard from "@/components/event-card"
import { getEvents } from "@/lib/actions"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default async function ExplorePage() {
  const events = await getEvents()

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

        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Explore Events</h1>
          <p className="text-gray-500 max-w-2xl">
            Discover tech events from colleges and organizations around the world. Filter by type, location, and date to
            find the perfect event for you.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 mb-10">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-9 border-gray-200 focus:border-purple-300 focus:ring-purple-200"
              />
            </div>
            <Select>
              <SelectTrigger className="border-gray-200 focus:border-purple-300 focus:ring-purple-200">
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
              <SelectTrigger className="border-gray-200 focus:border-purple-300 focus:ring-purple-200">
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
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
              <Filter className="mr-2 h-4 w-4" /> Filter Results
            </Button>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Events</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Select defaultValue="date-asc">
              <SelectTrigger className="w-[180px] h-8 text-xs border-gray-200 focus:border-purple-300 focus:ring-purple-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-asc">Date (Upcoming)</SelectItem>
                <SelectItem value="date-desc">Date (Past)</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {events.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-gray-500 mb-6">There are no events matching your criteria.</p>
            <Link href="/submit">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                Submit an Event
              </Button>
            </Link>
          </div>
        )}

        {events.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" className="rounded-full border-purple-200 text-purple-500 hover:bg-purple-50">
              Load More Events
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
