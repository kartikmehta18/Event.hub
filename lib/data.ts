import type { EventType } from "./types"

// Mock data for events
const events: EventType[] = [
  {
    id: "1",
    name: "TechCrunch Hackathon 2023",
    date: "2023-06-15",
    type: "hackathon",
    location: "San Francisco, CA",
    college: "Stanford University",
    link: "https://example.com/techcrunch-hackathon",
    description:
      "Join us for a 24-hour hackathon where you can build innovative solutions to real-world problems. Prizes include cash awards, mentorship opportunities, and potential investment for standout projects.\n\nThis event is open to all skill levels, from beginners to experienced developers. Teams of up to 4 people are allowed, and you can either come with a pre-formed team or find teammates at the event.\n\nFood, drinks, and snacks will be provided throughout the event. Don't forget to bring your laptop, charger, and any other equipment you might need!",
    contact: "hackathon@techcrunch.com",
  },
  {
    id: "2",
    name: "AI in Healthcare Workshop",
    date: "2023-07-10",
    type: "workshop",
    location: "Boston, MA",
    college: "MIT",
    link: "https://example.com/ai-healthcare-workshop",
    description:
      "This workshop explores the applications of artificial intelligence in healthcare. Learn from industry experts about the latest advancements and opportunities in this rapidly evolving field.",
    contact: "workshops@mit.edu",
  },
  {
    id: "3",
    name: "Future of Web Development",
    date: "2023-08-05",
    type: "tech-talk",
    location: "Online",
    link: "https://example.com/future-web-dev",
    description:
      "A virtual tech talk discussing the future trends in web development, including WebAssembly, Edge Computing, and more.",
  },
  {
    id: "4",
    name: "Blockchain Innovation Summit",
    date: "2023-09-20",
    type: "tech-talk",
    location: "New York, NY",
    college: "Columbia University",
    link: "https://example.com/blockchain-summit",
    description:
      "Join industry leaders for a day of discussions about blockchain technology and its applications across various sectors.",
    contact: "events@columbia.edu",
  },
  {
    id: "5",
    name: "Women in Tech Hackathon",
    date: "2023-10-15",
    type: "hackathon",
    location: "Seattle, WA",
    college: "University of Washington",
    link: "https://example.com/women-in-tech",
    description:
      "A hackathon focused on promoting diversity in tech. Open to all skill levels with mentorship opportunities.",
    contact: "diversity@uw.edu",
  },
  {
    id: "6",
    name: "Mobile App Development Workshop",
    date: "2023-11-05",
    type: "workshop",
    location: "Austin, TX",
    link: "https://example.com/mobile-app-workshop",
    description: "Learn how to build cross-platform mobile applications using React Native in this hands-on workshop.",
  },
]

// Function to get all events
export async function getEvents(): Promise<EventType[]> {
  // In a real app, this would fetch from a database
  return events
}

// Function to get a specific event by ID
export async function getEventById(id: string): Promise<EventType | undefined> {
  // In a real app, this would fetch from a database
  return events.find((event) => event.id === id)
}
