import { Icon } from "@iconify/react";
import { Button } from "@/components/core";
import type { FetchedRequestType } from "@/types/requests";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface ViewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRequest: FetchedRequestType
}


export const RequestComponentFields = {
    prayer_request: { title: "Title", description: "description" },
    counselling_request: { title: "Title", description: "Description" },
    praise_report_writetestimony: { title: "Title", description: "Description" },
    praise_report_upload_recording: { url: "File Link", },
    praise_report_inchurch: {
        record_date: "Record Date",
        record_time: "Record Time",
        record_time_am: "Am/Pm",
        description: "Description"
    },
    non_attendance_request: { notice_reason: "Reason for Notice", comment: "Comment" },
    resource_ride_request: {
        pickup_address: "Pickup Address",
        dropoff_address: "Dropoff Address",
        zipcode: "Zip Code",
        ride_type: "Ride Type",
        people_count: "No of People",
        phone_number: "Phone Number",
    },
    resource_rent_assist: {
        rent_total: "How much is your rent",
        rent_have: "How much rent do you have",
        have_job: "Do you have a job",
        comment: "Comment",
    },
    resource_academic_assist: {
        gender: "Gender",
        size: "Size",
        comment: "Comment/Note",
    },
    resource_medical_assist: {
        how_you_feeling: "How you're feeling today?",
        connect_to_professional: "Do you want to connect to healthcare prefessional?",
        have_health_issurance: "Do you health insurance?",
        medical_health_concern: "Any health concern?",
        sucidal_ideation: "Any sucidal ideation?"
    },
    resource_hiring_assist: {
        job_title: "Job title",
        salary_amount: "Job Salary",
        location: "Location",
        description: "Description",
    },
    resource_housing_assist: {
        people_count: "No. of people",
        kid_count: "No of kids",
        bedroom_count: "How many bedrooms",
        amount_to_pay: "Amount to pay",
        description: "Description",
    },
    admin_book_eventspace: {
        event_type: "Event type",
        event_date: "Date",
        description: "Description",
    },
    admin_community_service: {
        available_hour: "Hours Available",
        available_date: "Available Date",
        description: "Description",
    },
    admin_reference_letter: {
        org_required: "Organization asking for reference",
        reason: "Reason for asking"
    },
    admin_leadership_training: {
        interest_area: "Interest Area",
        description: "Description",
    },
    admin_become_mentor: {
        interest_area: "Interest Area",
        education_level: "Education Level",
        description: "Description",
    },
    admin_need_mentor: {
        interest_area: "Interest Area",
        description: "Description",
    },
    admin_baptism: {
        born_again: "Born Again",
        description: "Description",
    },
    admin_volunteer: {
        volunteer_area: "Volunteer Area",
        description: "Description",
    },
}

export const ViewRequestModal = ({ isOpen, onClose, activeRequest }: ViewRequestModalProps) => {
    const reqType = RequestComponentFields[(activeRequest?.request_type || activeRequest?.request_area) as keyof typeof RequestComponentFields] || {}
    const fieldKeys = Object.keys(reqType) as (keyof typeof reqType)[]
    const close = () => {
        onClose()
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
                    <DialogPanel transition className="flex flex-col gap-5 justify-between w-full max-w-[24.625rem] rounded-lg bg-white p-4 md:p-5 backdrop-blur-2xl duration-300 ease-out transform data-[closed]:translate-y-full">
                        <div className="flex items-center justify-between gap-3">
                            <DialogTitle className="font-bold text-text-primary text-xl capitalize">{activeRequest?.request_type?.replace(/_/g, " ") || activeRequest?.request_area?.replace(/_/g, " ")}</DialogTitle>
                            <button type="button" onClick={close} className="size-8 p-2 grid place-content-center text-grey-dark-3 hover:text-grey-dark-1 hover:bg-grey-dark-4 rounded-full ease-out duration-300 transition-all"><Icon icon="ph:x-bold" /></button>
                        </div>

                        <div className="space-y-6">
                            {
                                fieldKeys.map((item, idx) =>
                                    <div key={idx}>
                                        <div className="text-grey-dark-3 text-sm capitalize">{reqType[item]}</div>
                                        <div className="font-medium text-grey-dark-1 capitalize">{activeRequest?.data[item] || "-"}</div>
                                    </div>
                                )
                            }
                        </div>

                        <Button type="button" theme="primary" onClick={close} block>
                            Close
                        </Button>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};
