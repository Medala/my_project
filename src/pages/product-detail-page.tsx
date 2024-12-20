import CustomerLayout from "@/components/layouts/customer-layout"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import YoutubePlayer from "@/components/ui/youtube-player"
import { baseWebUrl, baseStorageUrl } from "@/lib/constants"
import { fetchProduct } from "@/queries/queries"
import { useQuery } from "@tanstack/react-query"
import { Divide, ZoomIn } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import getYouTubeID from "get-youtube-id"
import { useMediaQuery } from "@/hooks/use-media-query"
import { BasketItem, useBasket } from "@/lib/stores/cart-store-state"
import { CartItem, Product } from "@/interface/interface"
import ManageCategoryListItems from "@/components/manage-categories/manage-category-list"
import useServerCart from "@/hooks/use-server-cart"
import ZoomTest from "@/components/zoom-test"

const ProductDetailPage = () => {
  const { submitFormMutation } = useServerCart()
  const { productId } = useParams()
  const [addToCartQuantity, setAddToCartQuantity] = useState<number>(1)
  /*   const getYouTubeID = require("get-youtube-id") */
  const [youTubeVideoId, setYouTubeVideoId] = useState<string | null>()
  //get the product using the product id
  const [activePicture, setActivePicture] = useState<string>()

  // const { addBasketItem } = useBasket((state) => state.actions)

  const cartStore = useBasket()

  const { isLoading, isError, error, data, isFetched } = useQuery({
    queryKey: ["productDetail"],
    queryFn: () => fetchProduct(`${productId}`),
    // placeholderData: keepPreviousData,
  })

  if (error) {
    console.log(error.message)
  }
  if (data) {
  }

  useEffect(() => {
    if (data) {
      setActivePicture(data.pictures.small_paths![0])
      console.log("prod fetched")
      console.log(data)
      var id = getYouTubeID(data.youtube_url!)

      setYouTubeVideoId(id)
      console.log(id)
    }
  }, [data])

  function addToCart(product: Product, quantity: number) {
    console.log(`adding to cart quantity ${quantity}`)
    // addBasketItem(product as BasketItem, quantity)
    cartStore.actions.addBasketItem(product as BasketItem, quantity)

    // this gets the cart data from zus stand global state and sends it to the server,
    submitFormMutation.mutate()
    /*     let cartStoreItems = cartStore.items
    cartStoreItems.forEach((cartItem) => {
      if (cartItem.item == product) {
      }
    })
    const newCartItem = {
      item: product,
      quantity: quantity,
    }

    cartStore.increase(newCartItem) */
  }

  function controlAddToCartQuantity(plusOrMinus: string) {
    if (plusOrMinus == "-") {
      let quantity = addToCartQuantity > 1 ? addToCartQuantity - 1 : 1
      setAddToCartQuantity(quantity)
    } else {
      let quantity = addToCartQuantity + 1
      setAddToCartQuantity(quantity)
    }
  }

  return (
    <>
      <CustomerLayout>
        {/* <div className="h-3/5 bg-red-200">
          <ZoomTest imageSrc={`${baseServerUrl}/${activePicture}`} />
        </div> */}
        <div className="hidden md:grid grid-cols-2 pl-2 ">
          <div className="col-span-1 h-full">
            <div className=" h-3/5 w-full mt-2 sticky top-0 left-0 ">
              <div className="w-full   aspect-square  ">
                {/* <img
                  className="h-4/6 mx-auto w-auto object-contain rounded-lg"
                  src={`${baseServerUrl}/${activePicture}`}
                  alt=""
                /> */}

                <ZoomTest imageSrc={`${baseStorageUrl}${activePicture}`} />

                {/*  product pictures carousel below */}
                <div className="w-full  flex justify-center">
                  {data && (
                    <Carousel className="w-full max-w-lg">
                      <CarouselContent className="-ml-1">
                        {data.pictures.small_paths!.map((pic, index) => (
                          <CarouselItem key={index} className="pl-1 basis-1/5">
                            <div className="p-1">
                              <Card>
                                <CardContent
                                  onClick={() => {
                                    setActivePicture(pic)
                                  }}
                                  className="aspect-square p-0"
                                >
                                  <img
                                    className="h-full mx-auto object-contain rounded-sm"
                                    src={`${baseStorageUrl}${pic}`}
                                    alt=""
                                  />
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  )}
                </div>
              </div>
            </div>
          </div>
          {data && (
            <div className="ml-2  h-auto">
              <div className="h-auto w-full  ">
                <div className="p-4">
                  <h4 className="scroll-m-20 text-xl text-gray-800 font-semibold tracking-tight">
                    {data.title}
                  </h4>

                  <p className="leading-7 [&:not(:first-child)]:mt-1">
                    {data.description}
                  </p>
                </div>
                <div className="p-4">
                  <p className="leading-7 [&:not(:first-child)]:mt-1 line-through text-amber-600">
                    &#8377; {data.compared_price}
                  </p>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    &#8377; {data.price}
                  </h4>
                </div>

                <div className=" pb-1 pt-2 w-1/2 flex justify-center">
                  <div className="w-full ">
                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Quantity:
                    </label>

                    <div className="w-full  flex justify-between ">
                      <button
                        onClick={() => {
                          controlAddToCartQuantity("-")
                        }}
                        className="mb-2 mt-2 me-2   rounded-lg border border-amber-500 bg-amber-400 px-5 py-2.5 text-sm shadow-sm hover:shadow-lg font-medium text-gray-900  focus:outline-none focus:ring-4  dark:focus:ring-gray-700 transition-all duration-200 "
                      >
                        -
                      </button>

                      <input
                        type="number"
                        onChange={(element) => {
                          setAddToCartQuantity(parseInt(element.target.value))
                        }}
                        value={addToCartQuantity.toString()}
                        id="price"
                        aria-describedby="helper-text-explanation"
                        // className="block mr-2 w-1/6 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        className="mb-2 mt-2 me-2 w-1/2  rounded-lg border border-amber-500 bg-amber-400 px-5 py-2.5 text-sm shadow-sm hover:shadow-lg font-medium text-gray-900  focus:outline-none focus:ring-4  dark:focus:ring-gray-700 transition-all duration-200 "
                        placeholder=""
                        required
                      />

                      <button
                        onClick={() => {
                          controlAddToCartQuantity("+")
                        }}
                        className="mb-2 mt-2 me-2   rounded-lg border border-amber-500 bg-amber-400 px-5 py-2.5 text-sm shadow-sm hover:shadow-lg font-medium text-gray-900  focus:outline-none focus:ring-4  dark:focus:ring-gray-700 transition-all duration-200 "
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-1/2 flex justify-center   ">
                  <button
                    onClick={() => {
                      addToCart(data, addToCartQuantity)
                    }}
                    className="mb-2 mt-2 me-2 w-full  rounded-lg border border-amber-500 bg-amber-400 px-5 py-2.5 text-sm shadow-sm hover:shadow-lg font-medium text-gray-900  focus:outline-none focus:ring-4  dark:focus:ring-gray-700 transition-all duration-200 "
                  >
                    Add To Cart
                  </button>
                </div>
                <div className="w-1/2 flex justify-center mt-4">
                  <a
                    aria-label="Chat on WhatsApp"
                    href="https://wa.me/9383073699"
                  >
                    <img
                      alt="Chat on WhatsApp"
                      src="/ChatOnWhatsAppButton/WhatsAppButtonGreenSmall.svg"
                    />
                  </a>
                </div>
              </div>

              {data.specification && (
                <div className="p-2 grow  border rounded-sm m-2">
                  <h4 className="text-base min-w-60 text-gray-500 font-semibold tracking-tight">
                    Specifications
                  </h4>

                  {/* <Textarea
                    placeholder="Type your message here."
                    value={data.specification}
                    disabled
                    className=" text-base min-h-full text-gray-800 font-semibold tracking-tight"
                    
                  /> */}

                  <p className="whitespace-pre-line text-gray-600">
                    {data.specification}
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="h-40"></div>
        </div>

        {/*   {youTubeVideoId && (
          <div className="bg-purple-400 ">
            <div className="w-full flex h-screen justify-center bg-yellow-300">
              <div className=" bg-red-500 hidden md:block">
                <YoutubePlayer productVideoId={youTubeVideoId}></YoutubePlayer>
              </div>
            </div>
            <div className=" bg-orange-600"></div>
            <div className=" bg-blue-300"></div>
          </div>
        )} */}

        {/* begin mobile and sm view */}
        <div className="md:hidden w-full ">
          <div className="aspect-square p-2 w-full">
            {data && (
              <img
                className="mx-auto aspect-square w-full object-contain rounded-lg"
                src={`${baseStorageUrl}${activePicture}`}
                alt=""
              />
            )}
          </div>

          <div className="w-full">
            {data && (
              <Carousel className="w-full max-w-lg">
                <CarouselContent className="-ml-1">
                  {data.pictures.small_paths!.map((pic, index) => (
                    <CarouselItem key={index} className="pl-1 basis-1/4">
                      <div className="p-1">
                        <Card>
                          <CardContent
                            onClick={() => {
                              setActivePicture(pic)
                            }}
                            className="aspect-square p-0"
                          >
                            <img
                              className="h-full mx-auto object-contain rounded-sm"
                              src={`${baseStorageUrl}${pic}`}
                              alt=""
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            )}
          </div>

          {data && (
            <div className="h-auto w-full  ">
              <div className="p-4">
                <h4 className="scroll-m-20 text-xl text-gray-800 font-semibold tracking-tight">
                  {data.title}
                </h4>

                <p className="leading-7 [&:not(:first-child)]:mt-1">
                  {data.description}
                </p>
              </div>
              <div className="p-4">
                <p className="leading-7 [&:not(:first-child)]:mt-1 line-through text-amber-600">
                  &#8377; {data.compared_price}
                </p>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  &#8377; {data.price}
                </h4>
              </div>

              <div className="w-full flex justify-center ">
                <div className="justify-around  flex">
                  <button
                    onClick={() => {
                      controlAddToCartQuantity("-")
                    }}
                    className="mb-2 mt-2 me-2   rounded-lg border border-amber-500 bg-amber-400 px-5 py-2.5 text-sm shadow-sm hover:shadow-lg font-medium text-gray-900  focus:outline-none focus:ring-4  dark:focus:ring-gray-700 transition-all duration-200 "
                  >
                    -
                  </button>

                  <input
                    type="number"
                    onChange={(element) => {
                      setAddToCartQuantity(parseInt(element.target.value))
                    }}
                    value={addToCartQuantity.toString()}
                    id="price-mobile"
                    aria-describedby="helper-text-explanation"
                    // className="block mr-2 w-1/6 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    className="mb-2 mt-2 me-2   rounded-lg border border-amber-500 bg-amber-400 px-5 py-2.5 text-sm shadow-sm hover:shadow-lg font-medium text-gray-900  focus:outline-none focus:ring-4  dark:focus:ring-gray-700 transition-all duration-200 "
                    placeholder=""
                    required
                  />

                  <button
                    onClick={() => {
                      controlAddToCartQuantity("+")
                    }}
                    className="mb-2 mt-2 me-2   rounded-lg border border-amber-500 bg-amber-400 px-5 py-2.5 text-sm shadow-sm hover:shadow-lg font-medium text-gray-900  focus:outline-none focus:ring-4  dark:focus:ring-gray-700 transition-all duration-200 "
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <button
                  onClick={() => {
                    addToCart(data, addToCartQuantity)
                  }}
                  className="mb-2 mt-2 me-2 w-2/3  rounded-lg border border-amber-500 bg-amber-400 px-5 py-2.5 text-sm shadow-sm hover:shadow-lg font-medium text-gray-900  focus:outline-none focus:ring-4  dark:focus:ring-gray-700 transition-all duration-200 "
                >
                  Add To Cart
                </button>
              </div>
            </div>
          )}

          <div className=" w-full flex justify-center my-8 bg-teal">
            <a aria-label="Chat on WhatsApp" href="https://wa.me/9383073699">
              <img
                alt="Chat on WhatsApp"
                src="/ChatOnWhatsAppButton/WhatsAppButtonGreenSmall.svg"
              />
            </a>
          </div>

          {data?.specification && (
            <div className="p-2 grow  border rounded-sm m-2">
              <h4 className="text-base min-w-60 text-gray-500 font-semibold tracking-tight">
                Specifications
              </h4>

              {/* <Textarea
                    placeholder="Type your message here."
                    value={data.specification}
                    disabled
                    className=" text-base min-h-full text-gray-800 font-semibold tracking-tight"
                    
                  /> */}

              <p className="whitespace-pre-line text-gray-600">
                {data.specification}
              </p>
            </div>
          )}

          {/*  {data?.youtube_url && (
            <div className="mx-auto w-full p-2 md:h-96  aspect-video  overflow-hidden">
              <iframe
                className="rounded-lg"
                width="100%"
                height="100%"
                // src={data!.youtube_url}
                src={`https://www.youtube.com/embed/${youTubeVideoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )} */}

          {/* extra space */}
        </div>

        {data?.youtube_url && (
          <div className=" md:h-96 mx-auto p-2 md:p-0  aspect-video rounded-lg overflow-hidden">
            <iframe
              className="rounded-lg"
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youTubeVideoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </CustomerLayout>
    </>
  )
}

export default ProductDetailPage

{
  /* <YoutubePlayer productVideoId={"Yw2uoQtQsHA"}></YoutubePlayer> */
}
