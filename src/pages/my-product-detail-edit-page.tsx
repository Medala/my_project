import Layout from "@components/layouts/layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useDropzone } from "react-dropzone"
import { CiMenuKebab } from "react-icons/ci"
import {
  attachCategoryAPI,
  createProductUrl,
  deleteProductApi,
  detachCategoryApi,
  myProductPageUrl,
  pictureUrl,
  updateProductUrl,
} from "lib/constants"
import { fetchProductToEdit } from "queries/queries"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm, useFormState } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { z } from "zod"
import Dropdown from "@components/dropdown-folder/Dropdown"
import AppDropdownButton, {
  AppDropdownChild,
  AppDropdownIcon,
  AppDropdownType,
} from "@components/app-dropdown-folder/app-dropdown"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast, useToast } from "@/components/ui/use-toast"
import { IoIosArrowBack } from "react-icons/io"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { IoAdd } from "react-icons/io5"
import { Category, Product } from "@/interface/interface"
import { AttachToCategoryDialog } from "@/components/ui/attach-to-category-dialog"

import { IoClose } from "react-icons/io5"

const schema = z.object({
  title: z.string().min(0).max(500),
  description: z.string().max(1000),
  specifications: z.string().max(1000).nullable(),
  youtubeUrl: z.string().nullable(),
  price: z.coerce.number().min(1, "Price is required"),
  comparedPrice: z.coerce.number(),
  imageUrl: z.string(),
  images: z.any(),
})

type FormValues = z.infer<typeof schema>

type CurrentPicture = {
  source: string
  imageUrl: string
  absoluteUrl: string
}

type UseFormProps = {
  product?: Product
}

