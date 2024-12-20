import { useRef, useState } from "react"

import Dropdown from "../components/dropdown-folder/Dropdown"
import DropdownItem from "../components/dropdown-folder/DropdownItem"

import { FaPlus } from "react-icons/fa6"
import Navbar from "@components/Navbar"
import {
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom"
import {
  aboutPageUrl,
  baseStorageUrl,
  baseWebUrl,
  contactPageUrl,
  customersPageUrl,
  fetchAllLandingList,
  fetchCategory,
  loginUrl,
  manageGetAllLandingList,
  navigateProductDetailUri,
} from "lib/constants"
import LeftPanel from "@components/left-panel"
import Layout from "@components/layouts/layout"
import CustomerLayout from "@/components/layouts/customer-layout"
import { CategoryBrowseData, LandingDataApiFetch } from "@/interface/interface"
import { useQuery } from "@tanstack/react-query"
import LandingRow from "@/components/landing-row"
import LandingRowCustomer from "@/components/landing-row-customer"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import AppPagination from "@/components/app-pagination"

export default function CategoryBrowse() {
  const { categoryId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  console.log(`the category id is ${categoryId}`)
  const navigate = useNavigate()
  const page = searchParams.get("page") || "1"
  //const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"))

  async function fetchTheCategory(catId: string): Promise<CategoryBrowseData> {
    console.log("Bearer " + localStorage.getItem("token"))
    const response = await fetch(fetchCategory(catId!, page), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      credentials: "include",
    })
    if (!response.ok) {
      throw new Error("Something went wrong")
    }
    return response.json()
  }

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["categoryBrowse", categoryId, page],
    queryFn: () => fetchTheCategory(categoryId!),
    // placeholderData: keepPreviousData,
  })
  if (data) {
    console.log("category loaded")
    console.log(data)
  }

  function navigateToCategory(id: number) {
    navigate(`/category/${id}`)
  }

  function goToProductDetail(prodId: number) {
    navigate(`${navigateProductDetailUri}/${prodId}`)
  }

  function goToPage(page: number) {
    setSearchParams((params) => {
      params.set("page", page.toString())
      return params
    })
  }

  function goToNextPage() {
    if (
      data?.paginated_products.current_page !=
      data?.paginated_products.last_page
    ) {
      console.log(page)
      //setPage(thisPage++)
      setSearchParams((params) => {
        params.set(
          "page",
          data?.paginated_products.current_page
            ? (data.paginated_products.current_page + 1).toString()
            : "1"
        )
        return params
      })
    }
  }

  function goToPreviousPage() {
    if (data?.paginated_products.current_page != 1) {
      console.log(page)
      //setPage(thisPage++)
      setSearchParams((params) => {
        params.set(
          "page",
          data?.paginated_products.current_page
            ? (data.paginated_products.current_page - 1).toString()
            : "1"
        )
        return params
      })
    }
  }

  return (
    <>
      <CustomerLayout>
        <div className="w-full h-screen hidden md:grid grid-cols-12">
          <div className="h-full col-span-2 overflow-auto shadow-xl">
            {data?.children.map((child, index) => {
              return (
                <div
                  onClick={() => {
                    navigateToCategory(child.id)
                  }}
                  key={index}
                  className="px-2 py-2 hover:shadow-lg  border-b cursor-pointer transition-shadow duration-200 line-clamp-1"
                >
                  {child.name}
                </div>
              )
            })}
          </div>
          <div className="col-span-10 ">
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
              {data?.paginated_products.data.map((product, index) => (
                <div
                  onClick={() => {
                    goToProductDetail(product.id)
                  }}
                  key={index}
                  className=" w-full shadow-sm grid grid-cols-12 rounded-lg overflow-hidden cursor-pointer"
                >
                  {/*  <div className="col-span-4 h-full aspect-2/3  rounded-l-lg">
                    <img
                      className="h-full aspect-2/3 object-cover rounded-l-lg "
                      src={product.image_url}
                      alt="asdfasdfasdf"
                    ></img>
                  </div> */}
                  <div className="col-span-4 h-full aspect-2/3  rounded-l-lg">
                    <AspectRatio ratio={2 / 3}>
                      <img
                        className="h-full aspect-2/3 object-cover rounded-l-lg "
                        src={`${baseStorageUrl}${product.image_url}`}
                        alt="asdfasdfasdf"
                      ></img>
                    </AspectRatio>
                  </div>
                  <div className="col-span-8  flex flex-col overflow-clip justify-between">
                    <div>
                      <div className="line-clamp-2 px-2 font-semibold text-gray-600 subpixel-antialiased">
                        {product.title}
                      </div>
                      <div className="line-clamp-3 h-full w-full md:line-clamp-2 px-2 pt-2 font-lite text-gray-600 text-sm subpixel-antialiased">
                        {product.description}
                      </div>
                    </div>

                    <div className="flex justify-between mb-2 bg-white">
                      <div className="px-2 font-bold text-gray-700">
                        <span>&#8377; </span>
                        {product.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <AppPagination
              goToPreviousPage={goToPreviousPage}
              goToPage={goToPage}
              goToNextPage={goToNextPage}
              totalPages={data?.paginated_products.last_page}
              currentPage={data?.paginated_products.current_page}
            ></AppPagination>
          </div>
        </div>
        {/* below is the mobile view */}
        <div className="w-full h-screen md:hidden overflow-y-scroll">
          <div className="col-span-10 ">
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
              {data?.paginated_products.data.map((product, index) => (
                <div
                  onClick={() => {
                    goToProductDetail(product.id)
                  }}
                  key={index}
                  className=" w-full shadow-sm grid grid-cols-12 rounded-lg overflow-hidden cursor-pointer"
                >
                  {/*  <div className="col-span-4 h-full aspect-2/3  rounded-l-lg">
                    <img
                      className="h-full aspect-2/3 object-cover rounded-l-lg "
                      src={product.image_url}
                      alt="asdfasdfasdf"
                    ></img>
                  </div> */}
                  <div className="col-span-4 h-full aspect-2/3  rounded-l-lg">
                    <AspectRatio ratio={2 / 3}>
                      <img
                        className="h-full aspect-2/3 object-cover rounded-l-lg "
                        src={`${baseStorageUrl}${product.image_url}`}
                        alt="asdfasdfasdf"
                      ></img>
                    </AspectRatio>
                  </div>
                  <div className="col-span-8  flex flex-col overflow-clip justify-between">
                    <div>
                      <div className="line-clamp-2 px-2 font-semibold text-gray-600 subpixel-antialiased">
                        {product.title}
                      </div>
                      <div className="line-clamp-3 h-full w-full md:line-clamp-2 px-2 pt-2 font-lite text-gray-600 text-sm subpixel-antialiased">
                        {product.description}
                      </div>
                    </div>

                    <div className="flex justify-between mb-2 bg-white">
                      <div className="px-2 font-bold text-gray-700">
                        <span>&#8377; </span>
                        {product.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full">
              {data?.children.map((child, index) => {
                return (
                  <div
                    onClick={() => {
                      navigateToCategory(child.id)
                    }}
                    key={index}
                    className="px-2 py-2 hover:shadow-lg  border-b cursor-pointer transition-shadow duration-200 line-clamp-1"
                  >
                    {child.name}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CustomerLayout>
    </>
  )
}
