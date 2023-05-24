import { useEffect, useState } from 'react'
import './App.css'
import { Button } from '@mui/material'
import { getUsers } from './api/userApi'
import { router } from './router'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
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
    <RouterProvider router={router} />
  )
}

export default App
