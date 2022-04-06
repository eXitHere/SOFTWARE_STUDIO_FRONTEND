export type Blog = {
  id: string
  name: string
  photo: string
  topic: string
  exText: string
  like: number
  date: string
}

export type BlogProfile = {
  id: string
  name: string
  photo: string
  topic: string
  exText: string
  like: number
  date: string
}

export type Comment = {
  id: string
  name: string
  photo: string
  text: string
  like: number
  date: string
}

export type Category = {
  categoryID:  string
  categoryName: string
  logo: string
}
