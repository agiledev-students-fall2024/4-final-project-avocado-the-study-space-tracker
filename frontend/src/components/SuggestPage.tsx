import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filters from "./Filters";
import { useMyStores } from "@/context/StoresContext";
import { FiltersType } from "@/types";
import { FilterStringTypes } from "@/types";
import { suggestStores } from "@/lib/utils";
import useStores from "@/hooks/useStores";

const filterDescriptions: Record<FilterStringTypes, string> = {
  Brand: "Select specific retailers and boutiques",
  "Price Range": "Filter stores by typical price points from budget to luxury",
  Category: "Browse by store type like clothing, accessories, beauty and more",
  Rating:
    "Sort by Google review ratings from 1 to 5 stars and number of ratings",
};

const filterToCamelCase: Record<FilterStringTypes, keyof FiltersType> = {
  Brand: "brand",
  "Price Range": "priceRange",
  Category: "category",
  Rating: "rating",
};

const filterNames: FilterStringTypes[] = [
  "Brand",
  "Price Range",
  "Category",
  "Rating",
];

export default function SuggestPage() {
  const { stores, loading, error } = useStores();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentFilter, setCurrentFilter] =
    useState<FilterStringTypes>("Brand");
  const {
    clearFilters,
    toggleFilter,
    setRatingFilter,
    isAnyFilterApplied,
    filters,
  } = useMyStores();

  const navigate = useNavigate();

  const handleGenerateStores = () => {
    if (error || loading) return;
    const suggestedStores = suggestStores(stores, filters);
    navigate("/", {
      state: {
        suggestedStores: suggestedStores,
        openSearchBar: true,
      },
    });
  };

  useEffect(() => {
    const priceRangeFilters = getFilterValuesFromURL("priceRange");
    priceRangeFilters.forEach((priceRange) =>
      toggleFilter("priceRange", priceRange)
    );
    const brandFilters = getFilterValuesFromURL("brand");
    brandFilters.forEach((brand) => toggleFilter("brand", brand));
    const categoryFilters = getFilterValuesFromURL("category");
    categoryFilters.forEach((category) => toggleFilter("category", category));
    const ratingFilterArr = getFilterValuesFromURL("rating");
    if (ratingFilterArr.length > 0)
      setRatingFilter("rating", +ratingFilterArr[0]);
    const numRatingsFilterArr = getFilterValuesFromURL("numRatings");
    if (numRatingsFilterArr.length > 0)
      setRatingFilter("numRatings", +numRatingsFilterArr[0]);

    if (
      priceRangeFilters.length === 0 &&
      brandFilters.length === 0 &&
      categoryFilters.length === 0 &&
      ratingFilterArr.length === 0 &&
      numRatingsFilterArr.length === 0
    ) {
      const currentParams = new URLSearchParams(searchParams);

      filters.brand.forEach((brand) => {
        if (!currentParams.getAll("brand").includes(brand)) {
          currentParams.append("brand", brand);
        }
      });

      filters.category.forEach((category) => {
        if (!currentParams.getAll("category").includes(category)) {
          currentParams.append("category", category);
        }
      });

      filters.priceRange.forEach((priceRange) => {
        if (!currentParams.getAll("priceRange").includes(priceRange)) {
          currentParams.append("priceRange", priceRange);
        }
      });

      if (filters.rating)
        currentParams.set("rating", filters.rating.toString());
      if (filters.numRatings)
        currentParams.set("numRatings", filters.numRatings.toString());

      setSearchParams(currentParams);
    }
  }, []);

  const toggleFilterURL = (filterType: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams);
    const currentValues = currentParams.getAll(filterType);

    if (currentValues.includes(value)) {
      currentParams.delete(filterType);
      currentValues
        .filter((v) => v !== value)
        .forEach((v) => {
          currentParams.append(filterType, v);
        });
    } else {
      currentParams.append(filterType, value);
    }

    setSearchParams(currentParams);
  };

  const getFilterValuesFromURL = (filterType: string): string[] => {
    return searchParams.getAll(filterType);
  };

  const handleSearchOrRatingURL = (filter: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams);
    if (value !== "") {
      currentParams.set(filter, value);
    } else {
      currentParams.delete(filter);
    }
    setSearchParams(currentParams);
  };

  const handleClearFilters = () => {
    clearFilters(currentFilter);
    const currentParams = new URLSearchParams(searchParams);
    currentParams.delete(filterToCamelCase[currentFilter]);
    if (currentFilter === "Rating") currentParams.delete("numRatings");
    setSearchParams(currentParams);
  };

  return (
    <div className="flex flex-col">
      <nav className="flex justify-around p-4">
        {filterNames.map((filter) => (
          <button
            key={filter}
            onClick={() => setCurrentFilter(filter)}
            className={`py-2 px-4 font-bold cursor-pointer text-lg border rounded
                ${filter === currentFilter ? "bg-green-600 text-white font-bold text-xl" : "hover:bg-gray-200"} 
                transition duration-200`}
          >
            {filter}
          </button>
        ))}
      </nav>
      <main className="flex-1  p-6 overflow-y-auto">
        <div className="flex justify-center mb-5">
          <Button
            onClick={handleClearFilters}
            variant={"destructive"}
          >
            Clear Filters
          </Button>
        </div>
        <Filters
          getFilterValuesFromURL={getFilterValuesFromURL}
          toggleFilterURL={toggleFilterURL}
          handleSearchOrRatingURL={handleSearchOrRatingURL}
          currentFilter={currentFilter}
        />
        <div className="mt-6">
            <div className="flex justify-center">
            <Button
              className="bg-green-600 border-green-700"
              onClick={handleGenerateStores}
              disabled={!isAnyFilterApplied}
            >
              Generate Stores
            </Button>
            </div>
        </div>
      </main>
    </div>
  );
}
