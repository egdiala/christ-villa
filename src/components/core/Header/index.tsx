import React, { useState } from "react";
import { Icon } from "@iconify/react";
import blankImage from "@/assets/blank.svg";
import { getAdminData } from "@/utils/authUtil";
import { useRouteTitle } from "@/hooks/useRouteTitle";
import { NotificationsModal } from "@/components/pages/profile";

interface HeaderProps {
  close: () => void;
}

export const Header: React.FC<HeaderProps> = ({ close }) => {
  const loggedInUser = getAdminData();

  const avatar = loggedInUser?.avatar || blankImage;
  const routeTitle = useRouteTitle();

  const [openNotificationsModal, setOpenNotificationsModal] = useState(false);

  return (
    <header className="flex items-center gap-3 sticky top-0 left-0 right-0 justify-between w-full bg-accent-tertiary px-4 py-4 md:py-7">
      <div className="flex items-center gap-2">
        <button type="button" className="xl:hidden" onClick={() => close()}>
          <Icon icon="lucide:menu" className="text-white size-5" />
        </button>
        <h1 className="font-bold text-white text-xl md:text-2xl">
          {routeTitle}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          className="relative bg-grey-dark-4 rounded-2xl size-10 grid place-content-center"
          onClick={() => setOpenNotificationsModal(true)}
        >
          <Icon icon="lucide:bell" className="text-text-secondary size-5" />
          <span className="absolute -top-2.5 -right-2.5 py-1 px-1.5 flex items-center justify-center text-center bg-semantics-error rounded-full text-[0.625rem] font-medium text-white">
            03
          </span>
        </button>
        <a
          href="/profile"
          className="flex items-center gap-1 p-2 bg-white rounded-full cursor-pointer"
        >
          <div className="size-6 rounded-full overflow-hidden">
            <img alt="avatar" src={avatar} className="size-6" />
          </div>
          <h2 className="text-text-primary text-sm font-medium">
            {loggedInUser?.name}
          </h2>
        </a>
      </div>

      <NotificationsModal
        isOpen={openNotificationsModal}
        onClose={() => setOpenNotificationsModal(false)}
      />
    </header>
  );
};
