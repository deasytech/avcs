// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { TransactionRow } from "./transactionsData";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper<TransactionRow>();

// Helper function to format Naira amount for display
const formatNairaAmount = (amount: number): string => {
  return `₦${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const transactionColumns = [
  columnHelper.accessor((row) => row.transaction_id, {
    id: "transaction_id",
    header: "Transaction ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.formatted_date, {
    id: "date",
    header: "Date & Time",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.business_name, {
    id: "business",
    header: "Business",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.transaction_type, {
    id: "type",
    header: "Transaction Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.parsed_amount, {
    id: "amount",
    header: "Amount",
    cell: (info) => formatNairaAmount(info.getValue()),
  }),
  columnHelper.accessor((row) => row.parsed_chargeable, {
    id: "chargeable",
    header: "Chargeable",
    cell: (info) => formatNairaAmount(info.getValue()),
  }),
  columnHelper.accessor((row) => row.parsed_vat, {
    id: "vat",
    header: "VAT",
    cell: (info) => formatNairaAmount(info.getValue()),
  }),
];
