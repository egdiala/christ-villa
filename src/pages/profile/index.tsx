import { Button } from "@/components/core";
import {
  ChangePasswordModal,
  EditProfileModal,
  LogoutModal,
} from "@/components/pages/profile";
import { cn } from "@/libs/cn";
import { getAdminData } from "@/utils/authUtil";
import { Icon } from "@iconify/react";
import { useState } from "react";

export const Profile = () => {
  const loggedInUser = getAdminData();

  const profileInformation = [
    { id: 1, label: "First Name", value: loggedInUser?.name?.split(" ")[0] },
    { id: 2, label: "Last Name", value: loggedInUser?.name?.split(" ")[1] },
    {
      id: 3,
      label: "Email",
      value: loggedInUser?.email,
    },
    {
      id: 4,
      label: "Position in church",
      value: loggedInUser?.user_type || "N/A",
    },
    { id: 5, label: "Gender", value: loggedInUser?.gender || "N/A" },
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
          src={
            loggedInUser?.avatar ||
            "https://s3-alpha-sig.figma.com/img/c0f6/06fc/0740c4ec01b32fb99ce4e37683ce112d?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Il5qo0Ka9XTBwHt3gi0PPYrizcVevdDvG~JcFWQEbEm-q6a46L-A7ybp7nqRXqI3CCg2Bvgq9R94IIOJXuHlD6fglQ-oEpdZTPaRDSf-gljUAtX7dQBMb7Ce3nXt5BFtoybXtge48TIXkKIAqT6AuKVKL7xOo66kNU8h0ofrWcuCiHuR8WHxbBk1C1dt~ADf5KR~QUF~QMYx1ugR04-uXaVwnCQyGqN2oy-tA5GrfuvdxlDJGNzrg-qvTI57xK4uEDfsWA0fNSaAktRUQxO7bKYnj8J~Ny9LVWewuFpLNlE09HU15BuQZ0AbdFfCxY3aItkhz-eYLA2~WQUpg6yToA__"
          }
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
