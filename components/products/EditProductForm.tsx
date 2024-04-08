"use client"
import { createProduct } from '@/actions/create-product'
import { ProductSchema } from '@/src/schema'
import { error } from 'console'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

export default function EditProductForm({ children }: { children: React.ReactNode }) {
  const router= useRouter()
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      price: formData.get('price'),
      categoryId: formData.get('categoryId'),
      image: formData.get('image')
    }
    const result = ProductSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach(issue => {
        toast.error(issue.message)
      })
    }

    const response = await createProduct(result.data)
    if (response?.errors) {
      response.errors.forEach(issue => {
        toast.error(issue.message)
      })
    }
    toast.success('Producto Creado')
    router.push('/admin/products')
  }
  return (
    <div className=' bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto'>
      <form action={handleSubmit}
        className=' space-y-5'
      >
        {children}
        <input
          type="submit"
          value={'Guardar Cambios'}
          className=' bg-indigo-600 hover:bg-indigo-800 text-white w-full p-3 uppercase font-bold cursor-pointer m-3'
        />
      </form>
    </div>
  )
}
