'use client'
import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

type AddProductButtonProps = {
  product: Product
}

export default function AddProductButton({ product }: AddProductButtonProps) {
  const addToOrder = useStore((state) => state.addToOrder)
  return (
    <button
      onClick={() => addToOrder(product)}
      className=' bg-indigo-600 hover:bg-indigo-800 text-white w-full p-3 mt-5 uppercase font-bold cursor-pointer'
      type='button'>
      Agregar
    </button>
  )
}
