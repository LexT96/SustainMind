import { useEffect, useState } from 'react'
import './App.css'
import { Button } from '@mui/material'
import { getUsers } from './api/userApi'
import { router } from './router'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'
import { CLERK_KEY } from './config'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

function App() {
if (!CLERK_KEY) {

  throw new Error("Missing Publishable Key")

}

  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      };
    fetchUsers();
    }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={CLERK_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </QueryClientProvider>
  );
}

export default App
