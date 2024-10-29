import { toast } from "@/components/ui/use-toast"

import { getCartUrl, upsertCartApi } from "@/lib/constants"
import { BasketItem, useBasket } from "@/lib/stores/cart-store-state"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export default function getServerCart() {
  const cartStore = useBasket()
  const queryClient = useQueryClient()

  /* const getCartItm = useQuery({
    queryKey: ["get_user_cart"],
    queryFn: async () => {
      const response = await fetch(getCartUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      return await response.json()
    },
  }) */

  async function fetchServerCart(): Promise<any> {
    console.log("Bearer " + localStorage.getItem("token"))
    const response = await fetch(getCartUrl, {
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
    queryKey: ["get_user_cart"],
    queryFn: () => fetchServerCart(),
    // placeholderData: keepPreviousData,
  })
  if (data) {
    console.log("cart Fetched")

    console.log(data)
  }
  if (error) {
    console.log(error)
  }

  return { isLoading, isError, error, data, refetch }
}
