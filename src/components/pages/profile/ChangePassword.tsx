import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button, PasswordInput } from "@/components/core";
import { changePasswordSchema } from "@/validations/auth";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { useChangePassword } from "@/services/hooks/mutations/useProfile";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal = ({
  isOpen,
  onClose,
}: ChangePasswordModalProps) => {
  const handleClose = () => {
    resetForm();
    onClose();
  };

  const { mutate, isPending } = useChangePassword(() => handleClose());

  const { handleSubmit, register, isValid, resetForm } = useFormikWrapper({
    validateOnMount: true,
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit(values) {
      mutate({
        old_password: values.old_password,
        new_password: values.new_password,
      });
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
          <DialogPanel
            as="form"
            onSubmit={handleSubmit}
            transition
            className="max-w-[604px] w-full lg:w-[604px] space-y-4 bg-white rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <DialogTitle className="flex justify-between rounded-t-lg bg-white z-[9] pt-6 px-6 ">
              <h2 className="font-bold text-xl text-text-primary">
                Change Password
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
              <PasswordInput
                id="old_password"
                label="Old Password"
                placeholder="Enter old password"
                {...register("old_password")}
                showPassword
              />
              <PasswordInput
                id="new_password"
                label="New Password"
                placeholder="Enter new password"
                {...register("new_password")}
                showPassword
              />
              <PasswordInput
                id="confirm_password"
                label="Confirm new Password"
                placeholder="Enter new password"
                {...register("confirm_password")}
                showPassword
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
                  theme="primary"
                  className="w-1/2 md:w-auto"
                  loading={isPending}
                  disabled={!isValid || isPending}
                >
                  Update Password
                </Button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
