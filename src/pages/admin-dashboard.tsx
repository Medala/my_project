import AppDropdownButton, {
  AppDropdownIcon,
  AppDropdownType,
  LandingDataDisplayType,
} from "@/components/app-dropdown-folder/app-dropdown"
import LandingDataFormPicker from "@/components/landing-data-form-picker"

import LandingRow from "@/components/landing-row"

import CustomerLayout from "@/components/layouts/customer-layout"
import Layout from "@/components/layouts/layout"

import TestModal from "@/components/test-modal"
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
  DeleteRowChildInterface,
  DeleteRowInterface,
  LandingDataApiFetch,
  LandingDataRow,
  Product,
} from "@/interface/interface"
import {
  createLandingDataUrl,
  deleteLandingDataRowChildUrl,
  deleteLandingDataRowUrl,
  homePageurl,
  manageGetAllLandingList,
} from "@/lib/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { z, object, array, string } from "zod"

const schema = z.object({
  title: z.string().min(0).max(300),
  //  displayType: z.string().min(0).max(300),
  order: z.coerce.number().min(1, "Order is required"),
})

type DashboardFormFieldZ = z.infer<typeof schema>

export default function AdminDashboard() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [landingDataList, setLandingData] = useState<LandingDataRow[]>([])
  const [showLandingForm, showLandingDataForm] = useState(false)
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

  async function fetchAllLandingData(): Promise<LandingDataApiFetch> {
    console.log("Bearer " + localStorage.getItem("token"))
    const response = await fetch(manageGetAllLandingList, {
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
  } = useForm<DashboardFormFieldZ>({
    resolver: zodResolver(schema),
  })

  const submitFormMutation = useMutation({
    mutationFn: async (variables: DashboardFormFieldZ) => {
      console.log("submitFormMutation run mek")

      const fData = new FormData()

      fData.append("title", variables.title)
      // fData.append("display_type", variables.displayType)
      fData.append("display_type", selectedFormDisplayType!)

      fData.append("order", variables.order.toString())

      console.log("this is the form data before submitting")
      console.log(fData)
      // fData.append("image_url", "https://picsum.photos/200/300")

      const response = await fetch(createLandingDataUrl, {
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

      return response
    },
    onSuccess: (data) => {
      console.log("success ringu ppppp")
      console.log(data.body)
      toast({
        description: "LandingRow created successfully",
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

  function deleteLandingRow(landingRowId: number) {
    const targetDeletRowChild = {
      landingRowId: landingRowId,
    }
    setShowDeleteRowDialog(true)
    setDeleteRowObject(targetDeletRowChild)
  }

  // remove landing row child item
  function removeProductFromRow(
    landingRowId: number,
    landingChildType: LandingDataChildTypeEnum,
    landindDataChildId: number
  ) {
    const targetDeletRowChild = {
      landingRowId: landingRowId,
      landingChildType: landingChildType,
      landindDataChildId: landindDataChildId,
    }
    setDeleteRowChildObject(targetDeletRowChild)
    console.log("target delete is set ")
    // alert(landingChildType)
    setShowDeleteDialog(true)
  }

  async function confirmDeleteRowChild() {
    const deleteChildFormdata = new FormData()
    deleteChildFormdata.append(
      "landing_row_id",
      deleteRowChildObject!.landingRowId.toString()
    )
    deleteChildFormdata.append(
      "childable",
      deleteRowChildObject!.landingChildType
    )
    deleteChildFormdata.append(
      "landing_data_child_id",
      deleteRowChildObject!.landindDataChildId.toString()
    )
    const response = await fetch(deleteLandingDataRowChildUrl, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        //"Content-Type": "multipart/form-data",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        Authorization: "Bearer " + localStorage.getItem("token"),
      },

      body: deleteChildFormdata,
    })
    console.log("Reached the server to delete a row child")
    const theResponse = await response.json()
    console.log(theResponse)
    setShowDeleteDialog(false)
    setActiveLandingData(undefined)
    setDeleteRowChildObject(undefined)
    refetchData()
    /// to do
    //check response status code and take action
    // show error if any
  }

  async function confirmDeleteRow() {
    const deleteRowFormdata = new FormData()
    deleteRowFormdata.append(
      "landing_row_id",
      deleteRowObject!.landingRowId.toString()
    )

    const response = await fetch(deleteLandingDataRowUrl, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        //"Content-Type": "multipart/form-data",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        Authorization: "Bearer " + localStorage.getItem("token"),
      },

      body: deleteRowFormdata,
    })
    console.log("Reached the server to delete a row ")
    const theResponse = await response.json()
    console.log(theResponse)
    setShowDeleteRowDialog(false)
    setActiveLandingData(undefined)
    setDeleteRowObject(undefined)

    refetchData()
    /// to do
    //check response status code and take action
    // show error if any
  }

  function refetchData() {
    refetch()
  }

  function showLandingDataTypeForm(landingDataType: LandingDataDisplayType) {
    //setActiveLandingData(undefined)
    //alert(landingDataType)
    setSelectedFormDisplayType(landingDataType)
    /*  let tempActiveLandingData: LandingDataRow = {
      display_type: landingDataType,
      landing_data_children: [],
      title: "the test",
      order: 0,
    }
    setActiveLandingData(tempActiveLandingData) */
    // alert(tempActiveLandingData.display_type)

    showLandingDataForm(true)
  }

  function saveActiveLandingData() {
    if (activeLandingData != null) {
      console.log("active landing data is not null, so add more landing data")
      setLandingData([...landingDataList, activeLandingData])
    } else {
      console.log("active landing data is null xlx")
    }
  }

  function addComponentButtonClick(index: number, activeLandingId: number) {
    setActiveLandingDataIndex(index)
    setActiveLandingData({ ...activeLandingData!, id: activeLandingId })
    showAddProductToLandingRow(true)
  }

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["landingQuery"],
    queryFn: () => fetchAllLandingData(),
    // placeholderData: keepPreviousData,
  })
  if (data) {
    console.log("I zhave just fetched all the landing data")
    console.log(data)
  }

  useEffect(() => {
    console.log("we have the total page on use effect")
    if (localStorage.getItem("role") !== "admin") {
      navigate(homePageurl)
    }
  }, [localStorage.getItem("role")])

  return (
    <>
      <Layout>
        <div>
          <div className="w-full flex justify-end items-baseline ">
            <div className=" p-2 right-0">
              <div className="float top-10">
                <AppDropdownButton
                  icon={AppDropdownIcon.IoAdd}
                  buttonTitle="Add Row"
                  dropdownType={AppDropdownType.textButton}
                  children={[
                    {
                      title: "Carousel",
                      appDropdownFunction: () => {
                        console.log("wanna add carousel")
                        showLandingDataTypeForm(LandingDataDisplayType.Carousel)
                      },
                    },

                    {
                      title: "Landscape",
                      appDropdownFunction: () => {
                        showLandingDataTypeForm(
                          LandingDataDisplayType.Landscape
                        )
                      },
                    },

                    {
                      title: "Landscape lg",
                      appDropdownFunction: () => {
                        showLandingDataTypeForm(
                          LandingDataDisplayType.LandscapeLg
                        )
                      },
                    },
                    {
                      title: "Landscape xl",
                      appDropdownFunction: () => {
                        showLandingDataTypeForm(
                          LandingDataDisplayType.LandscapeXl
                        )
                      },
                    },
                    {
                      title: "protriat",
                      appDropdownFunction: () => {
                        showLandingDataTypeForm(LandingDataDisplayType.Portriat)
                      },
                    },
                    {
                      title: "protriat lg",
                      appDropdownFunction: () => {
                        showLandingDataTypeForm(
                          LandingDataDisplayType.PortriatLg
                        )
                      },
                    },
                    {
                      title: "protriat xl",
                      appDropdownFunction: () => {
                        showLandingDataTypeForm(
                          LandingDataDisplayType.PortriatXl
                        )
                      },
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="h-3"></div>
          {/*  landing row */}
          {data && (
            <div>
              {data.landing_data?.map((landingComponent, index) => (
                <div className="" key={index}>
                  <LandingRow
                    deleteLandingRow={deleteLandingRow}
                    removeProductFromRow={removeProductFromRow}
                    index={index}
                    addComponentToRowClick={addComponentButtonClick}
                    landingData={landingComponent!}
                  />
                </div>
              ))}
            </div>
          )}
          {/* end landing row */}

          {/* filler */}
          <div className="h-80"></div>
        </div>
      </Layout>

      {selectedFormDisplayType && (
        <Dialog open={showLandingForm} onOpenChange={showLandingDataForm}>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(onSubmit)} action="#">
              <DialogHeader>
                <DialogTitle>
                  New {selectedFormDisplayType} Landing Component
                </DialogTitle>
                <DialogDescription>
                  Create title and set a position for this landing data
                  component {selectedFormDisplayType}
                </DialogDescription>
              </DialogHeader>
              {/*  <input
                {...register("displayType")}
                type="hidden"
                value={selectedFormDisplayType}
                name="display_type"
              /> */}
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    {...register("title")}
                    required
                    onChange={(input) => {
                      setActiveLandingData({
                        ...activeLandingData!,
                        title: input.target.value,
                      })
                      //setActiveLandingDataTitle(input.target.value)
                    }}
                    id="title"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="order" className="text-right">
                    Order
                  </Label>
                  <Input
                    {...register("order")}
                    onChange={(input) => {
                      if (input.target.value) {
                        setActiveLandingData({
                          ...activeLandingData!,
                          order: parseInt(input.target.value),
                        })
                      }
                    }}
                    type="number"
                    id="order"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    saveActiveLandingData()
                    showLandingDataForm(false)

                    console.log("this should close the thing")
                  }}
                  type="submit"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

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
                confirmDeleteRowChild()
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
                confirmDeleteRow()
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <LandingDataFormPicker
        refetch={refetchData}
        landingDataRowId={activeLandingData?.id ?? 0}
        displayTypeName={activeLandingData?.display_type ?? ""}
        index={activeLandingDataIndex}
        // addToProductToList={addProductToRow}
        showModal={showAddProductToLandingRow}
        isOpen={showAddProduct}
      />
    </>
  )
}
