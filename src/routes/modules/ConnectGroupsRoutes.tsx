import { Routes, Route } from "react-router";
import { ConnectGroupPage, ConnectGroupsPage } from "@/pages/connect-groups";

const ConnectGroupsRoutes = () => {
  return (
    <Routes>
      <Route index element={<ConnectGroupsPage />} />
      <Route path=":id" element={<ConnectGroupPage />} />
    </Routes>
  );
};

export default ConnectGroupsRoutes;