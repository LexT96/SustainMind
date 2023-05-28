import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage";
import { RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <LandingPage />
    ),
  },
  {
    path: "/login/*",
    element: <SignIn routing="path" path="/login" />,
  },
  {
    path: "/register/*",
    element: <SignUp routing="path" path="/register" />,
  },
  {
    path: "/app",
    element: (
      <>
        <SignedIn>
          <p>Hello World</p>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </>
    ),
  },
]);