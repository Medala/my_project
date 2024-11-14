import { toast } from "@/components/ui/use-toast"
import { PaginatedOrderData, ServerOrderData } from "@/interface/interface"

import { getMyOrdersApi } from "@/lib/constants"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export interface MyOrderProps {
  page: number
}

export default function getMyOrdersHook({ page }: MyOrderProps) {
  const queryClient = useQueryClient()

  async function fetchMyOrders(page: number): Promise<PaginatedOrderData> {
    console.log("Bearer " + localStorage.getItem("token"))
    const response = await fetch(`${getMyOrdersApi}?page=${page}`, {
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

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["get_my_orders", page],
    queryFn: () => fetchMyOrders(page),
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
