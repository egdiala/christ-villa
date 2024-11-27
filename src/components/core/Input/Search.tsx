import React from "react";
import { Icon } from "@iconify/react";
import { RenderIf } from "../RenderIf";
import type { IconifyIcon } from "@iconify/types";
import "./input.css";

interface SearchInputProps extends React.AllHTMLAttributes<HTMLInputElement> {
  /**
   * Error message
   */
  error?: string | boolean;
  /**
   * Right icon to render
   */
  iconRight?: string | IconifyIcon;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: unknown;
}

/**
 * Search Input component for entering user data
 */
export const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <div className='ego-input--outer'>
      <div className='ego-input--inner'>
        <Icon
          icon='lucide:search'
          className='size-4 left-3 text-text-tertiary mt-[13px] inset-y-0 absolute z-10'
        />
        <input
          type='search'
          className={["ego-search-input", props?.iconRight ? "pr-10" : "pr-4"]
            .join(" ")
            .trim()}
          {...props}
        />
        <RenderIf condition={!!props?.iconRight}>
          <Icon
            icon={props?.iconRight as string | IconifyIcon}
            className='h-6 w-6 right-3 text-neutral-20 -mt-9 absolute z-10'
          />
        </RenderIf>
      </div>
      <RenderIf condition={!!props?.error}>
        <span className='ego-input--error'>{props?.error}</span>
      </RenderIf>
    </div>
  );
};