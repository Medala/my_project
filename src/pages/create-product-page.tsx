import Layout from "@components/layouts/layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { createProductUrl, myProductPageUrl } from "lib/constants"
import React, { useState, useCallback } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z, object, array, string, nullable } from "zod"
import { useDropzone, FileWithPath } from "react-dropzone"
import { IoIosArrowBack } from "react-icons/io"
import { IoAdd } from "react-icons/io5"
import AppDropdownButton, {
  AppDropdownChild,
  AppDropdownIcon,
  AppDropdownType,
} from "@/components/app-dropdown-folder/app-dropdown"
import { type } from "os"
import { toast } from "@/components/ui/use-toast"
import App from "@/App"
import { AttachToCategoryDialog } from "@/components/ui/attach-to-category-dialog"
import { Category } from "@/interface/interface"
import { MdDelete } from "react-icons/md"
import imageCompression from "browser-image-compression"

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"]

const schema = z.object({
  title: z.string().min(0).max(500),
  description: z.string().max(1000),
  specifications: z.string().max(1000).nullable(),
  price: z.coerce.number().min(1, "Price is required"),
  gst: z.coerce.number(),
  comparedPrice: z.coerce.number(),
  quantity: z.coerce.number().nullable(),
  imageUrl: z.string(),
  youtubeUrl: z.string().nullable(),
  images: z.any(),
})

type FormFieldsNew = z.infer<typeof schema>

/* {
    title: string
    imageUrl: string
    price: number
    description: string
    comparedPrice: string
  } */

