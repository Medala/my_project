import { LandingDataRow, Product } from "@/interface/interface"
import React, { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { LandingDataDisplayType } from "./app-dropdown-folder/app-dropdown"
import LandingCarouselRow from "./landing-row-components.tsx/landing-carousel-row"
import LandingLandscapeRow from "./landing-row-components.tsx/landing-landscape-row"
import LandingPortriatRow from "./landing-row-components.tsx/landing-portriat-row"
import { IoIosArrowBack, IoMdArrowRoundBack } from "react-icons/io"
import { IoTrashBinOutline } from "react-icons/io5"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileWithPath, useDropzone } from "react-dropzone"
import { toast } from "./ui/use-toast"
import { IoAdd } from "react-icons/io5"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

import UserLandingProductSearchMini from "./user-landing-product-search-mini"
import { Divide } from "lucide-react"
import { LandingDataChildTypeEnum } from "@/interface/app_enums"
import { createProductUrl, updateLandingDataUrl } from "@/lib/constants"

interface Props {
  refetch: Function
  index: number
  landingDataRowId: number
  showDialog: Function
}

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"]

const schema = z.object({
  //componentItemType: z.string().min(0).max(500),
  // productId: z.coerce.number().min(1, "Product id required"),
  //image: z.any(),
})

type FormFieldsNew = z.infer<typeof schema>

const LandingDataProductForm = ({
  index,
  landingDataRowId,
  showDialog,
  refetch,
}: Props) => {
  const [files, setFiles] = useState<{ preview: string }[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product>()

  const [pictureFiles, setPictureFiles] = useState<File[]>([])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      //maxFiles: 5,
      multiple: false,
      onDrop: (acceptedFiles: FileWithPath[]) => {
        let currentPicCount = files.length
        let allowedNumberOfNewPics = 5 - currentPicCount

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

        console.log(
          "below are the accepted files, and the number of files that can be uploadaed is " +
            allowedNumberOfNewPics
        )
        console.log(acceptedFiles)
      },
    })

  const {
    register,
    handleSubmit,
    setError,
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

      fData.append("component_item_type", LandingDataChildTypeEnum.Product)
      fData.append("landing_row_id", landingDataRowId.toString())

      fData.append("product_id", selectedProduct?.id.toString() ?? "-1")
      /* acceptedFiles.forEach((picFile, index) => {
        fData.append(`images[${index}]`, picFile)
      }) */

      fData.append("image", acceptedFiles[0])

      const response = await fetch(updateLandingDataUrl, {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work

          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        body: fData,
      })

      return response.json()
    },

    onSuccess: (data) => {
      console.log("on success kan thleng tawh e")
      console.log(data)
      showDialog(false)
      refetch()
      toast({
        description: "Component item added successfully",
      })
      /// refetch landing list
    },
    onError: (errors) => {
      console.log(errors.message)
    },
  })

  const onSubmit = async (submittedData: FormFieldsNew) => {
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

  // return <div>landing row</div>
  console.log("any erro")
  console.log(errors)

  return (
    <div className="h-full text-gray-600 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        /* onSubmit={() => {
          alert("u submitting")
        }} */
        action="#"
        encType="multipart/form-data"
      >
        <div className="flex justify-between items-center pb-1 pt-3">
          <div>Product:</div>
          {selectedProduct && (
            <button
              onClick={() => {
                setSelectedProduct(undefined)
              }}
              className="p-2 rounded-full bg-white shadow-lg"
            >
              <IoTrashBinOutline className="h" />
            </button>
          )}
        </div>
        {selectedProduct && (
          <div className="text-sm line-clamp-1 pt-2 bg-white rounded-sm outline-dotted border-gray-500">
            <p className="px-2"> {selectedProduct.title}</p>
          </div>
        )}
        {!selectedProduct && (
          <div className="w-full mb-4">
            <UserLandingProductSearchMini
              rowIndex={0}
              addProductToList={setSelectedProduct}
            />
          </div>
        )}
        <div className="mt-2 grid w-full items-center gap-1.5">
          <div className="">Component Image</div>

          {files.length < 5 && (
            <div
              {...getRootProps()}
              typeof="button"
              className="rounded w-full border p-2 shadow   cursor-pointer hover:shadow-lg flex space-x-1 justify-center items-center transition-shadow duration-75"
            >
              <span className="block text-xs">Add Picture</span>
              <IoAdd size={22} />
            </div>
          )}

          {files.length > 0 && (
            <div className="w-full h-60 ">
              <img
                className="mb-2 h-60 aspect-1/1 object-contain mx-auto"
                src={files[0].preview as string}
                alt=""
              />
            </div>
          )}

          {/* image upload section */}
          <div className="hidden" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        </div>

        {/* <div className="mt-2 text-sm font-semibold">Link Product</div> */}
        {/*   <input
          {...register("componentItemType")}
          type="hidden"
          name="component_item_type"
          value={LandingDataChildType.Product}
        /> */}

        {selectedProduct && files.length > 0 && (
          <div className="fixed right-4 bottom-4 md:right-10 md:bottom-10 ">
            <button
              //disabled={}
              type="submit"
              className=" me-2 rounded-lg border border-gray-600 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700  "
            >
              {isSubmitting ? "Loading..." : "Save"}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default LandingDataProductForm
