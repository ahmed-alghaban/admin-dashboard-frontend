import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../form";
import { Input } from "@/components/ui/form/input";

type NumberFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  step?: number;
  min?: number;
};

export const NumberField: React.FC<NumberFieldProps> = ({
  name,
  label,
  placeholder,
  step = 0.01,
  min,
}) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              inputMode="decimal"
              placeholder={placeholder}
              step={step}
              min={min}
              onChange={(e) =>
                field.onChange(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
