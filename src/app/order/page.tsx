import React from "react";
import { Metadata } from "next";
import OrderClient from "./OrderClient";

export const metadata: Metadata = {
  title: "How to Order Project 01 | Alkota",
  description:
    "Project 01 production is planned for 2028. Learn how Alkota pre-orders, build priority, specification confirmation and the route from reservation to delivery will work.",
  openGraph: {
    title: "How to Order Project 01 | Alkota",
    description:
      "Project 01 production is planned for 2028. Learn how Alkota pre-orders, build priority, specification confirmation and the route from reservation to delivery will work.",
  },
};

export default function OrderPage() {
  return <OrderClient />;
}
