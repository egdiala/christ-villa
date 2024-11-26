import React, { forwardRef, type ReactNode } from "react";
import { cn } from "@/libs/cn";
import "./tableAction.css"
import "./../Button/button.css";

interface TableActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Should the button fill it's parent container?
   */
  block?: boolean;
  /**
   * What variant to render
   */
  theme?: "primary" | "secondary" | "tertiary" | "grey" | "ghost";
  /**
   * Renders child nodes passed into Button component
   */
  children?: string | ReactNode;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: any;
}

/**
 * Table Action component for user interaction
 */
export const TableAction: React.FC<TableActionProps> = forwardRef(({
  className,
  block,
  theme,
  children,
  ...props
}, ref: React.LegacyRef<HTMLButtonElement>) => {
  const btn = {
    themes: {
      primary: "ego-table-action--primary",
      secondary: "ego-table-action--secondary",
      tertiary: "ego-table-action--tertiary",
      grey: "ego-table-action--grey",
      ghost: "ego-table-action--ghost",
    },
  };

  const width = block && "ego-button--block";
  
  return (
    <button className={cn("w-fit", "ego-button", btn.themes[theme as keyof typeof btn.themes], width, className)} ref={ref} {...props}>
{       children}
    </button>
  );
});