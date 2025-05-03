import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink, MapPin, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getEventById } from "@/lib/actions"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { formatDate } from "@/lib/utils"

interface EventPageProps {
  params: {
    id: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventById(params.id)

  if (!event) {
    notFound()
  }

  const eventTypeColor = {
    hackathon: "bg-gradient-to-r from-purple-500 to-purple-600",
    "tech-talk": "bg-gradient-to-r from-blue-500 to-blue-600",
    workshop: "bg-gradient-to-r from-green-500 to-green-600",
  }

  const eventTypeIcon = {
    hackathon: "🏆",
    "tech-talk": "🎤",
    workshop: "🔧",
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="flex-1 container py-12">
        <div className="mb-8">
          <Link
            href="/explore"
            className="inline-flex items-center text-sm text-gray-500 hover:text-purple-500 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to events
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative mb-8 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50"></div>
            <Image
              src={event.imageUrl || "/placeholder.svg?height=400&width=800"}
              width={800}
              height={400}
              alt={event.name}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className={`${eventTypeColor[event.type as keyof typeof eventTypeColor]} text-white border-0`}>
                {eventTypeIcon[event.type as keyof typeof eventTypeIcon]}{" "}
                {event.type.charAt(0).toUpperCase() + event.type.slice(1).replace("-", " ")}
              </Badge>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8 mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center text-gray-500">
                <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                {formatDate(event.date)}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{event.name}</h1>

            <div className="flex items-center text-gray-500 mb-8">
              <MapPin className="h-5 w-5 mr-2 text-pink-500" />
              <span className="text-lg">
                {event.location} {event.college && `• ${event.college}`}
              </span>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold mb-4">About this event</h2>
              <p className="whitespace-pre-line text-gray-600">{event.description}</p>
            </div>

            {event.user && (
              <div className="mb-8 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <h2 className="text-xl font-semibold mb-4">Organizer</h2>
                <div className="flex items-center text-gray-600">
                  <User className="h-5 w-5 mr-2 text-purple-500" />
                  <span>
                    {event.user.firstName} {event.user.lastName}
                  </span>
                </div>
              </div>
            )}

            {event.contact && (
              <div className="mb-8 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="flex items-center text-gray-600">
                  <User className="h-5 w-5 mr-2 text-purple-500" />
                  <span>{event.contact}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors"
              >
                Visit Event Website <ExternalLink className="h-4 w-4 ml-2" />
              </a>
              <Button variant="outline" className="border-purple-200 text-purple-500 hover:bg-purple-50">
                <Share2 className="h-4 w-4 mr-2" /> Share Event
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
