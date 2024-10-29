import { LandingDataRow } from "@/interface/interface"
import React from "react"
import { LandingDataDisplayType } from "./app-dropdown-folder/app-dropdown"
import LandingCarouselRow from "./landing-row-components.tsx/landing-carousel-row"
import LandingLandscapeRow from "./landing-row-components.tsx/landing-landscape-row"
import LandingPortriatRow from "./landing-row-components.tsx/landing-portriat-row"
import { IoMdArrowRoundBack } from "react-icons/io"

import UserLandingProductSearch from "./user-landing-product-search-mini"

interface Props {
  index: number
  showModal: Function
  isOpen: boolean
  addToProductToList: Function
}

const TestModal = ({ showModal, isOpen, addToProductToList, index }: Props) => {
  // return <div>landing row</div>
  if (isOpen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-90">
        <div className="fixed top-3 left-10">
          <button
            onClick={() => {
              showModal(false)
            }}
            className="p-3 rounded-full bg-white items-center"
          >
            <IoMdArrowRoundBack color="black" size={22} />
          </button>
        </div>
        <div className=" h-5/6 w-11/12 p-6 rounded-lg ">
          <UserLandingProductSearch
            rowIndex={index}
            addProductToList={addToProductToList}
          />
          {/* <div className="fixed bottom-4 right-4">
            <button
              disabled={false}
              className="bg-orange-400 hover:bg-orange-500 text-white cursor-pointer rounded-full py-2 px-6 shadow-lg"
            >
              Save
            </button>
          </div> */}
        </div>
      </div>
    )
  }
}

export default TestModal
