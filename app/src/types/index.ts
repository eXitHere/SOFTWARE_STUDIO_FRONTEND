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
  selectTag: string
  handleChoose: (Category: string) => void
}
