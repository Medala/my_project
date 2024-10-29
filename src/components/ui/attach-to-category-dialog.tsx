import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { FaCheck } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import ManageCategoryListItems from "@/components/manage-categories/manage-category-list"

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
} from "@/lib/constants"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { IoAdd } from "react-icons/io5"

import { z, object, array, string } from "zod"
import { LandingDataDisplayType } from "../app-dropdown-folder/app-dropdown"

const schema = z.object({
  name: z.string().min(0).max(300),
})

interface DrawerProps {
  attachToCategory: Function
  isOpen: boolean
  isOpenChange: (open: boolean) => void
}

export function AttachToCategoryDialog({
  isOpen,
  isOpenChange,
  attachToCategory,
}: DrawerProps) {
  const queryClient = useQueryClient()
  const [activeCategoryId, setActiveCategoryId] = useState(0)
  const [activeCategorylName, setActiveCategoryName] = useState<string>()
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
    /* setActiveCategoryId(id)
    setActiveCategoryName(name) */
    setCurrentActiveCategory(id, name)
  }

  function setCurrentActiveCategory(
    categoryId: number,
    categoryName: string | undefined
  ) {
    setActiveCategoryId(categoryId)

    setActiveCategoryName(categoryName)
  }

  function sliceCategoryNavstack(index: number) {
    if (index == 0) {
      /* setActiveCategoryId(0)
      setActiveCategoryName(undefined) */
      setCurrentActiveCategory(0, undefined)
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
      /* setActiveCategoryId(newList[index].category_id)
      setActiveCategoryName(newList[index].name) */
      setCurrentActiveCategory(newList[index].category_id, newList[index].name)
    }
  }

  function attachToCategoryIdFinal(id: number, name: string) {
    attachToCategory({
      id: id,
      name: name,
    })
    isOpenChange(false)
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
    })
    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    return response.json()
  }

  type DashboardFormFieldZ = z.infer<typeof schema>

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

        body: fData,
      })
      return response.json()
    },
    onSuccess: (data) => {
      console.log("success ringu ppppp")
      console.log(data)
      toast({
        description: "New category created",
      })
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
    <Drawer open={isOpen} onOpenChange={isOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle>
              <div className="w-full  flex justify-between">
                <div className="flex">
                  <div className="">Attach to Category</div>
                  {activeCategorylName && (
                    <div>
                      <p className="underline">{` - ` + activeCategorylName}</p>
                    </div>
                  )}
                </div>

                {categoryNavStack.length > 2 ? (
                  <div
                    typeof="button"
                    className="min-h-10 rounded border p-2 shadow  cursor-pointer hover:shadow-lg md:flex space-x-1 items-center transition-shadow duration-75"
                    onClick={() => {
                      attachToCategoryIdFinal(
                        activeCategoryId,
                        activeCategorylName!
                      )
                    }}
                  >
                    <span className="block text-xs">Confirm Category</span>
                    <FaCheck size={16} />
                  </div>
                ) : (
                  <div className="p-2 min-h-10"></div>
                )}
              </div>
            </DrawerTitle>
            <DrawerDescription>
              Create a new category or attach to existing category{" "}
            </DrawerDescription>
          </DrawerHeader>
          <div className="max-h-96 w-full ">
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
              <div className="overflow-scroll h-80">
                <ManageCategoryListItems
                  setActivecategory={setActiveChildForChidrenListQuery}
                  categoryList={data?.data}
                  confirmDeleteCategory={confirmDeleteCategory}
                ></ManageCategoryListItems>
              </div>
            )}

            <Dialog
              open={showNewCategoryForm}
              onOpenChange={setShowNewCategoryForm}
            >
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
                  <DialogDescription>
                    Delete this item from row.
                  </DialogDescription>
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

            <Dialog
              open={showDeleteRowDiaglog}
              onOpenChange={setShowDeleteRowDialog}
            >
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
          </div>
          {/*   <DrawerFooter>
            <Button>Attach Product</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
