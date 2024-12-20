import { toast } from "@/components/ui/use-toast"

import { upsertCartApi } from "@/lib/constants"
import { BasketItem, useBasket } from "@/lib/stores/cart-store-state"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export default function useServerCart() {
  const cartStore = useBasket()
  const queryClient = useQueryClient()

  const submitFormMutation = useMutation({
    mutationFn: async () => {
      console.log("submitFormMutation run mek")

      const fData = new FormData()

      cartStore.items.map((item, index) => {
        var ite = { id: item.id, quantity: item.quantityInCard }
        fData.append(`cart_items[${index}]`, JSON.stringify(ite))
      })

      // fData.append("cart_tems", JSON.stringify(cartStore.items))

      console.log("this is the form data before submitting")
      console.log(fData)

      const response = await fetch(upsertCartApi, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          //"Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        credentials: "include",

        body: fData,
      })
      return response.json()
    },
    onSuccess: (data) => {
      console.log("cart was upserted")
      console.log(data)
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

  return { submitFormMutation }
}
