import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { TextField } from "@/components/ui/form/fields/TextField";
import { GenericForm } from "@/components/ui/form/GenericForm";
import {
  orderCreateSchema,
  type OrderCreateFormData,
} from "../schemas/orderSchema";
import { useAddOrder } from "../hooks/useAddOrder";
import { useProducts } from "../../products/hooks/useProducts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Plus, Trash2, Package } from "lucide-react";
import type { OrderItem } from "../orderTypes";
import { toast } from "sonner";

interface OrderCreateFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const OrderCreateForm = ({ onSuccess, onCancel }: OrderCreateFormProps) => {
  const { mutate: addOrder, isPending } = useAddOrder();
  const { data: productsResponse } = useProducts(1, 100); // Get all products for selection
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const defaultValues: OrderCreateFormData = {
    paymentMethod: "",
    shippingAddress: "",
    orderItems: [],
  };

  const handleSubmit = (data: OrderCreateFormData) => {
    // Validate that we have order items
    if (orderItems.length === 0) {
      toast.error("Please add at least one item to the order");
      return;
    }

    // Validate that all items have valid data
    const invalidItems = orderItems.filter(
      (item) => !item.productId || item.quantity <= 0
    );
    if (invalidItems.length > 0) {
      toast.error(
        "Please ensure all items have a product selected and valid quantity"
      );
      return;
    }

    // Transform orderItems to match API structure (only productId and quantity)
    const apiOrderItems = orderItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const orderData = {
      paymentMethod: data.paymentMethod,
      shippingAddress: data.shippingAddress,
      orderItems: apiOrderItems,
    };

    addOrder(orderData, {
      onSuccess: () => {
        toast.success("Order created successfully!");
        setOrderItems([]); // Clear the form
        onSuccess?.();
      },
      onError: () => {
        toast.error("Failed to create order. Please try again.");
      },
    });
  };

  const addOrderItem = () => {
    const newItem: OrderItem = {
      productId: "",
      productName: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
    };
    setOrderItems([...orderItems, newItem]);
  };

  const removeOrderItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateOrderItem = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    const updatedItems = [...orderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    // Calculate total price for this item
    if (field === "quantity" || field === "unitPrice") {
      updatedItems[index].totalPrice =
        updatedItems[index].quantity * updatedItems[index].unitPrice;
    }

    setOrderItems(updatedItems);
  };

  const products = productsResponse?.items || [];

  return (
    <div className="space-y-6">
      <GenericForm
        schema={orderCreateSchema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {() => (
          <>
            <div className="space-y-4">
              <TextField
                name="paymentMethod"
                label="Payment Method"
                placeholder="Credit Card, PayPal, etc."
              />

              <TextField
                name="shippingAddress"
                label="Shipping Address"
                placeholder="Enter shipping address"
                multiline
                rows={3}
              />
            </div>

            {/* Order Items Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order Items
                  </CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addOrderItem}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderItems.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No items added. Click "Add Item" to start building your
                    order.
                  </p>
                ) : (
                  orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Item {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOrderItem(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium">Product</label>
                          <select
                            className="w-full p-2 border rounded-md bg-background text-foreground dark:bg-background dark:text-foreground dark:border-input"
                            value={item.productId}
                            onChange={(e) => {
                              const selectedProductId = e.target.value;
                              const product = products.find(
                                (p) => p.productId === selectedProductId
                              );

                              // Update all fields in a single state update to avoid race conditions
                              const updatedItems = [...orderItems];
                              updatedItems[index] = {
                                ...updatedItems[index],
                                productId: selectedProductId,
                                productName: product?.productName || "",
                                unitPrice: product?.price || 0,
                                totalPrice:
                                  (product?.price || 0) *
                                  updatedItems[index].quantity,
                              };

                              setOrderItems(updatedItems);
                            }}
                          >
                            <option value="">Select a product</option>
                            {products.map((product) => (
                              <option
                                key={product.productId}
                                value={product.productId}
                              >
                                {product.productName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium">
                            Quantity
                          </label>
                          <input
                            type="number"
                            className="w-full p-2 border rounded-md bg-background text-foreground dark:bg-background dark:text-foreground dark:border-input"
                            value={item.quantity}
                            onChange={(e) =>
                              updateOrderItem(
                                index,
                                "quantity",
                                parseInt(e.target.value) || 1
                              )
                            }
                            min={1}
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium">
                            Unit Price
                          </label>
                          <input
                            type="number"
                            className="w-full p-2 border rounded-md bg-background text-foreground dark:bg-background dark:text-foreground dark:border-input"
                            value={item.unitPrice}
                            onChange={(e) =>
                              updateOrderItem(
                                index,
                                "unitPrice",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            step={0.01}
                            min={0}
                          />
                        </div>

                        <div className="flex items-end">
                          <div className="w-full">
                            <label className="text-sm font-medium">
                              Total Price
                            </label>
                            <div className="text-lg font-semibold text-primary">
                              ${item.totalPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {orderItems.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Order Total:</span>
                      <span className="text-primary">
                        $
                        {orderItems
                          .reduce((sum, item) => sum + item.totalPrice, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isPending} className="flex-1">
                {isPending ? "Creating..." : "Create Order"}
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
    </div>
  );
};

export default OrderCreateForm;
