import React, { ChangeEvent, useRef } from "react";
import { Icon } from "@iconify/react";
import { RenderIf } from "../RenderIf";
import "./input.css";
import { cn } from "@/libs/cn";

interface FileUploadProps extends React.AllHTMLAttributes<HTMLInputElement> {
  /**
   * Label for input element
   */
  label?: string;
  /**
   * Error message
   */
  error?: string | boolean;
  /**
   * Optional input
   */
  optional?: boolean;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: unknown;
}

/**
 * File Upload component for selecting files to upload
 */
export const FileUpload: React.FC<FileUploadProps> = ({ label, error, optional, className, accept, ...props }) => {
    const fileInput = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const files = target.files as FileList;
        const file = files[0];
        if (file) {
            props.onChange?.(file as any)
        }
    };
    return (
        <div className="ego-input--outer">
            <RenderIf condition={!!label}>
                <div className="text-sm tracking-custom flex items-center">
                    <label htmlFor={props?.name} className="ego-input--label">
                        {label}
                    </label>
                    {!!optional && (
                        <span className="font-normal text-grey-dark-3 ml-1">(Optional)</span>
                    )}
                </div>
            </RenderIf>
            <div className="ego-input--inner">
                <input
                    className={cn("ego-input peer", "pl-2", "pr-[5.5rem]", className)}
                    onClick={() => fileInput.current?.click()}
                    type="text"
                    {...props} 
                    readOnly
                />
                <input ref={fileInput} type="file" accept={accept} className="absolute inset-0 hidden" onChange={(e) => handleFileChange(e)} />
                <button type="button" className="flex items-center gap-1 text-dark-green-1 right-3 -mt-[2.1rem] absolute" onClick={() => fileInput.current?.click()}>
                    <Icon
                        icon="lucide:upload"
                        className="size-4"
                    />
                    <span className="underline font-medium text-sm">Upload</span>
                </button>
            </div>
            <RenderIf condition={!!error}>
                <span className="ego-input--error">{error}</span>
            </RenderIf>
        </div>
    );
};