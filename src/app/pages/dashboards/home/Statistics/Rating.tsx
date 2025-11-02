// Local Imports
import { Card, Circlebar } from "@/components/ui";
import { getRatingData } from "@/utils/calculateAverageRating";

// ----------------------------------------------------------------------

export function Rating() {
  const { averageRating, totalReviews } = getRatingData();

  return (
    <Card className="flex items-center gap-3 p-4">
      <Circlebar size={12} value={averageRating * 20} color="success" isActive strokeWidth={10}>
        <div className="flex items-center justify-center text-xs">{averageRating}</div>
      </Circlebar>
      <div className="text-xs-plus dark:text-dark-100 font-medium [word-break:break-word] text-gray-800">
        Average Rating ({totalReviews.toLocaleString()} reviews)
      </div>
    </Card>
  );
}
