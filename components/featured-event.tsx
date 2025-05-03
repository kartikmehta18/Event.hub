import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

interface FeaturedEventProps {
  event: any
}

export default function FeaturedEvent({ event }: FeaturedEventProps) {
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
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-purple-50 to-transparent"></div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative p-6 md:p-8 flex flex-col h-full">
          <div className="mb-4">
            <Badge className={`${eventTypeColor[event.type as keyof typeof eventTypeColor]} text-white border-0`}>
              {eventTypeIcon[event.type as keyof typeof eventTypeIcon]}{" "}
              {event.type.charAt(0).toUpperCase() + event.type.slice(1).replace("-", " ")}
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{event.name}</h2>
          <div className="flex items-center text-gray-500 mb-2">
            <Calendar className="h-5 w-5 mr-2 text-purple-500" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center text-gray-500 mb-6">
            <MapPin className="h-5 w-5 mr-2 text-pink-500" />
            {event.location} {event.college && `• ${event.college}`}
          </div>
          <p className="text-gray-600 mb-6 flex-grow">{event.description}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/events/${event.id}`}>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-purple-200 text-purple-500 hover:bg-purple-50">
                Event Website <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
        <div className="relative md:h-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 md:hidden"></div>
          <Image
            src={event.imageUrl || "/placeholder.svg?height=400&width=600"}
            width={600}
            height={400}
            alt={event.name}
            className="w-full h-full object-cover md:rounded-r-2xl"
          />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent md:hidden"></div>
        </div>
      </div>
    </div>
  )
}
