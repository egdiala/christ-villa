import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Button, Input } from "@/components/core";
import { useUpdateDepartment } from "@/services/hooks/mutations/useDepartments";
import { FetchedDepartmentType } from "@/types/departments";
import { addDepartmentSchema } from "@/validations/departments";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";

interface EditDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  departmentInfo: FetchedDepartmentType;
}

export const EditDepartmentModal = ({
  isOpen,
  onClose,
  departmentInfo,
}: EditDepartmentModalProps) => {
  const { handleSubmit, register, isValid, resetForm } = useFormikWrapper({
    validateOnMount: true,
    initialValues: {
      name: departmentInfo?.name,
    },
    validationSchema: addDepartmentSchema,
    onSubmit(values) {
      mutate({
        department_id: departmentInfo?.department_id,
        name: values.name,
      });
    },
    enableReinitialize: true,
  });

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const { mutate, isPending } = useUpdateDepartment(handleClose);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      as="div"
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-scroll scrollbar-hide duration-300 ease-out transition-opacity data-[closed]:opacity-0 bg-grey-dark-4/70">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col min-h-full items-center p-3 justify-end md:justify-center"
        >
          <DialogPanel
            transition
            className="max-w-[493px] w-full lg:w-[493px] space-y-4 bg-white rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <DialogTitle className="flex justify-between sticky top-0 rounded-t-lg bg-white z-[9] pt-6 px-6 ">
              <h2 className="font-bold text-xl text-text-primary">
                Edit Department
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"
              >
                <Icon icon="ph:x-bold" />
              </button>
            </DialogTitle>

            <Description className="grid gap-y-6 px-6">
              <Input placeholder="Name" label="Name" {...register("name")} />
            </Description>

            <div className="flex gap-4 pt-10 justify-end px-6 pb-6">
              <div className="flex gap-4 w-full md:w-auto">
                <Button
                  theme="tertiary"
                  onClick={onClose}
                  className="w-1/2 md:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  theme="primary"
                  onClick={() => {}}
                  className="w-1/2 md:w-auto"
                  loading={isPending}
                  disabled={!isValid || isPending}
                >
                  Update Department
                </Button>
              </div>
            </div>
          </DialogPanel>
        </form>
      </div>
    </Dialog>
  );
};
