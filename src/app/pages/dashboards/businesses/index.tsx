// Import Dependencies
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

// Local Imports
import { Page } from "@/components/shared/Page";
import { Statistics } from "./Statistics";
import { Activity } from "./Activity";
import { Performers } from "./Performers";
import { ProductsTable } from "./ProductsTable";
import { Select } from "@/components/ui/Form/Select";
import { Button } from "@/components/ui";
import { useDisclosure } from "@/hooks";
import businessesData from "@/data/businesses.json";
import transactionsData from "@/data/transactions.json";

// ----------------------------------------------------------------------

export default function Influencer() {
  const [selectedBusiness, setSelectedBusiness] = useState<typeof businessesData[0] | null>(null);
  const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(true);

  // Transform businesses data for select component
  const businessOptions = businessesData.map(business => ({
    label: business.name,
    value: business.id
  }));

  // Handle business selection
  const handleBusinessSelect = (businessId: string | number) => {
    const business = businessesData.find(b => b.id === Number(businessId));
    setSelectedBusiness(business || null);
    closeModal();
  };

  // Function to reopen business selection modal
  const openBusinessSelection = () => {
    setSelectedBusiness(null);
    openModal();
  };

  // Filter transactions based on selected business
  const filteredTransactions = selectedBusiness
    ? transactionsData.filter(transaction => transaction.business_id === selectedBusiness.id)
    : [];

  // Debug logging
  useEffect(() => {
    console.log('Selected Business:', selectedBusiness);
    console.log('Total Transactions:', transactionsData.length);
    console.log('Filtered Transactions:', filteredTransactions.length);
    console.log('Business ID being filtered:', selectedBusiness?.id);
    console.log('Sample transaction business_ids:', transactionsData.slice(0, 5).map(t => t.business_id));
  }, [selectedBusiness, filteredTransactions]);

  useEffect(() => {
    // Auto-select first business if none selected
    if (!selectedBusiness && businessesData.length > 0) {
      setSelectedBusiness(businessesData[0]);
    }
  }, []);

  return (
    <>
      <Page title="Business Dashboard">
        <div className="transition-content mt-4 px-(--margin-x) pb-8 sm:mt-5 lg:mt-6">
          {/* Business Selection Header */}
          {selectedBusiness && (
            <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm dark:bg-dark-700">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-100">
                  {selectedBusiness.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-300">
                  Rating: {selectedBusiness.rating}/5 ({selectedBusiness.review_count} reviews)
                </p>
              </div>
              <Button
                onClick={openBusinessSelection}
                variant="filled"
                color="primary"
                className="h-8 px-3 text-sm"
              >
                Change Business
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 place-content-start gap-4 sm:gap-5 lg:gap-6">
            <Statistics transactions={filteredTransactions} />
            <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
              <Activity transactions={filteredTransactions} />
              <Performers transactions={filteredTransactions} />
            </div>
          </div>
          <ProductsTable />
        </div>
      </Page>

      {/* Business Selection Modal */}
      <Transition
        appear
        show={isModalOpen}
        as={Dialog}
        onClose={closeModal}
        className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
      >
        <TransitionChild
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity dark:bg-black/40"
        />

        <TransitionChild
          as={DialogPanel}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="scrollbar-sm relative flex w-full max-w-md flex-col overflow-y-auto rounded-lg bg-white p-6 text-center transition-all duration-300 dark:bg-dark-700 sm:p-8"
        >
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-dark-100">
                Select Business
              </h2>
              <p className="mt-2 text-gray-600 dark:text-dark-300">
                Choose a business to view its dashboard and analytics
              </p>
            </div>

            <Select
              label="Business"
              data={businessOptions}
              onChange={(e) => handleBusinessSelect(e.target.value)}
              className="mb-6"
            >
              <option value="">Select a business</option>
              {businessOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            <div className="text-sm text-gray-500 dark:text-dark-400">
              <p>Or press ESC to close</p>
            </div>
          </div>
        </TransitionChild>
      </Transition>
    </>
  );
}
