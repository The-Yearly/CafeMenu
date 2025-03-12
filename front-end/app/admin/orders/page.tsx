"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Search,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";
import { OrderCard, Toast } from "./OrderCard";
import { Modal } from "./Modal";
import axios from "axios";
import { Item } from "@/lib/types";

export interface Order {
  tableId: number;
  orderId: number;
  totalCost: number;
  createdAt: string;
  items: [
    {
      item: Item;
      quantity: number;
    }
  ];
}

const ITEMS_PER_PAGE = 8;

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [statusFilter, setStatusFilter] = useState<
  //   "all" | "active" | "completed"
  // >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get("https://cafe-menu-green.vercel.app/orders");
      console.log(response.data.response)
      if (response.status != 200) {
        setOrders([]);
      } else {
        setOrders(response.data.response);
      }
    };

    getOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      String(order.orderId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(order.tableId).toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesStatus =
    //   statusFilter === "all" || order.createdAt === statusFilter;
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
/*
  const handleCompleteOrder = (order: Order) => {
    setSelectedOrder(order);
  };
*/
  const confirmCompleteOrder = () => {
    if (!selectedOrder) return;

    setOrders(
      orders.map((order) =>
        order.orderId === selectedOrder.orderId
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
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-primary"
            />
          </div>
          {/* <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | "active" | "completed")
            }
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-primary "
          >
            <option value="all">All Orders</option>
            <option value="active">Active Orders</option>
            <option value="completed">Completed Orders</option>
          </select> */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
        <AnimatePresence>
          {paginatedOrders.map((order) => (
            <OrderCard
              key={order.orderId}
              order={order}
              totalCost={order.totalCost}
              // onComplete={
              //   order.status === "active"
              //     ? () => handleCompleteOrder(order)
              //     : undefined
              // }
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
                Are you sure you want to mark Order #{selectedOrder?.orderId} as
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
