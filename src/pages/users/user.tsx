import { Icon } from "@iconify/react";
import { useState } from "react";
import { Button, RenderIf } from "@/components/core";
import { cn } from "@/libs/cn";
import {
  ApproveMemberModal,
  DeleteUserModal,
  EditUserTypeModal,
} from "@/components/pages/users";

export const UserPage: React.FC = () => {
  const userStatus = "pending";

  const userRegistrationInfo = [
    { id: 1, title: "Member ID", value: "39i439HIJD03" },
    { id: 2, title: "Reg. Date & Time", value: "Today • 12:34pm" },
    { id: 3, title: "Approved by", value: "NA" },
  ];

  const userOtherInfo = [
    {
      id: 4,
      title: "Address",
      value: "2301 Putty Hill Avenue, Parkville, MD, 21234",
    },
    { id: 5, title: "Profession", value: "Interface Designer" },
    { id: 6, title: "Marital Status", value: "Married" },
    { id: 7, title: "Department", value: "Not applicable" },
    { id: 8, title: "Hobbies", value: ["swimming", "Reading", "Other"] },
  ];

  const profileCardInfo = [
    {
      id: 9,
      value: "example@gmail.com",
      icon: "lucide:mail",
    },
    { id: 10, value: "+1 814 5632 783", icon: "lucide:phone" },
  ];

  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const [openApproveMemberModal, setOpenApproveMemberModal] = useState(false);
  const [openEditUserTypeModal, setOpenEditUserTypeModal] = useState(false);

  return (
    <div className="py-4 grid gap-4">
      <div className="flex gap-4 flex-col md:flex-row justify-between md:items-center px-4">
        <h2 className="font-bold text-2xl md:text-xl text-text-primary">
          John Doe
        </h2>

        <div className="flex gap-2">
          <Button
            theme="ghost"
            className="!text-accent-primary sm:w-full md:w-unset"
            onClick={() => setOpenDeleteUserModal(true)}
          >
            <Icon icon="lucide:trash" className="size-4" />
            Delete User
          </Button>

          <RenderIf condition={userStatus?.toLowerCase() === "pending"}>
            <Button
              theme="primary"
              className="!text-sm w-full md:w-unset !px-1 md:!px-4"
              onClick={() => setOpenApproveMemberModal(true)}
            >
              <Icon icon="lucide:badge-check" className="size-4" />
              Approve Member
            </Button>
          </RenderIf>

          <RenderIf
            condition={
              userStatus?.toLowerCase() === "approved" ||
              userStatus?.toLowerCase() === "suspended"
            }
          >
            <Button
              theme="primary"
              className="!text-sm w-full md:w-unset !px-1 md:!px-4"
              onClick={() => setOpenEditUserTypeModal(true)}
            >
              <Icon icon="lucide:edit-2" className="size-4" />
              Edit User Type
            </Button>
          </RenderIf>
        </div>
      </div>

      <div className="grid md:grid-cols-10 lg:grid-cols-12 gap-4 px-4">
        <div className="md:col-span-3 bg-light-blue-4 rounded-lg flex gap-[60px] flex-col justify-between relative">
          <div className="flex flex-col items-center">
            <img
              src="/lilypads_pattern.png"
              className="object-cover w-full rounded-t-lg"
            />
            <div className="absolute top-4">
              <div className="w-[150px] md:w-[128px] h-[150px] md:h-[136px] rounded-[32px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1693039537350-3bba6975add7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="user profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-[80%] absolute -bottom-3 left-[8%]  h-8 rounded-[100px] border border-red-4 bg-red-5 flex items-center justify-center gap-x-1">
                <img src="/crest.svg" alt="crest" />
                <p className="text-text-primary text-sm">Member</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-[32.5px] grid gap-y-5">
            <div className="grid content-end text-text-primary">
              <h4 className="font-bold text-lg ">John Doe</h4>
              <p className="text-sm">Female</p>
            </div>

            <div className="grid gap-y-2 content-end">
              <h3 className="uppercase text-text-tertiary text-xs">Contacts</h3>

              <div className="grid gap-y-3">
                {profileCardInfo.map((profile) => (
                  <div className="flex gap-x-2 items-center" key={profile.id}>
                    <Icon
                      icon={profile.icon}
                      className="text-accent-primary size-4"
                    />
                    <p className="text-sm text-grey-dark-1 break-words max-w-[28ch] md:max-w-[17ch] lg:max-w-[20ch] 2xl:max-w-[25ch]">
                      {profile.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-9 grid gap-y-6">
          <div className="border rounded-lg border-input-filled p-4 grid gap-y-6">
            <div className="flex justify-between">
              <h4 className="font-semibold text-base text-text-primary">
                Registration info
              </h4>

              <div
                className={cn(
                  "rounded-[100px] px-4 py-1 flex gap-x-1 items-center",
                  userStatus?.toLowerCase() === "pending"
                    ? "bg-[#EE81001A]"
                    : userStatus?.toLowerCase() === "approved"
                    ? "bg-[#008E5B1A]"
                    : "bg-[#B0100D1A]"
                )}
              >
                <RenderIf condition={userStatus?.toLowerCase() === "approved"}>
                  <Icon icon="lucide:badge-check" className="size-4" />
                </RenderIf>
                <RenderIf condition={userStatus?.toLowerCase() === "suspended"}>
                  <Icon icon="lucide:ban" className="size-4" />
                </RenderIf>

                <p className={"text-text-primary capitalize text-sm"}>
                  {userStatus}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {userRegistrationInfo.map((regInfo) => (
                <div
                  className="grid gap-y-1 text-sm content-start"
                  key={regInfo.id}
                >
                  <h4 className="text-text-tertiary">{regInfo.title}</h4>
                  <p className="font-medium text-text-primary">
                    {regInfo.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-lg border-input-filled p-4 grid gap-y-6">
            <h4 className="font-semibold text-base text-text-primary">
              Other info
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {userOtherInfo.map((otherInfo) => (
                <div
                  className="grid gap-y-1 text-sm content-start"
                  key={otherInfo.id}
                >
                  <h4 className="text-text-tertiary">{otherInfo.title}</h4>
                  <RenderIf condition={otherInfo.id !== 8}>
                    <p className="font-medium text-text-primary">
                      {otherInfo.value}
                    </p>
                  </RenderIf>
                  <RenderIf condition={otherInfo.id === 8}>
                    <div className="flex gap-2">
                      {[...otherInfo.value].map((innerVal) => (
                        <div className="bg-light-blue-4 px-2 py-1 text-sm text-text-primary capitalize">
                          {innerVal}
                        </div>
                      ))}
                    </div>
                  </RenderIf>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DeleteUserModal
        isOpen={openDeleteUserModal}
        onClose={() => setOpenDeleteUserModal(false)}
        onDelete={() => {}}
      />

      <ApproveMemberModal
        isOpen={openApproveMemberModal}
        onClose={() => setOpenApproveMemberModal(false)}
        onApprove={() => {}}
      />

      <EditUserTypeModal
        isOpen={openEditUserTypeModal}
        onClose={() => setOpenEditUserTypeModal(false)}
        onUpdateUser={() => {}}
      />
    </div>
  );
};
