import { createContext, useState, FC } from 'react'

interface IThemeContext {
  theme: 'light' | 'dark'
  toggle?: () => void
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext)
export const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
