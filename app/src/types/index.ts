import { PostComment } from 'components/common/PostComment'
import { ChangeEvent, SetStateAction, useState, MouseEvent } from 'react'

export type AuthUser = {
  id: string
  token: string
  displayname: string
  username: string
  password: string
  photo: string
}

export type Tags = {
  name: string
}

export type Blog = {
  blog_id: string
  author_name: string
  profile_image: string
  topic: string
  content: string
  category: string[]
  like: number
  like_users : string[]
  date: string
  username: string
  profile_page: boolean
}

export type Detail = {
  id: string
  topic: string
  content: string
  category: string[]
  like: string[]
  like_count: number
  createdDate: string
  name_detail: string
  user_id: string
  profile_image: string
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
  categoryID: string
  categoryName: string
  logo: string
}

export type Modal = {
  warningText: string
  close: () => void
  agree: () => void
}

export type Anoucement = {
  topic: string
  text: string
  date : string
  close: () => void
}

export type ChooseCat = {
  selectTag: string[]
  handleChoose: (Category: string) => void
}

export type AddComment = {
  name: string
  profile_image: string
}