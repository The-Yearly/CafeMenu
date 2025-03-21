import { motion, AnimatePresence } from "framer-motion";
import { Item } from "@/lib/types";
export default function ProductCard(props:{item:Item}){
    const product=props.item
    return(
          <AnimatePresence>
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 md:h-56">
                  <img
                    src={product.image}
                    alt={product.name}
                    className=" h-full w-full object-cover text-gray-600 dark:text-gray-700"
                  />
                  <div className="absolute bottom-2 left-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.availability
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.availability ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="font-semibold text-blue-600">
                      ${product.cost.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {product.bio}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {product.category}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
          </AnimatePresence>
    )
}