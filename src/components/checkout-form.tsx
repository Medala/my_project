import { User } from "@/interface/interface"
import { getUserProfile, homePageurl, updateProfileUrl } from "@/lib/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { FaCheck, FaRegUser } from "react-icons/fa"
import { z } from "zod"
import { toast } from "./ui/use-toast"
import { useEffect, useState } from "react"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import useServerOrder from "@/hooks/use-server-order"
import { useNavigate } from "react-router-dom"

const schema = z.object({
  name: z.string().min(0).max(300),
  address: z.string().min(0).max(500),
})

type ProfileForm = z.infer<typeof schema>

interface CheckoutProps {
  totalItemCount: number
  totalPayable: number
}

const CheckoutForm = ({ totalItemCount, totalPayable }: CheckoutProps) => {
  const queryClient = useQueryClient()
  const [showProfileForm, setShowProfileForm] = useState(false)
  const navigate = useNavigate()
  const [verified, setVerified] = useState(false)

  function redirectAfterSumbit() {
    setVerified(true)
    setTimeout(() => {
      navigate(homePageurl)
    }, 1000)
  }

  const { sumbitOrderMutation } = useServerOrder(redirectAfterSumbit)

  async function fetchUserData(): Promise<User> {
    console.log("Bearer " + localStorage.getItem("token"))
    const response = await fetch(getUserProfile, {
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

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(schema),
  })

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["userProfileQuery"],
    queryFn: () => fetchUserData(),
    // placeholderData: keepPreviousData,
  })
  if (data) {
    console.log("User fetched fetched")

    console.log(data)
  }
  if (error) {
    console.log(error)
  }

  useEffect(() => {
    //console.log("data kan nei ta e")
    //console.log(data)

    if (data?.name == null || data?.address == null) {
      setShowProfileForm(true)
      console.log("the thing is  nullllllll")
    } else {
      console.log("not null  is the thing")
      setShowProfileForm(false)
    }
    reset({
      name: data?.name,
      address: data?.address,
    })
  }, [data])

  const submitFormMutation = useMutation({
    mutationFn: async (variables: ProfileForm) => {
      console.log("submitFormMutation run mek")

      const fData = new FormData()

      fData.append("name", variables.name)
      fData.append("address", variables.address)
      console.log("this is the form data before submitting")
      console.log(fData)

      const response = await fetch(updateProfileUrl, {
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
      console.log("success profile update success")
      console.log(data)

      /*  toast({
            description: "New category created",
          }) */
      //TODO
      //reload home data after submit
      queryClient.invalidateQueries()
      //  kfyjkfgyjfghyjk
    },

    onError: (errors) => {
      console.log(errors)
      console.log("got an error")
      toast({
        description: errors.message,
      })
    },
  })

  const onSubmit = async (submittedData: ProfileForm) => {
    try {
      console.log("Below is the submitted data")

      console.log(submittedData)
      throw new Error()
    } catch (error) {
      setError("root", {
        message: errors.root?.message,
      })
    }

    submitFormMutation.mutate(submittedData)
  }

  function placeOrderToServer() {
    sumbitOrderMutation.mutate()
  }

  return (
    <>
      {showProfileForm === false && (
        <div>
          <DialogHeader>
            <DialogTitle>Check out</DialogTitle>
            <DialogDescription className="border-4 border-dotted p-2 rounded-lg mt-6  leading-7 [&:not(:first-child)]:mt-6">
              {/* <div className="border-4 border-dotted p-2 rounded-lg mt-6">
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Order hi pawisa pek nghal kher a ngai lo a, I phone number ah
                  hian kan lo be chhunzawm dawn che a nia. Thank you.
                </p>
              </div> */}
              Order hi pawisa pek nghal kher a ngai lo a, I phone number ah hian
              kan lo be chhunzawm dawn che a nia. Thank you.
            </DialogDescription>
          </DialogHeader>
          <div className=" w-full mt-6 font-semibold text-gray-600">
            <div className="flex justify-between border-b-4 border-dotted mb-4">
              <div>Total Item Count:</div>
              <div>{totalItemCount}</div>
            </div>
            <div className="flex justify-between  border-b-4 border-dotted ">
              <div>Total Price:</div>
              <div>&#8377; {totalPayable}</div>
            </div>
          </div>

          <DialogFooter>
            {verified && (
              <div className="w-full">
                <div className="dark:bg-gray-800 dark:border-gray-700 flex h-40 items-center justify-center rounded-md">
                  <div className="text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Order Placed
                  </div>
                  <span className="px-2 text-2xl">
                    <FaCheck color="green" />
                  </span>
                </div>
              </div>
            )}
            {verified === false && (
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={() => {
                    placeOrderToServer()
                  }}
                  className=" bg-orange-500 px-4 py-2 rounded-lg text-center font-semibold text-slate-600 hover:shadow-lg "
                >
                  Place Order
                </button>
              </div>
            )}
            {/* <div className=" flex justify-end mt-8">
              <a aria-label="Chat on WhatsApp" href="https://wa.me/9383073699">
                <img
                  alt="Chat on WhatsApp"
                  src="/src/assets/ChatOnWhatsAppButton/WhatsAppButtonGreenSmall.svg"
                />
              </a>
            </div> */}
          </DialogFooter>
        </div>
      )}

      {showProfileForm && (
        <div>
          {/*  <DialogHeader>
            <DialogTitle>Check out</DialogTitle>
            <DialogDescription>
              {showProfileForm && (
                <div> Hming leh Address dah lawk ang aw!</div>
              )}
            </DialogDescription>
          </DialogHeader> */}
          <DialogHeader>
            <DialogTitle>Check out</DialogTitle>
            <DialogDescription className="border-4 border-dotted p-2 rounded-lg mt-6  leading-7 [&:not(:first-child)]:mt-6">
              Hming leh address dah lawk ang aw!
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  {...register("name")}
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name"
                  required
                ></input>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <textarea
                  rows={8}
                  {...register("address")}
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="address"
                  required
                ></textarea>
              </div>

              <div className="w-full  flex justify-end">
                {/* <button className="border px-3 py-1 rounded-lg bg-orange-400 hover:bg-orange-500 transition-colors duration-200 hover:shadow-lg text-gray-800">
                   Add Address
                 </button> */}

                <button
                  type="submit"
                  className="border px-8 py-1 rounded-lg bg-orange-400 hover:bg-orange-500 transition-colors duration-200 hover:shadow-lg text-gray-800"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="h-full bg-orange-100 flex justify-center items-center">
          <svg
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      )}
    </>
  )
}

export default CheckoutForm
