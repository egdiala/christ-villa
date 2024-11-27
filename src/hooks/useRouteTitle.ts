import { appRoutes, setupRoutes } from "@/constants/routes";
import { useLocation } from "react-router";

export const useRouteTitle = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const allRoutes = [...appRoutes, ...setupRoutes]
  
    const routeTitles = Object.fromEntries(allRoutes.map((route) => [route.to, route.name]));

    // Find the most specific route title that matches
    const title = Object.keys(routeTitles)
        .reverse()
        .find(route => pathname.startsWith(route));

    return routeTitles[title as keyof typeof routeTitles] || "Default Title";
};