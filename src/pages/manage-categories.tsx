import AppDropdownButton, {
  AppDropdownIcon,
  AppDropdownType,
  LandingDataDisplayType,
} from "@/components/app-dropdown-folder/app-dropdown"

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
} from "@/interface/interface"
import {
  createNewCategoryApi,
  deleteCategoryApi,
  getCategoryChildren,
  homePageurl,
} from "@/lib/constants"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { IoAdd } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

import { z, object, array, string } from "zod"

const schema = z.object({
  name: z.string().min(0).max(300),
})

type DashboardFormFieldZ = z.infer<typeof schema>

export default function ManageCategories() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [activeCategoryId, setActiveCategoryId] = useState(0)
  const [categoryNavStack, setCategoryNavstack] = useState<
    BreadCrumbCategoryItem[]
  >([{ category_id: 0, name: "Categories" }])

  const [landingDataList, setLandingData] = useState<LandingDataRow[]>([])
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false)
  const [showDeleteDiaglog, setShowDeleteDialog] = useState(false)
  const [showDeleteRowDiaglog, setShowDeleteRowDialog] = useState(false)
  const [deleteRowChildObject, setDeleteRowChildObject] =
    useState<DeleteRowChildInterface>()
  const [deleteRowObject, setDeleteRowObject] = useState<DeleteRowInterface>()

  const [showAddProduct, showAddProductToLandingRow] = useState(false)
  const [selectedFormDisplayType, setSelectedFormDisplayType] =
    useState<LandingDataDisplayType>()

  const [activeLandingData, setActiveLandingData] = useState<LandingDataRow>()
  const [activeLandingDataIndex, setActiveLandingDataIndex] = useState(0)

  function setActiveChildForChidrenListQuery(id: number, name: string) {
    // alert(`the id is ${id}`)
    setCategoryNavstack([
      ...categoryNavStack,
      {
        category_id: id,
        name: name,
      },
    ])
    setActiveCategoryId(id)
  }

  function sliceCategoryNavstack(index: number) {
    if (index == 0) {
      setActiveCategoryId(0)
      const nextList = [...categoryNavStack]
      const newList = nextList.slice(0, index + 1)
      setCategoryNavstack(newList)
    } else {
      const nextList = [...categoryNavStack]
      const newList = nextList.slice(0, index + 1)
      setCategoryNavstack(newList)
      console.log("below is the new list")
      console.log(newList)
      console.log("below is the index")
      console.log(index)
      setActiveCategoryId(newList[index].category_id)
    }
  }

  async function fetchMainOrChildCategories(
    id: number
  ): Promise<PaginatedCategories> {
    console.log("Bearer " + localStorage.getItem("token"))
    const response = await fetch(getCategoryChildren(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      credentials: "include",
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
  } = useForm<DashboardFormFieldZ>({
    resolver: zodResolver(schema),
  })

  const submitFormMutation = useMutation({
    mutationFn: async (variables: DashboardFormFieldZ) => {
      console.log("submitFormMutation run mek")

      const fData = new FormData()

      fData.append("name", variables.name)
      fData.append("category_id", activeCategoryId.toString())
      console.log("this is the form data before submitting")
      console.log(fData)

      const response = await fetch(createNewCategoryApi, {
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
      console.log("success ringu ppppp")
      console.log(data)
      toast({
        description: "hjmfjhmfvj,  khkkhk kkk",
      })
      //TODO
      //reload home data after submit
      queryClient.invalidateQueries()
      //  kfyjkfgyjfghyjk
    },

    onError: (errors) => {
      console.log(errors)
      console.log("got an error")
    },
  })

  const onSubmit = async (submittedData: DashboardFormFieldZ) => {
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

  async function confirmDeleteCategory(id: number) {
    const deleteCategoryFormData = new FormData()
    deleteCategoryFormData.append("category_id", id.toString())

    const response = await fetch(deleteCategoryApi, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        //"Content-Type": "multipart/form-data",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      credentials: "include",

      body: deleteCategoryFormData,
    })
    console.log("Reached the server to delete a category")
    const theResponse = await response.json()
    console.log(theResponse)
    setShowDeleteDialog(false)
    refetchData()
    /// to do
    //check response status code and take action
    // show error if any
  }

  function refetchData() {
    refetch()
  }

  useEffect(() => {
    console.log("we have the total page on use effect")
    if (localStorage.getItem("role") !== "admin") {
      navigate(homePageurl)
    }
  }, [localStorage.getItem("role")])

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["categoriesQuery", activeCategoryId],
    queryFn: () => fetchMainOrChildCategories(activeCategoryId),
    // placeholderData: keepPreviousData,
  })
  if (data) {
    console.log("Categories fetched")
    console.log(data)
  }
  if (error) {
    console.log(error)
  }

  return (
    <>
      <Layout>
        <div className="w-full flex justify-between items-center px-2">
          <div className="flex">
            {categoryNavStack.map((cat, index) => (
              <div className="flex" key={index}>
                <button
                  onClick={() => {
                    sliceCategoryNavstack(index)
                  }}
                >
                  <p className="font-semibold underline mx-1">{cat.name}</p>
                </button>
                {" / "}
              </div>
            ))}
          </div>
          <div
            typeof="button"
            className="hidden rounded border p-2 shadow  cursor-pointer hover:shadow-lg md:flex space-x-1 items-center transition-shadow duration-75"
            onClick={() => {
              setShowNewCategoryForm(true)
            }}
          >
            <span className="block text-xs">Add Category</span>
            <IoAdd size={22} />
          </div>
        </div>
        {data && (
          <ManageCategoryListItems
            setActivecategory={setActiveChildForChidrenListQuery}
            categoryList={data?.data}
            confirmDeleteCategory={confirmDeleteCategory}
          ></ManageCategoryListItems>
        )}
      </Layout>

      <Dialog open={showNewCategoryForm} onOpenChange={setShowNewCategoryForm}>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} action="#">
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                This will add a new category
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Category Name
                </Label>

                <Input
                  {...register("name")}
                  required
                  onChange={(input) => {
                    /*  setActiveLandingData({
                      ...activeLandingData!,
                      title: input.target.value,
                    }) */
                    //setActiveLandingDataTitle(input.target.value)
                  }}
                  id="title"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  setShowNewCategoryForm(false)
                  //dialog for deleting a category
                }}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDiaglog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Landing Row Child ?</DialogTitle>
            <DialogDescription>Delete this item from row.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                //dialog for deleting a category
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteRowDiaglog} onOpenChange={setShowDeleteRowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Landing Row ?</DialogTitle>
            <DialogDescription>Delete this row!</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                //delete a whold category
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
