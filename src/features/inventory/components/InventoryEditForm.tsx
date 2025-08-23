import { Button } from "@/components/ui/button/button";
import { GenericForm } from "@/components/ui/form/GenericForm";
import { inventoryEditSchema } from "../schemas/inventoryEditSchema";
import type { z } from "zod";
import { NumberField } from "@/components/ui/form/fields/NumberField";
import { useUpdateInventory } from "../hooks/useUpdateInventory";
import type { Inventory } from "../inventoryTypes";

interface InventoryEditFormProps {
  inventory: Inventory;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const InventoryEditForm = ({
  inventory,
  onSuccess,
  onCancel,
}: InventoryEditFormProps) => {
  const { mutate: updateInventory, isPending } = useUpdateInventory();

  const handleSubmit = async (data: z.infer<typeof inventoryEditSchema>) => {
    await updateInventory(
      { id: inventory.inventoryId, quantity: data.quantity },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      }
    );
  };

  return (
    <div className="w-full">
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Current Inventory Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">
              Product ID:
            </span>
            <div className="font-mono">{inventory.productId}</div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">
              Current Quantity:
            </span>
            <div className="font-medium">{inventory.quantityAvailable}</div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">
              Reorder Level:
            </span>
            <div className="font-medium">{inventory.reorderLevel}</div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">
              Last Restocked:
            </span>
            <div className="font-medium">
              {inventory.lastRestockedAt
                ? new Date(inventory.lastRestockedAt).toLocaleDateString()
                : "Never"}
            </div>
          </div>
        </div>
      </div>

      <GenericForm
        schema={inventoryEditSchema}
        defaultValues={{ quantity: inventory.quantityAvailable }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {(form) => (
          <>
            <NumberField
              name="quantity"
              label="New Quantity"
              placeholder="Enter new quantity"
              min={0}
              step={1}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {form.formState.isSubmitting
                  ? "Updating..."
                  : "Update Quantity"}
              </Button>
            </div>
          </>
        )}
      </GenericForm>
    </div>
  );
};

export default InventoryEditForm;
