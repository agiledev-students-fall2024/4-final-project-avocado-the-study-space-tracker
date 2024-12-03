import { Button } from "./ui/button";
import type { FiltersType, PriceRange } from "@/types";
import { useMyStores } from "@/context/StoresContext";

const styles = {
  container: "flex flex-col gap-4 p-4 bg-gray-50 rounded-lg shadow-md",
  button: "text-lg font-semibold text-left w-full py-4 px-3 rounded-lg transition-colors",
  activeButton: "bg-green-600 text-white hover:bg-green-700",
  inactiveButton: "bg-gray-200 text-gray-800 hover:bg-gray-300",
};

const priceRangeToDollarIcons: Record<PriceRange, number> = {
  Budget: 1,
  "Mid-Range": 2,
  Premium: 3,
  Luxury: 5,
};

type Props = {
  handleFilterClick: (filter: keyof FiltersType, filterValue: string) => void;
};

export default function PriceRangeFilters({ handleFilterClick }: Props) {
  const priceRanges = ["Budget", "Mid-Range", "Premium", "Luxury"];
  const { filterIsApplied } = useMyStores();

  const priceRangeButtons = priceRanges.map((priceRange) => (
    <Button
      key={priceRange}
      onClick={() => handleFilterClick("priceRange", priceRange)}
      className={`${styles.button} ${
        filterIsApplied("priceRange" as keyof FiltersType, priceRange)
          ? styles.activeButton
          : styles.inactiveButton
      }`}
    >
      {priceRange} ({"$".repeat(priceRangeToDollarIcons[priceRange as PriceRange])})
    </Button>
  ));

  return <div className={styles.container}>{priceRangeButtons}</div>;
}
