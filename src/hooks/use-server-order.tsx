import { toast } from "@/components/ui/use-toast"

import { upsertOrderApi } from "@/lib/constants"
import { BasketItem, useBasket } from "@/lib/stores/cart-store-state"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export default function useServerOrder(functionToRun: () => void) {
  const cartStore = useBasket()
  const queryClient = useQueryClient()

  const sumbitOrderMutation = useMutation({
    mutationFn: async () => {
      console.log("submitFormMutation run mek")

      const fData = new FormData()

      fData.append("cart_tems", "apple")

      console.log("this is the form data before submitting")
      //console.log(fData)

      const response = await fetch(upsertOrderApi, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          //"Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        body: fData,
      })
      return response.json()
    },
    onSuccess: (data) => {
      console.log("Order was upserted")
      console.log(data)
      if (data["success"] === true) {
        console.log("clear the local basket later")
        cartStore.actions.clearBasket()
        functionToRun()
      }

      // TODO
      // delete local car from cartStore
      /* toast({
        description: "problem with cart upsert",
      }) */
      //TODO
      //reload home data after submit
      queryClient.invalidateQueries()
      //  kfyjkfgyjfghyjk
    },

    onError: (errors) => {
      console.log(errors)
      console.log("problem updating cart")
    },
  })

  return { sumbitOrderMutation }
}
