import Layout from "@components/layouts/layout"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  baseApiUrl,
  baseServerUrl,
  createProductPageUrl,
  generateAdminOrderDetailUrl,
  getAllOrdersApi,
  myProductDetailEditPageUrl,
  myProductListApi,
  navigateProductEditUri,
} from "lib/constants"
import React, { useState } from "react"
import { IoAdd } from "react-icons/io5"
import { useNavigate, useSearchParams } from "react-router-dom"
import { compareAsc, format } from "date-fns"

import AppPagination from "@components/app-pagination"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import UserProductSearchBar from "@/components/user-product-search-bar"
import {
  AppPaginationInterface,
  PaginatedData,
  PaginatedOrderData,
} from "@/interface/interface"
//import getAllOrders from "@/hooks/get-all-orders"

async function getAllOrders(page: number): Promise<PaginatedOrderData> {
  console.log("Bearer " + localStorage.getItem("token"))
  const response = await fetch(`${getAllOrdersApi}?page=${page}`, {
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
  } else {
    console.log("we have the order list")
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

const AllOrderList = () => {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

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
    queryKey: ["get_my_orders", page],
    queryFn: () => getAllOrders(page),
    // placeholderData: keepPreviousData,
  })
  if (data) {
    console.log("logging the data")
    console.log(data)

    console.log(data.last_page)
  }

  return (
    <>
      <Layout>
        <div>orders list</div>

        {isLoading ? (
          <p>loading...</p>
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <div className="flex">
              {data?.data.map((item) => (
                <div
                  onClick={() => {
                    navigate(generateAdminOrderDetailUrl(item.id.toString()))
                  }}
                  key={item.id}
                  className="w-full p-4 border m-2 rounded-lg hover:cursor-pointer "
                >
                  <div className="flex justify-between">
                    <div>Order# {item.id}</div>

                    <div>
                      Order date: {format(item.created_at, "dd-MM-yyyy")}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div>Total: &#8377;{item.total_payable}</div>
                    <div>
                      Status: {item.completed ? "Completed" : "Waiting"}
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

export default AllOrderList
