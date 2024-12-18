import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button, FileUpload, Input, SelectInput } from "@/components/core";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { createChurchLeaderSchema } from "@/validations/church-leaders";
import { useAddChurchLeader } from "@/services/hooks/mutations/useChurchLeaders";
import { leaderPositions } from "@/types/church-leaders";

interface AddChurchLeadershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddChurchLeadershipModal = ({
  isOpen,
  onClose,
}: AddChurchLeadershipModalProps) => {
  const { handleSubmit, register, isValid, resetForm, setFieldValue, values } =
    useFormikWrapper({
      validateOnMount: true,
      initialValues: {
        leader_name: "",
        leader_position: "",
        file: null as File | null,
      },
      validationSchema: createChurchLeaderSchema,
      onSubmit:() => {
        const formData = new FormData();
        formData.append("leader_name", values.leader_name);
        formData.append("leader_position", values.leader_position);
        if (values?.file !== null) {
            formData.append("file", values.file);
            mutate(formData)
        } else {
            mutate(formData)
        }
      },
    });

  const handleClose = () => {
    resetForm();
    onClose();
  };
  const { mutate, isPending } = useAddChurchLeader(handleClose);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      as="div"
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
        <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
          <DialogPanel
            as="form"
            onSubmit={handleSubmit}
            transition
            className="max-w-[493px] w-full lg:w-[493px] space-y-4 bg-white rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <DialogTitle className="flex justify-between bg-white rounded-t-lg z-[9] pt-6 px-6 ">
              <h2 className="font-bold text-xl text-text-primary">
                Add New Church Leader
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"
              >
                <Icon icon="ph:x-bold" />
              </button>
            </DialogTitle>

            <Description className="px-6 grid gap-y-4">
              <Input
                placeholder="Name"
                label="Name" type="text"
                {...register("leader_name")}
              />
              <SelectInput
                options={leaderPositions}
                label="Position"
                {...register("leader_position")}
              />
              <FileUpload label="Image" accept="image/*" value={values?.file?.name} onChange={(v) => setFieldValue("file", v)} />
            </Description>

            <div className="flex gap-4 pt-10 justify-end px-6 pb-6">
              <div className="flex gap-4 w-full md:w-auto">
                <Button
                  theme="tertiary"
                  onClick={handleClose}
                  className="w-1/2 md:w-auto"
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  theme="primary"
                  className="w-1/2 md:w-auto"
                  loading={isPending}
                  disabled={!isValid || isPending}
                >
                  Add Leader
                </Button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
