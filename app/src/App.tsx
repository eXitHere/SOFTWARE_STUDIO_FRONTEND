import { AppRoutes } from 'routes'
import { ThemeProvider } from 'contexts/store2'

import 'styles/tailwind.css'

const App = () => {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
