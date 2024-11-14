import { toast } from "@/components/ui/use-toast"
import { PaginatedOrderData, ServerOrderData } from "@/interface/interface"

import { getGoogleLoginUrlApi, setMyOrderDetailUrl } from "@/lib/constants"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export default function getGoogleLoginUrlString() {
  const queryClient = useQueryClient()

  async function fetchMyOrder(): Promise<any> {
    console.log("Bearer " + localStorage.getItem("token"))
    const response = await fetch(getGoogleLoginUrlApi, {
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
    queryKey: ["get_google_login_url"],
    queryFn: () => fetchMyOrder(),
    // placeholderData: keepPreviousData,
  })
  if (data) {
    console.log("google login url Fetched")

    console.log(data)
  }
  if (error) {
    console.log(error)
  }

  return { isLoading, isError, error, data, refetch }
}
