import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { Button, RenderIf } from "@/components/core";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { capitalizeFirstLetters } from "@/utils/textFormatter";
import { useGetAllDepartments } from "@/services/hooks/queries/useDepartments";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Dialog, DialogPanel, DialogTitle, Field, Label } from "@headlessui/react";
import { cn } from "@/libs/cn";
import { Loader } from "@/components/core/Button/Loader";
import { useAssignDepartmentRequest } from "@/services/hooks/mutations/useDepartments";

interface AddHODModalProps {
  isOpen: boolean;
  onClose: () => void;
  departmentId: string;
}

export const AddHODModal = ({
  isOpen,
  departmentId,
  onClose,
}: AddHODModalProps) => {
  const [query, setQuery] = useState("")
  const { mutate, isPending } = useAssignDepartmentRequest(() => close())
  const { data, isFetching } = useGetAllDepartments<{ name: string; value: string; }[]>({ component: "request-area" })

  const requestArea = useMemo(() => {
    return data?.map((item) => ({ label: capitalizeFirstLetters(item?.name), value: item?.value })).sort((a, b) => a.label < b.label ? -1 : 1)
  }, [data])

  const filteredDepts =
        query === ""
        ? (requestArea as { label: string; value: string; }[])
        : (requestArea as { label: string; value: string; }[])?.filter((role) => {
            return role.label.toLowerCase().includes(query.toLowerCase())
            })
  
  const { setFieldValue, values, errors, resetForm, submitForm } = useFormikWrapper({
    initialValues: {
      request_areas: [] as string[],
      department_id: departmentId
    },
    enableReinitialize: true,
    onSubmit: () => {
      mutate(values)
    }
  })

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (query.trim() !== "") {
          if (e.key === "Enter") {
              setFieldValue("request_areas", [...values.request_areas, ...query.split(",").filter((item) => item.trim() !== "")], true)
          }
          if (e.key === ",") {
              setFieldValue("request_areas", [...values.request_areas, ...query.split(",").filter((item) => item.trim() !== "")], true).then(() => 
                  setQuery("")
              )
          }   
      }
  }

  const close = () => {
    onClose()
    resetForm()
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
            transition
            className="max-w-[493px] w-full lg:w-[493px] space-y-4 bg-white rounded-lg backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full"
          >
            <DialogTitle className="flex justify-between rounded-t-lg bg-white z-[9] pt-6 px-6 ">
              <h2 className="font-bold text-xl text-text-primary">Add Request Area</h2>
              <button
                type="button"
                onClick={close}
                className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"
              >
                <Icon icon="ph:x-bold" />
              </button>
            </DialogTitle>
            <div className="grid px-6">
                <Field className="ego-input--outer">
                    <div className="text-sm tracking-custom flex gap-px items-center">
                        <Label passive className="ego-input--label">
                            Select Request Area 
                        </Label>
                    </div>
                    <Combobox multiple value={values.request_areas} onChange={(value) => setFieldValue("request_areas", value)} onClose={() => setQuery("")}>
                      <div className="relative">
                        <ComboboxInput aria-label="Select Request Area " placeholder="Select Request Area " className={cn("ego-input peer px-2", "ego-input--40", errors.request_areas ? "ego-input--border-error" : "ego-input--border")} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                            <Icon icon="lucide:chevron-down" className="size-5 text-grey-dark-3 group-data-[hover]:fill-grey-dark-2" />
                        </ComboboxButton>
                      </div>
                      <ComboboxOptions
                          as="section"
                          portal={false}
                          anchor="bottom"
                          transition
                          className={cn(
                              "w-[var(--input-width)] rounded-b-lg border border-grey-dark-4 z-10 hover:bg-white bg-white mt-2 p-1 [--anchor-gap:var(--spacing-1)] [--anchor-max-height:24rem]",
                              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                          )}
                      >
                            <RenderIf condition={filteredDepts !== undefined && filteredDepts?.length > 0 && !isFetching}>
                            {
                                filteredDepts?.map((item) => (
                                    <ComboboxOption key={item.label} value={item.value} className="group flex w-full cursor-pointer justify-between items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-green-1/10">
                                        <div className="text-sm/6 text-grey-dark-2">{item.label}</div>
                                        <Icon icon="lucide:check" className="invisible size-4 text-green-1 group-data-[selected]:visible" />
                                    </ComboboxOption>
                                ))
                            }
                            </RenderIf>
                            <RenderIf condition={filteredDepts?.length === 0 && !isFetching}>
                                <div className="flex items-center justify-center text-center font-medium text-gray-500 py-2 text-sm w-full">No items found</div>
                            </RenderIf>
                            <RenderIf condition={isFetching}>
                                <div className="flex w-full h-10 items-center justify-center"><Loader className="spinner size-4 text-accent-primary" /></div>
                            </RenderIf>
                        </ComboboxOptions>
                    </Combobox>
                </Field>
            </div>
            <RenderIf condition={values.request_areas.length > 0}>
                <div className="flex items-center gap-4 flex-wrap px-6">
                {requestArea?.filter((area) => values.request_areas.includes(area.value)).map((item) => (
                    <div className="border rounded border-grey-dark-3 text-xs flex items-center gap-2 p-2" key={item.value}>
                        {item.label}
                        <button type="button" onClick={() => setFieldValue("request_areas", values.request_areas.filter((v) => v !== item.value))}><Icon icon="ri:close-line" className="size-4 text-gray-400" /></button>
                    </div>
                ))}
                </div>
            </RenderIf>

            <div className="flex gap-4 pt-10 justify-end px-6 pb-6">
              <div className="flex gap-4 w-full md:w-auto">
                <Button
                  theme="tertiary"
                  onClick={close}
                  block
                >
                  Cancel
                </Button>
                <Button
                  theme="primary"
                  onClick={() => submitForm()}
                  loading={isPending}
                  disabled={(values.request_areas.length === 0) || isPending}
                  block
                >
                  Add Request Area
                </Button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
