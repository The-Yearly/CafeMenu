import { motion } from "framer-motion";
export const OrderSkeletonLoader = () => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="p-4">
        <div className="flex">
            <div className="h-5 bg-gray-300 w-1/3  rounded mb-2"></div>
            <div className="h-7 bg-gray-300 w-24 rounded-full ml-auto"></div>
        </div>
        <div className="h-3 bg-gray-300 w-1/12 rounded mb-2"></div>
        <div className="mt-8 mb-5">
            
            <div className="h-3 bg-gray-300 w-1/5 rounded mb-4"></div>
            <div className="h-3 bg-gray-300 w-1/5 rounded mb-4"></div>
            <div className="h-3 bg-gray-300 w-1/5 rounded mb-4"></div>
        </div>
        <div className="flex">
            <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
            <div className="h-7 bg-gray-300 w-24 rounded ml-auto"></div>
        </div>
      </div>
    </motion.div>
  );
};
