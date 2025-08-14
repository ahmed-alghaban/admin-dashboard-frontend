import * as React from "react";
import { z } from "zod";
import {
  useForm,
  type UseFormReturn,
  type DefaultValues,
  type SubmitHandler,
  type FieldValues,
  type Resolver,
} from "react-hook-form";
import { Form } from "@/components/ui/form"; // your shadcn Form

// Our own Zod resolver that matches RHF's Resolver type exactly
function makeZodResolver<TSchema extends z.ZodType<FieldValues>>(
  schema: TSchema
): Resolver<z.infer<TSchema>> {
  return async (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }

    // Convert Zod errors to RHF format
    const errors: Record<string, { type: string; message: string }> = {};
    result.error.issues.forEach((error) => {
      const path = error.path.join(".");
      errors[path] = {
        type: "validation",
        message: error.message,
      };
    });

    return {
      values: {} as z.infer<TSchema>,
      errors,
    };
  };
}

type GenericFormProps<TSchema extends z.ZodType<FieldValues>> = {
  schema: TSchema;
  defaultValues: DefaultValues<z.infer<TSchema>>;
  onSubmit: SubmitHandler<z.infer<TSchema>>;
  className?: string;
  children: (form: UseFormReturn<z.infer<TSchema>>) => React.ReactNode;
};

export function GenericForm<TSchema extends z.ZodType<FieldValues>>({
  schema,
  defaultValues,
  onSubmit,
  className,
  children,
}: GenericFormProps<TSchema>) {
  type FormValues = z.infer<TSchema>;

  const form = useForm<FormValues>({
    resolver: makeZodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  return (
    <Form<FormValues> {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children(form)}
      </form>
    </Form>
  );
}
