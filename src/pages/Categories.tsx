import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { Section } from "../components/ui/Section";
import { Dropdown } from "../components/ui/Dropdown";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { PRODUCTS } from "../products";

// Define interfaces
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface ActiveFilters {
  categories: string[];
  priceRanges: string[];
  sortBy: string | null;
}

// Mock data - replace with your actual data

export default function Categories() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    categories: [],
    priceRanges: [],
    sortBy: null,
  });

  const categories = [
    { id: "sound", label: "Sound" },
    { id: "lighting", label: "Lighting" },
    { id: "decor", label: "Decor" },
  ];

  const priceRanges = [
    { id: "under100", label: "Under $100" },
    { id: "100to200", label: "$100 - $200" },
    { id: "over200", label: "Over $200" },
  ];

  const sortOptions = [
    { id: "name", label: "Name" },
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
  ];

  const getActiveFilterCount = () => {
    return (
      activeFilters.categories.length +
      activeFilters.priceRanges.length +
      (activeFilters.sortBy ? 1 : 0)
    );
  };

  return (
    <Section className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Dropdown
          label="Categories"
          isOpen={openDropdown === "categories"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "categories" ? null : "categories")
          }
          count={activeFilters.categories.length}
        >
          <div className="p-2">
            {activeFilters.categories.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setActiveFilters((prev) => ({ ...prev, categories: [] }))
                }
                className="w-full mb-2"
              >
                Clear Categories
              </Button>
            )}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveFilters((prev) => ({
                    ...prev,
                    categories: prev.categories.includes(category.id)
                      ? prev.categories.filter((id) => id !== category.id)
                      : [...prev.categories, category.id],
                  }));
                }}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeFilters.categories.includes(category.id)
                    ? "bg-indigo-50 text-indigo-600"
                    : "hover:bg-gray-50"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </Dropdown>

        <Dropdown
          label="Price Range"
          isOpen={openDropdown === "price"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "price" ? null : "price")
          }
          count={activeFilters.priceRanges.length}
        >
          <div className="p-2">
            {activeFilters.priceRanges.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setActiveFilters((prev) => ({ ...prev, priceRanges: [] }))
                }
                className="w-full mb-2"
              >
                Clear Price Ranges
              </Button>
            )}
            {priceRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => {
                  setActiveFilters((prev) => ({
                    ...prev,
                    priceRanges: prev.priceRanges.includes(range.id)
                      ? prev.priceRanges.filter((id) => id !== range.id)
                      : [...prev.priceRanges, range.id],
                  }));
                }}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeFilters.priceRanges.includes(range.id)
                    ? "bg-indigo-50 text-indigo-600"
                    : "hover:bg-gray-50"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </Dropdown>

        <Dropdown
          label="Sort By"
          isOpen={openDropdown === "sort"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "sort" ? null : "sort")
          }
          count={activeFilters.sortBy ? 1 : 0}
        >
          <div className="p-2">
            {activeFilters.sortBy && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setActiveFilters((prev) => ({ ...prev, sortBy: null }))
                }
                className="w-full mb-2"
              >
                Clear Sort
              </Button>
            )}
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setActiveFilters((prev) => ({
                    ...prev,
                    sortBy: option.id,
                  }));
                }}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeFilters.sortBy === option.id
                    ? "bg-indigo-50 text-indigo-600"
                    : "hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </Dropdown>
      </div>

      {/* Active Filters Count */}
      {getActiveFilterCount() > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setActiveFilters({
              categories: [],
              priceRanges: [],
              sortBy: null,
            });
            setOpenDropdown(null);
          }}
          className="mb-4"
        >
          Clear All Filters ({getActiveFilterCount()})
        </Button>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <Card
            key={product.id}
            href={`/product/${product.id}`}
            image={product.image[0]}
            title={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>

      {PRODUCTS.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No products found matching your criteria.
          </p>
        </div>
      )}
    </Section>
  );
}
