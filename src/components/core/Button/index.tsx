import React, { type ReactNode } from "react";
import { cn } from "@/libs/cn";
import { Loader } from "./Loader";
import { Icon } from "@iconify/react";
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
  theme?: "primary" | "secondary" | "tertiary" | "outline" | "white" | "ghost" | "danger" | "arrow-cta-1" | "arrow-cta-2";
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
      primary: "ego-button--primary",
      danger: "ego-button--danger",
      secondary: "ego-button--secondary",
      tertiary: "ego-button--tertiary",
      outline: "ego-button--outline",
      white: "ego-button--white",
      ghost: "ego-button--ghost",
      "arrow-cta-1": "ego-button--arrow-cta-1",
      "arrow-cta-2": "ego-button--arrow-cta-2"
    },
  };

  const width = block && "ego-button--block";
  
  return (
    <button className={cn("w-fit", "ego-button", btn.themes[theme as keyof typeof btn.themes], width, className)} {...props}>
        <RenderIf condition={!!loading}>
            <div className="flex items-center justify-center">
                <Loader className="spinner" />
            </div>
        </RenderIf>
        <RenderIf condition={!loading}>
            {children}
            <RenderIf condition={theme?.startsWith("arrow-cta-")!}>
              <Icon icon="radix-icons:arrow-top-right" className="size-6 text-green-0" />
            </RenderIf>
        </RenderIf>
    </button>
  );
};