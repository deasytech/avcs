import { useMemo } from "react";
import transactions from "@/data/transactions.json";
import states from "@/data/states.json";

export function Statistics({ currentState }: { currentState: any }) {
  console.log(currentState)
  const stats = useMemo(() => {
    // Helper to safely parse ₦ values
    const parseAmount = (v: string) => Number(v.replace(/[₦,]/g, "")) || 0;

    // Map each state_id → region
    const stateRegionMap: Record<number, string> = {};
    states.forEach((s) => (stateRegionMap[s.id] = s.region));

    // If a state is selected, filter for only that state
    const filteredTransactions = currentState
      ? transactions.filter((tx: any) => tx.state_id === currentState.id)
      : transactions;

    // Initialize accumulator
    let totalTransactions = 0;
    let vatChargeable = 0;
    let vatIncome = 0;
    let totalVolume = 0;

    filteredTransactions.forEach((tx: any) => {
      totalTransactions += 1;
      totalVolume += parseAmount(tx.transaction_amount);
      vatChargeable += parseAmount(tx.transaction_amount_chargeable);
      vatIncome += parseAmount(tx.transaction_amount_vat);
    });

    // Determine label (National or State Region)
    const label = currentState
      ? `${currentState.name} (${stateRegionMap[currentState.id]})`
      : "National Summary";

    return [
      {
        label,
        totalTransactions,
        vatChargeable,
        vatIncome,
        totalVolume,
      },
    ];
  }, [currentState]);

  return (
    <div className="col-span-12 px-4 sm:col-span-6 sm:px-5 lg:col-span-4">
      {stats.map((item) => (
        <div
          key={item.label}
          className="mt-6"
        >
          <h3 className="text-lg font-semibold text-gray-100 mb-4">
            {item.label}
          </h3>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <p className="text-xs uppercase text-gray-400">Total Transactions</p>
              <p className="mt-1 text-lg font-medium text-gray-200">
                {item.totalTransactions.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">VAT Chargeable</p>
              <p className="mt-1 text-lg font-medium text-gray-200">
                ₦
                {item.vatChargeable.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">VAT Income</p>
              <p className="mt-1 text-lg font-medium text-gray-200">
                ₦
                {item.vatIncome.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">Total Volume</p>
              <p className="mt-1 text-lg font-medium text-gray-200">
                ₦
                {item.totalVolume.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
