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
    filterColumn: "dateRange",
    filterFn: "inNumberRange",
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
    filterColumn: "numberRange",
    filterFn: "inNumberRange",
    cell: TotalCell,
  },
  {
    id: "profit",
    accessorKey: "profit",
    label: "Charge",
    header: "Charge (₦)",
    cell: ProfitCell,
    filterColumn: "numberRange",
    filterFn: "inNumberRange",
  },
];
