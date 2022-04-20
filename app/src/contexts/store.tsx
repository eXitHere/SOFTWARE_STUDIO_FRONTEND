import React, { createContext, useState, FC, SetStateAction } from 'react'
import {AuthUser,Tags} from 'types'

type UserContextType = {
  user: AuthUser | null
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
}

type UserContextProviderProps = {
  children: React.ReactNode
}
export const UserContext = createContext<UserContextType | null>(null)


export const UserContextProvider = ({children}: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
)}
  


type TagContextType = {
  category: string[]
  setCategory: React.Dispatch<SetStateAction<string[]>>
}

type TagContextProviderProps = {
  children: React.ReactNode
}
export const TagContext = createContext<TagContextType>({} as TagContextType)

export const TagContextProvider = ({children}: TagContextProviderProps) => {
  const [category, setCategory] = useState<string[]>([])
  return (
    <TagContext.Provider value={{category, setCategory}}>
      {children}
    </TagContext.Provider>
  )
}

type SearchContextType = {
  keyword: string
  setKeyword: React.Dispatch<SetStateAction<string>>
}

type SearchContextProviderProps = {
  children: React.ReactNode
}

export const SearchContext = createContext<SearchContextType>({} as SearchContextType)
export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [keyword, setKeyword] = useState<string>('')
  return <SearchContext.Provider value={{ keyword, setKeyword }}>{children}</SearchContext.Provider>
}


type UpdateContextType = {
  update: string
  setUpdate: React.Dispatch<SetStateAction<string>>
}

type UpdateContextProviderProps = {
  children: React.ReactNode
}

export const UpdateContext = createContext<UpdateContextType>({} as UpdateContextType)
export const UpdateContextProvider = ({ children }: UpdateContextProviderProps) => {
  const [update, setUpdate] = useState<string>("")

  return (
    <UpdateContext.Provider
      value={{
        update,
        setUpdate,
      }}
    >
      {children}
    </UpdateContext.Provider>
  )
}