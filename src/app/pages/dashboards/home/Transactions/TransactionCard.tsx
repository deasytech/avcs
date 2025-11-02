// Import Dependencies
import clsx from "clsx";

// Local Imports
import { Card } from "@/components/ui";

// ----------------------------------------------------------------------

export interface Transaction {
  id: string;
  name: string;
  time: string;
  amount: number;
}

export function TransactionCard({ name, time, amount }: Transaction) {
  return (
    <Card className="flex items-center justify-between gap-3 p-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex min-w-0 flex-col">
          <span className="dark:text-dark-100 truncate text-sm font-medium text-gray-800">
            {name}
          </span>
          <span className="dark:text-dark-300 truncate text-xs text-gray-400">
            {time}
          </span>
        </div>
      </div>
      <span
        className={clsx(
          `this:${amount > 0 ? "success" : "error"}`,
          "text-this dark:text-this-lighter text-sm font-medium",
        )}
      >
        ₦{Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
    </Card>
  );
}
