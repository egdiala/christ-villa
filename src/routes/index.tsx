import { ReactNode } from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import { AnimatePresence } from "motion/react";
import { AuthRoutes, ConnectGroupsRoutes, DepartmentsRoutes, UsersRoutes } from "./modules";
import { DashboardPage } from "@/pages";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/ProtectedLayout";
import { RequestsPage } from "@/pages/requests";
import { Profile } from "@/pages/profile";

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
          path="auth/*"
          element={
            <AuthLayout>
              <LocationProvider>
                <AuthRoutes />
              </LocationProvider>
            </AuthLayout>
          }
        />
        <Route
          path="connect-groups/*"
          element={
            <DashboardLayout>
              <LocationProvider>
                <ConnectGroupsRoutes />
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
          path="/users/*"
          element={
            <DashboardLayout>
              <LocationProvider>
                <UsersRoutes />
              </LocationProvider>
            </DashboardLayout>
          }
        />
        <Route
          path="/departments/*"
          element={
            <DashboardLayout>
              <LocationProvider>
                <DepartmentsRoutes />
              </LocationProvider>
            </DashboardLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <LocationProvider>
                <Profile />
              </LocationProvider>
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
