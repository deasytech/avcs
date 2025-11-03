import { useMemo } from "react";
import transactions from "@/data/transactions.json";
import states from "@/data/states.json";

type RegionStats = {
  region: string;
  totalTransactions: number;
  vatChargeable: number;
  vatIncome: number;
  totalVolume: number;
};

export function Statistics() {
  const stats = useMemo(() => {
    const grouped: Record<string, RegionStats> = {};

    transactions.forEach((tx: any) => {
      // Map sector_id to the state/region
      const state = states.find((s: any) => s.sector_id === tx.sector_id);
      const region = state?.region || "Unknown";

      if (!grouped[region]) {
        grouped[region] = {
          region,
          totalTransactions: 0,
          vatChargeable: 0,
          vatIncome: 0,
          totalVolume: 0,
        };
      }

      grouped[region].totalTransactions += 1;

      const parseAmount = (value: string) =>
        Number(value.replace(/[₦,]/g, "")) || 0;

      grouped[region].totalVolume += parseAmount(tx.transaction_amount);
      grouped[region].vatChargeable += parseAmount(tx.transaction_amount_chargeable);
      grouped[region].vatIncome += parseAmount(tx.transaction_amount_vat);
    });

    return Object.values(grouped);
  }, []);

  return (
    <div className="col-span-12 px-4 sm:col-span-6 sm:px-5 lg:col-span-4">
      {stats.map((regionStat) => (
        <div key={regionStat.region} className="mt-6">
          {/* <h3 className="text-sm font-semibold text-gray-500 dark:text-dark-300 uppercase mb-4">
            {regionStat.region ?? 'All Regions'}
          </h3> */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            <div>
              <p className="text-xs uppercase text-gray-400 dark:text-dark-300">
                Total Transactions
              </p>
              <p className="mt-1 text-xl font-medium text-gray-800 dark:text-dark-100">
                {regionStat.totalTransactions.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400 dark:text-dark-300">
                VAT Chargeable
              </p>
              <p className="mt-1 text-xl font-medium text-gray-800 dark:text-dark-100">
                ₦{regionStat.vatChargeable.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400 dark:text-dark-300">
                VAT Income
              </p>
              <p className="mt-1 text-xl font-medium text-gray-800 dark:text-dark-100">
                ₦{regionStat.vatIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400 dark:text-dark-300">
                Total Volume
              </p>
              <p className="mt-1 text-xl font-medium text-gray-800 dark:text-dark-100">
                ₦{regionStat.totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
