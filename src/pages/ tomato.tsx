import Navbar from "@components/Navbar"
import LeftPanel from "@components/left-panel"
import React, { useState } from "react"
import { z } from "zod"
import { IoIosAdd } from "react-icons/io"

import NewProductForm from "@components/new-product-form"
import NewInventoryForm from "@components/new-inventory-form"

const TomatoPage = () => {
  const [openForm, setOpen] = useState(true)

  function showForm() {
    setOpen(true)
  }

  function closeForm() {
    setOpen(false)
  }

  function submitSearchQuery() {}

  return (
    <>
      <Navbar />

      <div className="flex flex-cols-2 relative">
        <LeftPanel />
        <div className="w-full">
          <div className="flex flex-row space-x-2 items-center w-full h-12 ">
            <div className=""></div>
            <div className=" w-2/6 my-auto">
              {/* search field */}
              <form className="max-w-md mx-auto">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-2 ps-10 text-sm focus:outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Search my product"
                    required
                  />
                  <button
                    type="submit"
                    className="text-gray-900 absolute end-2.5 bottom-2.5 bg-gray-100  focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4"
                  >
                    Search
                  </button>
                </div>
              </form>
              {/*  end search field */}
            </div>
            <div
              typeof="button"
              onClick={showForm}
              className="flex flex-row text-gray-900 items-center bg-gray-100 hover:shadow-lg rounded-lg py-1 px-2 hover:cursor-pointer"
            >
              <IoIosAdd className="" size={30} />
              <span className="text-xs">New Product</span>
            </div>
          </div>

          {/* the product list */}
          <div>
            <div>fasdf</div>
            <div>asdf</div>
          </div>
          {/* end of the product list */}
        </div>
        {openForm && <NewProductForm />}
      </div>
    </>
  )
}

export default TomatoPage
