// Import Dependencies
import { CellContext } from "@tanstack/react-table";
import { Button } from "@/components/ui";

// Local Imports
import { TransactionRow } from "./transactionsData";

// ----------------------------------------------------------------------

export function TransactionRowActions(cell: CellContext<TransactionRow, unknown>) {
  const transaction = cell.row.original;
  const table = cell.table;

  const handleView = () => {
    console.log("View transaction:", transaction);
  };

  const handleEdit = () => {
    console.log("Edit transaction:", transaction);
  };

  const handleDelete = () => {
    if (table.options.meta?.deleteRow) {
      table.options.meta.deleteRow(cell.row);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="flat"
        onClick={handleView}
        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 px-2 py-1 text-xs"
      >
        View
      </Button>
      <Button
        variant="flat"
        onClick={handleEdit}
        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 px-2 py-1 text-xs"
      >
        Edit
      </Button>
      <Button
        variant="flat"
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 px-2 py-1 text-xs"
      >
        Delete
      </Button>
    </div>
  );
}
