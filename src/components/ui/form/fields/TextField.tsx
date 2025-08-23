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
import { Textarea } from "@/components/ui/form/input";

type TextFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  multiline?: boolean;
  rows?: number;
};

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  multiline = false,
  rows = 3,
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
            {multiline ? (
              <Textarea
                {...field}
                id={id}
                placeholder={placeholder}
                rows={rows}
                className="resize-none"
              />
            ) : (
              <Input {...field} id={id} placeholder={placeholder} type={type} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
