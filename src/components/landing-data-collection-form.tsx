import { LandingDataRow } from "@/interface/interface"
import React, { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { LandingDataDisplayType } from "./app-dropdown-folder/app-dropdown"
import LandingCarouselRow from "./landing-row-components.tsx/landing-carousel-row"
import LandingLandscapeRow from "./landing-row-components.tsx/landing-landscape-row"
import LandingPortriatRow from "./landing-row-components.tsx/landing-portriat-row"
import { IoIosArrowBack, IoMdArrowRoundBack } from "react-icons/io"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileWithPath, useDropzone } from "react-dropzone"
import { toast } from "./ui/use-toast"
import { IoAdd } from "react-icons/io5"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

interface Props {
  index: number
}

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
  price: z.coerce.number().min(1, "Price is required"),
  comparedPrice: z.coerce.number(),
  imageUrl: z.string(),
  images: z.any(),
})

type FormFieldsNew = z.infer<typeof schema>

const LandingDataCollectionForm = ({ index }: Props) => {
  const [files, setFiles] = useState<{ preview: string }[]>([])

  const [pictureFiles, setPictureFiles] = useState<File[]>([])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      //maxFiles: 5,
      multiple: true,
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

      fData.append("title", variables.title)
      fData.append("description", variables.description)
      fData.append("price", variables.price.toString())
      // fData.append("image_url", "https://picsum.photos/200/300")
      fData.append("compared_price", variables.comparedPrice.toString())
      acceptedFiles.forEach((picFile, index) => {
        fData.append(`images[${index}]`, picFile)
      })

      const response = await fetch("creation endpoint", {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          //"Content-Type": "multipart/form-data",
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

      return response.json()
    },
    onSuccess: (data) => {
      toast({
        description: "Product created successfully",
      })
      //navigateToProductList()
      // navigateToProductList()
    },
    onError: (errors) => {
      console.log(errors.message)
      toast({
        description: errors.message,
      })
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

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="#"
        encType="multipart/form-data"
      >
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" />
        </div>
        <div className="flex justify-end pb-1 w-full">
          <button
            disabled={isSubmitting}
            type="submit"
            className=" me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700  "
          >
            {isSubmitting ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default LandingDataCollectionForm
