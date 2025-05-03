export interface EventType {
  id: string
  name: string
  date: string
  type: string
  location: string
  college?: string
  link: string
  description: string
  contact?: string
}

export interface UserType {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string // In a real app, this would be hashed
}
