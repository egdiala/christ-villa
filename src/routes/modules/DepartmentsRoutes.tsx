import { Routes, Route } from "react-router";
import { DepartmentPage, DepartmentsPage } from "@/pages/departments";
import {
  ActivitiesTab,
  AttendanceTab,
  MembersTab,
  PupilsTab,
  RequestsTab,
} from "@/pages/departments/department/tabs";

const DepartmentsRoutes = () => {
  return (
    <Routes>
      <Route index element={<DepartmentsPage />} />
      <Route path=":id" element={<DepartmentPage />}>
        <Route path="members" index element={<MembersTab />} />
        <Route path="pupils" element={<PupilsTab />} />
        <Route path="requests" element={<RequestsTab />} />
        <Route path="activities" element={<ActivitiesTab />} />
        <Route path="attendance" element={<AttendanceTab />} />
      </Route>
    </Routes>
  );
};

export default DepartmentsRoutes;
