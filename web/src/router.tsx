import {
  createBrowserRouter
} from "react-router-dom";

import { RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp, UserButton } from "@clerk/clerk-react";
import { AnalysisPage } from "./pages/AnalysisPage";
import { LandingPage } from "./pages/LandingPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SitesPage } from "./pages/SitesPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { SuppliersPage } from "./pages/SuppliersPage";
import { SupplierDetailPage } from "./pages/SupplierDetailPage";
import { OnboardingPage } from "./pages/OnboardingPage";

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
    path: "/onboarding",
    element: (
      <>
        <SignedIn>
          <OnboardingPage />
        </SignedIn>
        {redirectToSignIn}
      </>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <SignedIn>
          <ProductsPage />
        </SignedIn>
        {redirectToSignIn}
      </>
    ),
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
    path: "/profile",
    element: (
      <>
        <SignedIn>
          <ProfilePage />
        </SignedIn>
        {redirectToSignIn}
      </>
    ),
  },
  {
    path: "/suppliers",
    element: (
      <>
        <SignedIn>
          <SuppliersPage />
        </SignedIn>
        {redirectToSignIn}
      </>
    ),
  },
  {
    path: "/marketplace",
    element: (
      <>
        <SignedIn>
          <MarketplacePage />
        </SignedIn>
        {redirectToSignIn}
      </>
    ),
  },
  {
    path: "/suppliers/:id",
    element: (
      <>
        <SignedIn>
          <SupplierDetailPage />
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