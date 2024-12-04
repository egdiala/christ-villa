import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button, SelectInput } from "@/components/core";
import { userTypes } from "@/constants/status";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { changeUserTypeSchema } from "@/validations/users";
import { useChangeUserType } from "@/services/hooks/mutations/useUsers";

interface EditUserTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const EditUserTypeModal = ({
  isOpen,
  onClose,
  userId,
}: EditUserTypeModalProps) => {
  const handleClose = () => {
    resetForm();
    onClose();
  };

  const { mutate, isPending } = useChangeUserType(handleClose);

  const { handleSubmit, register, isValid, resetForm } = useFormikWrapper({
    validateOnMount: true,
    initialValues: {
      user_type: "",
    },
    validationSchema: changeUserTypeSchema,
    onSubmit(values) {
      mutate({ user_type: values.user_type, user_id: userId });
    },
  });

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      as="div"
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
        <div className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center">
          <form onSubmit={handleSubmit}>
            <DialogPanel
              transition
              className="max-w-[493px] w-full lg:w-[493px] space-y-4 bg-white rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
            >
              <DialogTitle className="flex justify-between rounded-t-lg bg-white z-[9] pt-6 px-6 ">
                <h2 className="font-bold text-xl text-text-primary">
                  Update User Type
                </h2>
                <button
                  type="button"
                  onClick={handleClose}
                  className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"
                >
                  <Icon icon="ph:x-bold" />
                </button>
              </DialogTitle>

              <Description className="grid gap-y-6 px-6">
                {/* <ComboBox
                  options={[]}
                  setSelected={() => {}}
                  onChange={() => {}}
                  optionLabel={() => {}}
                  label="Select Department"
                  placeholder="Select Department"
                /> */}

                <SelectInput
                  label="Select User Type"
                  options={userTypes}
                  {...register("user_type")}
                />
              </Description>

              <div className="flex gap-4 pt-10 justify-end px-6 pb-6">
                <div className="flex gap-4 w-full md:w-auto">
                  <Button
                    theme="tertiary"
                    onClick={handleClose}
                    className="w-1/2 md:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={isPending}
                    disabled={!isValid || isPending}
                    theme="primary"
                    className="w-1/2 md:w-auto"
                  >
                    Update User Type
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
