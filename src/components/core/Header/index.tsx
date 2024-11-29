import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouteTitle } from "@/hooks/useRouteTitle";
import { NotificationsModal } from "@/components/pages/profile";

interface HeaderProps {
  close: () => void;
}

export const Header: React.FC<HeaderProps> = ({ close }) => {
  const avatar =
    "https://s3-alpha-sig.figma.com/img/c0f6/06fc/0740c4ec01b32fb99ce4e37683ce112d?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Il5qo0Ka9XTBwHt3gi0PPYrizcVevdDvG~JcFWQEbEm-q6a46L-A7ybp7nqRXqI3CCg2Bvgq9R94IIOJXuHlD6fglQ-oEpdZTPaRDSf-gljUAtX7dQBMb7Ce3nXt5BFtoybXtge48TIXkKIAqT6AuKVKL7xOo66kNU8h0ofrWcuCiHuR8WHxbBk1C1dt~ADf5KR~QUF~QMYx1ugR04-uXaVwnCQyGqN2oy-tA5GrfuvdxlDJGNzrg-qvTI57xK4uEDfsWA0fNSaAktRUQxO7bKYnj8J~Ny9LVWewuFpLNlE09HU15BuQZ0AbdFfCxY3aItkhz-eYLA2~WQUpg6yToA__";
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
        <div className="flex items-center gap-1 p-2 bg-white rounded-full">
          <div className="size-6 rounded-full overflow-hidden">
            <img src={avatar} className="size-6" />
          </div>
          <h2 className="text-text-primary text-sm font-medium">
            Ronald Julius
          </h2>
        </div>
      </div>

      <NotificationsModal
        isOpen={openNotificationsModal}
        onClose={() => setOpenNotificationsModal(false)}
      />
    </header>
  );
};
