import {
  Button,
  ComboBox,
  FileUpload,
  Input,
  TextArea,
} from "@/components/core";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@iconify/react";

interface PostAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostAnnouncementModal = ({
  isOpen,
  onClose,
}: PostAnnouncementModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30"
          />
          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-[793px] h-full overflow-y-auto min-w-[calc(100%-20px)] md:min-w-[793px] space-y-6 bg-white shadow-[0px_10px_153px_-32px_#00000033] rounded-lg"
            >
              <DialogTitle className="flex justify-between sticky top-0 bg-white z-[9] pt-6 px-6">
                <h2 className="font-bold text-xl text-text-primary">
                  Post/Send a Message
                </h2>
                <Button theme="ghost" className="!p-3" onClick={onClose}>
                  <Icon icon="lucide:x" className="size-4 text-text-tertiary" />
                </Button>
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
                  <Button
                    theme="primary"
                    onClick={onClose}
                    className="lg:w-full"
                  >
                    Send Post
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
