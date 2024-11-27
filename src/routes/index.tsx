import { ReactNode } from "react";
// import AuthLayout from "@/layouts/AuthLayout"
import { AnimatePresence } from "motion/react";
import DashboardLayout from "@/layouts/ProtectedLayout";
import { Routes, Route, BrowserRouter } from "react-router";
import { DashboardPage } from "@/pages";
import { RequestsPage } from "@/pages/requests";
import { UserPage, UsersPage } from "@/pages/users";

function LocationProvider({ children }: { children: ReactNode }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <LocationProvider>
                <DashboardPage />
              </LocationProvider>
            </DashboardLayout>
          }
        />
        <Route
          path="/requests"
          element={
            <DashboardLayout>
              <LocationProvider>
                <RequestsPage />
              </LocationProvider>
            </DashboardLayout>
          }
        />
        <Route
          path="/users"
          element={
            <DashboardLayout>
              <LocationProvider>
                <UsersPage />
              </LocationProvider>
            </DashboardLayout>
          }
        />
        <Route
          path="/users/:id"
          element={
            <DashboardLayout>
              <LocationProvider>
                <UserPage />
              </LocationProvider>
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
