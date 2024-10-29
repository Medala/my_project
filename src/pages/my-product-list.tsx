import Layout from "@components/layouts/layout"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  baseApiUrl,
  baseServerUrl,
  createProductPageUrl,
  myProductDetailEditPageUrl,
  myProductListApi,
  navigateProductEditUri,
} from "lib/constants"
import React, { useState } from "react"
import { IoAdd } from "react-icons/io5"
import { useNavigate, useSearchParams } from "react-router-dom"

import AppPagination from "@components/app-pagination"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import UserProductSearchBar from "@/components/user-product-search-bar"
import { AppPaginationInterface, PaginatedData } from "@/interface/interface"

async function fetchMyProducts(page: number): Promise<PaginatedData> {
  console.log("Bearer " + localStorage.getItem("token"))
  const response = await fetch(`${myProductListApi}?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
  if (!response.ok) {
    throw new Error("Something went wrong")
  }
  return response.json()
}

/* function productCardMedium(product: Product) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div>01</div>
      <div>09</div>
    </div>
  )
} */

const MyProductList = () => {
  const navigate = useNavigate()
  function navigateToCreateProduct() {
    navigate(createProductPageUrl)
  }

  const [searchParams, setSearchParams] = useSearchParams()

  function navigateMyProductDetailEditPage(id: number) {
    navigate(navigateProductEditUri + "/" + id)
  }

  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"))
  const [pagination, setPagination] = useState<AppPaginationInterface>()

  function nextPage() {
    console.log(page + " is the current page")
  }

  function goToPage(page: number) {
    setPage(page)
    setSearchParams((params) => {
      params.set("page", page.toString())
      return params
    })
  }

  function goToNextPage() {
    if (data?.current_page != data?.last_page) {
      setPage(page + 1)
      console.log(page)
      //setPage(thisPage++)
      setSearchParams((params) => {
        params.set(
          "page",
          data?.current_page ? (data.current_page + 1).toString() : "1"
        )
        return params
      })
    }
  }

  function goToPreviousPage() {
    if (data?.current_page != 1) {
      setPage(page - 1)
      console.log(page)
      //setPage(thisPage++)
      setSearchParams((params) => {
        params.set(
          "page",
          data?.current_page ? (data.current_page - 1).toString() : "1"
        )
        return params
      })
    }
  }

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchMyProducts(page),
    // placeholderData: keepPreviousData,
  })
  if (data) {
    console.log(data)

    console.log(data.last_page)
  }

  return (
    <>
      <Layout>
        <div className="w-full flex justify-between items-baseline">
          <UserProductSearchBar />
          <div
            typeof="button"
            onClick={navigateToCreateProduct}
            className="hidden rounded border p-2 shadow mr-4 mt-2 cursor-pointer hover:shadow-lg md:flex space-x-1 items-center transition-shadow duration-75"
          >
            <span className="block text-xs">Add Product</span>
            <IoAdd size={22} />
          </div>

          <div
            typeof="button"
            onClick={navigateToCreateProduct}
            className="md:hidden rounded border p-2 shadow mr-4 mt-2 cursor-pointer hover:shadow-lg flex space-x-1 items-center transition-shadow duration-75"
          >
            <IoAdd size={22} />
          </div>
        </div>

        {isLoading ? (
          <p>loading...</p>
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
              {data?.data.map((product) => (
                <div
                  key={product.id}
                  className=" w-full shadow-sm grid grid-cols-12 rounded-lg overflow-hidden"
                >
                  {/*  <div className="col-span-4 h-full aspect-2/3  rounded-l-lg">
                    <img
                      className="h-full aspect-2/3 object-cover rounded-l-lg "
                      src={product.image_url}
                      alt="asdfasdfasdf"
                    ></img>
                  </div> */}
                  <div className="col-span-4 h-full aspect-2/3  rounded-l-lg">
                    <AspectRatio ratio={2 / 3}>
                      <img
                        className="h-full aspect-2/3 object-cover rounded-l-lg "
                        src={`${baseServerUrl}/${product.image_url}`}
                        alt="asdfasdfasdf"
                      ></img>
                    </AspectRatio>
                  </div>
                  <div className="col-span-8  flex flex-col overflow-clip justify-between">
                    <div>
                      <div className="line-clamp-2 px-2 font-semibold text-gray-600 subpixel-antialiased">
                        {product.title}
                      </div>
                      <div className="line-clamp-3 h-full w-full md:line-clamp-2 px-2 pt-2 font-lite text-gray-600 text-sm subpixel-antialiased">
                        {product.description}
                      </div>
                    </div>

                    <div className="flex justify-between mb-2 bg-white">
                      <div className="px-2 font-bold text-gray-700">
                        <span>&#8377; </span>
                        {product.price}
                      </div>
                      <button
                        typeof="button"
                        onClick={() => {
                          navigateMyProductDetailEditPage(product.id)
                        }}
                        className="mr-2 rounded bg-gray-800 text-white text-sm px-3 py-1 shadow hover:shadow-lg"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <AppPagination
              goToPreviousPage={goToPreviousPage}
              goToPage={goToPage}
              goToNextPage={goToNextPage}
              totalPages={data?.last_page}
              currentPage={data?.current_page}
            ></AppPagination>
            <div className="h-20"></div>
          </>
        )}
      </Layout>
    </>
  )
}

export default MyProductList
