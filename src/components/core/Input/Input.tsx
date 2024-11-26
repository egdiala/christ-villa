import React from "react";
import { Icon } from "@iconify/react";
import type { IconifyIcon } from "@iconify/types";
import { RenderIf } from "../RenderIf";
import "./input.css";
import { cn } from "@/libs/cn";

interface InputProps extends React.AllHTMLAttributes<HTMLInputElement> {
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
   * Right icon to render
   */
  iconRight?: string | IconifyIcon;
  /**
   * Left icon to render
   */
  iconLeft?: string | IconifyIcon;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: unknown;
}

/**
 * Input component for entering user data
 */
export const Input: React.FC<InputProps> = ({ label, error, optional, iconLeft, iconRight, className, ...props }) => {
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
        <RenderIf condition={!!iconLeft}>
          <Icon
            icon={iconLeft as string | IconifyIcon}
            className="size-5 left-3 text-grey-dark-3 peer-focus:text-green-1 mt-[13px] inset-x-0 absolute"
          />
        </RenderIf>
        <input
          className={cn("ego-input peer", iconLeft ? "pl-10" : "pl-3", iconRight ? "pr-10" : "pr-3", className)}
          {...props}
        />
        <RenderIf condition={!!iconRight}>
          <Icon
            icon={iconRight as string | IconifyIcon}
            className="size-5 right-3 text-grey-dark-3 peer-focus:text-green-1 -mt-[2.1rem] absolute"
          />
        </RenderIf>
      </div>
      <RenderIf condition={!!error}>
        <span className="ego-input--error">{error}</span>
      </RenderIf>
    </div>
  );
};