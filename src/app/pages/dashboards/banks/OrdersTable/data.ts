import { ColorType } from "@/constants/app";

import {
  ArrowPathIcon,
  CheckBadgeIcon,
  ClockIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface StatusOption {
  value: string;
  label: string;
  color: ColorType;
  icon: React.ElementType;
}

interface Customer {
  name: string;
  avatar_img: string | null;
  customer_id: string;
}

interface ShippingAddress {
  street: string;
  line: string;
}

interface Product {
  name: string;
  sku: number;
  image: string;
  price: number;
  qty: number;
  discount: number;
  total: number;
  product_id: string;
}

export type PaymentStatus = "paid" | "pending" | "failed";

export type OrderStatus =
  | "shipping"
  | "pending"
  | "completed"
  | "processing"
  | "cancelled";

export interface Order {
  order_id: string;
  created_at: string;
  customer: Customer;
  total: number;
  profit: number;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  shipping_address: ShippingAddress;
  products: Product[];
  subtotal: number;
  delivery_fee: number;
  tax: number;
  total_amount_due: number;
}

export const orderStatusOptions: StatusOption[] = [
  {
    value: "shipping",
    label: "Shipping",
    color: "info",
    icon: TruckIcon,
  },
  {
    value: "pending",
    label: "Pending",
    color: "warning",
    icon: ClockIcon,
  },
  {
    value: "completed",
    label: "Completed",
    color: "success",
    icon: CheckBadgeIcon,
  },
  {
    value: "processing",
    label: "Processing",
    color: "primary",
    icon: ArrowPathIcon,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    color: "error",
    icon: XCircleIcon,
  },
];
