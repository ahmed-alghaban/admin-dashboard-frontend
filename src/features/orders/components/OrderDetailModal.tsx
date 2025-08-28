import { DetailModal } from "@/components/ui/detail-modal";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Package,
  DollarSign,
  User,
  MapPin,
  CreditCard,
} from "lucide-react";
import type { Order } from "../orderTypes.ts";

interface OrderDetailModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const OrderDetailModal = ({
  order,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: OrderDetailModalProps) => {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <DetailModal
      open={open}
      onOpenChange={onOpenChange}
      title="Order Details"
      description="View detailed information about this order"
      onEdit={onEdit}
      onDelete={onDelete}
      size="xl"
    >
      <div className="space-y-6">
        {/* Order Header */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Package className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Order #{order.orderId}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {order.userFullName}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <CreditCard className="h-3 w-3 mr-1" />
                {order.paymentMethod}
              </Badge>
            </div>
          </div>
        </div>

        {/* Order Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Customer
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {order.userFullName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Total Amount
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  ${order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Package className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Items
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {order.orderItems?.length || 0} items
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CreditCard className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Payment Method
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {order.paymentMethod}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Order Date
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {order.shippingAddress && (
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Shipping Address
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {order.shippingAddress}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Items */}
        {order.orderItems && order.orderItems.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Order Items
            </h4>
            <div className="space-y-2">
              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                      <Package className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {item.productName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      ${item.unitPrice ? item.unitPrice.toFixed(2) : "0.00"}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DetailModal>
  );
};

export default OrderDetailModal;
