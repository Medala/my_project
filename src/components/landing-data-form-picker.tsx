import { IoIosArrowBack, IoMdArrowRoundBack } from "react-icons/io"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { useState } from "react"

import LandingDataProductForm from "./landing-data-product-form"
import LandingDataCollectionForm from "./landing-data-collection-form"
import { LandingDataChildTypeEnum } from "@/interface/app_enums"

interface Props {
  landingDataRowId: number
  displayTypeName: String
  index: number
  showModal: Function
  refetch: Function
  isOpen: boolean
}

const LandingDataFormPicker = ({
  landingDataRowId,
  displayTypeName,
  showModal,
  isOpen,
  refetch,
  index,
}: Props) => {
  const [linkType, setLinkType] = useState<LandingDataChildTypeEnum>()

  function linkTypePicker(linkType: String) {
    switch (linkType) {
      case LandingDataChildTypeEnum.Collection:
        return setLinkType(LandingDataChildTypeEnum.Collection)
      case LandingDataChildTypeEnum.Product:
        return setLinkType(LandingDataChildTypeEnum.Product)
    }
  }

  if (isOpen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-90">
        <div className="fixed top-3 left-10">
          <button
            onClick={() => {
              setLinkType(undefined)
              showModal(false)
            }}
            className="p-3 rounded-full bg-white items-center"
          >
            <IoMdArrowRoundBack color="black" size={22} />
          </button>
          <div></div>
        </div>
        <div className="h-full mt-40 w-full md:w-3/4  px-6 bg-gray-50 rounded-lg ">
          <div className="">
            <div className="px-2 pt-2">
              <div className="w-full text-center font-semibold text-gray-500 mb-2">
                Set {displayTypeName} componet
              </div>
              <div className="text-gray-600 mb-2">Componet Item Type</div>
              <Select
                onValueChange={(e) => {
                  linkTypePicker(e)
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Link component to..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product">Product</SelectItem>

                  <SelectItem value="collection">Collection</SelectItem>
                </SelectContent>
              </Select>

              {linkType == LandingDataChildTypeEnum.Product && (
                <div className="">
                  <LandingDataProductForm
                    refetch={refetch}
                    showDialog={showModal}
                    index={0}
                    landingDataRowId={landingDataRowId}
                  />
                </div>
              )}

              {linkType == LandingDataChildTypeEnum.Collection && (
                <div className="">
                  <LandingDataCollectionForm index={0} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingDataFormPicker
