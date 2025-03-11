"use client";
import { CheckCircle,Clock } from "lucide-react";
import { Order } from "./page";
import { motion } from "framer-motion";
import { useEffect } from "react";

export const OrderCard: React.FC<{
  order: Order;
  onComplete?: () => void;
  totalCost: number;
}> = ({ order,totalCost }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className=" bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Order #{order.orderId}
            </h3>
            <p className="text-sm text-gray-600">Table #{order.tableId}</p>
          </div>
          {/* <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "active"
                ? "bg-blue-100 text-blue-800"
                : order.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </div> */}
        </div>

        <div className="space-y-2 mb-4">
          {order.items.map((i) => (
            <div
              key={i.item.itemId}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">
                  {i.quantity}x
                </span>
                <span className="text-sm text-gray-700">{i.item.name}</span>
              </div>
              <span className="text-sm text-gray-600">
                ${(i.item.cost * i.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            {new Date(order.createdAt).toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              Total: ${totalCost.toFixed(2)}
            </span>
            {/* {isActive && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Complete
              </motion.button>
            )} */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Toast: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
    >
      <CheckCircle className="w-5 h-5" />
      {message}
    </motion.div>
  );
};
