import { HTMLInputTypeAttribute } from "react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface RHFInputProps {
  name: string;
  label: string;
  className?: string;
  placeholder: string;
  description?: string;
  type?: HTMLInputTypeAttribute;
}

export const RHFInput: React.FC<RHFInputProps> = ({
  name,
  label,
  placeholder,
  description,
  className = "",
  type = "text",
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-black">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              type={type}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold ${className}`}
            />
          </FormControl>
          {description && (
            <FormDescription className="text-xs text-gray-500">
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
