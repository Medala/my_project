import Layout from "@components/layouts/layout"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  baseApiUrl,
  baseServerUrl,
  createProductPageUrl,
  generateUserOrderDetailApi,
  getAllOrdersApi,
  myProductDetailEditPageUrl,
  myProductListApi,
  navigateProductDetailUri,
  navigateProductEditUri,
  setOrderDetailApi,
  setUserOrderDetailApi,
} from "lib/constants"
import React, { useState } from "react"
import { IoAdd } from "react-icons/io5"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { compareAsc, format } from "date-fns"

import AppPagination from "@components/app-pagination"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import UserProductSearchBar from "@/components/user-product-search-bar"
import {
  AppPaginationInterface,
  PaginatedData,
  PaginatedOrderData,
  ServerOrderData,
} from "@/interface/interface"
import CustomerLayout from "@/components/layouts/customer-layout"
//import getAllOrders from "@/hooks/get-all-orders"

async function getOrderDetail(id: string): Promise<ServerOrderData> {
  console.log("Bearer " + localStorage.getItem("token"))
  const response = await fetch(`${generateUserOrderDetailApi(id)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
  if (!response.ok) {
    console.log(response)
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

const UserOrderDetailPage = () => {
  const navigate = useNavigate()

  //const [searchParams, setSearchParams] = useSearchParams()
  const { id } = useParams()

  const [pagination, setPagination] = useState<AppPaginationInterface>()

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["user-order_detail", id],
    queryFn: () => getOrderDetail(id!),
    // placeholderData: keepPreviousData,
  })
  if (data) {
    console.log("logging the data")
    console.log(data)
  }

  return (
    <>
      <CustomerLayout>
        <div className="px-2">
          <div className=" text-gray-700 flex items-center">
            <div className="font-semibold mr-4">Order ID: {data?.id}</div>
            <div className="px-2 py-1 text-xs rounded-full bg-green-300 shadow-sm">
              {data?.remark}
            </div>
          </div>
          {data && (
            <div>Order date: {format(data?.created_at!, "dd-MM-yyyy")}</div>
          )}
        </div>

        {isLoading ? (
          <p>loading...</p>
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <div className="rounded-lg border m-1 mt-2">
              {data?.ordered_items && (
                <div className="hidden w-full md:grid grid-cols-12 gap-2 border-b font-semibold text-gray-600 px-2  py-1 ">
                  <div className="col-span-8 text-start">Items:</div>
                  <div className="col-span-1 text-center">Price</div>
                  <div className="col-span-1 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
              )}

              {data?.ordered_items.map((_item, index) => {
                // return <div>{_item.title}</div>
                return (
                  <div
                    key={index}
                    className="hidden md:grid w-full  grid-cols-12 gap-2 text-gray-800  py-2 "
                  >
                    <a
                      href={`${navigateProductDetailUri}/${_item.product?.id}`}
                      /*  onClick={() => {
                  navigate(`${navigateProductDetailUri}/${_item.id}`)
                }} */
                      className="col-span-8 hover:underline cursor-pointer "
                    >
                      <div className="w-full grid grid-cols-10 space-x-2">
                        <div className="col-span-1 px-2">
                          <img
                            className="mx-auto col-span-2 w-auto object-contain rounded-sm"
                            src={`${baseServerUrl}/${_item.product?.image_url}`}
                            alt=""
                          />
                        </div>

                        <div className="col-span-7 font-semibold">
                          {_item.product?.title}
                        </div>
                      </div>
                      {/*   <div className="w-full flex">
                                <img
                                    className="basis-2/5 mx-auto w-auto object-contain rounded-lg"
                                    src={`${baseServerUrl}/${_item.image_url}`}
                                    alt=""
                                />
                                <div className="basis-3/5  bg-red-400 w-full">details</div>
                                </div> */}
                    </a>
                    <div className="col-span-1 text-center">
                      <p className="leading-7 [&:not(:first-child)]:mt-1 l ">
                        &#8377; {_item.price}
                      </p>
                    </div>
                    <div className="col-span-1 text-center ">
                      <div className=" basis-1/2 h-min  w-full py-1">
                        {_item.quantity}
                      </div>
                    </div>
                    {_item.price && (
                      <div className="col-span-2 text-center">
                        <p className="leading-7 [&:not(:first-child)]:mt-1">
                          &#8377; {_item.total_item_price}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="md:hidden rounded-lg border m-1 mt-2">
              {data?.ordered_items.map((_item, index) => {
                // return <div>{_item.title}</div>
                return (
                  <div
                    key={index}
                    className="grid w-full  grid-cols-8 gap-2 text-gray-800  py-2 px-2 "
                  >
                    <a
                      href={`${navigateProductDetailUri}/${_item.product?.id}`}
                      /*  onClick={() => {
                  navigate(`${navigateProductDetailUri}/${_item.id}`)
                }} */
                      className="col-span-1 hover:underline cursor-pointer"
                    >
                      <div className="w-full">
                        <div className="">
                          <img
                            className="mx-auto w-auto object-contain rounded-sm"
                            src={`${baseServerUrl}/${_item.product?.image_url}`}
                            alt=""
                          />
                        </div>
                      </div>
                    </a>

                    <div className="col-span-7 grid grid-rows-5">
                      <div className="row-span-2 ">
                        <div className="w-full text-xs line-clamp-2">
                          {_item.product?.title}
                        </div>
                      </div>

                      <div className="row-span-3">
                        <div className="w-full text-xs flex justify-between">
                          <div>Price</div>
                          <div>&#8377; {_item.product?.price}</div>
                        </div>
                        <div className="w-full text-xs flex justify-between">
                          <div>Quantity</div>
                          <div> {_item.quantity}</div>
                        </div>

                        <div className="w-full text-xs flex justify-between">
                          <div>Total</div>
                          <div> {_item.total_item_price}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="rounded-lg border m-1 mt-2">
              <div className="p-2 ">
                <div className="font-semibold text-gray-700">
                  {" "}
                  Order Summary:
                </div>

                <div className="grid grid-cols-2 w-full text-gray-500">
                  <div className="col-span-1 text-start">Subtotal</div>
                  <div className="col-span-1 text-end">
                    {" "}
                    &#8377; {data?.total_price}
                  </div>
                </div>

                <div className="grid grid-cols-2 w-full text-gray-500">
                  <div className="col-span-1 text-start">Shipping charge</div>
                  <div className="col-span-1 text-end">
                    {" "}
                    &#8377; {data?.shipping_charge ?? 0}
                  </div>
                </div>

                <div className="grid grid-cols-2 w-full font-semibold text-gray-600">
                  <div className="col-span-1 text-start">Total</div>
                  <div className="col-span-1 text-end">
                    {" "}
                    &#8377; {data?.total_payable ?? 0}
                  </div>
                </div>
              </div>
            </div>

            <div className="h-20"></div>
          </>
        )}
      </CustomerLayout>
    </>
  )
}

export default UserOrderDetailPage
