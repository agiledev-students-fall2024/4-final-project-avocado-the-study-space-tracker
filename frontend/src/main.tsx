import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import SavedRoutesList from "./components/SavedRoutesList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route element={<ProtectedRouteWrapper requiresAuth={false} />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Route>
      <Route element={<ProtectedRouteWrapper requiresAuth={true} />}>
        <Route index path="/" element={<Home />} />
        <Route index path="/suggest" element={<SuggestPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/saved-routes" element={<SavedRoutesPage />}
        <Route path="/saved-routes-list" element={<SavedRoutesList />}
      </Route>

    </>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </StrictMode>,
);

