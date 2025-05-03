import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 z-0"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm text-purple-600 w-fit">
              <span className="mr-1">✨</span> Discover amazing tech events
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Delightful tech events</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                start here.
              </span>
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl">
              Find your next tech talk, hackathon, or workshop from colleges and organizations around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/explore">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                >
                  Explore Events
                </Button>
              </Link>
              <Link href="/submit">
                <Button size="lg" variant="outline" className="border-purple-200 text-purple-500 hover:bg-purple-50">
                  Submit Your Event
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center rounded-2xl overflow-hidden shadow-xl border border-white/20">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src="https://cdn.lu.ma/landing/phone-dark.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-200 rounded-full blur-xl opacity-60"></div>
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-200 rounded-full blur-xl opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
