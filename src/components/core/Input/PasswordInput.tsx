import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { RenderIf } from "../RenderIf";
import "./input.css";

interface PasswordInputProps extends React.AllHTMLAttributes<HTMLInputElement> {
  /**
   * Label for input element
   */
  label?: string;
  /**
   * Error message
   */
  error?: string | boolean;
  /**
   * Prop to show and hide password
   */
  showPassword?: boolean;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: unknown;
}

/**
 * Input component for entering user password
 */
export const PasswordInput: React.FC<PasswordInputProps> = ({ label, error, showPassword, ...props }) => {
    const [togglePassword, setTogglePassword] = useState<boolean>(false);
  
    const toggleVisibility = () => {
        setTogglePassword(togglePassword ? false : true);
    };
  
    return (
        <div className='ego-input--outer'>
            <RenderIf condition={!!label}>
                <label htmlFor={props?.name} className='ego-input--label'>{label}</label>
            </RenderIf>
            <div className='ego-input--inner'>
                <input type={showPassword && togglePassword ? "text" : "password"} className={["ego-input pl-2", showPassword ? "pr-10" : "pr-2"].join(" ").trim()} {...props} />
                <RenderIf condition={!!showPassword}>
                    <button
                        type='button'
                        onClick={() => toggleVisibility()}
                        className={`${showPassword ? "toggle-password-icon" : "hidden"}`}
                    >
                        <RenderIf condition={togglePassword}>
                            <Icon icon="lucide:eye-off" className="size-5 right-3 text-text-secondary -mt-[22px] absolute z-10" />
                        </RenderIf>
                        <RenderIf condition={!togglePassword}>
                            <Icon icon="lucide:eye" className="size-5 right-3 text-text-secondary -mt-[22px] absolute z-10" />
                        </RenderIf>
                    </button>
                </RenderIf>
            </div>
            <RenderIf condition={!!error}>
                <span className='ego-input--error'>{error}</span>
            </RenderIf>
        </div>
    );
};