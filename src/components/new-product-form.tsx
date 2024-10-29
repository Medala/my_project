import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  title: z.string().min(0).max(500),
  description: z.string().max(1000),
  price: z.coerce.number().min(1, "Price is required"),
  comparedPrice: z.coerce.number(),
  imageUrl: z.string(),
})

type FormFields = z.infer<typeof schema>

/* {
    title: string
    imageUrl: string
    price: number
    description: string
    comparedPrice: string
  } */

const NewProductForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data)
      throw new Error()
    } catch (error) {
      setError("root", {
        message: errors.root?.message,
      })
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute top-0 w-screen h-screen grid grid-cols-1 place-content-center backdrop-blur-sm"
      >
        <div className="bg-gray-100 shadow-sm w-11/12 md:w-4/6 mx-auto rounded-lg overflow-hidden">
          <div className="bg-gray-800 text-gray-200 text-center py-2">
            Create Product
          </div>
          <div className="px-4 pt-2 pb-1">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Title
            </label>
            <textarea
              {...register("title")}
              id="title"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Detailed Product Title"
            ></textarea>
            {errors.title && (
              <span className="text-red-500 text-xs">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="px-4 pt-2 pb-1">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Descriptio
            </label>
            <textarea
              {...register("description")}
              id="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Product Description"
            ></textarea>
            {errors.description && (
              <span className="text-red-500 text-xs">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="md:flex">
            <div className="px-4 pt-2 pb-1">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Product Price:
              </label>
              <input
                {...register("price")}
                type="number"
                id="price"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
              {errors.price && (
                <span className="text-red-500 text-xs">
                  {errors.price.message}
                </span>
              )}
            </div>

            <div className="px-4 pt-2 pb-1">
              <label
                htmlFor="compared-price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Compared Price:
              </label>
              <input
                {...register("comparedPrice")}
                type="number"
                id="compared-price"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
              />
              {errors.comparedPrice && (
                <span className="text-red-500 text-xs">
                  {errors.comparedPrice.message}
                </span>
              )}
            </div>
          </div>
          <div className="px-4 pt-6 pb-1 flex justify-between">
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              type="submit"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {isSubmitting ? "Loading..." : "Save"}
            </button>
          </div>

          {errors.root && (
            <span className="text-red-500 text-xs px-6">
              {errors.root.message}
            </span>
          )}
        </div>
      </form>
    </>
  )
}

export default NewProductForm
