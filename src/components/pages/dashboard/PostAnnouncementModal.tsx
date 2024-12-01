import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import {
  Button,
  ComboBox,
  FileUpload,
  Input,
  TextArea,
} from "@/components/core";

interface PostAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostAnnouncementModal = ({
  isOpen,
  onClose,
}: PostAnnouncementModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      as="div"
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
        <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
          <DialogPanel
            transition
            className="max-w-[793px] h-full min-w-[calc(100%-20px)] md:min-w-[793px] space-y-6 bg-white  shadow-[0px_10px_153px_-32px_#00000033] rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <DialogTitle className="flex justify-between sticky top-0 bg-white z-[9] pt-6 px-6 rounded-t-lg">
              <h2 className="font-bold text-xl text-text-primary">
                Post/Send a Message
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"
              >
                <Icon icon="ph:x-bold" />
              </button>
            </DialogTitle>

            <Description className="grid gap-y-6 px-6 pb-6">
              <ComboBox
                options={[]}
                setSelected={() => {}}
                onChange={() => {}}
                optionLabel={() => {}}
                label="Engagement type"
                placeholder="Select engagement type"
              />
              <div className="flex gap-6 flex-col md:flex-row">
                <ComboBox
                  options={[]}
                  setSelected={() => {}}
                  onChange={() => {}}
                  optionLabel={() => {}}
                  label="Send message via"
                  placeholder="Select send mode"
                />

                <ComboBox
                  options={[]}
                  setSelected={() => {}}
                  onChange={() => {}}
                  optionLabel={() => {}}
                  label="Recipient(s)"
                  placeholder="Select recipient(s)"
                />
              </div>

              <Input placeholder="Placeholder" label="Message Title" />

              <TextArea placeholder="Enter text" label="Message Body" />

              <FileUpload label="Upload file" />
            </Description>

            <div className="flex gap-4 pt-10 justify-end px-6 pb-6">
              <div className="flex gap-4 lg:w-1/2">
                <Button
                  theme="tertiary"
                  onClick={onClose}
                  className="lg:w-full"
                >
                  Cancel
                </Button>
                <Button theme="primary" onClick={onClose} className="lg:w-full">
                  Send Post
                </Button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
