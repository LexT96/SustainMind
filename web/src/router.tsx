import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
  ]);