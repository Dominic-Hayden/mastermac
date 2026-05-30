"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { dietaryFilters, brands } from "@/lib/data";

interface SearchFilterProps {
  onFilterChange?: (filters: FilterState) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export interface FilterState {
  priceRange: [number, number];
  dietary: string[];
  brands: string[];
  inStock: boolean;
}

export default function SearchFilter({ onFilterChange, isOpen = true, onClose }: SearchFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    dietary: [],
    brands: [],
    inStock: false,
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    dietary: true,
    brands: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleDietaryChange = (diet: string) => {
    const newDietary = filters.dietary.includes(diet)
      ? filters.dietary.filter((d) => d !== diet)
      : [...filters.dietary, diet];
    const newFilters = { ...filters, dietary: newDietary };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    const newFilters = { ...filters, brands: newBrands };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePriceChange = (value: number, type: "min" | "max") => {
    const newRange: [number, number] = type === "min"
      ? [value, filters.priceRange[1]]
      : [filters.priceRange[0], value];
    const newFilters = { ...filters, priceRange: newRange };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      priceRange: [0, 5000],
      dietary: [],
      brands: [],
      inStock: false,
    };
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  const activeFiltersCount = filters.dietary.length + filters.brands.length + (filters.inStock ? 1 : 0);

  return (
    <div className={`bg-white rounded-lg border p-4 ${isOpen ? "block" : "hidden md:block"}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[#38332f]">Filters</h3>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button onClick={clearFilters} className="text-xs text-[#9f583c] hover:underline">
              Clear all ({activeFiltersCount})
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="md:hidden p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-b pb-4 mb-4">
        <button onClick={() => toggleSection("price")} className="flex items-center justify-between w-full py-2">
          <span className="font-medium text-sm">Price Range</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.price ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.price && (
          <div className="mt-3 space-y-3">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-500">Min ($)</label>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(Number(e.target.value), "min")}
                  className="w-full px-2 py-1.5 border rounded text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500">Max ($)</label>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(Number(e.target.value), "max")}
                  className="w-full px-2 py-1.5 border rounded text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dietary Needs */}
      <div className="border-b pb-4 mb-4">
        <button onClick={() => toggleSection("dietary")} className="flex items-center justify-between w-full py-2">
          <span className="font-medium text-sm">Dietary Needs</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.dietary ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.dietary && (
          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            {dietaryFilters.map((diet) => (
              <label key={diet} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="checkbox"
                  checked={filters.dietary.includes(diet)}
                  onChange={() => handleDietaryChange(diet)}
                  className="w-4 h-4 accent-[#43b279] rounded"
                />
                <span className="text-sm text-gray-700">{diet}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-b pb-4 mb-4">
        <button onClick={() => toggleSection("brands")} className="flex items-center justify-between w-full py-2">
          <span className="font-medium text-sm">Brands</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.brands ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.brands && (
          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="w-4 h-4 accent-[#43b279] rounded"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* In Stock Only */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={filters.inStock}
          onChange={(e) => {
            const newFilters = { ...filters, inStock: e.target.checked };
            setFilters(newFilters);
            onFilterChange?.(newFilters);
          }}
          className="w-4 h-4 accent-[#43b279] rounded"
        />
        <span className="text-sm font-medium text-gray-700">In Stock Only</span>
      </label>
    </div>
  );
}
