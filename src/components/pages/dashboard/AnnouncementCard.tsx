import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/core";
import { PostAnnouncementModal } from "./PostAnnouncementModal";

export const DashboardAnnouncementCard = () => {
  const messageContent = [
    { id: 1, title: "Engagement type", value: "Announcement" },
    { id: 2, title: "Via", value: "Mobile app" },
    { id: 3, title: "Recipients", value: "All Users" },
  ];

  const [openPostAnnouncementModal, setOpenPostAnnouncementModal] =
    useState(false);

  return (
    <div className="bg-light-blue-4 rounded-2xl p-4 grid gap-y-6 h-full content-start relative">
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
        <h2 className="font-bold text-xl text-text-primary">Announcement</h2>
        <Button
          theme="primary"
          onClick={() => setOpenPostAnnouncementModal(true)}
        >
          <Icon icon="lucide:volume-2" />
          Post/Send a Message
        </Button>
      </div>

      <div className="grid gap-y-4">
        <div>
          <p className="text-text-tertiary text-xs">Title</p>
          <p className="text-text-primary text-sm">Lorem ipsum dolor</p>
        </div>

        <div className="grid gap-y-1">
          <p className="text-text-tertiary text-xs">Message body</p>
          <p className="text-text-primary text-sm">
            Lorem ipsum dolor sit amet consectetur. Integer sed ullamcorper
            aliquam commodo enim elementum ut ultricies. Tortor felis eu libero
            orci laoreet aliquam diam pharetra. Senectus vitae tincidunt rhoncus
            dis sit et gravida urna. Leo mauris ut sagittis vitae eleifend.
            Tincidunt est massa odio non nulla diam. Adipiscing in enim enim
            morbi imperdiet id quisque. Quis fermentum in consequat luctus am
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {messageContent.map((content) => (
            <div key={content.id}>
              <p className="text-text-tertiary text-xs">{content.title}</p>
              <p className="text-text-primary text-sm">{content.value}</p>
            </div>
          ))}
        </div>
      </div>

      <PostAnnouncementModal
        isOpen={openPostAnnouncementModal}
        onClose={() => setOpenPostAnnouncementModal(false)}
      />
    </div>
  );
};
