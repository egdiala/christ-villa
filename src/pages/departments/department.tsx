import { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/core";
import {
  ActivitiesTab,
  AddHODModal,
  AttendanceTab,
  DeleteDepartmentModal,
  EditDepartmentModal,
  MembersTab,
  PupilsTab,
  RequestsTab,
} from "@/components/pages/departments";
import { cn } from "@/libs/cn";

export const DepartmentPage: React.FC = () => {
  const departmentName = "Children"; // Change value to "Ushering" to see the other layout
  const [openDeleteDeptModal, setOpenDeleteDeptModal] = useState(false);
  const [openEditDepartmentModal, setOpenEditDepartmentModal] = useState(false);
  const [openAddHODModal, setOpenAddHODModal] = useState(false);

  const tabsList: Record<any, any> = {
    Members: <MembersTab />,
    ...(departmentName?.toLowerCase() === "children"
      ? { Pupils: <PupilsTab /> }
      : {}),
    Requests: <RequestsTab />,
    Activities: <ActivitiesTab />,
    ...(departmentName?.toLowerCase() === "children"
      ? { Attendance: <AttendanceTab /> }
      : {}),
  };

  const [_, setSelectedTab] = useState("Members");

  return (
    <div className="grid pt-4 pb-9 gap-y-4 view-page-container overflow-y-scroll">
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

      <TabGroup className="grid gap-y-4">
        {/** Tabs */}
        <div className="px-4">
          <TabList
            className={cn(
              "grid my-2 border-2 rounded border-grey-dark-4 p-1 gap-x-3 relative",
              departmentName?.toLowerCase() === "children"
                ? "grid-cols-3 gap-y-2 md:grid-cols-5"
                : "grid-cols-3"
            )}
          >
            {Object.keys(tabsList).map((tab, index) => (
              <Tab
                key={tab}
                className={cn(
                  "focus-visible:outline-none",
                  index !== Object.keys(tabsList).length - 1
                    ? "md:border-r md:border-grey-dark-3"
                    : ""
                )}
                onClick={() => setSelectedTab(tab)}
              >
                {({ selected }) => (
                  <div
                    className={cn(
                      "rounded flex items-center justify-center py-2 text-sm outline-none cursor-pointer",
                      selected
                        ? "bg-accent-primary text-white font-semibold"
                        : "bg-white text-text-secondary hover:bg-light-red",
                      index !== Object.keys(tabsList).length - 1
                        ? "md:mr-3"
                        : ""
                    )}
                  >
                    {tab}
                  </div>
                )}
              </Tab>
            ))}
          </TabList>
        </div>

        {/** Tab Content */}
        <TabPanels>
          {Object.values(tabsList)?.map((value, index) => (
            <TabPanel key={index}>{value}</TabPanel>
          ))}
        </TabPanels>
      </TabGroup>

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
