import { Routes, Route } from "react-router";
import { DepartmentPage, DepartmentsPage } from "@/pages/departments";

const DepartmentsRoutes = () => {
  return (
    <Routes>
      <Route index element={<DepartmentsPage />} />
      <Route path=":id" element={<DepartmentPage />} />
    </Routes>
  );
};

export default DepartmentsRoutes;
