import { useParams } from "react-router-dom";
import { PRODUCTS } from "../products";
import { Carousel } from "../components/Carousel";
import { Product } from "../types";
import { motion } from "framer-motion";

function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  const createWhatsAppLink = (product: Product) => {
    const message = encodeURIComponent(
      `Hi, I'm interested in renting:\n\nProduct: ${product.name}\nDescription: ${product.description}\nPrice: ₹${product.price}`
    );
    return `https://wa.me/916300996714?text=${message}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 mt-5 font-poppins"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Carousel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full h-fit rounded-lg overflow-hidden shadow-lg"
        >
          <Carousel images={[...product.image]} />
        </motion.div>

        {/* Right side - Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-semibold text-gray-800 font-poppins">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-indigo-600">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Specifications
              </h3>
              <ul className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-indigo-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {spec}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Rental Information
              </h3>
              <p className="text-gray-700">
                Standard Duration:{" "}
                <span className="font-semibold">
                  {product.rentalDuration.standard}
                </span>
              </p>
              <div className="mt-4">
                <p className="text-gray-700">Pricing:</p>
                <div className="mt-2 space-y-2">
                  {product.rentalDuration.pricing.hourly && (
                    <p className="text-indigo-600 font-semibold">
                      ₹
                      {product.rentalDuration.pricing.hourly.toLocaleString(
                        "en-IN"
                      )}{" "}
                      per hour
                    </p>
                  )}
                  {product.rentalDuration.pricing.daily && (
                    <p className="text-indigo-600 font-semibold">
                      ₹
                      {product.rentalDuration.pricing.daily.toLocaleString(
                        "en-IN"
                      )}{" "}
                      per day
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={createWhatsAppLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mt-6"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 mr-3 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Book Now
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProductDetail;
