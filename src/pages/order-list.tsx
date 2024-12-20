import CheckoutForm from "@/components/checkout-form"
import CustomerLayout from "@/components/layouts/customer-layout"
import { compareAsc, format } from "date-fns"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import getMyOrdersHook from "@/hooks/get-my-orders"
import useServerCart from "@/hooks/use-server-cart"
import useServerOrder from "@/hooks/use-server-order"
import {
  baseWebUrl,
  generateAdminOrderDetailUrl,
  generateUserOrderDetailUrl,
  loginUrl,
  navigateProductDetailUri,
} from "@/lib/constants"
import { BasketItem, useBasket } from "@/lib/stores/cart-store-state"
import { Divide } from "lucide-react"
import { useState } from "react"
import { MdDelete } from "react-icons/md"

import { useNavigate, useSearchParams } from "react-router-dom"
import AppPagination from "@/components/app-pagination"

export default function OrderPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"))
  const navigate = useNavigate()
  const { data, isLoading } = getMyOrdersHook({ page: page })

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

  return (
    <>
      <CustomerLayout>
        <div className="w-full font-semibold flex items-center justify-center">
          My Orders
        </div>
        {data?.data && (
          <div>
            {data?.data?.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="w-full p-4 border m-2 rounded-lg hover:cursor-pointer "
                  onClick={() => {
                    // console.log(item.id)
                    navigate(generateUserOrderDetailUrl(item.id.toString()))
                  }}
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
              )
            })}

            <AppPagination
              goToPreviousPage={goToPreviousPage}
              goToPage={goToPage}
              goToNextPage={goToNextPage}
              totalPages={data?.last_page}
              currentPage={data?.current_page}
            ></AppPagination>
          </div>
        )}
      </CustomerLayout>
    </>
  )
}
