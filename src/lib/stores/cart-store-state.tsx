import CartComponent from "@/components/cart"
import { CartItem, Product } from "@/interface/interface"
import { Item } from "@radix-ui/react-select"
import { subtle } from "crypto"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export interface BasketItem extends Product {
  quantityInCard: number
  basketItemPrice: number
}

interface Basket {
  items: BasketItem[]

  invoice: {
    totalPrice: number
  }

  actions: {
    addBasketItem: (item: BasketItem, addedQuantity: number) => void
    removeBasketItem: (item: BasketItem) => void
    deleteBasketItem: (item: BasketItem) => void
    clearBasket: () => void
    getTotalItemCount: () => number
  }
}

export const useBasket = create(
  persist<Basket>(
    (set, get) => ({
      items: [],
      totalItemsCount: 0,
      invoice: {
        totalPrice: 0,
      },

      actions: {
        addBasketItem: (item, addedQuantity) => {
          const alreadyExist = get().items.some((_item) => _item.id == item.id)
          console.log("trying to find the problem 1")
          if (alreadyExist) {
            return set((oldBasket) => ({
              invoice: {
                totalPrice:
                  oldBasket.invoice.totalPrice + item.price * addedQuantity,
              },
              items: oldBasket.items.map((_item) => {
                if (_item.id == item.id) {
                  let totalQuantity = _item.quantityInCard + addedQuantity
                  let subTotal = totalQuantity * item.price
                  console.log("trying to find the problem")
                  console.log(totalQuantity)
                  console.log(subTotal)
                  return {
                    ..._item,
                    quantityInCard: totalQuantity,
                    basketItemPrice: subTotal,
                  }
                }
                return _item
              }),
            }))
          }

          set((oldBasket) => ({
            invoice: {
              totalPrice:
                oldBasket.invoice.totalPrice + item.price * addedQuantity,
            },
            items: [
              ...oldBasket.items,
              {
                ...item,
                quantityInCard: addedQuantity,
                basketItemPrice: item.price * addedQuantity,
              },
            ],
            // total item count needs review
          }))
        },
        removeBasketItem: (item) => {
          const shouldRemove = item.quantityInCard === 1
          console.log(item)
          console.log(item.quantityInCard)
          /*  return set((oldBasket) => ({
            invoice: {
              totalPrice: 0,
            },
            items: [],
            totalItemsCount: 0,
          })) */

          if (shouldRemove) {
            console.log("Should remove is true")
            return set((oldBasket) => ({
              invoice: {
                totalPrice: oldBasket.invoice.totalPrice - item.price,
              },
              items: oldBasket.items.filter((_item) => {
                return _item.id !== item.id
              }),
              //items: [],
            }))
          }

          console.log("strill trying to run set")

          set((oldBasket) => ({
            invoice: {
              totalPrice: oldBasket.invoice.totalPrice - item.price,
            },
            items: oldBasket.items.map((_item) => {
              if (_item.id == item.id) {
                return {
                  ..._item,
                  quantityInCard: _item.quantityInCard - 1,
                  basketItemPrice: (_item.quantityInCard - 1) * _item.price,
                }
              }
              return _item
            }),
          }))
        },

        deleteBasketItem: (item) => {
          return set((oldBasket) => ({
            invoice: {
              totalPrice:
                oldBasket.invoice.totalPrice - item.price * item.quantityInCard,
            },
            items: oldBasket.items.filter((_item) => _item.id != item.id),
          }))
        },

        clearBasket: () => {
          return set(() => ({
            items: [],
            totalItemsCount: 0,
            invoice: {
              totalPrice: 0,
            },
          }))
        },

        getTotalItemCount: () => {
          let tempCount = 0
          if (get().items.length > 0) {
            get().items.map((_item) => {
              tempCount += _item.quantityInCard
            })

            return tempCount
          } else {
            return 0
          }
        },
      },
    }),

    {
      name: "local-basket",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !["actions"].includes(key))
        ) as Basket,
    }
  )
)
