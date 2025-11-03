// Import Dependencies
import { ColumnDef } from "@tanstack/react-table";

// Local Imports
import {
  SelectCell,
  SelectHeader,
} from "@/components/shared/table/SelectCheckbox";

import {
  CustomerCell,
  DateCell,
  OrderIdCell,
  ProfitCell,
  TotalCell,
  VatCell,
} from "./rows";
import { Order } from "./data";

// ----------------------------------------------------------------------

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    label: "Row Selection",
    header: SelectHeader,
    cell: SelectCell,
  },
  {
    id: "order_id",
    accessorKey: "order_id",
    label: "Transaction ID",
    header: "Transaction ID",
    cell: OrderIdCell,
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    label: "Transaction Date",
    header: "Date",
    cell: DateCell,
  },
  {
    id: "customer",
    accessorFn: (row) => row.customer.name,
    label: "Business/Branch",
    header: "Business/Branch",
    cell: CustomerCell,
  },
  {
    id: "total",
    accessorKey: "total",
    label: "Amount",
    header: "Amount (₦)",
    cell: TotalCell,
  },

  {
    id: "profit",
    accessorKey: "profit",
    label: "Charge",
    header: "VAT Chargeable (₦)",
    cell: ProfitCell,
  },
  {
    id: "vat",
    accessorKey: "tax",
    label: "VAT",
    header: "VAT (₦)",
    cell: VatCell,
  },
];
