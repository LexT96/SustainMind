import { useEffect, useState } from 'react'
import './App.css'
import { Button } from '@mui/material'
import { getUsers } from './api/userApi'
import { router } from './router'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ClerkProvider, useUser } from '@clerk/clerk-react'
import { CLERK_KEY } from './config'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

function App() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    if (user && ! user.unsafeMetadata?.onboardingCompleted) {
      router.navigate('/onboarding')
    }
  }, [user])

  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App
