import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store";
import { Calendar, DollarSign, Search, SlidersHorizontal } from "lucide-react";
import { Product } from "../types";

const PRODUCTS = {
  sound: [
    {
      id: "sound-1",
      name: "Professional PA System",
      category: "sound",
      price: 200,
      image:
        "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80",
      description: "Complete PA system suitable for medium to large venues",
      available: true,
    },
    {
      id: "sound-2",
      name: "Wireless Microphone Set",
      category: "sound",
      price: 50,
      image:
        "https://images.unsplash.com/photo-1546464677-c25cd52c5934?auto=format&fit=crop&q=80",
      description: "Professional wireless microphone system with 4 mics",
      available: true,
    },
  ],
  lighting: [
    {
      id: "light-1",
      name: "LED Par Lights Set",
      category: "lighting",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1504509546545-e000b4a62425?auto=format&fit=crop&q=80",
      description: "Set of 8 LED par lights with DMX controller",
      available: true,
    },
    {
      id: "light-2",
      name: "Moving Head Lights",
      category: "lighting",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80",
      description: "Professional moving head lights with various effects",
      available: true,
    },
  ],
  decor: [
    {
      id: "decor-1",
      name: "LED Backdrop",
      category: "decor",
      price: 300,
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80",
      description: "Stunning LED backdrop for events and weddings",
      available: true,
    },
    {
      id: "decor-2",
      name: "Party Decoration Set",
      category: "decor",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80",
      description: "Complete decoration set for parties and events",
      available: true,
    },
  ],
};

const createWhatsAppLink = (product: Product) => {
  const message = encodeURIComponent(
    `Hi, I'm interested in renting:\n\nProduct: ${product.name}\nDescription: ${product.description}\nPrice: ₹${product.price}`
  );
  return `https://wa.me/916300996714?text=${message}`;
};

export default function Category() {
  const { category } = useParams<{ category: keyof typeof PRODUCTS }>();
  // const addToCart = useStore((state) => state.addToCart);
  const [selectedDays, setSelectedDays] = React.useState<
    Record<string, number>
  >({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState<"all" | "asc" | "desc">("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<
    "all" | "available" | "unavailable"
  >("all");

  const products = category ? PRODUCTS[category] || [] : [];
  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) => {
      if (availabilityFilter === "all") return true;
      return availabilityFilter === "available"
        ? product.available
        : !product.available;
    })
    .sort((a, b) => {
      if (priceFilter === "asc") return a.price - b.price;
      if (priceFilter === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          {categoryTitle} Equipment
        </h1>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-8 p-4 bg-gray-50 rounded-md space-y-4">
          <div>
            <h2 className="font-semibold mb-2">Price</h2>
            <div className="flex space-x-4">
              {["all", "asc", "desc"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setPriceFilter(filter as typeof priceFilter)}
                  className={`px-4 py-2 rounded-md ${
                    priceFilter === filter
                      ? "bg-indigo-600 text-white"
                      : "bg-white border border-gray-300"
                  }`}
                >
                  {filter === "asc"
                    ? "Low to High"
                    : filter === "desc"
                    ? "High to Low"
                    : "Default"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Availability</h2>
            <div className="flex space-x-4">
              {["all", "available", "unavailable"].map((filter) => (
                <button
                  key={filter}
                  onClick={() =>
                    setAvailabilityFilter(filter as typeof availabilityFilter)
                  }
                  className={`px-4 py-2 rounded-md ${
                    availabilityFilter === filter
                      ? "bg-indigo-600 text-white"
                      : "bg-white border border-gray-300"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="flex items-center text-gray-900 mb-4">
                <DollarSign className="h-5 w-5 text-indigo-600" />
                <span className="font-semibold">${product.price}/day</span>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <select
                  value={selectedDays[product.id] || 1}
                  onChange={(e) =>
                    setSelectedDays({
                      ...selectedDays,
                      [product.id]: parseInt(e.target.value),
                    })
                  }
                  className="form-select rounded-md border-gray-300"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((days) => (
                    <option key={days} value={days}>
                      {days} day{days > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-900">
                    ₹{product.price}
                  </p>
                  <a
                    href={createWhatsAppLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 mr-2 fill-current"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Book Now
                  </a>
                </div>
                <div className="mt-2 text-sm">
                  <span
                    className={`${
                      product.available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.available ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