const MyProductDetailEditPage = ({ product }: UseFormProps) => {
  const { productId } = useParams()
  const [deleteDialog, showDeleteDialog] = useState(false)
  const [errorToast, showErrorToast] = useState(false)
  const [trashPics, setDeletePicture] = useState<string[]>([])
  const [allowedPicIndex, setAllowedPicCount] = useState(5)
  //const [currentPics, setCurrentPics] = useState<string[]>([])
  const [currentPics, setCurrentPics] = useState<CurrentPicture[]>([])
  const [openAttachCategoryDialog, setOpenAttachCateogry] = useState(false)
  const [attachToCategory, setAttachToCategory] = useState<Category>()
  const [categoryAssociations, SetCategoryAssociations] = useState<Category[]>(
    []
  )

  const productDeletex: AppDropdownChild = {
    title: "Delete",
    appDropdownFunction: () => {
      deleteDialog ? showDeleteDialog(false) : showDeleteDialog(true)
    },
  }

  const appDropdwonChildren = [
    {
      title: "Assign Category",
      appDropdownFunction: () => {
        setOpenAttachCateogry(true)
      },
    },
    {
      title: "Delete",
      appDropdownFunction: () => {
        deleteDialog ? showDeleteDialog(false) : showDeleteDialog(true)
      },
    },
  ]

  const pocket: AppDropdownChild = {
    title: "Delete",
    appDropdownFunction: () => {},
  }

  ////console.log("this is the product id")
  ////console.log(productId)
  const navigate = useNavigate()
  function navigateToProductList() {
    reset({})
    navigate(myProductPageUrl)
  }

  const items = [
    /*  { name: "Home", link: aboutPageUrl },
    { name: "About", link: aboutPageUrl },
    { name: "Contact", link: contactPageUrl }, */
    {
      name: "Delete",
      link: "",
    },
  ]

  //get the product using the product id
  const { isLoading, isError, error, data, isFetched, refetch } = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProductToEdit(`${productId}`),
    // placeholderData: keepPreviousData,
  })
  if (data) {
    console.log("below is the returned data")
    console.log(data)
    // //console.log(data.description)
  }
  if (error) {
    //console.log("server error?")
    //console.log(error.message)
  }

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    /*     defaultValues: product
      ? {
          title: product.title,
          description: product.description,
          price: product.price,
          comparedPrice: product.compared_price,
        }
      : undefined, */

    resolver: zodResolver(schema),
  })

  function returnCurrentPictureObject({
    theSource,
    theUrl,
    theAbsoluteUrl,
  }: {
    theSource: string
    theUrl: string
    theAbsoluteUrl: string
  }): CurrentPicture {
    return {
      source: theSource,
      imageUrl: theUrl,
      absoluteUrl: theAbsoluteUrl,
    }
  }

  useEffect(() => {
    //console.log("data kan nei ta e")
    //console.log(data)
    reset({
      title: data?.title,
      description: data?.description,
      specifications: data?.specification,
      youtubeUrl: data?.product_video,
      price: data?.price,
      comparedPrice: data?.compared_price,
      imageUrl: data?.image_url,
    })
    if (data) {
      // const imagesWithPath = [];
      if (data?.images.length > 0) {
        //setCurrentPics(data.images.map((picFile) => pictureUrl(picFile)))
        const dataImages = data.images.map((picFile) => pictureUrl(picFile))
        setCurrentPics(
          data.images.map((picFile) =>
            returnCurrentPictureObject({
              theSource: "server",
              theUrl: pictureUrl(picFile),
              theAbsoluteUrl: picFile,
            })
          )
        )
      }
      //setCurrentPics([...imagesWithPath])
      //console.log("logging current pics")
      //console.log(currentPics)
    }
  }, [data])

  const submitFormMutation = useMutation({
    mutationFn: async (variables: FormValues) => {
      const formData = new FormData()
      formData.append("title", variables.title)
      formData.append("description", variables.description)
      formData.append("specifications", variables?.specifications!)
      formData.append("price", variables.price.toString())
      formData.append("comopared_price", variables.comparedPrice.toString())
      formData.append("youtube_url", variables?.youtubeUrl!)
      acceptedFiles.forEach((picFile, index) => {
        if (index <= allowedPicIndex) {
          formData.append(`images[${index}]`, picFile)
        }
      })

      trashPics.forEach((picFile, index) => {
        formData.append(`trash_pics[${index}]`, picFile)
      })

      const response = await fetch(updateProductUrl + "/" + productId, {
        method: "PATCH",
        headers: {
          //  "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        body: formData,
      })

      return response.json()
    },
    onSuccess: (data) => {
      console.log(data)
      console.log("got success")

      toast({
        description: "Product updated successfully",
      })
      navigateToProductList()
      // handle server error from here
    },
    onError: (errors) => {
      //console.log(errors.message)
      toast({
        description: errors.message,
      })
    },
  })

  const onSubmit = async (submittedData: FormValues) => {
    if (acceptedFiles.length == 0 && currentPics.length == 0) {
      setError("images", {
        message: "Picture is required",
      })
      return
    }
    try {
      //console.log(submittedData)
      // throw new Error()
    } catch (error) {
      setError("root", {
        message: errors.root?.message,
      })
    }
    submitFormMutation.mutate(submittedData)
  }

  async function deleteProduct(id: number) {
    //return response.json()
    deleteFormMutation.mutate()
  }

  function deleteImage(
    index: number,
    picture: string,
    source: string,
    absoluteUrl: string
  ) {
    setCurrentPics((oldValues) => {
      return oldValues.filter((_, i) => i !== index)
    })
    if (source == "server") {
      //console.log("should delete this image after save")
      setDeletePicture([...trashPics, picture])
    } else {
      //console.log("we are inside delete image " + absoluteUrl)
      //console.log(acceptedFiles)
      var targetIndex = null
      acceptedFiles.forEach((item, index) => {
        if (item.name == absoluteUrl) {
          //console.log("Found the file to delete")
          targetIndex = index
        }
      })
      if (targetIndex != null) {
        acceptedFiles.splice(targetIndex, 1)
      }

      ////console.log(acceptedFiles.splice(acceptedFileIndex!))
    }
  }

  const deleteFormMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(deleteProductApi + "/" + productId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })

      return response.json()
    },
    onSuccess: (data) => {
      console.log(data)
      toast({
        description: "Product deleted successfully",
      })

      navigateToProductList()
    },
    onError: (errors) => {
      //console.log(errors.message)
      toast({
        title: "Error!",
        description: errors.message,
      })
    },
  })

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      //maxFiles: 5,
      multiple: true,
      onDrop: (acceptedFiles) => {
        clearErrors("images")
        console.log("belo is the accepted files")
        console.log(acceptedFiles)
        let currentPicCount = currentPics.length
        let allowedNumberOfNewPics = 5 - currentPicCount
        setAllowedPicCount(allowedNumberOfNewPics - 1)

        let newCurrent: CurrentPicture[] = []

        acceptedFiles.forEach((aFile, index) => {
          if (index <= allowedNumberOfNewPics - 1) {
            newCurrent.push(
              returnCurrentPictureObject({
                theSource: "local",
                theUrl: URL.createObjectURL(aFile),
                theAbsoluteUrl: aFile ? aFile.name : "",
              })
            )
          }
        })

        setCurrentPics([...currentPics, ...newCurrent])
      },
    })

  async function detachCategory(id: number) {
    const deleteCategoryFormData = new FormData()
    deleteCategoryFormData.append("category_id", id.toString())
    deleteCategoryFormData.append("product_id", data!.id.toString())

    const response = await fetch(detachCategoryApi, {
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

    refetchData()
    /// to do
    //check response status code and take action
    // show error if any
  }

  async function attachCategory(id: number) {
    const attachCategoryFormData = new FormData()
    attachCategoryFormData.append("category_id", id.toString())
    attachCategoryFormData.append("product_id", data!.id.toString())

    const response = await fetch(attachCategoryAPI, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        //"Content-Type": "multipart/form-data",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        Authorization: "Bearer " + localStorage.getItem("token"),
      },

      body: attachCategoryFormData,
    })
    console.log("Reached the server to delete a category")
    const theResponse = await response.json()
    console.log(theResponse)

    refetchData()
    /// to do
    //check response status code and take action
    // show error if any
  }

  function refetchData() {
    refetch()
  }

  function attachProductToCategory(category: Category) {
    setAttachToCategory(category)
    attachCategory(category.id)
  }

  return (
    <>
      <Layout>
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} action="#">
            <div className="w-full py-2 text-center px-4 flex justify-between items-center text-gray-900">
              <button
                type="button"
                onClick={navigateToProductList}
                className="rounded-full bg-white shadow-lg hover:bg-slate-200 hover:shadow-xl border p-2"
              >
                <IoIosArrowBack />
              </button>
              <div>Edit Product</div>
              <AppDropdownButton
                icon={AppDropdownIcon.slOptionsVertical}
                buttonTitle=""
                dropdownType={AppDropdownType.iconButton}
                children={appDropdwonChildren}
              />
            </div>

            <div className="flex space-x-1 w-full overflow-x-scroll pb-2">
              <div className="p-1 flex-none font-semibold text-gray-600">
                Category Associations :{" "}
              </div>
              {data?.categories.map((category, index) => {
                return (
                  <div
                    key={index}
                    className="border px-2 py-1 rounded-full flex items-center flex-none"
                  >
                    <div>{category?.name}</div>
                    <div
                      onClick={() => {
                        detachCategory(category!.id)
                      }}
                      className="pl-2 cursor-pointer "
                    >
                      <IoClose />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="px-4 pb-1 pt-2">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Product Title
              </label>
              <textarea
                {...register("title")}
                //  defaultValue={product ? product.title : undefined}
                id="title"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              ></textarea>
              {errors.title && (
                <span className="text-xs text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="px-4 pb-1 pt-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Product Description
              </label>
              <textarea
                {...register("description")}
                //   defaultValue={product ? product.description : undefined}
                id="description"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              ></textarea>
              {errors.description && (
                <span className="text-xs text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="md:flex">
              <div className="px-4 pb-1 pt-2">
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Product Price:
                </label>
                <input
                  {...register("price")}
                  type="number"
                  id="price"
                  aria-describedby="helper-text-explanation"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
                {errors.price && (
                  <span className="text-xs text-red-500">
                    {errors.price.message}
                  </span>
                )}
              </div>

              <div className="px-4 pb-1 pt-2">
                <label
                  htmlFor="compared-price"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Compared Price:
                </label>
                <input
                  {...register("comparedPrice")}
                  type="number"
                  id="compared-price"
                  aria-describedby="helper-text-explanation"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
                {errors.comparedPrice && (
                  <span className="text-xs text-red-500">
                    {errors.comparedPrice.message}
                  </span>
                )}
              </div>

              <div className="px-4 pb-1 pt-2 w-full">
                <label
                  htmlFor="youtube_url"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Youtube Url:
                </label>
                <input
                  {...register("youtubeUrl")}
                  id="youtube_url"
                  aria-describedby="helper-text-explanation"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="youtube video url"
                />
                {errors.youtubeUrl && (
                  <span className="text-xs text-red-500">
                    {errors.youtubeUrl.message}
                  </span>
                )}
              </div>
            </div>
            <input
              {...register("imageUrl")}
              type="hidden"
              id="image_url"
              value={"https://picsum.photos/200/300"}
            />
            {/* product pictures */}
            <div className="pl-4 pt-6 ">
              <div className="mb-2 block text-sm font-medium text-gray-900">
                Product Pictures{" "}
                <span className="text-x text-gray-300">
                  - maximum allowed pictures : 5
                </span>
              </div>

              {currentPics.length < 5 && (
                <div
                  {...getRootProps()}
                  typeof="button"
                  className="rounded w-36 border p-2 shadow  mt-2 cursor-pointer hover:shadow-lg flex space-x-1 justify-center items-center transition-shadow duration-75"
                >
                  <span className="block text-xs">Add Picture</span>
                  <IoAdd size={22} />
                </div>
              )}

              {errors.images && (
                <span className="text-xs text-red-500">
                  Picture is required
                </span>
              )}

              {/* image upload section */}
              <div className="invisible" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 pt-2 px-4">
              {currentPics.map((pic, index) => (
                <div key={index}>
                  <div className="rounded-lg overflow-hidden min-h-48 shadow-lg hover:shadow-xl relative">
                    <div className="absolute p-2 right-0">
                      <AppDropdownButton
                        icon={AppDropdownIcon.slOptionsVertical}
                        buttonTitle=""
                        dropdownType={AppDropdownType.iconButton}
                        children={[
                          {
                            title: "Delete",
                            appDropdownFunction: () => {
                              //console.log("delete a in trn " + pic.absoluteUrl)
                              deleteImage(
                                index,
                                pic.absoluteUrl,
                                pic.source,
                                pic.absoluteUrl
                              )
                            },
                          },
                        ]}
                      />
                    </div>
                    <img
                      src={pic.imageUrl}
                      className="h-full aspect-2/3 object-contain rounded-l-lg "
                      alt="asdfasdfasdf"
                    ></img>
                  </div>
                </div>
              ))}
            </div>

            {/*  <div>current pics</div>
            <div className="grid grid-cols-4 gap-4 pt-2 px-4">
              {currentPics.map((pic, index) => (
                <div key={index}>
                  <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl relative">
                    <div className="absolute p-2 right-0">
                      <AppDropdownButton
                        icon={AppDropdownIcon.slOptionsVertical}
                        buttonTitle=""
                        dropdownType={AppDropdownType.iconButton}
                        children={[
                          {
                            title: "Delete",
                            appDropdownFunction: () => {
                              deleteImage(index, pic)
                            },
                          },
                        ]}
                      />
                    </div>
                    <img
                      src={pictureUrl(pic) as string}
                      className="h-full aspect-2/3 object-contain rounded-l-lg "
                      alt="asdfasdfasdf"
                    ></img>
                  </div>
                </div>
              ))}
            </div> */}

            {/* <div>trash pics</div>
            <div className="grid grid-cols-4 gap-4 pt-2 px-4">
              {trashPics.map((pic, index) => (
                <div key={index}>
                  <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl relative">
                    <div className="absolute p-2 right-0">
                      <AppDropdownButton
                        icon={AppDropdownIcon.slOptionsVertical}
                        buttonTitle=""
                        dropdownType={AppDropdownType.iconButton}
                        children={[
                          {
                            title: "Delete",
                            appDropdownFunction: () => {
                              deleteImage(index, pic)
                            },
                          },
                        ]}
                      />
                    </div>
                    <img
                      src={pictureUrl(pic) as string}
                      className="h-full aspect-2/3 object-contain rounded-l-lg "
                      alt="asdfasdfasdf"
                    ></img>
                  </div>
                </div>
              ))}
            </div> */}

            {/*   {errors.root && (
              <span className="text-red-500 text-xs px-6">
                {errors.root.message}
              </span>
            )} */}

            <div className="px-4 pb-1 pt-2 ">
              <label
                htmlFor="specifications"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Product Speficications
              </label>
              <textarea
                rows={8}
                {...register("specifications")}
                id="specifications"
                className="block w-full  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Product Speficications"
              ></textarea>
              {errors.description && (
                <span className="text-xs text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className=" flex justify-end px-4 pb-1 pt-6">
              {/* <button
                type="button"
                onClick={navigateToProductList}
                className=" mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 "
              >
                Cancel
              </button> */}
              {/*  <button
                disabled={isSubmitting}
                type="submit"
                className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700  "
              >
                {isSubmitting ? "Loading..." : "Save"}
              </button> */}

              <div className="fixed bottom-4 right-4">
                <button
                  disabled={isSubmitting}
                  className="bg-orange-400 hover:bg-orange-500 text-white cursor-pointer rounded-full py-2 px-6 shadow-lg"
                >
                  {isSubmitting ? "Loading..." : "Save"}
                </button>
              </div>
            </div>
          </form>
          <div className="h-20 "></div>
        </div>
      </Layout>

      <AlertDialog open={deleteDialog} onOpenChange={showDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              product data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                showDeleteDialog(false)
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteProduct(parseInt(productId!))
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AttachToCategoryDialog
        attachToCategory={attachProductToCategory}
        isOpen={openAttachCategoryDialog}
        isOpenChange={setOpenAttachCateogry}
      ></AttachToCategoryDialog>
    </>
  )
}

export default MyProductDetailEditPage
