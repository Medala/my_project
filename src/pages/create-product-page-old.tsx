import Layout from "@components/layouts/layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { createProductUrl, myProductPageUrl } from "lib/constants"
import React, { useState, useCallback } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z, object, array, string } from "zod"
import { useDropzone } from "react-dropzone"
import { toast } from "@/components/ui/use-toast"

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

/* {
    title: string
    imageUrl: string
    price: number
    description: string
    comparedPrice: string
  } */

const CreateProductPageOld = () => {
  const [files, setFiles] = useState<{ preview: string }[]>([])
  const [pictureFiles, setPictureFiles] = useState<File[]>()

  const navigate = useNavigate()
  function navigateToProductList() {
    navigate(myProductPageUrl)
  }

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      maxFiles: 5,
      multiple: true,
      onDrop: (acceptedFiles) => {
        console.log()
        setPictureFiles(acceptedFiles)

        setFiles(
          acceptedFiles.map((picFile) =>
            Object.assign(picFile, {
              preview: URL.createObjectURL(picFile),
            })
          )
        )

        /* const newAcceptiedFiles = acceptedFiles.map((picFile) =>
          Object.assign(picFile, {
            preview: URL.createObjectURL(picFile),
          })
        )
        console.log(newAcceptiedFiles)
        if (files.length > 0) {
          console.log("files", files)
          setFiles((prev) => {
            return [...prev, ...newAcceptiedFiles]
          })
        } else {
          setFiles(newAcceptiedFiles)
        } */

        //console.log(files.length + " of files already available")
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
      const response = await fetch(createProductUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        credentials: "include",
        body: JSON.stringify({
          title: variables.title,
          image_url: variables.imageUrl,
          description: variables.description,
          price: variables.price,
          compared_price: variables.comparedPrice,
          images: files,
        }),
      })

      return response.json()
    },
    onSuccess: (data) => {
      console.log("returning response from the server")
      console.log(data)
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

  console.log("files", files)
  return (
    <>
      <Layout>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            encType="multipart/form-data"
          >
            <div className="w-full py-2 text-center text-gray-900">
              Create Product
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
            </div>
            <input
              {...register("imageUrl")}
              type="hidden"
              id="image_url"
              value={"https://picsum.photos/200/300"}
            />

            {/* image upload section */}
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
            {files.map((pic, index) => (
              <div key={index}>
                <p className="mb-5">
                  <img src={pic.preview as string} alt="Upload preview" />
                </p>
              </div>
            ))}
            {/* {files && (
              <p className="mb-5">
                <img src={preview as string} alt="Upload preview" />
              </p>
            )} */}
            {/* end of image upload section */}

            <div className="flex justify-end pb-1 pt-6">
              {/* <button
                type="button"
                onClick={navigateToProductList}
                className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 "
              >
                Cancel
              </button> */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700  "
              >
                {isSubmitting ? "Loading..." : "Save"}
              </button>
            </div>

            {/*   {errors.root && (
              <span className="text-red-500 text-xs px-6">
                {errors.root.message}
              </span>
            )} */}
          </form>
        </div>
      </Layout>
    </>
  )
}

export default CreateProductPageOld
