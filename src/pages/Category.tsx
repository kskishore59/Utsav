import { Search } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { PRODUCTS } from "../products";
import { Product } from "../types";
const createWhatsAppLink = (product: Product) => {
  const message = encodeURIComponent(
    `Hi, I'm interested in renting:\n\nProduct: ${product.name}\nDescription: ${product.description}\nPrice: ₹${product.price}`
  );
  return `https://wa.me/916300996714?text=${message}`;
};
export default function Category() {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const products = category
    ? PRODUCTS.filter((product) => product.category === category)
    : [];
  console.log({
    category,
    availableCategories: Object.keys(PRODUCTS),
    productsForCategory: PRODUCTS[category as keyof typeof PRODUCTS],
  });
  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          {categoryTitle} Equipment
        </h1>

        <div className="relative flex-2 md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product: Product) => (
          <Card
            key={product.id}
            href={`/product/${product.id}`}
            image={product.image[0]}
            title={product.name}
            description={product.description}
            price={product.price}
            onClick={() => window.open(createWhatsAppLink(product), "_blank")}
          />
        ))}
      </div>
    </div>
  );
}
