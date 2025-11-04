// Local Imports
import { Card } from "@/components/ui";
import { Statistics } from "./Statistics";
import { TopRegions } from "../TopSellers";

// ----------------------------------------------------------------------

export function PageViews({ currentState }: { currentState: any }) {
  return (
    <Card className="pb-4 overflow-hidden">
      <div className="flex min-w-0 items-center justify-between px-4 pt-3 sm:px-5">
        <h2 className="text-sm-plus font-medium tracking-wide text-gray-800 dark:text-dark-100">
          Statistics
        </h2>
        <h2 className="text-sm-plus font-medium tracking-wide text-gray-800 dark:text-dark-100">
          Top 3 Performing Regions
        </h2>
      </div>

      <div className="mt-3 grid grid-cols-12">
        <Statistics currentState={currentState} />
        <TopRegions currentState={currentState} />
      </div>
    </Card>
  );
}
