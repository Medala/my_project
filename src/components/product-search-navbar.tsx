import { appDebounce } from "@/compute/appDebounce"
import { SearchData } from "@/interface/interface"
import { useOutsideClick } from "@components/click-outside"
import {
  myProductSearchApi,
  navbarProductSearchApi,
  navigateProductDetailUri,
  navigateProductEditUri,
  productDetailUrl,
} from "@/lib/constants"
import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useRef, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { FaCheck } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

interface Props {
  isSearchPage?: boolean
}

function ProductSearchNavbar({ isSearchPage }: Props) {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState("")
  const [showSearchResults, setOpen] = useState(true)
  const [runSearchEnabled, setRunSearchEnabled] = useState(false)
  const [showSearchResultContainer, setShowSearchResultContainer] =
    useState(false)
  // const debouncedSearch = appDebounce(searchInput)

  const ref = useOutsideClick(() => {
    setOpen(false)
  })

  async function searchMyProducts(query: string): Promise<SearchData> {
    const response = await fetch(`${navbarProductSearchApi}?search=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      credentials: "include",
    })
    if (!response.ok) {
      throw new Error("Something went wrong")
    }
    // console.log("getting search data")
    // console.log(await response.json())
    //setShowSearchResultContainer(true)
    return response.json()
  }

  function goToProduct(id: number) {
    navigate(`${navigateProductDetailUri}/${id}`)
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

  console.log(data)
  return (
    <div className="w-full relative   mx-auto flex items-baseline">
      <div className="relative w-full">
        <input
          id="search"
          onChange={(input) => {
            setSearchInput(input.target.value)
            setOpen(true)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") alert("take it to a search result page")
          }}
          type="text"
          placeholder="Search Product"
          className="w-full rounded-full pl-10 p-2 shadow mt-2   border focus:outline-none focus:shadow-lg text-gray-800 text-sm"
        />

        {data && showSearchResults && (
          <div
            className="absolute z-50 pb-8 top-13 max-h-5/6 overflow-auto w-full border shadow-lg rounded-lg bg-white"
            ref={ref}
          >
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
                onClick={() => {
                  goToProduct(product.id)
                }}
                className="px-2 py-1 flex text-sm cursor-pointer hover:bg-blue-100 transition-colors duration-150 "
                key={product.id}
              >
                <div className="line-clamp-2 pt-2 w-full text-gray-600">
                  {product.title}
                </div>
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

export default ProductSearchNavbar
