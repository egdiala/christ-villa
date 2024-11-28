import { Routes, Route } from "react-router";
import { UserPage, UsersPage } from "@/pages/users";

const UsersRoutes = () => {
  return (
    <Routes>
      <Route index element={<UsersPage />} />
      <Route path=":id" element={<UserPage />} />
    </Routes>
  );
};

export default UsersRoutes;