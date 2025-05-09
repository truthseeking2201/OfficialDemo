import { ChangeEvent, useCallback } from "react";
import { cn } from "@/lib/utils";

interface FormattedNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  maxDecimals?: number;
  onValidate?: (value: string) => void;
}

export function FormattedNumberInput({
  value,
  onChange,
  placeholder = "0.00",
  className = "",
  maxDecimals = 2,
  onValidate,
}: FormattedNumberInputProps) {
  
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Only allow numbers and one decimal point
    if (!/^\d*\.?\d{0,2}$/.test(inputValue) && inputValue !== '') {
      return;
    }

    onChange(inputValue);
    onValidate?.(inputValue);
  }, [onChange, onValidate]);

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={cn("input-vault w-full font-heading-lg", className)}
    />
  );
} 