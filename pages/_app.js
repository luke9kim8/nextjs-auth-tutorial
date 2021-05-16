import '../styles/index.css'
import {TodosProvider} from "../contexts/TodosContext"
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  const { user } = pageProps;
  return (
    <UserProvider user={user}>
      <TodosProvider>
        <div className="container mx-auto my-6 max-w-xl">
          <Component {...pageProps} />
        </div>
      </TodosProvider>
    </UserProvider>
  )
  
}

export default MyApp
