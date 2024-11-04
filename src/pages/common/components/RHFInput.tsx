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
  placeholder: string;
  description?: string;
  type?: HTMLInputTypeAttribute;
}

export const RHFInput: React.FC<RHFInputProps> = ({
  name,
  label,
  placeholder,
  description,
  type,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center">
            <FormLabel>{label}</FormLabel>
          </div>
          <FormControl>
            <Input
              className="border-gray-700"
              {...field}
              placeholder={placeholder}
              type={type}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
