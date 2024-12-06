import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Dropdown } from "../components/ui/Dropdown";
import { Section } from "../components/ui/Section";
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

export default function AllProducts() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    categories: [],
    priceRanges: [],
    sortBy: null,
  });

  const categories = [
    { id: "sound", label: "Sound And Visuals" },
    { id: "lighting", label: "Lighting" },
    { id: "decor", label: "Decor" },
  ];

  const priceRanges = [
    { id: "under1000", label: "Under ₹1000" },
    { id: "1000to2000", label: "₹1000 - ₹2000" },
    { id: "over2000", label: "Over ₹2000" },
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

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handlePriceRangeChange = (range: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      priceRanges: prev.priceRanges.includes(range)
        ? prev.priceRanges.filter((r) => r !== range)
        : [...prev.priceRanges, range],
    }));
  };

  const handleSortChange = (value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      sortBy: value || null,
    }));
  };

  // Apply filters to your products
  const filteredProducts = useMemo(() => {
    // Start with the original products array
    let filtered = [...PRODUCTS];

    // Apply category filters
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        activeFilters.categories.includes(product.category)
      );
    }

    // Apply price range filters
    if (activeFilters.priceRanges.length > 0) {
      filtered = filtered.filter((product) => {
        const productPrice = product.price;
        return activeFilters.priceRanges.some((range) => {
          if (range === "under1000") return productPrice < 1000;
          if (range === "1000to2000")
            return productPrice >= 1000 && productPrice <= 2000;
          if (range === "over2000") return productPrice > 2000;
          return false;
        });
      });
    }

    // Apply sorting
    if (activeFilters.sortBy) {
      filtered.sort((a, b) => {
        if (activeFilters.sortBy === "price-asc") {
          return a.price - b.price;
        }
        if (activeFilters.sortBy === "price-desc") {
          return b.price - a.price;
        }
        if (activeFilters.sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
    }

    // Ensure uniqueness by using product IDs
    return Array.from(
      new Map(filtered.map((item) => [item.id, item])).values()
    );
  }, [PRODUCTS, activeFilters]);

  return (
    <Section className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8"></div>
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
                onClick={() => handleCategoryChange(category.id)}
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
                onClick={() => handlePriceRangeChange(range.id)}
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
                onClick={() => handleSortChange(option.id)}
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
        {filteredProducts.map((product) => {
          console.log(product);
          return (
            <Card
              key={product.id}
              href={`/products/${product.id}`}
              image={product.image[0]}
              title={product.name}
              description={product.description}
              price={product.price}
            />
          );
        })}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No products found matching your criteria.
          </p>
        </div>
      )}
    </Section>
  );
}
