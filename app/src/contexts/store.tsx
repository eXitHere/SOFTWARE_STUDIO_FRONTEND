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
    category: Tags
    setCategory: React.Dispatch<SetStateAction<Tags>>
  }

  type TagContextProviderProps = {
    children: React.ReactNode
  }
  export const TagContext = createContext<TagContextType>({} as TagContextType)

  export const TagContextProvider = ({children}: TagContextProviderProps) => {
    const [category, setCategory] = useState<Tags>({name:"คำสอน"})
    return (
      <TagContext.Provider value={{category, setCategory}}>
        {children}
      </TagContext.Provider>
    )
  }


