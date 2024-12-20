import { toast } from "@/components/ui/use-toast"
import { User } from "@/interface/interface"

import { googleAuth2UpdertCredentialApi, upsertCartApi } from "@/lib/constants"
import { BasketItem, useBasket } from "@/lib/stores/cart-store-state"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

/* interface CredentialProp {
  credential: string
}
 */
export default function useGoogleAuthMutation(callback: Function) {
  // const cartStore = useBasket()
  const queryClient = useQueryClient()

  const googleAuthMutation = useMutation({
    mutationFn: async (userString: string) => {
      console.log("google auth mutation run mek")

      const fData = new FormData()

      /*  cartStore.items.map((item, index) => {
        var ite = { id: item.id, quantity: item.quantityInCard }
        fData.append(`cart_items[${index}]`, JSON.stringify(ite))
      }) */

      fData.append("credential", userString)

      console.log("this is the form data before submitting")
      console.log(fData)

      const response = await fetch(googleAuth2UpdertCredentialApi, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          //"Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          // Authorization: "Bearer " + localStorage.getItem("token"),
        },
        credentials: "include",

        body: fData,
      })
      return await response.json()
    },
    onSuccess: (data) => {
      console.log("o auth cred was upserted")
      console.log(data)
      callback(data)
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
      console.log("o auth mutation problem")
    },
  })

  return { googleAuthMutation }
}
