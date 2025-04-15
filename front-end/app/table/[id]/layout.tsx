import React from "react";
import CartProvider from "@/lib/context/ItemContext";
import { OrderProvider } from "@/lib/context/ordersContext";

export default function TableLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const tableId = Number(params.id);
  return (
    <CartProvider tID={tableId}>
      <OrderProvider>{children}</OrderProvider>
    </CartProvider>
  );
}
