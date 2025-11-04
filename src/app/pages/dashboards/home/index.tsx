// Local Imports
import { Page } from "@/components/shared/Page";
import { Statistics } from "./Statistics";
import { ProductsTable } from "./ProductsTable";
import { TopSellers } from "./TopSellers";
import { TeamActivity } from "./TeamActivity";
import { Transactions } from "./Transactions";
import { CountrySource } from "./CountrySource";
import { SocialSource } from "./SocialSource";
import { SocialTraffic } from "./SocialTraffic";
import { TopCountries } from "./TopCountries";

// ----------------------------------------------------------------------

export default function Sales() {
  return (
    <Page title="Dashboard">
      <div className="transition-content overflow-hidden px-(--margin-x) pb-8">
        <Statistics />
        <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6 mt-5">
          <TopSellers />
          <div className="col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-7 lg:gap-6 xl:col-span-6">
            <SocialTraffic />
            <TopCountries />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6">
          <ProductsTable />
          <TeamActivity />
          <div className="col-span-12 space-y-4 sm:col-span-6 sm:space-y-5 lg:col-span-4 lg:space-y-6">
            <SocialSource />
            <CountrySource />
          </div>
          <Transactions />
        </div>
      </div>
    </Page>
  );
}
