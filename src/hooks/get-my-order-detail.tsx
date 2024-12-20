import { toast } from "@/components/ui/use-toast"
import { PaginatedOrderData, ServerOrderData } from "@/interface/interface"

import { setMyOrderDetailUrl } from "@/lib/constants"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export interface MyOrderProps {
  id: number
}

export default function getMyOrderDetail({ id }: MyOrderProps) {
  const queryClient = useQueryClient()

  async function fetchMyOrder(): Promise<any> {
    console.log("Bearer " + localStorage.getItem("token"))
    const response = await fetch(setMyOrderDetailUrl(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      credentials: "include",
    })
    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    return response.json()
  }

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["get_my_order_detail", id],
    queryFn: () => fetchMyOrder(),
    // placeholderData: keepPreviousData,
  })
  if (data) {
    console.log("orders Fetched")

    console.log(data)
  }
  if (error) {
    console.log(error)
  }

  return { isLoading, isError, error, data, refetch }
}
