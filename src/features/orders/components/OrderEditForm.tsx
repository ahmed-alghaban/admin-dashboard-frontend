import { Button } from "@/components/ui/button/button";
import { SelectField } from "@/components/ui/form/fields/SelectField";
import { GenericForm } from "@/components/ui/form/GenericForm";
import {
  orderEditSchema,
  type OrderEditFormData,
} from "../schemas/orderEditSchema";
import { useEditOrder } from "../hooks/useEditOrder";
import { useOrderById } from "../hooks/useOrders";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { logger } from "@/lib/logger";

interface OrderEditFormProps {
  orderId: string | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const OrderEditForm = ({
  orderId,
  onSuccess,
  onCancel,
}: OrderEditFormProps) => {
  const { mutate: editOrder, isPending } = useEditOrder();
  const { data: order, isLoading } = useOrderById(orderId || "");

  const defaultValues: OrderEditFormData = {
    status:
      (order?.status as
        | "Pending"
        | "Processing"
        | "Shipped"
        | "Delivered"
        | "Cancelled") || "Pending",
  };

  const handleSubmit = (data: OrderEditFormData) => {
    logger.log("🚀 Edit HandleSubmit called! Form submitted with data:", data);
    logger.log("🚀 Order ID:", orderId);
    logger.log("🚀 Is pending:", isPending);

    if (!orderId) {
      logger.error("No order ID provided");
      return;
    }

    logger.log("🚀 About to call editOrder mutation");
    editOrder(
      { orderId, status: data.status },
      {
        onSuccess: () => {
          logger.log("Order status updated successfully");
          onSuccess?.();
        },
        onError: (error) => {
          logger.error("Order status update failed:", error);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <div className="flex gap-2 pt-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Order not found</p>
      </div>
    );
  }

  return (
    <GenericForm
      schema={orderEditSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {() => (
        <>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">Order ID: {order.orderId}</p>
              <p className="text-sm text-muted-foreground">
                Customer: {order.userFullName}
              </p>
              <p className="text-sm text-muted-foreground">
                Total: ${order.totalAmount}
              </p>
            </div>

            <SelectField
              name="status"
              label="Status"
              options={[
                { value: "Pending", label: "Pending" },
                { value: "Processing", label: "Processing" },
                { value: "Shipped", label: "Shipped" },
                { value: "Delivered", label: "Delivered" },
                { value: "Cancelled", label: "Cancelled" },
              ]}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1"
              onClick={() => logger.log("🚀 Update Status button clicked!")}
            >
              {isPending ? "Updating..." : "Update Status"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </>
      )}
    </GenericForm>
  );
};

export default OrderEditForm;
