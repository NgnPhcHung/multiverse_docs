import clsx from "clsx";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { DynamicIcon } from "..";
import { ElementRef, useRef } from "react";

type InputType = "col" | "row";

const inputTypeStyle: Record<InputType, string> = {
  col: "",
  row: "grid grid-cols-12 gap-x-2",
};

interface TextInputProps {
  label?: string;
  rightIcon?: keyof typeof dynamicIconImports;
  inputType?: InputType;
  value: string;
  onChange?: (value: string) => void;
  classNames?: {
    rightIcon?: string;
    input?: string;
    label?: string;
    root?: string;
    inputWrapper?: string;
  };
}

export const TextInput = ({
  label,
  rightIcon,
  inputType = "col",
  value,
  classNames,
  onChange,
}: TextInputProps) => {
  const inputRef = useRef<ElementRef<"input">>(null);

  const handleClick = () => {
    if (inputRef && inputRef.current) inputRef.current.focus();
  };

  return (
    <div
      className={clsx(
        classNames?.root,
        inputTypeStyle[inputType],
        "w-full items-center"
      )}
      onClick={handleClick}
    >
      {label && (
        <label
          htmlFor="input-group"
          className={clsx(
            classNames?.label,
            "block mb-2 text-sm font-medium text-gray-900 text-start"
          )}
        >
          {label}
        </label>
      )}
      <div className={clsx("relative", classNames?.inputWrapper)}>
        {rightIcon && (
          <div
            className={clsx(
              classNames?.rightIcon,
              "absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
            )}
          >
            <DynamicIcon
              name={rightIcon}
              size={16}
              className="text-gray-500 "
            />
          </div>
        )}
        <input
          type="text"
          id="input-group"
          className={clsx(
            classNames?.input,
            "bg-gray-50  outline-secondary/50  text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-1 block w-full ps-10 p-2 mb-1"
          )}
          onChange={(e) => onChange?.(e.target.value)}
          value={value}
        />
      </div>
    </div>
  );
};
