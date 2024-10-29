import { LandingDataRow } from "@/interface/interface"
import { baseServerUrl } from "@/lib/constants"
import { Key } from "lucide-react"
import { FaPlus } from "react-icons/fa"
import { IoAdd } from "react-icons/io5"
import { IoTrashBinOutline } from "react-icons/io5"
import { LandingDataDisplayType } from "../app-dropdown-folder/app-dropdown"
import { LandingDataChildTypeEnum } from "@/interface/app_enums"

interface Props {
  removeProductFromRow: Function
  deleteLandingRow: Function
  landingData: LandingDataRow
  addComponentToRowClick: Function
  index: number
}

const LandingLandscapeRow = ({
  removeProductFromRow,
  landingData,
  addComponentToRowClick,
  deleteLandingRow,
  index,
}: Props) => {
  function returnLandingDataStyleHeight(
    landingDataDisplayType: LandingDataDisplayType
  ) {
    switch (landingDataDisplayType) {
      case LandingDataDisplayType.Landscape:
        return "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-2"
      case LandingDataDisplayType.LandscapeLg:
        return "grid  grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-3"
      case LandingDataDisplayType.LandscapeXl:
        return "grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4"
    }
  }
  return (
    <div className="w-full p-2   mb-1">
      <div className="flex justify-between space-x-8 p-1 rounded-lg items-center mb-2 bg-gray-100">
        <div
          typeof="button"
          onClick={() => {
            addComponentToRowClick(index, landingData.id)
          }}
          className="hidden rounded border p-2 shadow cursor-pointer hover:shadow-lg md:flex space-x-1 items-center transition-shadow duration-75"
        >
          <span className="block text-xs">Add Component</span>
          <IoAdd size={22} />
        </div>
        <h6 className="scroll-m-20 text-sm font-semibold tracking-tight line-clamp-1">
          {`${landingData.display_type} / ${landingData.title}`}
        </h6>

        <button
          onClick={() => {
            deleteLandingRow(landingData.id)
          }}
          className="a p-2 md:text-xl sm:text-sm xs:text-xs rounded-full border border-red-500 bg-slate-200 opacity-80 shadow-sm cursor-pointer hover:shadow-lg"
        >
          <IoTrashBinOutline color="red" />
        </button>
      </div>

      <div
        className={`${returnLandingDataStyleHeight(landingData.display_type)}`}
      >
        {landingData.landing_data_children &&
          landingData.landing_data_children.map(
            (landindDataChild, internalIndex) => {
              return (
                <div className="relative" key={internalIndex}>
                  {/* <div className="aspect aspect-2/3  md:h-40 sm:h-20 h-18 w-full overflow-hidden rounded-lg  bg-red-300"> */}
                  <div className="aspect aspect-16/9     overflow-hidden rounded-lg  bg-slate-300">
                    <img
                      className="object-cover  h-full w-full rounded-lg"
                      src={
                        baseServerUrl + landindDataChild?.picture.thumbnail_path
                      }
                      alt=""
                    />
                  </div>

                  {/*  <p className="leading-1 [&:not(:first-child)]:mt-1 line-clamp-2 text-sm font-semibold text-gray-600">
                    apple
                  </p> */}

                  <button
                    onClick={() => {
                      removeProductFromRow(
                        landingData.id,
                        landindDataChild?.childable_type,
                        landindDataChild?.id
                      )
                    }}
                    className="absolute z-0 right-1 top-1 p-2 md:text-xl sm:text-sm xs:text-xs rounded-full border border-red-500 bg-slate-200 opacity-80 shadow-sm cursor-pointer hover:shadow-lg"
                  >
                    <IoTrashBinOutline color="red" />
                  </button>
                </div>
              )
            }
          )}
      </div>
    </div>
  )
}

export default LandingLandscapeRow
