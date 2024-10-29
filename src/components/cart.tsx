import getServerCart from "@/hooks/get-server-cart"
import getServercart from "@/hooks/get-server-cart"
import { useBasket } from "@/lib/stores/cart-store-state"
import { get } from "http"
import React from "react"
import { PiShoppingCartLight } from "react-icons/pi"

interface CartProperty {
  cartColor: string | undefined
}

const CartComponent = ({ cartColor }: CartProperty) => {
  //  run auth chek, and get cart data

  const cartStore = useBasket()
  return (
    <div className="p-2 cursor-pointer relative">
      {cartStore.items.length > 0 && (
        <div className=" bg-orange-600 hover:bg-orange-500 text-white rounded-full text-xs absolute -top-1 -right-2">
          {/* <div className="min-w-4 px-2 py-1">{cartStore.totalItemsCount}</div> */}
          <div className="min-w-4 px-2 py-1">
            {cartStore.actions.getTotalItemCount().toString()}
          </div>
        </div>
      )}
      <PiShoppingCartLight color={cartColor} size={24} />
    </div>
  )
}

export default CartComponent
