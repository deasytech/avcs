// Import Dependencies
import { ColumnDef } from "@tanstack/react-table";

// Local Imports
import {
  SelectCell,
  SelectHeader,
} from "@/components/shared/table/SelectCheckbox";

import { RegionalTransaction } from "./data";
import { RegionCell, BusinessBranchCell, NumericCell, CurrencyCell } from "./rows";

// ----------------------------------------------------------------------

export const columns: ColumnDef<RegionalTransaction>[] = [
  {
    id: "select",
    label: "Row Selection",
    header: SelectHeader,
    cell: SelectCell,
  },
  {
    id: "region",
    accessorKey: "region",
    label: "Transaction ID",
    header: "Transaction ID",
    cell: RegionCell,
  },
  {
    id: "businessBranch",
    accessorKey: "businessBranch",
    label: "Business/Branch",
    header: "Business/Branch",
    cell: BusinessBranchCell,
  },
  {
    id: "totalTransactions",
    accessorKey: "totalTransactions",
    label: "Total Transactions",
    header: "Total Transactions",
    cell: NumericCell,
  },
  {
    id: "vatChargeable",
    accessorKey: "vatChargeable",
    label: "VAT Chargeable",
    header: "VAT Chargeable (₦)",
    cell: CurrencyCell,
  },
  {
    id: "vatIncome",
    accessorKey: "vatIncome",
    label: "VAT Income",
    header: "VAT Income (₦)",
    cell: CurrencyCell,
  },
];
