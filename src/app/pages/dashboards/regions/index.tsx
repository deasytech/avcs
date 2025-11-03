// React Imports
import { useParams } from "react-router";
import { useMemo } from "react";

// Local Imports
import { Page } from "@/components/shared/Page";
import { PageViews } from "./PageViews";
import { Visitors } from "./Tops/Visitors";
import { Comments } from "./Tops/Comments";
import { Searchs } from "./Tops/Searchs";

// Data Imports
import statesData from "@/data/states.json";

// ----------------------------------------------------------------------

export default function CMSAnalytics() {
  const { "*": stateSlug } = useParams();

  // Find the current state from the URL parameter
  const currentState = useMemo(() => {
    if (!stateSlug) return null;
    return statesData.find(state => state.slug === stateSlug);
  }, [stateSlug]);

  // Get page title based on current state
  const pageTitle = currentState
    ? `${currentState.name} Region Analytics Dashboard`
    : "Regions Analytics Dashboard";

  return (
    <Page title={pageTitle}>
      <div className="mt-5 pb-8 lg:mt-6">
        <div className="transition-content px-(--margin-x)">
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
          <PageViews />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:gap-5 lg:mt-6 lg:grid-cols-3 lg:gap-6">
            <Visitors />
            <Comments />
            <Searchs />
          </div>
        </div>
      </div>
    </Page>
  );
}