const CreateProductPage = () => {
  const [files, setFiles] = useState<{ preview: string }[]>([])
  const [openAttachCategoryDialog, setOpenAttachCateogry] = useState(false)
  const [attachToCategory, setAttachToCategory] = useState<Category>()
  const [pictureFiles, setPictureFiles] = useState<File[]>([])
  const [allowedPicIndex, setAllowedPicCount] = useState(5)
  const navigate = useNavigate()
  function navigateToProductList() {
    navigate(myProductPageUrl)
  }

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      //maxFiles: 5,
      multiple: true,
      onDrop: (acceptedFiles: FileWithPath[]) => {
        clearErrors("images")
        let currentPicCount = files.length
        let allowedNumberOfNewPics = 5 - currentPicCount
        setAllowedPicCount(allowedNumberOfNewPics - 1)

        let filteredFiles: { preview: string }[] = []

        acceptedFiles.forEach((file, index) => {
          setPictureFiles([...pictureFiles, file])
          console.log("this is the file name: " + file.name)
          // setPictureFiles([...pictureFiles, file])
          /* if (typeof file !== "number") {
            setPictureFiles([...pictureFiles, file])
          } */

          if (index <= allowedNumberOfNewPics - 1) {
            filteredFiles.push(
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          }
        })

        setFiles([...files, ...filteredFiles])

        /*  const newAcceptiedFiles = acceptedFiles.map((picFile) =>
          Object.assign(picFile, {
            preview: URL.createObjectURL(picFile),
          })
        ) */

        // console.log(newAcceptiedFiles)
        /*  if (files.length > 0) {
          setFiles((prev) => {
            return [...prev, ...filteredFiles]
          })
        } else {
          setFiles(filteredFiles)
        } */
        console.log(
          "below are the accepted files, and the number of files that can be uploadaed is " +
            allowedNumberOfNewPics
        )
        console.log(acceptedFiles)
        //console.log(files.length + " of files already available")
      },
    })

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormFieldsNew>({
    resolver: zodResolver(schema),
  })

  const submitFormMutation = useMutation({
    mutationFn: async (variables: FormFieldsNew) => {
      console.log(
        "a hnuaia mi hi picture file tur ani at the time of submitting"
      )
      console.log(pictureFiles)
      const fData = new FormData()

      fData.append(
        "attach_to_category_id",
        attachToCategory ? attachToCategory!.id.toString() : "0"
      )
      fData.append("title", variables.title)
      fData.append("description", variables.description)
      fData.append("price", variables.price.toString())
      fData.append("specifications", variables?.specifications!)
      fData.append("youtube_url", variables?.youtubeUrl!)
      // fData.append("image_url", "https://picsum.photos/200/300")
      fData.append("compared_price", variables.comparedPrice.toString())
      fData.append("gst", variables.gst.toString())

      acceptedFiles.forEach((picFile, index) => {
        // compress the images here
        // handleImageUpload(picFile, fData, index)
        fData.append(`images[${index}]`, picFile)
      })

      const response = await fetch(createProductUrl, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          //   "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        /*  body: JSON.stringify({
          title: variables.title,
          image_url: variables.imageUrl,
          description: variables.description,
          price: variables.price,
          compared_price: variables.comparedPrice,
          images: files,
        }), */
        body: fData,
      })

      if (!response.ok) {
        throw await response.json()
      }

      return response.json()
    },
    onSuccess: (data) => {
      console.log("product created data")
      console.log(data)
      toast({
        description: "Product created successfully",
      })

      navigateToProductList()
    },
    onError: (errors) => {
      console.log("there is an error")
      console.log(errors)
      toast({
        description: errors.message,
      })
    },
  })

  const onSubmit = async (submittedData: FormFieldsNew) => {
    if (acceptedFiles.length == 0) {
      setError("images", {
        message: "Picture is required",
      })
      return
    }
    try {
      console.log("Below is the submitted data")
      console.log(files)
      //console.log(pictureFiles)
      throw new Error()
    } catch (error) {
      setError("root", {
        message: errors.root?.message,
      })
    }

    submitFormMutation.mutate(submittedData)
  }

  function deleteImage(indexToDelete: number) {
    var targetIndex = null
    files.forEach((item, index) => {
      if (index == indexToDelete) {
        targetIndex = index
      }
    })
    console.log("deleting image at index " + targetIndex)
    if (targetIndex != null) {
      console.log(files)
      files.splice(targetIndex, 1)
      setFiles([...files])
    }
  }

  const dropdownChild: AppDropdownChild = {
    title: "Assign Category",
    appDropdownFunction: () => {
      setOpenAttachCateogry(true)
    },
  }

  function handleImageUpload(event: any) {
    var imageFile = event.target.files[0]
    console.log("originalFile instanceof Blob", imageFile instanceof Blob) // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`)

    var options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    imageCompression(imageFile, options)
      .then(function (compressedFile) {
        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob
        ) // true
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        ) // smaller than maxSizeMB

        //return uploadToServer(compressedFile); // write your own logic
      })
      .catch(function (error) {
        console.log(error.message)
      })
  }

  return (
    <>
      <Layout>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            encType="multipart/form-data"
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleImageUpload(e)
              }}
            ></input>
            <div className="w-full py-2 text-center px-4 flex justify-between items-center text-gray-900">
              <button
                type="button"
                onClick={navigateToProductList}
                className="rounded-full bg-white shadow-lg hover:bg-slate-200 hover:shadow-xl border p-2"
              >
                <IoIosArrowBack />
              </button>
              <div>Create Product</div>
              <div>
                <AppDropdownButton
                  buttonTitle={undefined}
                  dropdownType={AppDropdownType.iconButton}
                  icon={AppDropdownIcon.slOptionsVertical}
                  children={[dropdownChild]}
                ></AppDropdownButton>
              </div>
            </div>

            {/*  <div className="px-4 pb-1 pt-2">
                Category : {attachToCategory?.name}
              </div> */}
            <div className="px-4 ">
              <div className="flex pb-1 pt-2 items-center">
                {attachToCategory == undefined && (
                  <div
                    className="font-semibold text-gray-600 cursor-pointer"
                    onClick={() => {
                      setOpenAttachCateogry(true)
                    }}
                  >
                    Category : Category not selected
                  </div>
                )}
                {attachToCategory && (
                  <div>Category : {attachToCategory.name} </div>
                )}
                {attachToCategory && (
                  <div
                    onClick={() => {
                      setAttachToCategory(undefined)
                    }}
                    className="cursor-pointer ml-2 p-2 rounded-full  shadow"
                  >
                    <MdDelete />
                  </div>
                )}
              </div>
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
                id="title"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Detailed Product Title"
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
                id="description"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Product Description"
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
                  placeholder=""
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
                  placeholder=""
                />
                {errors.comparedPrice && (
                  <span className="text-xs text-red-500">
                    {errors.comparedPrice.message}
                  </span>
                )}
              </div>

              <div className="px-4 pb-1 pt-2">
                <label
                  htmlFor="compared-price"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  GST:
                </label>
                <input
                  {...register("gst")}
                  type="number"
                  id="gst"
                  aria-describedby="helper-text-explanation"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder=""
                />
                {errors.gst && (
                  <span className="text-xs text-red-500">
                    {errors.gst.message}
                  </span>
                )}
              </div>

              <div className="px-4 pb-1 pt-2">
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Quantity:
                </label>
                <input
                  {...register("quantity")}
                  type="number"
                  id="quantity"
                  aria-describedby="helper-text-explanation"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder=""
                />
                {errors.comparedPrice && (
                  <span className="text-xs text-red-500">
                    {errors.comparedPrice.message}
                  </span>
                )}
              </div>
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
            <input
              {...register("imageUrl")}
              type="hidden"
              id="image_url"
              value={"https://picsum.photos/200/300"}
            />

            {/* image upload section */}
            <div className="p-4">
              <div className="mb-2 block text-sm font-medium text-gray-900">
                Product Pictures
              </div>

              {files.length < 5 && (
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

            <div className="grid grid-cols-5 gap-4 pt-6 px-4">
              {files.map((pic, index) => (
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
                              deleteImage(index)
                            },
                          },
                        ]}
                      />
                    </div>

                    <img
                      src={pic.preview as string}
                      className="h-full aspect-2/3 object-contain rounded-l-lg "
                      alt="asdfasdfasdf"
                    ></img>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 pb-1 pt-2">
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
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Product Speficications"
              ></textarea>
              {errors.description && (
                <span className="text-xs text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* {files && (
              <p className="mb-5">
                <img src={preview as string} alt="Upload preview" />
              </p>
            )} */}
            {/* end of image upload section */}

            <button
              disabled={isSubmitting}
              type="submit"
              className=" fixed bottom-14 right-4 mb-2 me-2 bg-orange-400 hover:bg-orange-500 text-white cursor-pointer rounded-full py-2 px-6 shadow-lg"
            >
              {isSubmitting ? "Loading..." : "Save"}
            </button>

            {/*   {errors.root && (
              <span className="text-red-500 text-xs px-6">
                {errors.root.message}
              </span>
            )} */}
          </form>
          <div className="h-20 "></div>
        </div>
        <AttachToCategoryDialog
          attachToCategory={setAttachToCategory}
          isOpen={openAttachCategoryDialog}
          isOpenChange={setOpenAttachCateogry}
        ></AttachToCategoryDialog>
      </Layout>
    </>
  )
}

export default CreateProductPage
