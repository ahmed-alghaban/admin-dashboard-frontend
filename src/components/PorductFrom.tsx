import * as React from "react";
import { z } from "zod";
import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/form/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { GenericForm } from "@/components/ui/form/RHFForm"; // adjust path
import type { UseFormReturn } from "react-hook-form";

// Schema
const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  price: z.number().min(1, "Price must be at least 1"),
  quantityInStock: z.number().min(0, "Quantity must be 0 or greater"),
});

// Type
type ProductFormValues = z.infer<typeof productSchema>;

export function ProductCreateForm() {
  return (
    <GenericForm
      schema={productSchema}
      defaultValues={{
        productName: "",
        sku: "",
        price: 1,
        quantityInStock: 0,
      }}
      onSubmit={(values: ProductFormValues) => {
        console.log("Submitted:", values);
        // TODO: send to backend via mutation
      }}
      className="space-y-4"
    >
      {(form: UseFormReturn<ProductFormValues>) => (
        <>
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Premium Hoodie" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input placeholder="HDY-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantityInStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity In Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Create Product</Button>
        </>
      )}
    </GenericForm>
  );
}
