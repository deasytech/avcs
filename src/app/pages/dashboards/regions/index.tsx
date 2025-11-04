// React Imports
import { useParams } from "react-router";
import { useMemo } from "react";

// Local Imports
import { Page } from "@/components/shared/Page";
import { PageViews } from "./PageViews";
import TransactionsTable from "./TransactionsTable";

// Data Imports
import statesData from "@/data/states.json";

// ----------------------------------------------------------------------

export default function CMSAnalytics() {
  const stateSlug = useParams();

  // quick debug
  console.log("route params:", stateSlug);

  // Find the current state from the URL parameter
  const currentState = useMemo(() => {
    if (!stateSlug) return null;
    return statesData.find((state) => state.slug === stateSlug.regionName);
  }, [stateSlug]);

  // Get page title based on current state
  const pageTitle = currentState
    ? `${currentState.name} Region Analytics Dashboard`
    : "Regions Analytics Dashboard";

  return (
    <Page title={pageTitle}>
      <div className="mt-5 pb-8 lg:mt-6">
        <div className="transition-content px-(--margin-x)">
          {/* Header Section */}
          {currentState && (
            <div className="mb-6 rounded-lg bg-white p-4 shadow-sm dark:bg-dark-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentState.name} State
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Region: {currentState.region}
              </p>
            </div>
          )}

          {/* Pass currentState to PageViews */}
          <PageViews currentState={currentState} />

          {/* Pass currentState to TransactionsTable if needed */}
          <TransactionsTable currentState={currentState} />
        </div>
      </div>
    </Page>
  );
}
