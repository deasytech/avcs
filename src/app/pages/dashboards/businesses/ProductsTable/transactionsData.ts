// Local Imports
import transactionsData from "@/data/transactions.json";
import businessesData from "@/data/businesses.json";
import sectorsData from "@/data/sectors.json";
import branchesData from "@/data/branches.json";
import transactionTypesData from "@/data/transaction_types.json";

// ----------------------------------------------------------------------

// Helper function to parse Naira amount to number
const parseNairaAmount = (nairaString: string): number => {
  return parseFloat(nairaString.replace(/[₦,]/g, ''));
};

// Helper function to round to 2 decimal places
const roundToTwoDecimals = (num: number): number => {
  return Math.round(num * 100) / 100;
};


// Transform transaction data to match table interface
export interface TransactionRow {
  transaction_id: number;
  business_name: string;
  sector_name: string;
  branch_name: string;
  transaction_type: string;
  transaction_amount: string;
  transaction_amount_chargeable: string;
  transaction_amount_vat: string;
  transaction_date: string;
  formatted_date: string;
  parsed_amount: number;
  parsed_chargeable: number;
  parsed_vat: number;
}

export const transactionsList: TransactionRow[] = transactionsData.map((transaction) => {
  const business = businessesData.find(b => b.id === transaction.business_id);
  const sector = sectorsData.find(s => s.id === transaction.sector_id);
  const branch = branchesData.find(br => br.id === transaction.branch_id);
  const transactionType = transactionTypesData.find(tt => tt.id === transaction.transaction_type_id);

  const transactionDate = new Date(transaction.transaction_date);
  const formattedDate = transactionDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return {
    transaction_id: transaction.transaction_id,
    business_name: business?.name || 'Unknown Business',
    sector_name: sector?.name || 'Unknown Sector',
    branch_name: branch?.name || 'Unknown Branch',
    transaction_type: transactionType?.name || 'Unknown Transaction',
    transaction_amount: transaction.transaction_amount,
    transaction_amount_chargeable: transaction.transaction_amount_chargeable,
    transaction_amount_vat: transaction.transaction_amount_vat,
    transaction_date: transaction.transaction_date,
    formatted_date: formattedDate,
    parsed_amount: roundToTwoDecimals(parseNairaAmount(transaction.transaction_amount)),
    parsed_chargeable: roundToTwoDecimals(parseNairaAmount(transaction.transaction_amount_chargeable)),
    parsed_vat: roundToTwoDecimals(parseNairaAmount(transaction.transaction_amount_vat)),
  };
});
