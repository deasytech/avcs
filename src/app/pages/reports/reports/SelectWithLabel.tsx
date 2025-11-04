import { Select } from "@/components/ui";

const SelectWithLabel = () => {
  return (
    <div className="max-w-xl">
      <Select
        label=""
        defaultValue="Potato"
        data={[
          "All Transactions",
          "Transactions by Sector",
          "Transactions by Region",
          "Transactions by Business"
        ]}
      />
    </div>
  );
};

export { SelectWithLabel };
