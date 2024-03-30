"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {
  const order = useStore((state) => state.order)
  const total = useMemo(
    () => order.reduce((total, item) => total + (item.quantity * item.price), 0),
    [order])

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }
   
    const result = OrderSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach((issues) => {
        toast.error(issues.message)
      })
      return
    }
    const response= await createOrder(data)
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }
  }
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll bg-white md:w-64 lg:w-96 p-5">
      <h1 className=" text-center text-4xl font-bold">Mi pedido</h1>
      {order.length === 0 ? <p className=" text-center my-10">El pedido esta vacio</p> :
        (
          <div className=" mt-5">
            {order.map(item => (
              <ProductDetails key={item.id} item={item} />
            ))}
            <p className=" text-2xl text-center mt-20">
              Total a pagar: {' '}
              <span className=" font-bold">{formatCurrency(total)}</span>
            </p>
            <form action={handleCreateOrder}
              className=" w-full mt-10 space-y-5">
              <input type="text"
                className=" bg-white border border-gray-100 w-full p-2"
                name="name"
                placeholder="Tu Nomber"
              />
              <input
                type="submit"
                className=" py-2 rounded font-bold uppercase text-white bg-black w-full text-center cursor-pointer"
                value="Confirmar Pedido" />
            </form>
          </div>

        )}

    </aside>
  )
}
