import { appDebounce } from "@/compute/appDebounce"
import { SearchData } from "@/interface/interface"
import { myProductSearchApi, navigateProductEditUri } from "@/lib/constants"
import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useRef, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { FaCheck } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { CiCirclePlus } from "react-icons/ci"

interface UserLandingProductSearchMiniProps {
  rowIndex: number
  addProductToList: Function
}

function UserLandingProductSearchMini({
  addProductToList,
  rowIndex,
}: UserLandingProductSearchMiniProps) {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState("")
  const [runSearchEnabled, setRunSearchEnabled] = useState(false)
  const [showSearchResultContainer, setShowSearchResultContainer] =
    useState(false)
  // const debouncedSearch = appDebounce(searchInput)

  async function searchMyProducts(query: string): Promise<SearchData> {
    const response = await fetch(`${myProductSearchApi}?search=${query}`, {
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
    // console.log("getting search data")
    // console.log(await response.json())
    //setShowSearchResultContainer(true)
    return response.json()
  }

  function navigateMyProductDetailEditPage(id: number) {
    navigate(navigateProductEditUri + "/" + id)
  }

  function runSearch() {
    console.log(`${searchInput} zawng dawn mi?`)
    if (searchInput.length > 1) {
      setRunSearchEnabled(true)
    }
  }

  const { isLoading, isError, error, data, isFetched, refetch } = useQuery({
    enabled: !!searchInput,
    queryKey: ["search", searchInput],
    queryFn: async () => await searchMyProducts(searchInput),
  })

  /*   useEffect(() => {
    console.log("check debounced text below")
    console.log(debouncedSearch)
    if (debouncedSearch.length > 1) {
      console.log(searchInput.length)
      setShowSearchResultContainer(true)
    }
    if (debouncedSearch.length < 1) {
      setShowSearchResultContainer(false)
    }
  }, [debouncedSearch]) */

  /*   useEffect(() => {
    if (searchInput.length < 1) {
      console.log(searchInput.length)
      setShowSearchResultContainer(false)
    }
  }, [searchInput]) */

  /*   useEffect(() => {
    if (searchInput.length == 0) {
      setShowSearchResultContainer(false)
      console.log("search is cleared " + searchInput.length)
    }
  }, [searchInput]) */
  {
    /* <div className="w-2/3 relative md:w-2/6  mx-auto flex items-baseline"> */
  }
  console.log(data)
  return (
    <div className="w-full relative  mx-auto flex items-baseline">
      <div className="relative w-full ">
        <input
          value={searchInput}
          id="search"
          onChange={(input) => {
            setSearchInput(input.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") alert("take it to a search result page")
          }}
          type="text"
          placeholder="Search My Product"
          className="w-full rounded pl-10 p-2 shadow mt-2   border-none focus:outline-none focus:shadow-lg text-gray-800 text-sm"
        />

        {data && (
          <div className="absolute z-50 pb-8 top-13 h-96 overflow-y-auto w-full border shadow-lg rounded-lg bg-white">
            {/* {data?.search_data?.length > 0 && (
              <div className="w-full px-2 pt-2 text-xs text-gray-500 text-center">
                Most Relevant
              </div>
            )} */}
            {data?.search_data?.length < 1 && (
              <div className="w-full px-2 pt-2 text-xs text-gray-500 text-center">
                No matching product found!
              </div>
            )}

            {data?.search_data?.map((product) => (
              /*  <div key={product.id}>{product.title}</div> */

              <div
                /* onClick={() => {
                  navigateMyProductDetailEditPage(product.id)
                }} */
                className="px-2 py-1 flex text-sm cursor-pointer hover:bg-blue-100 transition-colors duration-150 "
                key={product.id}
              >
                {/*  display product image */}
                <div className=" rounded-md overflow-hidden">
                  <img
                    src="https://picsum.photos/200/300"
                    className=" h-20 w-20 object-cover"
                  />
                </div>
                {/* end of display product image */}
                <div className="flex-1 line-clamp-2 px-1 pt-2  text-gray-600">
                  {product.title}
                </div>
                <button
                  onClick={() => {
                    addProductToList(product)
                    setSearchInput("")
                  }}
                  className="cursor-pointer my-auto"
                >
                  <CiCirclePlus size={28} />
                </button>
                {/* <div className="pt-2 text-lg text-gray-600">
                  <FaCheck color="gray" />
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>

      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button
          onClick={() => {
            runSearch()
          }}
          className="pt-2"
        >
          <CiSearch />
        </button>
      </span>
    </div>
  )
}

export default UserLandingProductSearchMini
