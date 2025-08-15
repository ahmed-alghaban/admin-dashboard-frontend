import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";

type Option = { label: string; value: string };
type SelectFieldProps = {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  placeholder = "Select…",
}) => {
  const form = useFormContext();
  const id = `field-${name}`;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={id}>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={String(field.value ?? "")}
            >
              <SelectTrigger id={id}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
