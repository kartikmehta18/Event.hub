"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, User } from "lucide-react"
import { useAuth } from "./auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { user, loading, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-100">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Calendar className="h-5 w-5 text-purple-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">EventHub</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-sm font-medium hover:text-purple-500 transition-colors">
            Home
          </Link>
          <Link href="/explore" className="text-sm font-medium hover:text-purple-500 transition-colors">
            Explore
          </Link>
          <Link href="/submit" className="text-sm font-medium hover:text-purple-500 transition-colors">
            Submit Event
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-purple-500 transition-colors">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="h-9 w-20 bg-gray-100 animate-pulse rounded-md"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-purple-200 text-purple-500 hover:bg-purple-50"
                >
                  <User className="h-4 w-4" />
                  <span>{user.firstName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium hover:text-purple-500 transition-colors hidden md:block"
              >
                Login
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
