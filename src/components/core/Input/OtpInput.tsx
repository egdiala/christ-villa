import React, { useMemo } from "react";
import { RenderIf } from "../RenderIf";
import "./input.css";

export interface OtpInputProps
  extends React.AllHTMLAttributes<HTMLInputElement> {
  /**
   * Holds the value of the otp code entered
   */
  value: string;
  /**
   * Error message
   */
  error?: string | boolean;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: unknown;
}

/**
 * Otp Input component
 */
export const OtpInput: React.FC<OtpInputProps> = (props) => {
  const digitCount = 5;
  const RE_DIGIT = new RegExp(/^\d+$/);

  const valueItems = useMemo(() => {
    const valueArray = props?.value?.split("");
    const items = [];

    for (let i = 0; i < digitCount; i++) {
      const char = valueArray[i];
      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }
    return items;
  }, [props.value, RE_DIGIT]);

  console.log({ valueItems });

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling = target.nextElementSibling;

    if (nextElementSibling && nextElementSibling.matches("input")) {
      (nextElementSibling as HTMLInputElement).focus();
    } else {
      const next = nextElementSibling?.nextElementSibling;
      (next as HTMLInputElement)?.focus();
    }
  };

  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling = target.previousElementSibling;

    if (previousElementSibling && previousElementSibling.matches("input")) {
      (previousElementSibling as HTMLInputElement).focus();
    } else {
      const prev = previousElementSibling?.previousElementSibling;
      (prev as HTMLInputElement)?.focus();
    }
  };

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const target = e.target;
    let targetValue = target.value.replace(/\D/g, "");
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : "";

    const newValue: any =
      props.value.substring(0, index) +
      targetValue +
      props.value.substring(index + 1);

    props.onChange?.(newValue);

    if (targetValue.trim().length === 1) {
      focusToNextInput(target);
    }

    // focus on the next input box
    const nextElementSibling = target.nextElementSibling as HTMLInputElement;

    if (nextElementSibling && !!targetValue.trim()) {
      nextElementSibling.focus();
    }
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;

    target.setSelectionRange(0, targetValue.length);

    if (e.key !== "Backspace" || targetValue !== "") {
      return;
    }

    focusToPrevInput(target);
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { target } = e;

    const prevInputEl = target.previousElementSibling as HTMLInputElement;

    if (
      prevInputEl &&
      prevInputEl.value === "" &&
      prevInputEl.matches("input")
    ) {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };
  return (
    <div className="grid gap-2 content-start">
      <div className="flex items-center w-full gap-4">
        {valueItems.map((item, i) => (
          <input
            {...props}
            key={i.toString()}
            className="ego-otp-input"
            type="text"
            autoFocus={i === props.value.length}
            inputMode="numeric"
            // maxLength={1}
            value={item.trim()}
            onChange={(e) => inputOnChange(e, i)}
            onKeyDown={(e) => inputOnKeyDown(e)}
            onFocus={(e) => inputOnFocus(e)}
          />
        ))}
      </div>
      <RenderIf condition={!!props?.error}>
        <span className="ego-input--error">{props?.error}</span>
      </RenderIf>
    </div>
  );
};
