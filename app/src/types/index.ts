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
  topic: string
  content: any
  category: string[]
  like: number
  like_users: string[]
  date: string
  username: string
  user_role: string
  profile_page: boolean
}

export type Detail = {
  blog_id: string
  topic: string
  content: string
  category: string[]
  like_users: [{ username: string; name: string }]
  like: number
  createdDate: string
  updated_date: string
  author_name: string
  author_id: string
  username: string
}

export type Comment = {
  login_id: string
  login_name: string
  comment_id: string
  user_id: string
  name: string
  comment: string
  like: number
  like_users: [{ username: string; name: string }]
  created_date: string
  updated_date: string
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

export type ModalEditCommentType = {
  name: string
  blog_id: string
  comment_id: string
  comment: string
  close: () => void
}

export type ModalLikeUserType = {
  like_users: [{ username: string; name: string }]
  close: () => void
}

export type Announcement = {
  close: () => void
}

export type ChooseCat = {
  selectTag: string[]
  handleChoose: (Category: string) => void
}

export type AddComment = {
  name: string
  blog_id: string
  profile_image: string
  comment_count: string
  post: boolean
  comment_id: string
  comment: string
  close: () => void
}
