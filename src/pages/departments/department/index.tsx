import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/core";
import {
  AddHODModal,
  DeleteDepartmentModal,
  EditDepartmentModal,
} from "@/components/pages/departments";
import { cn } from "@/libs/cn";
import { NavLink, Outlet, useLocation } from "react-router";

export const DepartmentPage: React.FC = () => {
  const departmentName = "Children"; // Change value to "Ushering" to see the other layout
  const [openDeleteDeptModal, setOpenDeleteDeptModal] = useState(false);
  const [openEditDepartmentModal, setOpenEditDepartmentModal] = useState(false);
  const [openAddHODModal, setOpenAddHODModal] = useState(false);
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  const basePath = `/${pathArray[1]}/${pathArray[2]}`;

  const tabsList: Record<any, any> = {
    Members: `${basePath}/members`,
    ...(departmentName?.toLowerCase()?.includes("children")
      ? { Pupils: `${basePath}/pupils` }
      : {}),
    Requests: `${basePath}/requests`,
    Activities: `${basePath}/activities`,
    ...(departmentName?.toLowerCase()?.includes("children")
      ? { Attendance: `${basePath}/attendance` }
      : {}),
  };

  return (
    <div className="flex flex-col gap-y-4 pt-4 pb-9  view-page-container overflow-y-scroll">
      <div className="flex gap-4 flex-col md:flex-row justify-between px-4 py-1">
        <h4 className="capitalize font-bold text-2xl md:text-xl text-text-primary">
          {departmentName} Department
        </h4>

        <div className="flex flex-col md:flex-row gap-2">
          <Button
            theme="ghost"
            className="!text-accent-primary w-full md:unset"
            onClick={() => setOpenDeleteDeptModal(true)}
          >
            <Icon icon="lucide:trash" className="size-4" />
            Delete Department
          </Button>

          <Button
            theme="grey"
            onClick={() => setOpenEditDepartmentModal(true)}
            className="!text-sm w-full md:unset"
          >
            <Icon icon="lucide:edit-2" className="size-4" />
            Edit Department
          </Button>

          <Button
            theme="primary"
            onClick={() => setOpenAddHODModal(true)}
            className="!text-sm w-full md:unset"
          >
            <Icon icon="lucide:plus" className="size-4" />
            Add HOD
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-y-4 w-full">
        {/** Tabs */}
        <div className="px-4 my-2 w-full">
          <div
            className={cn(
              "grid border-2 rounded border-grey-dark-4 p-1 gap-3 relative overflow-x-scroll scrollbar-hide grid-auto-column",
              departmentName?.toLowerCase() === "children"
                ? "grid-cols-5"
                : "grid-cols-3"
            )}
          >
            {Object.keys(tabsList).map((tab) => (
              <NavLink
                to={tabsList[tab]}
                key={tab}
                className={({ isActive }) =>
                  cn(
                    "flex justify-center items-center py-1 px-2 rounded",
                    isActive
                      ? "bg-accent-primary text-white"
                      : "bg-white text-text-secondary hover:bg-light-red"
                  )
                }
                // className={cn(
                //   "focus-visible:outline-none",
                //   index !== Object.keys(tabsList).length - 1
                //     ? "border-r border-grey-dark-3"
                //     : ""
                // )}
              >
                {tab}
              </NavLink>
            ))}
          </div>
        </div>

        {/** Tab Content */}
        <Outlet />
      </div>

      <DeleteDepartmentModal
        isOpen={openDeleteDeptModal}
        onClose={() => setOpenDeleteDeptModal(false)}
        onDelete={() => {}}
      />

      <EditDepartmentModal
        isOpen={openEditDepartmentModal}
        onClose={() => setOpenEditDepartmentModal(false)}
        onUpdateDepartment={() => {}}
      />

      <AddHODModal
        isOpen={openAddHODModal}
        onClose={() => setOpenAddHODModal(false)}
        onAddHOD={() => {}}
      />
    </div>
  );
};
