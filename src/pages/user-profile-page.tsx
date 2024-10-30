import AppDropdownButton, {
  AppDropdownIcon,
  AppDropdownType,
  LandingDataDisplayType,
} from "@/components/app-dropdown-folder/app-dropdown"
import CustomerLayout from "@/components/layouts/customer-layout"

import Layout from "@/components/layouts/layout"
import ManageCategoryListItems from "@/components/manage-categories/manage-category-list"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { LandingDataChildTypeEnum } from "@/interface/app_enums"

import {
  BreadCrumbCategoryItem,
  DeleteRowChildInterface,
  DeleteRowInterface,
  LandingDataApiFetch,
  LandingDataRow,
  PaginatedCategories,
  User,
} from "@/interface/interface"
import {
  createNewCategoryApi,
  deleteCategoryApi,
  getUserProfile,
  homePageurl,
  updateProfileUrl,
} from "@/lib/constants"

import { FaCheck } from "react-icons/fa"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { IoAdd } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

import { z, object, array, string } from "zod"

const schema = z.object({
  name: z.string().min(0).max(300),
  address: z.string().min(0).max(500),
})

type ProfileForm = z.infer<typeof schema>

export default function UserProfilePage() {
  const queryClient = useQueryClient()
  const [updated, setVerified] = useState(false)
  const navigate = useNavigate()

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

  /*   async function fetchCategoryChildren(
    categoryId: number
  ): Promise<PaginatedCategories> {
    console.log("Bearer " + localStorage.getItem("token"))
    const response = await fetch(getCategoryChildren(categoryId), {
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

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(schema),
  })

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
      setVerified(true)
      setTimeout(() => {
        navigate(homePageurl)
      }, 1000)
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
  /* 
  function deleteLandingRow(landingRowId: number) {
    const targetDeletRowChild = {
      landingRowId: landingRowId,
    }
    setShowDeleteRowDialog(true)
    setDeleteRowObject(targetDeletRowChild)
  } */

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
    reset({
      name: data?.name,
      address: data?.address,
    })
  }, [data])

  return (
    <CustomerLayout>
      <div className="bg-gray-50 dark:bg-gray-900 h-screen pt-8">
        <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            ></img>
            Profile
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {updated === false && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 md:space-y-6"
                  action="#"
                >
                  <div>
                    <div className="flex justify-center mt-1 font-bold text-gray-500">
                      {data?.phone}
                    </div>
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

                  <div className="w-full  flex justify-between">
                    {/* <button className="border px-3 py-1 rounded-lg bg-orange-400 hover:bg-orange-500 transition-colors duration-200 hover:shadow-lg text-gray-800">
                    Add Address
                  </button> */}

                    <button
                      type="button"
                      onClick={() => {
                        navigate(-1)
                      }}
                      className="border px-8 py-1 rounded-lg bg-orange-400 hover:bg-orange-500 transition-colors duration-200 hover:shadow-lg text-gray-800"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="border px-8 py-1 rounded-lg bg-orange-400 hover:bg-orange-500 transition-colors duration-200 hover:shadow-lg text-gray-800"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
              {updated && (
                <div className="dark:bg-gray-800 dark:border-gray-700 flex h-40 items-center justify-center rounded-md">
                  <div className="text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Profile Updated
                  </div>
                  <span className="px-2 text-2xl">
                    <FaCheck color="green" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}
