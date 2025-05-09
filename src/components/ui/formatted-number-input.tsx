import { ChangeEvent, useCallback } from "react";
import { cn } from "@/lib/utils";

interface FormattedNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  maxDecimals?: number;
  onValidate?: (value: string) => void;
  onMaxAmount?: () => void;
}

export function FormattedNumberInput({
  value,
  onChange,
  placeholder = "0.00",
  className = "",
  maxDecimals = 2,
  onValidate,
  onMaxAmount,
}: FormattedNumberInputProps) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Only allow numbers and one decimal point
      if (!/^\d*\.?\d{0,2}$/.test(inputValue) && inputValue !== "") {
        return;
      }

      onChange(inputValue);
      onValidate?.(inputValue);
    },
    [onChange, onValidate]
  );

  return (
    <div className="relative mb-2 mt-2">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn("input-vault w-full font-heading-lg", className)}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex rounded-full mx-auto bg-gradient-to-tr from-[#0090FF] via-[#FF6D9C] to-[#FB7E16] p-px hover:opacity-70 transition-all duration-300">
        <button
          onClick={onMaxAmount}
          className="bg-[#202124] border border-[#1A1A1A] text-white hover:text-white px-4 py-1 rounded-[16px] text-sm font-medium"
        >
          MAX
        </button>
      </div>
    </div>
  );
}
