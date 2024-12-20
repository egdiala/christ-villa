import { useState } from "react";
import { Icon } from "@iconify/react";
import { Breadcrumb, Button, RenderIf } from "@/components/core";
import {
  AddHODModal,
  DeleteDepartmentModal,
  EditDepartmentModal,
} from "@/components/pages/departments";
import { cn } from "@/libs/cn";
import { NavLink, Outlet, useLocation } from "react-router";
import { useGetSingleDepartment } from "@/services/hooks/queries/useDepartments";
import { FetchedDepartmentType } from "@/types/departments";

export const DepartmentPage: React.FC = () => {
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  const departmentId = pathArray[2];

  const { data: singleDepartmentInfo } =
    useGetSingleDepartment<FetchedDepartmentType>({
      department_id: departmentId,
    });

  const { data: requestAreas } = useGetSingleDepartment({
    department_id: departmentId,
    component: "request-area",
  });
  console.log({ requestAreas });

  const departmentName = singleDepartmentInfo?.name;

  const [openDeleteDeptModal, setOpenDeleteDeptModal] = useState(false);
  const [openEditDepartmentModal, setOpenEditDepartmentModal] = useState(false);
  const [openAddHODModal, setOpenAddHODModal] = useState(false);

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

  const breadCrumbItems = [
    { label: "Departments", link: "/departments" },
    { label: singleDepartmentInfo?.name as string },
  ];

  return (
    <div className="flex flex-col pt-4 pb-9 gap-y-4 view-page-container overflow-y-scroll px-4">
      <Breadcrumb showBack items={breadCrumbItems} />

      <div className="flex gap-4 flex-col md:flex-row justify-between py-1">
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
            Delete
          </Button>

          <Button
            theme="grey"
            onClick={() => setOpenEditDepartmentModal(true)}
            className="!text-sm w-full md:unset"
          >
            <Icon icon="lucide:edit-2" className="size-4" />
            Edit
          </Button>

          <Button
            theme="primary"
            onClick={() => setOpenAddHODModal(true)}
            className="!text-sm w-full md:unset"
          >
            <Icon icon="lucide:plus" className="size-4" />
            Add Request Area
          </Button>
        </div>
      </div>

      <div className="grid gap-y-4">
        {/** Tabs */}
        <div className="rounded border-2 border-grey-dark-4 p-1 flex gap-x-2 items-center gap-2 w-full overflow-scroll scrollbar-hide">
          {Object.keys(tabsList).map((tab, index) => (
            <>
              <NavLink
                to={tabsList[tab]}
                key={tab}
                className={({ isActive }) =>
                  cn(
                    "rounded flex items-center justify-center p-2 text-sm w-full",
                    isActive
                      ? "bg-accent-primary text-white font-semibold"
                      : "bg-white text-text-secondary hover:bg-light-red"
                  )
                }
              >
                {tab}
              </NavLink>

              <RenderIf condition={index !== Object.keys(tabsList).length - 1}>
                <div className="border border-r bg-grey-dark-3 h-6"></div>
              </RenderIf>
            </>
          ))}
        </div>

        {/** Tab Content */}
        <Outlet />
      </div>

      <DeleteDepartmentModal
        isOpen={openDeleteDeptModal}
        onClose={() => setOpenDeleteDeptModal(false)}
        departmentInfo={singleDepartmentInfo as FetchedDepartmentType}
      />

      <EditDepartmentModal
        isOpen={openEditDepartmentModal}
        onClose={() => setOpenEditDepartmentModal(false)}
        departmentInfo={singleDepartmentInfo as FetchedDepartmentType}
      />

      <AddHODModal
        isOpen={openAddHODModal}
        onClose={() => setOpenAddHODModal(false)}
        departmentId={departmentId}
        singleDepartmentInfo={singleDepartmentInfo!}
      />
    </div>
  );
};
