import { Button } from "@/components/core";
import {
  ChangePasswordModal,
  EditProfileModal,
  LogoutModal,
} from "@/components/pages/profile";
import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";
import { useState } from "react";

export const Profile = () => {
  const profileInformation = [
    { id: 1, label: "First Name", value: "John" },
    { id: 2, label: "Last Name", value: "Doe" },
    {
      id: 3,
      label: "Email",
      value: "example@gmail.com",
    },
    { id: 4, label: "Position in church", value: "Member" },
    { id: 5, label: "Gender", value: "Female" },
  ];

  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  return (
    <div className="flex flex-col gap-5 px-4 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
      <div className="flex gap-y-4 flex-col md:flex-row justify-between md:items-center">
        <h4 className="capitalize font-bold text-2xl md:text-xl text-text-primary">
          John Doe
        </h4>
        <div className="flex gap-2 flex-col md:flex-row">
          <Button
            theme="ghost"
            className="!text-accent-primary w-full md:w-unset"
            onClick={() => setOpenChangePasswordModal(true)}
          >
            <Icon icon="lucide:trash" />
            Change Password
          </Button>
          <Button
            theme="grey"
            className="!text-sm w-full md:w-unset"
            onClick={() => setOpenEditProfileModal(true)}
          >
            <Icon icon="lucide:edit-2" />
            Edit Profile
          </Button>
          <Button
            theme="primary"
            className="!text-sm w-full md:w-unset"
            onClick={() => setOpenLogoutModal(true)}
          >
            <Icon icon="lucide:plus" />
            Log out
          </Button>
        </div>
      </div>
      <div className="p-4 backdrop-blur-[100px] bg-light-blue-4 flex gap-10 flex-col md:flex-row items-center">
        <img
          src="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=2786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="profile"
          className="object-cover w-[158px] md:w-[128px] h-[150px] md:h-[120px] rounded-3xl"
        />

        <div className="w-full grid gap-8 grid-cols-2 md:grid-cols-3">
          {profileInformation.map((info) => (
            <div className="grid gap-y-1 text-sm content-start" key={info.id}>
              <h4 className="text-text-tertiary">{info.label}</h4>
              <p
                className={cn(
                  "font-medium text-text-primary max-w-[15ch] md:max-w-[19ch] xl:max-w-[25ch] break-words",
                  info.label !== "Email" ? "capitalize" : ""
                )}
              >
                {info.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <EditProfileModal
        isOpen={openEditProfileModal}
        onClose={() => setOpenEditProfileModal(false)}
      />

      <ChangePasswordModal
        isOpen={openChangePasswordModal}
        onClose={() => setOpenChangePasswordModal(false)}
      />

      <LogoutModal
        isOpen={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
      />
    </div>
  );
};
