import React from "react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { cn } from "@/libs/cn";
import "./toast.css";

type Keys = "success" | "warning" | "error";
export interface ToastProps {
  /**
   * Renders the variant of toast which can either be success, warning or error
   */
  type: Keys;
  /**
   * Renders the title of the message shown in the toast
   */
  title: string;
  /**
   * Renders the message which is a detailed description of the title
   */
  message: string;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: unknown;
}

const alert = {
  success: "border-l-8 border-l-green-1",
  warning: "border-l-8 border-l-yellow-1",
  error: "border-l-8 border-l-semantics-error",
} as const satisfies Partial<Record<Keys, string>>;

/**
 * Toast component for displaying information
 */
export const Toast: React.FC<ToastProps> = ({ type, message, id }) => {
  return (
    <div className={cn("group toast-container", alert[type])}>
        <div className="toast-message">{message}</div>
        <button
            type="button"
            className="opacity-0 group-hover:opacity-100 toast-button"
            onClick={() => toast.dismiss(id as string | number | undefined)}
        >
            <Icon icon='lucide:x' />
        </button>
    </div>
  );
};