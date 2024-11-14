import Navbar from "@components/Navbar"
import React, { useState, useRef, useEffect } from "react"
import { useForm, useFormState } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { IoMdArrowRoundBack } from "react-icons/io"
import { FaCheck } from "react-icons/fa"

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { homePageurl, loginOtpVerify } from "lib/constants"
import { useNavigate } from "react-router-dom"
import { toast } from "./ui/use-toast"
import { useBasket } from "@/lib/stores/cart-store-state"

interface Props {
  goBackToLoginForm: () => void
  otpId: number
  phone: string
}

const schema = z.object({
  otp: z.coerce.number().min(4, "Invalid Otp"),
  otp_id: z.coerce.number(),
})

const otpSchema = z.object({
  otpCode: z.coerce.number().min(4, "Invalid OTP"),
})

type FormType = z.infer<typeof schema>

const OtpForm = ({ goBackToLoginForm, otpId, phone }: Props) => {
  const [userOtpInput, setUserOtpInput] = useState<number | null>(null)
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const cartStore = useBasket()

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify({
      otp_code: userOtpInput,
      otp_id: otpId,
    }),
  }

  const formMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(loginOtpVerify, requestOptions)
      return res.json()
      /*  console.log(res.json());
          return res.json(); */
    },

    onSuccess: (data) => {
      setLoading(false)
      if (data.otpVerified === true) {
        console.log("otp was verified r")
        console.log(data)
        //  console.log(data.cart_items)
        localStorage.setItem("token", data.token)
        localStorage.setItem("role", data.role)
        if (data.cart !== null) {
          console.log(data.cart)
          data.cart["cart_items"].map((item) => {
            console.log(item["product"])
            cartStore.actions.addBasketItem(item["product"], item["quantity"])
          })
        }
        console.log(localStorage.getItem("token") + " is the stored token")

        setVerified(true)
        setTimeout(() => {
          navigate(homePageurl)
        }, 1000)
      } else {
        toast({
          description: "OTP verification failed",
        })
      }
    },

    onError: (error) => {
      console.error(error)
      toast({
        description: error.message,
      })
    },

    onSettled: () => {
      console.log("settled")
      setLoading(true)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  })
  //const[openPhoneField,  showPhoneField] = useState(false);

  const handleFormSubmit = async (data: FormType) => {
    console.log("this is from opt from checking  check otp id" + otpId)
    console.log("this is from opt from checking set userotpinput " + data.otp)
    setLoading(true)
    setUserOtpInput(data.otp)
    //console.log(data)
    /*   const newItem:InventoryItem = {
            name: data.name,
            quantity: data.quantity,
            manager:data.manager,
            inventoryCode:data.inventoryCode,
            inventoryType:data.inventoryType,
            pricePerUnit: data.pricePerUnit
           } */
    formMutation.mutate()
    // const submittedOtp =  data.otp;
    //   alert('Verifying otp');
    //showPhoneField(false);
    reset()
  }

  return (
    <>
      <section className="bg-gray-50  dark:bg-gray-900 h-screen">
        {/* Floating Action Button */}
        <div
          typeof="button"
          onClick={goBackToLoginForm}
          className="cursor:pointer hover:bg-red-300"
        >
          <span className="absolute top-20 left-10 block text-white">
            <IoMdArrowRoundBack />
          </span>
        </div>

        <div className="flex flex-col items-center  justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            ></img>
            Medala
          </a>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            {!verified && (
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Verify OTP
                </h1>
                <form
                  onSubmit={handleSubmit(handleFormSubmit)}
                  className="space-y-4 md:space-y-6"
                  action="#"
                >
                  <div>
                    <label
                      htmlFor="otp"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter OTP
                    </label>
                    <input
                      {...register("otp")}
                      type="number"
                      name="otp"
                      id="otp"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter OTP"
                      required
                    ></input>
                    <input
                      {...register("otp_id")}
                      type="number"
                      hidden
                      name="otp_id"
                      id="otp_id"
                    ></input>
                  </div>

                  {/* <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required></input>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div> */}
                  {/*   <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Verify OTP
                  </button> */}

                  <div className="w-full  flex justify-end">
                    <button
                      type="submit"
                      className="border px-8 py-1 rounded-lg bg-orange-400 hover:bg-orange-500 transition-colors duration-200 hover:shadow-lg text-gray-800"
                    >
                      Verify OTP
                    </button>
                  </div>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    OTP sent to {phone}
                  </p>
                </form>
              </div>
            )}

            {verified && (
              <div className="dark:bg-gray-800 dark:border-gray-700 flex h-40 items-center justify-center rounded-md">
                <div className="text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  OTP Verified
                </div>
                <span className="px-2 text-2xl">
                  <FaCheck color="green" />
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default OtpForm
