import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import {
  Button,
  FileUpload,
  Input,
  SelectInput,
  TextArea,
} from "@/components/core";
import { useCreateAnnouncement } from "@/services/hooks/mutations";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { createAnnouncementSchema } from "@/validations/engage";

interface PostAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostAnnouncementModal = ({
  isOpen,
  onClose,
}: PostAnnouncementModalProps) => {
  const { mutate, isPending } = useCreateAnnouncement(() => close())

  const { handleSubmit, isValid, register, setFieldValue, resetForm, values } = useFormikWrapper({
    initialValues: {
      title: "",
      user_type: "",
      comment: "",
      file: null as File | null
    },
    validationSchema: createAnnouncementSchema,
    validateOnMount: true,
    onSubmit: () => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("user_type", values.user_type);
      formData.append("comment", values.comment);
      if (values?.file?.name) {
        formData.append("file", values.file);
      }
      mutate(formData)
    }
  })

  const close = () => {
    onClose();
    resetForm();
  }
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      as="div"
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
        <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
          <DialogPanel
            as="form"
            onSubmit={handleSubmit}
            transition
            className="max-w-[793px] h-full min-w-[calc(100%-20px)] md:min-w-[793px] space-y-6 bg-white  shadow-[0px_10px_153px_-32px_#00000033] rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <DialogTitle className="flex justify-between sticky top-0 bg-white z-[9] pt-6 px-6 rounded-t-lg">
              <h2 className="font-bold text-xl text-text-primary">
                Post/Send a Message
              </h2>

              <button
                type="button"
                onClick={close}
                className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"
              >
                <Icon icon="ph:x-bold" />
              </button>
            </DialogTitle>

            <Description className="grid gap-y-6 px-6 pb-6">
              <Input placeholder="Enter title of announcement" label="Title" type="text" {...register("title")} />
              <SelectInput
                options={[
                  { label: "All", value: "all" },
                  { label: "HOD", value: "hod" },
                  { label: "Member", value: "member" },
                  { label: "Minister", value: "minister" },
                  { label: "Partner", value: "partner" },
                  { label: "Pastor", value: "pastor" },
                ]}
                label="Recipient"
                placeholder="Select recipient"
                {...register("user_type")}
              />

              <TextArea placeholder="Enter text" label="Message Body" {...register("comment")} />

              <FileUpload label="Upload file" accept="image/*" value={values?.file?.name} onChange={(v) => setFieldValue("file", v)} />
            </Description>

            <div className="flex items-center gap-4 pt-10 justify-end md:w-2/3 ml-auto px-6 pb-6">
                <Button
                  theme="tertiary"
                  onClick={close}
                  block
                >
                  Cancel
                </Button>
                <Button theme="primary" type="submit" disabled={!isValid || isPending} loading={isPending} block>
                  Send Post
                </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
