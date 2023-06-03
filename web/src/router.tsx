import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage";
import { RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
import { ProductsPage } from "./pages/ProductsPage";
import { SitesPage } from "./pages/SitesPage";
import { AnalysisPage } from "./pages/AnalysisPage";

const redirectToSignIn = (
  <SignedOut>
    <RedirectToSignIn />
  </SignedOut>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
    path: "/products",
    element:      <>
    <SignedIn>
      <ProductsPage />
    </SignedIn>
    {redirectToSignIn}
  </>
  },
  {
    path: "/sites",
    element: (
      <>
        <SignedIn>
          <SitesPage />
        </SignedIn>
        {redirectToSignIn}
      </>
    ),
  },
  {
    path: "/analysis",
    element: (
      <>
        <SignedIn>
          <AnalysisPage />
        </SignedIn>
        {redirectToSignIn}
      </>
    ),
  },
  {
    path: "/app",
    element: (
      <>
        <SignedIn>
          <p>Hello World</p>
          <UserButton />
        </SignedIn>
        {redirectToSignIn}
      </>
    ),
  },
]);