import Navbar from "@components/Navbar"
import React, { useState, useRef, useEffect } from "react"
import { useForm, useFormState } from "react-hook-form"
import { jwtDecode } from "jwt-decode"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FcGoogle } from "react-icons/fc"

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import {
  getGoogleLoginUrlApi,
  homePageurl,
  postNewUserUrl,
} from "lib/constants"
import { FaSquareRootVariable } from "react-icons/fa6"
import { toast } from "./ui/use-toast"
import getGoogleLoginUrlString from "@/hooks/get-google-login-url"
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import useGoogleAuthMutation from "@/hooks/use-google-auth-mutation"
import { User } from "@/interface/interface"
import { useBasket } from "@/lib/stores/cart-store-state"

interface Props {
  /* saveEdit:(item:InventoryItem, index:number) => void; */
  showOtpAfterPhoneSumbmit: () => void
  goBackToLoginForm: () => void
  passOtpId: (id: number) => void
  passPhone: (phone: string) => void
}

const schema = z.object({
  phone: z.coerce.number().min(10, "Invalid Phone Number"),
})

const otpSchema = z.object({
  otpCode: z.coerce.number().min(4, "Invalid OTP"),
})

type FormType = z.infer<typeof schema>

//function phoneLogin(){

/* if(isPending) return 'loading';
if(error) return 'An error has occurred ' + error.message;

 console.log(data); */
// }

const LoginForm = ({
  showOtpAfterPhoneSumbmit,
  goBackToLoginForm,
  passOtpId,
  passPhone,
}: Props) => {
  const [userPhoneInput, setUserPhoneInput] = useState(0)
  const cartStore = useBasket()

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify({
      user_phone: userPhoneInput,
    }),
  }

  const navigate = useNavigate()

  const formMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(postNewUserUrl, requestOptions)
      return res.json()
      /*  console.log(res.json());
         return res.json(); */
    },
    onSuccess: (data) => {
      console.log(data)
      if ("otp_id" in data) {
        console.log("below should prit otp id")
        console.log(data["otp_id"])
        passOtpId(data["otp_id"])
        showOtpAfterPhoneSumbmit()
      } else {
        alert("failed to generate otp")
        return
      }
    },

    onError: (error) => {
      toast({
        description: error.message,
      })
    },

    onSettled: () => {
      console.log("settled")
    },
  })

  /*     const { mutate } = useMutation({ mutationFn: addTodo })

        mutate('todo', {
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.error(error)
        },
        onSettled: () => {
            console.log('settled')
        },
        }) */

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  })
  const [openPhoneField, showPhoneField] = useState(false)

  const handleFormSubmit = async (data: FormType) => {
    setUserPhoneInput(data.phone)
    passPhone(data.phone.toString())
    //console.log(data)
    /*   const newItem:InventoryItem = {
            name: data.name,
            quantity: data.quantity,
            manager:data.manager,
            inventoryCode:data.inventoryCode,
            inventoryType:data.inventoryType,
            pricePerUnit: data.pricePerUnit
           } */
    const phoneNumber = data.phone
    alert("Otp sent to " + data.phone)

    //formMutation.mutateAsync();
    formMutation.mutate()
    //formMutation.isPending;
    //formMutation.data
    console.log(formMutation.data)
    console.log(formMutation.error?.message)

    reset()
  }

  //const queryClient = useQueryClient()

  /*  async function fetchGoogleLoginUrl(): Promise<any> {
    console.log("Bearer " + localStorage.getItem("token"))
    const response = await fetch(getGoogleLoginUrlApi, {
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
  } */

  /* const googleLoginUrlFetcher = useQuery({
    queryKey: ["get_google_login_url"],
    queryFn: () => fetchGoogleLoginUrl(),
    // placeholderData: keepPreviousData,
  }) */
  /* if (data) {
    console.log("google login url Fetched")

    console.log(data)
  }
  if (error) {
    console.log(error)
  } */
  function successLoginCallback(data: any) {
    console.log(data)
    //  console.log(data.cart_items)
    localStorage.setItem("token", data.token)
    localStorage.setItem("role", data.role)
    localStorage.setItem("user", JSON.stringify(data.user))
    if (data.cart !== null) {
      console.log(data.cart)
      data.cart["cart_items"].map((item) => {
        console.log(item["product"])
        cartStore.actions.addBasketItem(item["product"], item["quantity"])
      })
    }
    console.log(localStorage.getItem("token") + " is the stored token")
    navigate(homePageurl)
  }

  const { googleAuthMutation } = useGoogleAuthMutation(successLoginCallback)

  function fetcherRun(cred: string) {
    const decoded = jwtDecode<User>(cred)
    const appUser = {
      email: decoded.email,
      picture: decoded.picture,
      name: decoded.name,
    }
    // console.log(decoded)
    googleAuthMutation.mutate(JSON.stringify(appUser))

    /* console.log(data)
    //window.location.href = data.url
    if (error) {
      console.log("O auth api error")
      console.log(error)
    } */
  }

  //const loginFormData = ({user_phone: 23452453453});

  // const response = await fetch(postNewUserUrl, requestOptions)

  /* useEffect(() => {
         console.log(formMutation.data)
        }, [formMutation]) */

  return (
    <>
      <div className="w-full h-screen md:h-full  flex items-center justify-center">
        <div className="rounded-lg border md:mt-8  p-8 shadow-lg ">
          <div className="text-center font-light text-gray-600">
            Login / Register
          </div>
          <FcGoogle size={200} />
          <GoogleLogin
            shape="pill"
            size="large"
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse)
              fetcherRun(credentialResponse.credential!)
            }}
            onError={() => {
              console.log("Login Failed")
            }}
          />
        </div>
      </div>

      {/* Use div block below if OTP feature is enabled in the future */}
      {/* <div className="bg-gray-50 dark:bg-gray-900 h-screen">
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
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login / Register
              </h1>
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your phone
                  </label>
                  <input
                    {...register("phone")}
                    type="number"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="phone number"
                    required
                  ></input>
                </div>

             
                <div className="w-full  flex justify-between">
                  <button
                    onClick={() => {
                      //fetcherRun()
                    }}
                    type="button"
                    className="border px-8 py-1 rounded-lg bg-orange-400 hover:bg-orange-500 transition-colors duration-200 hover:shadow-lg text-gray-800"
                  >
                    Login with Google
                  </button>

                  <button
                    type="submit"
                    className="border px-8 py-1 rounded-lg bg-orange-400 hover:bg-orange-500 transition-colors duration-200 hover:shadow-lg text-gray-800"
                  >
                    Send OTP
                  </button>
                </div>
              
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  A one time password will be sent to you number?
                </p>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default LoginForm
