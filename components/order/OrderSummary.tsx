"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"

export default function OrderSummary() {
  const order = useStore((state) => state.order)
  const total = useMemo(
    () => order.reduce((total, item) => total + (item.quantity * item.price),0),
     [order])
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll bg-white md:w-64 lg:w-96 p-5">
      <h1 className=" text-center text-4xl font-bold">Mi pedido</h1>
      {order.length === 0 ? <p className=" text-center my-10">El carrito esta vacio</p> :
        (
          <div className=" mt-5">
            {order.map(item => (
              <ProductDetails key={item.id} item={item} />
            ))}
          </div>
        )}
      <p className=" text-2xl text-center mt-20">
        Total a pagar: {' '}
        <span className=" font-bold">{formatCurrency(total)}</span>
      </p>
    </aside>
  )
}
