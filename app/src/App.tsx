import { AppRoutes } from 'routes'
import { TagContextProvider, UserContextProvider, SearchContextProvider, UpdateContextProvider } from 'contexts/store'
import 'styles/tailwind.css'


const App = () => {
  return (
    <SearchContextProvider>
      <UserContextProvider>
        <TagContextProvider>
          <UpdateContextProvider>
            <AppRoutes />
          </UpdateContextProvider>
        </TagContextProvider>
      </UserContextProvider>
    </SearchContextProvider>
  )
}

export default App
