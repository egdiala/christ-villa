export const appRoutes = [
  { to: "/", name: "Dashboard", icon: "lucide:layout-dashboard" },
  { to: "/users", name: "Users", icon: "lucide:users" },
  { to: "/departments", name: "Departments", icon: "lucide:component" },
  { to: "/requests", name: "Requests", icon: "lucide:life-buoy" },
  {
    to: "/connect-groups",
    name: "Connect Groups",
    icon: "lucide:loader-pinwheel",
  },
  { to: "/engage", name: "Announcements", icon: "lucide:volume-2" },
];

export const setupRoutes = [
  { to: "/admin-accounts", name: "Admin Accounts", icon: "lucide:square-user" },
  { to: "/church-leaders", name: "Church Leaders", icon: "lucide:award" },
  { to: "/church-calendar", name: "Church Calendar", icon: "lucide:calendar" },
  { to: "/sermon-notes", name: "Sermon Notes", icon: "lucide:book-open-text" },
];
