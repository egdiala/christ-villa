import { Routes, Route } from "react-router";
import { ConnectGroupsPage } from "@/pages/connect-groups";

const ConnectGroupsRoutes = () => {
  return (
    <Routes>
      <Route index element={<ConnectGroupsPage />} />
    </Routes>
  );
};

export default ConnectGroupsRoutes;