import CheckoutForm from "@/components/checkout-form"
import CustomerLayout from "@/components/layouts/customer-layout"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import useServerCart from "@/hooks/use-server-cart"
import {
  baseServerUrl,
  loginUrl,
  navigateProductDetailUri,
} from "@/lib/constants"
import { BasketItem, useBasket } from "@/lib/stores/cart-store-state"
import { Divide } from "lucide-react"
import { useState } from "react"
import { MdDelete } from "react-icons/md"
import { useNavigate } from "react-router-dom"

export default function CartPage() {
  const [showMobileCartQuantity, setShowMobileCartQuantity] = useState(false)
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false)
  const [activeItem, setCurrentItem] = useState<BasketItem>()
  const [activeItemIndex, setCurrentItemIndex] = useState(0)
  const { submitFormMutation } = useServerCart()

  function showQuantityDialogAfterCurrentItem(
    item: BasketItem,
    itemIndex: number
  ) {
    showMobileCartQuantity
      ? setShowMobileCartQuantity(false)
      : setShowMobileCartQuantity(true)
    setCurrentItem(item)
    setCurrentItemIndex(itemIndex)
    if (cartStore.items.length > 0) {
      if (cartStore.items.at(itemIndex)?.quantityInCard! < 1) {
        setShowMobileCartQuantity(false)
      }
    }
  }

  const navigate = useNavigate()
  const cartStore = useBasket()

  function proceedToCheckout() {
    const tok = localStorage.getItem("token")
    if (tok === null) {
      navigate(loginUrl)
    } else {
      setShowCheckoutDialog(true)
    }
  }

  function increaseCartItem(item: BasketItem) {
    cartStore.actions.addBasketItem(item, 1)
    // this gets the cart data from zus stand global state and sends it to the server,
    submitFormMutation.mutate()
  }

  function decreaseCartItem(item: BasketItem) {
    cartStore.actions.removeBasketItem(item)
    // this gets the cart data from zus stand global state and sends it to the server,
    submitFormMutation.mutate()
  }

  function deleteCartItem(item: BasketItem) {
    cartStore.actions.deleteBasketItem(item)
    // this gets the cart data from zus stand global state and sends it to the server,
    submitFormMutation.mutate()
  }

  return (
    <>
      <CustomerLayout>
        {/*    <div>
          <div>This is your shopping cart</div>
          {cartStore.items.map((_item) => {
            return <div>{_item.title}</div>
          })}
        </div> */}

        {cartStore.items.length < 1 && (
          <div className="h-screen w-full  flex justify-center items-center">
            <a
              href="/"
              className="rounded-lg shadow-lg p-2 w-8/12 h-1/4 md:w-3/6 -mt-40  "
            >
              <div className="p-2 font-semibold text-gray-800 grid-rows-5 h-full">
                <div className=" row-span-2">
                  <p>Your cart is empty!</p>
                </div>
                <div className="row-span-3 hover:underline underline-offset-2 h-full cursor-pointer  flex justify-center  items-center">
                  <p>Continue Shopping</p>
                </div>
              </div>
            </a>
          </div>
        )}

        {cartStore.items.length > 0 && (
          <div className="hidden w-full md:grid grid-cols-8 gap-2 font-semibold text-gray-600  py-1 ">
            <div className="col-span-4 text-center">Items</div>
            <div className="col-span-1 text-center">Price</div>
            <div className="col-span-1 text-center">Quantity</div>
            <div className="col-span-1 text-center">Total</div>
            <div className="col-span-1 text-center">Remove</div>
          </div>
        )}

        {cartStore.items.map((_item, index) => {
          // return <div>{_item.title}</div>
          return (
            <div
              key={index}
              className="hidden md:grid w-full  grid-cols-8 gap-2 text-gray-800  py-2 shadow"
            >
              <a
                href={`${navigateProductDetailUri}/${_item.id}`}
                /*  onClick={() => {
                  navigate(`${navigateProductDetailUri}/${_item.id}`)
                }} */
                className="col-span-4 hover:underline cursor-pointer "
              >
                <div className="w-full grid grid-cols-5 space-x-2">
                  <div className="col-span-1 px-2">
                    <img
                      className="mx-auto w-auto object-contain rounded-sm"
                      src={`${baseServerUrl}/${_item.image_url}`}
                      alt=""
                    />
                  </div>

                  <div className="col-span-4 font-semibold">{_item.title}</div>
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
                <p className="leading-7 [&:not(:first-child)]:mt-1 l text-amber-600">
                  &#8377; {_item.price}
                </p>
              </div>
              <div className="col-span-1 text-center flex space-x-1 justify-between">
                <button
                  onClick={() => {
                    //cartStore.actions.removeBasketItem(_item)
                    decreaseCartItem(_item)
                  }}
                  className="shadow basis-1/4 h-8 w-8 rounded-lg text-center hover:shadow-lg "
                >
                  -
                </button>
                <div className="border basis-1/2 h-min rounded-lg w-full py-1">
                  {_item.quantityInCard}
                </div>
                <button
                  onClick={() => {
                    // cartStore.actions.addBasketItem(_item, 1)
                    increaseCartItem(_item)
                  }}
                  className="shadow basis-1/4  h-8 w-8 rounded-lg text-center hover:shadow-lg "
                >
                  +
                </button>
              </div>
              {_item.basketItemPrice && (
                <div className="col-span-1 text-center">
                  <p className="leading-7 [&:not(:first-child)]:mt-1 l text-amber-600">
                    &#8377; {_item.basketItemPrice}
                  </p>
                </div>
              )}
              <button
                onClick={() => {
                  // cartStore.actions.deleteBasketItem(_item)
                  deleteCartItem(_item)
                }}
                className="col-span-1 mx-auto h-min p-2 hover:shadow"
              >
                <MdDelete />
              </button>
            </div>
          )
        })}

        {cartStore.items.length > 0 && (
          <div className="hidden md:flex w-full justify-end text-gray-500">
            <div>
              <div className="mr-4 mt-4 grid grid-cols-2 space-x-4 font-semibold">
                <div>Items Count</div>
                <div>Subtotal</div>
              </div>
              <div className="mr-4 mt-1 grid grid-cols-2 space-x-4 font-semibold">
                <div className="text-center">
                  {cartStore.actions.getTotalItemCount()}
                </div>
                <div className="text-center">
                  <p className="leading-7 [&:not(:first-child)]:mt-1 l text-amber-600">
                    &#8377; {cartStore.invoice.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* start of mobile view */}
        {cartStore.items.map((_item, index) => {
          return (
            <div key={index} className="md:hidden">
              <div className="w-full  m-2 rounded-sm grid grid-cols-5 overflow-hidden shadow-sm ">
                <div className="col-span-1 aspect-square ">
                  <img
                    className="mx-auto w-auto object-contain rounded-sm"
                    src={`${baseServerUrl}/${_item.image_url}`}
                    alt=""
                  />
                </div>
                <div className="col-span-4  ">
                  <div className="line-clamp-2 text-xs p-1">{_item.title}</div>

                  <div className="w-full h-full  p-2 text-xs">
                    <div className="flex justify-between space-x-2">
                      <div className="flex-1">
                        <div>Price:</div>
                        <div className="p-1">
                          <p className="leading-7 [&:not(:first-child)]:mt-1 l text-amber-600">
                            &#8377; {_item.price}
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          showQuantityDialogAfterCurrentItem(_item, index)
                        }}
                        className="flex-1"
                      >
                        <div>Quantity:</div>
                        <div className="w-full border-2 rounded-lg bg-white p-1">
                          {_item.quantityInCard}
                        </div>
                      </div>
                      <div className="flex-1 ">
                        <div className="text-right">Total:</div>
                        <div className="p-1 text-right">
                          <p className="leading-7 [&:not(:first-child)]:mt-1 l text-amber-600">
                            &#8377; {_item.basketItemPrice.toString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1 flex justify-center w-full ">
                        <button
                          onClick={() => {
                            //cartStore.actions.deleteBasketItem(_item)
                            deleteCartItem(_item)
                          }}
                          className="rounded-lg shadow-sm px-4 "
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* end of mobile view */}

        <div className="flex md:hidden justify-end space-x-4 mr-6 text-gray-600   font-semibold">
          <div className="grid grid-rows-2 md:grid-cols-2">
            <div className="text-xs">Item Count</div>
            <div className="text-center">
              {cartStore.actions.getTotalItemCount()}
            </div>
          </div>
          <div className="grid grid-rows-2 md:grid-cols-2">
            <div className="text-xs ">Sub total</div>
            <div className="text-center">
              <p className="leading-7 [&:not(:first-child)]:mt-1 l text-amber-600">
                &#8377; {cartStore.invoice.totalPrice}
              </p>
            </div>
          </div>
        </div>

        {cartStore.items.length > 0 && (
          <div className="fixed bottom-20 md:bottom-8 right-8 ">
            <button
              onClick={() => {
                proceedToCheckout()
              }}
              className="bg-orange-400 hover:bg-orange-500 text-white cursor-pointer rounded-full py-2 px-6 shadow-lg"
            >
              {/*  {isSubmitting ? "Loading..." : "Save"} */}
              Proceed to Checkout
            </button>
          </div>
        )}

        <Dialog
          open={showMobileCartQuantity}
          onOpenChange={setShowMobileCartQuantity}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Item Quantity</DialogTitle>
              <DialogDescription>
                {cartStore.items.at(activeItemIndex)?.quantityInCard.toString()}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="col-span-1 text-center flex space-x-4 justify-between">
                <button
                  onClick={() => {
                    //cartStore.actions.removeBasketItem(_item)
                    if (activeItem !== undefined) {
                      //cartStore.actions.removeBasketItem(activeItem)
                      decreaseCartItem(activeItem)
                    }
                  }}
                  className="flex-1 bg-orange-500 h-8 w-8 rounded-lg text-center hover:shadow-lg "
                >
                  -
                </button>

                <button
                  onClick={() => {
                    if (activeItem !== undefined) {
                      //cartStore.actions.addBasketItem(activeItem, 1)
                      increaseCartItem(activeItem)
                    }
                  }}
                  className="flex-1 bg-orange-500 h-8 w-8 rounded-lg text-center hover:shadow-lg  "
                >
                  +
                </button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
          <DialogContent className="h-screen md:my-4 overflow-auto">
            <CheckoutForm
              totalItemCount={cartStore.actions.getTotalItemCount()}
              totalPayable={cartStore.invoice.totalPrice}
            />
          </DialogContent>
        </Dialog>
      </CustomerLayout>
    </>
  )
}
