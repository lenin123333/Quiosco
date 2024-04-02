import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { products } from "@/prisma/data/products";
import { prisma } from "@/src/lib/prisma";

async function searchProduct(searchTerm: string) {

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    },
    include: {
      category: true
    }
  })
  return products
}

export default async function page({ searchParams }: { searchParams: { search: string } }) {

  const products = await searchProduct(searchParams.search)
  return (
    <>
      <Heading>Resultado de Busqueda: {searchParams.search}</Heading>
      <div className=' flex flex-col gap-5 lg:flex-row lg:justify-end'>
        <ProductSearchForm />
      </div>
      {products.length?(
 <ProductTable products={products} />
      ):<p className=" text-center text-lg">No se Encontraron Resultados</p>}
     
    </>
  )
}
