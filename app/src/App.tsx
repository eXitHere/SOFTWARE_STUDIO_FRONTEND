import { AppRoutes } from 'routes'
import { TagContextProvider, UserContextProvider } from 'contexts/store'
import 'styles/tailwind.css'


const App = () => {
  return (
    <UserContextProvider>
      <TagContextProvider>
        <AppRoutes />
      </TagContextProvider>
    </UserContextProvider>
  )
}

export default App
