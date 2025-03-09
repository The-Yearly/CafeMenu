"use client";
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// interface Orders {
//   orderId: number;
//   tableId: number;
//   totalCost: number;
//   createdAt: string;
// }
// interface OrderItem {
//   orderId: number;
//   itemId: number;
//   quantity: number;
// }
// export default function ViewOrders() {
//   const [orders, setOrders] = useState<Orders[] | null>(null);
//   const [orderItem, setOrderItem] = useState<OrderItem[] | null>(null);
//   const [foodData, setFoodData] = useState<{ [key: number]: string } | null>(
//     null
//   );
//   const [deleId, setDeleId] = useState(0);
//   const [trackDelete, setTrackDelete] = useState(0);
//   useEffect(() => {
//     const deleteId = async () => {
//       if (deleId != 0) {
//         const res = await fetch(
//           "http://localhost:3001/api/v1/completeOrder/" + deleId
//         );
//         console.log(res);
//         if (res.status == 200) {
//           setTrackDelete(trackDelete + 1);
//           toast("Order Has Been Completed");
//         }
//       }
//     };
//     deleteId();
//   }, [deleId]);
//   useEffect(() => {
//     const getOrders = async () => {
//       console.log("s");
//       const res = await fetch("http://localhost:3001/api/v1/orders");
//       const resjson = await res.json();
//       setOrders(resjson.orders);
//       setOrderItem(resjson.items);
//     };
//     getOrders();
//   }, [trackDelete]);
//   useEffect(() => {
//     const getOrders = async () => {
//       const res = await fetch("http://localhost:3001/api/v1/orders");
//       const resjson = await res.json();
//       setOrders(resjson.orders);
//       setOrderItem(resjson.items);
//     };
//     const i = setInterval(getOrders, 30000);
//     return () => clearInterval(i);
//   }, [trackDelete]);
//   useEffect(() => {
//     const fetchFood = async () => {
//       const res = await fetch("http://localhost:3001/api/v1/allitems");
//       const data = await res.json();
//       setFoodData(data.items);
//     };
//     fetchFood();
//   }, []);
//   if (
//     orders != null &&
//     orderItem != null &&
//     foodData != null &&
//     orders.length != 0
//   ) {
//     console.log(orders);
//     return (
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">Active Orders</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {orders.map((order) => (
//             <div
//               key={order.orderId}
//               className="modal p-4 shadow-md rounded-lg border"
//             >
//               <h2 className="text-lg font-semibold mb-2  text-primary dark:text-text ">
//                 Table {order.tableId} #{order.orderId}
//               </h2>
//               <ul className="list-disc pl-5">
//                 {orderItem.map((item) =>
//                   item.orderId == order.orderId ? (
//                     <li
//                       key={item.itemId}
//                       className="text-gray-600 dark:text-gray-300"
//                     >
//                       {foodData[item.itemId]} x {item.quantity}
//                     </li>
//                   ) : null
//                 )}
//               </ul>
//               <button
//                 onClick={() => {
//                   setDeleId(order.orderId);
//                 }}
//                 className="w-[4vw] h-[2vw] bg-blue-500  text-primary dark:text-text  py-2 rounded-md hover:bg-blue-600"
//               >
//                 Done
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   } else {
//     return <h2 className="font-semibold">No Active Orders</h2>;
//   }
// }

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  RefreshCcw,
  CheckCircle,
} from "lucide-react";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: "active" | "completed" | "cancelled";
  createdAt: string;
  completedAt?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={
              isMobile
                ? { opacity: 1, y: "100%" }
                : { opacity: 0, scale: 0.95, y: 20 }
            }
            animate={
              isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              isMobile
                ? { opacity: 1, y: "100%" }
                : { opacity: 0, scale: 0.95, y: 20 }
            }
            transition={{ duration: 0.2 }}
            className={`fixed z-50 bg-white overflow-hidden
              ${
                isMobile
                  ? "bottom-0 left-0 right-0 rounded-t-xl max-h-[90vh] overflow-y-auto"
                  : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-xl shadow-xl"
              }`}
          >
            <div className="sticky top-0 flex justify-between items-center border-b border-gray-200 p-4 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Toast: React.FC<{ message: string; onClose: () => void }> = ({
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

const OrderCard: React.FC<{
  order: Order;
  onComplete?: () => void;
}> = ({ order, onComplete }) => {
  const totalCost = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const isActive = order.status === "active";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Order #{order.id}
            </h3>
            <p className="text-sm text-gray-600">Table #{order.tableId}</p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "active"
                ? "bg-blue-100 text-blue-800"
                : order.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">
                  {item.quantity}x
                </span>
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm text-gray-600">
                ${(item.price * item.quantity).toFixed(2)}
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
            {isActive && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Complete
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const initialOrders: Order[] = [
  {
    id: "ORD001",
    tableId: "T1",
    items: [
      { id: 1, name: "Margherita Pizza", quantity: 2, price: 12.99 },
      { id: 2, name: "Coca Cola", quantity: 3, price: 2.5 },
    ],
    status: "active",
    createdAt: "2024-03-10T14:30:00Z",
  },
  {
    id: "ORD002",
    tableId: "T3",
    items: [
      { id: 3, name: "Chicken Burger", quantity: 1, price: 9.99 },
      { id: 4, name: "French Fries", quantity: 2, price: 3.99 },
    ],
    status: "active",
    createdAt: "2024-03-10T14:45:00Z",
  },
  {
    id: "ORD003",
    tableId: "T2",
    items: [
      { id: 5, name: "Caesar Salad", quantity: 1, price: 8.99 },
      { id: 6, name: "Iced Tea", quantity: 1, price: 2.99 },
    ],
    status: "completed",
    createdAt: "2024-03-10T13:15:00Z",
    completedAt: "2024-03-10T13:45:00Z",
  },
  {
    id: "ORD004",
    tableId: "T4",
    items: [
      { id: 7, name: "Pasta Carbonara", quantity: 2, price: 14.99 },
      { id: 8, name: "Garlic Bread", quantity: 1, price: 4.99 },
    ],
    status: "completed",
    createdAt: "2024-03-10T12:30:00Z",
    completedAt: "2024-03-10T13:15:00Z",
  },
];

const ITEMS_PER_PAGE = 8;

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "completed"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate fetching new orders
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.tableId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCompleteOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const confirmCompleteOrder = () => {
    if (!selectedOrder) return;

    setOrders(
      orders.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              status: "completed",
              completedAt: new Date().toISOString(),
            }
          : order
      )
    );
    setSelectedOrder(null);
    setToast("Order marked as completed");
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Orders</h1>
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-600">
            <RefreshCcw className="w-5 h-5 animate-spin" />
            <span className="text-sm">Refreshing...</span>
          </div>
        )}
      </div>

      <div className="grid gap-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by Order ID or Table ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | "active" | "completed")
            }
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Orders</option>
            <option value="active">Active Orders</option>
            <option value="completed">Completed Orders</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
        <AnimatePresence>
          {paginatedOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onComplete={
                order.status === "active"
                  ? () => handleCompleteOrder(order)
                  : undefined
              }
            />
          ))}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title="Complete Order"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 text-gray-600">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <div>
              <h3 className="font-medium">Confirm Order Completion</h3>
              <p className="text-sm text-gray-600 mt-1">
                Are you sure you want to mark Order #{selectedOrder?.id} as
                completed?
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setSelectedOrder(null)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmCompleteOrder}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Complete Order
            </button>
          </div>
        </div>
      </Modal>

      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
