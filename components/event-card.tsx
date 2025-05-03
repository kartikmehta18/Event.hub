import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

interface EventCardProps {
  event: any
}

export default function EventCard({ event }: EventCardProps) {
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
    <Card className="overflow-hidden group hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 group-hover:opacity-0 transition-opacity duration-300"></div>
        <Image
          src={event.imageUrl || "/placeholder.svg?height=200&width=400"}
          width={400}
          height={200}
          alt={event.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${eventTypeColor[event.type as keyof typeof eventTypeColor]} text-white border-0`}>
            {eventTypeIcon[event.type as keyof typeof eventTypeIcon]}{" "}
            {event.type.charAt(0).toUpperCase() + event.type.slice(1).replace("-", " ")}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 mr-1 text-purple-500" />
          {formatDate(event.date)}
        </div>
        <Link href={`/events/${event.id}`}>
          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-500 transition-colors">{event.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{event.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin className="h-4 w-4 mr-1 text-pink-500" />
          {event.location} {event.college && `• ${event.college}`}
        </div>
        <div className="flex justify-between items-center">
          <Link
            href={`/events/${event.id}`}
            className="text-sm font-medium text-purple-500 hover:text-purple-600 transition-colors"
          >
            View Details
          </Link>
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium flex items-center text-gray-500 hover:text-purple-500 transition-colors"
          >
            Event Link <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </Card>
  )
}
