import { ReactNode } from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import { DashboardPage } from "@/pages";
import { Profile } from "@/pages/profile";
import AuthLayout from "@/layouts/AuthLayout";
import { AnimatePresence } from "motion/react";
import { RequestsPage } from "@/pages/requests";
import DashboardLayout from "@/layouts/ProtectedLayout";
import { AdminAccountsPage } from "@/pages/admin-accounts";
import { AuthRoutes, ConnectGroupsRoutes, DepartmentsRoutes, UsersRoutes } from "./modules";

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
          path="/admin-accounts"
          element={
            <DashboardLayout>
              <LocationProvider>
                <AdminAccountsPage />
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
