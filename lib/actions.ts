"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "./db"
import { comparePasswords, createToken, hashPassword } from "./auth"
import { getSession } from "./auth"

// Function to register a new user
export async function registerUser(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Validate input
  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required")
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match")
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  // Hash password
  const hashedPassword = await hashPassword(password)

  // Create user
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  })

  // Create token and set cookie
  const token = await createToken(user.id)
  const cookiesInstance = cookies();
  await cookiesInstance.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return { success: true }
}

// Function to login a user
export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validate input
  if (!email || !password) {
    throw new Error("Email and password are required")
  }

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  })

  // Check if user exists and password matches
  if (!user || !(await comparePasswords(password, user.password))) {
    throw new Error("Invalid email or password")
  }

  // Create token and set cookie
  const token = await createToken(user.id)
  const cookiesInstance = cookies();
  await cookiesInstance.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return { success: true }
}

// Function to logout a user
export async function logoutUser() {
  cookies().delete("token")
  redirect("/")
}

// Function to submit a new event
export async function submitEvent(formData: FormData) {
  const session = await getSession()

  if (!session) {
    throw new Error("You must be logged in to submit an event")
  }

  const name = formData.get("name") as string
  const date = formData.get("date") as string
  const type = formData.get("type") as string
  const location = formData.get("location") as string
  const college = (formData.get("college") as string) || null
  const link = formData.get("link") as string
  const description = formData.get("description") as string
  const contact = (formData.get("contact") as string) || null
  const imageUrl = (formData.get("imageUrl") as string) || null

  // Validate input
  if (!name || !date || !type || !location || !link || !description) {
    throw new Error("Required fields are missing")
  }

  // Create event
  await prisma.event.create({
    data: {
      name,
      date: new Date(date),
      type,
      location,
      college,
      link,
      description,
      contact,
      imageUrl,
      userId: session.id,
    },
  })

  // Revalidate the events page to show the new event
  revalidatePath("/")
  revalidatePath("/explore")

  return { success: true }
}

// Function to get all events
export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
    });
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
}

// Function to get a specific event by ID
export async function getEventById(id: string) {
  const event = await prisma.event.findUnique({
    where: { id: Number.parseInt(id) },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  })

  return event
}

// Function to get events submitted by a user
export async function getUserEvents() {
  const session = await getSession()

  if (!session) {
    return []
  }

  const events = await prisma.event.findMany({
    where: {
      userId: session.id,
    },
    orderBy: {
      date: "asc",
    },
  })

  return events
}

// Function to update user profile
export async function updateUserProfile(formData: FormData) {
  const session = await getSession()

  if (!session) {
    throw new Error("You must be logged in to update your profile")
  }

  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string

  // Validate input
  if (!firstName || !lastName || !email) {
    throw new Error("All fields are required")
  }

  // Update user
  await prisma.user.update({
    where: { id: session.id },
    data: {
      firstName,
      lastName,
      email,
    },
  })

  revalidatePath("/profile")

  return { success: true }
}

// Function to update user password
export async function updateUserPassword(formData: FormData) {
  const session = await getSession()

  if (!session) {
    throw new Error("You must be logged in to update your password")
  }

  const currentPassword = formData.get("currentPassword") as string
  const newPassword = formData.get("newPassword") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Validate input
  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error("All fields are required")
  }

  if (newPassword !== confirmPassword) {
    throw new Error("New passwords do not match")
  }

  // Get user with password
  const user = await prisma.user.findUnique({
    where: { id: session.id },
  })

  if (!user) {
    throw new Error("User not found")
  }

  // Check if current password is correct
  const isPasswordValid = await comparePasswords(currentPassword, user.password)

  if (!isPasswordValid) {
    throw new Error("Current password is incorrect")
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword)

  // Update password
  await prisma.user.update({
    where: { id: session.id },
    data: {
      password: hashedPassword,
    },
  })

  return { success: true }
}
