import React, { type ReactNode } from "react";
import { cn } from "@/libs/cn";
import { Loader } from "./Loader";
import { RenderIf } from "../RenderIf";
import "./button.css";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Shows a loading state on Button component
   */
  loading?: boolean;
  /**
   * Should the button fill it's parent container?
   */
  block?: boolean;
  /**
   * What variant to render
   */
  theme?: "primary" | "secondary" | "tertiary" | "grey" | "outline" | "ghost";
  /**
   * Renders child nodes passed into Button component
   */
  children?: string | ReactNode;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: unknown;
}

/**
 * Button component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  className,
  loading,
  block,
  theme,
  children,
  ...props
}) => {
  const btn = {
    themes: {
      primary: "cv-button--primary",
      secondary: "cv-button--secondary",
      tertiary: "cv-button--tertiary",
      outline: "cv-button--outline",
      ghost: "cv-button--ghost",
      grey: "cv-button--grey",
    },
  };

  const width = block && "cv-button--block";
  
  return (
    <button className={cn("w-fit", "cv-button", btn.themes[theme as keyof typeof btn.themes], width, className)} {...props}>
        <RenderIf condition={!!loading}>
            <div className="flex items-center justify-center">
                <Loader className="spinner" />
            </div>
        </RenderIf>
        <RenderIf condition={!loading}>
            {children}
        </RenderIf>
    </button>
  );
};