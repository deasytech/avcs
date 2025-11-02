// Local Imports
import {
  Card,
  Timeline,
  TimelineItem,
  type TimelineItemProps,
} from "@/components/ui";

// Data imports
import transactionsData from "@/data/transactions.json";
import businessesData from "@/data/businesses.json";
import transactionTypesData from "@/data/transaction_types.json";
import sectorsData from "@/data/sectors.json";

// ----------------------------------------------------------------------

interface Timeline {
  id: string;
  title: TimelineItemProps["title"];
  time: TimelineItemProps["time"];
  content: TimelineItemProps["content"];
  color: TimelineItemProps["color"];
  isActive: TimelineItemProps["isPing"];
}

// Helper function to get business name by ID
function getBusinessName(businessId: number): string {
  const business = businessesData.find(b => b.id === businessId);
  return business?.name || "Unknown Business";
}

// Helper function to get transaction type name by ID
function getTransactionTypeName(transactionTypeId: number): string {
  const transactionType = transactionTypesData.find(t => t.id === transactionTypeId);
  return transactionType?.name || "Transaction";
}

// Helper function to get sector name by ID
function getSectorName(sectorId: number): string {
  const sector = sectorsData.find(s => s.id === sectorId);
  return sector?.name || "Unknown Sector";
}

// Helper function to determine activity color based on transaction amount
function getActivityColor(transactionAmount: string): TimelineItemProps["color"] {
  // Extract numeric value from amount string (₦1,234.56 -> 1234.56)
  const amount = parseFloat(transactionAmount.replace(/[₦,]/g, ""));

  if (amount > 1000000) return "error";      // High value transactions
  if (amount > 500000) return "warning";     // Medium-high value
  if (amount > 100000) return "success";     // Medium value
  if (amount > 50000) return "primary";      // Low-medium value
  return "neutral";                          // Low value
}

// Generate activity data from recent transactions
function generateActivityData(): Timeline[] {
  // Get the 5 most recent transactions
  const recentTransactions = transactionsData
    .sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime())
    .slice(0, 5);

  return recentTransactions.map((transaction, index) => {
    const businessName = getBusinessName(transaction.business_id);
    const transactionType = getTransactionTypeName(transaction.transaction_type_id);
    const sectorName = getSectorName(transaction.sector_id);

    return {
      id: `activity-${transaction.transaction_id}`,
      title: `${transactionType} Processed`,
      time: new Date(transaction.transaction_date).getTime(),
      content: `${businessName} completed a ${transactionType.toLowerCase()} in ${sectorName} sector for ${transaction.transaction_amount}`,
      color: getActivityColor(transaction.transaction_amount),
      isActive: index === 0 ? true : undefined, // Only the most recent is active
    };
  });
}

export function TeamActivity() {
  const timeline = generateActivityData();

  return (
    <Card className="col-span-12 px-4 pb-4 sm:col-span-6 sm:px-5 lg:col-span-4">
      <div className="flex h-14 min-w-0 items-center justify-between py-3">
        <h2 className="dark:text-dark-100 min-w-0 font-medium tracking-wide text-gray-800">
          Recent Transactions
        </h2>
        <a
          href="##"
          className="text-xs-plus text-primary-600 hover:text-primary-600/70 focus:text-primary-600/70 dark:text-primary-400 dark:hover:text-primary-400/70 dark:focus:text-primary-400/70 border-b border-dotted border-current pb-0.5 font-medium outline-hidden transition-colors duration-300"
        >
          View All
        </a>
      </div>
      <Timeline lineSpace="0.75rem">
        {timeline.map((item) => (
          <TimelineItem
            key={item.id}
            title={item.title}
            time={item.time}
            color={item.color}
            isPing={item.isActive}
          >
            {item.content}
          </TimelineItem>
        ))}
      </Timeline>
    </Card>
  );
}
