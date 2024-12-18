import React, { Fragment } from "react";
import { RenderIf } from "@/components/core";
import { Description, Field, Label, Textarea } from "@headlessui/react"
import "./textarea.css";

interface TextAreaProps extends React.AllHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Id for textarea element
   */
  id?: string;

  /**
   * Label for textarea element
   */
  label?: string;
  /**
   * styles for textarea element
   */
  containerVariant?: string;
  /**
   * Help text for textarea element
   */
  help?: string;
  /**
   * Name for textarea element
   */
  name?: string;
  /**
   * Error message
   */
  error?: string | boolean;
  /**
   * Placeholder for textarea
   */
  placeholder?: string;
  /**
   * Maximum length of characters
   */
  maxLength?: number;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: unknown;
}

/**
 * Textarea component for entering user data
 */
export const TextArea: React.FC<TextAreaProps> = ({ containerVariant, label, id, help, error, name, placeholder, maxLength, ...props}) => {
  return (
    <div className={`${containerVariant} ego-input--outer`}>
      <Field>
        <RenderIf condition={!!label}>
          <Label className="ego-input--label">{label}</Label>
        </RenderIf>
        <RenderIf condition={!!help}>
          <Description className="ego-input--help">This will be shown under the product title.</Description>
        </RenderIf>
        <div className='ego-input--inner'>
          <Textarea as={Fragment}>
          <textarea id={id} rows={5} cols={33} maxLength={maxLength} placeholder={placeholder} name={name} className='ego-message-box' {...props} />
          </Textarea>
          <RenderIf condition={!!maxLength}>
            <p className="text-xs text-neutral-30 absolute bottom-0 left-[12px] pb-2">
              {(String(props.value)?.length ?? 0)}/{maxLength} words
            </p>
          </RenderIf>
        </div>
        <RenderIf condition={!!error}>
          <span className='ego-input--error'>{error}</span>
        </RenderIf>
      </Field>
    </div>
  );
};