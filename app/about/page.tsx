import { Button } from "@/components/ui/button"
import { Calendar, Users, Award, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="flex-1">
        <section className="w-full py-20 md:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 z-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
                About{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  EventHub
                </span>
              </h1>
              <p className="text-gray-500 md:text-xl mb-8 max-w-2xl mx-auto">
                We're on a mission to connect tech enthusiasts with the best events from colleges and organizations
                around the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/explore">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                  >
                    Explore Events
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-purple-200 text-purple-500 hover:bg-purple-50">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-20">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Our Story</h2>
              <p className="text-gray-500 mb-4">
                EventHub was founded in 2023 by a group of tech enthusiasts who were frustrated with the fragmented
                nature of event discovery. We noticed that amazing tech events were happening all around us, but there
                was no central place to find them.
              </p>
              <p className="text-gray-500 mb-4">
                We built EventHub to solve this problem - creating a platform where students, professionals, and
                organizations could easily discover and share tech events. Our goal is to foster a vibrant community of
                learners and innovators.
              </p>
              <p className="text-gray-500">
                Today, EventHub connects thousands of tech enthusiasts with events ranging from hackathons to workshops
                to tech talks, helping people learn, network, and grow their careers.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-2xl blur-3xl"></div>
              <div className="relative z-10">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Team working together"
                  className="rounded-2xl shadow-lg border border-white/20"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Our Mission & Values</h2>
              <p className="text-gray-500">
                We're guided by a set of core values that inform everything we do at EventHub.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                <p className="text-gray-500">
                  We believe that everyone should have access to quality tech events, regardless of their background or
                  location.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-gray-500">
                  We're building a vibrant community of tech enthusiasts who learn from and support each other.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-gray-500">
                  We curate high-quality events that provide real value to attendees and help them grow professionally.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Passion</h3>
                <p className="text-gray-500">
                  We're passionate about technology and education, and we're committed to helping others pursue their
                  passions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Meet Our Team</h2>
            <p className="text-gray-500">
              We're a diverse group of tech enthusiasts, educators, and community builders.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-xl opacity-70"></div>
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  width={128}
                  height={128}
                  alt="Team member"
                  className="relative z-10 rounded-full object-cover border-2 border-white"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
              <p className="text-purple-500 mb-2">Co-Founder & CEO</p>
              <p className="text-gray-500 text-sm">
                Former software engineer with a passion for community building and tech education.
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-xl opacity-70"></div>
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  width={128}
                  height={128}
                  alt="Team member"
                  className="relative z-10 rounded-full object-cover border-2 border-white"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Michael Chen</h3>
              <p className="text-purple-500 mb-2">Co-Founder & CTO</p>
              <p className="text-gray-500 text-sm">
                Full-stack developer with experience building community platforms and marketplaces.
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-xl opacity-70"></div>
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  width={128}
                  height={128}
                  alt="Team member"
                  className="relative z-10 rounded-full object-cover border-2 border-white"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Priya Patel</h3>
              <p className="text-purple-500 mb-2">Head of Community</p>
              <p className="text-gray-500 text-sm">
                Community builder with a background in organizing tech events and hackathons.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Join Our Community</h2>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
              Whether you're looking to attend events, organize them, or just connect with like-minded tech enthusiasts,
              we'd love to have you as part of our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                >
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-purple-200 text-purple-500 hover:bg-purple-50">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
