import React from "react";
import CartProvider from "@/lib/context/ItemContext";

export default function TableLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const tableId = Number(params.id);
  console.log("params here in layout", tableId);

  return <CartProvider tID={tableId}>{children}</CartProvider>;
}
