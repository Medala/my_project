import { LandingDataChild, LandingDataRow } from "@/interface/interface"
import { baseServerUrl, navigateProductDetailUri } from "@/lib/constants"
import { Key } from "lucide-react"
import { FaPlus } from "react-icons/fa"
import { IoAdd } from "react-icons/io5"
import { IoTrashBinOutline } from "react-icons/io5"
import { LandingDataDisplayType } from "../app-dropdown-folder/app-dropdown"
import { LandingDataChildTypeEnum } from "@/interface/app_enums"
import { NavLink, useNavigate } from "react-router-dom"

interface Props {
  landingData: LandingDataRow

  index: number
}

const LandingLandscapeRowCustomer = ({
  landingData,

  index,
}: Props) => {
  const navigate = useNavigate()
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

  function handleClick(child: LandingDataChild) {
    switch (child.childable_keyword) {
      case LandingDataChildTypeEnum.Product:
        console.log(`${navigateProductDetailUri}/${child.childable_id}`)
        return navigate(`${navigateProductDetailUri}/${child.childable_id}`)

      case LandingDataChildTypeEnum.Collection:
        return "collection"
    }
  }

  return (
    <div className="w-full p-2   mb-1">
      <div className="flex justify-start mb-1">
        <h6 className="scroll-m-20 text-sm font-semibold tracking-tight line-clamp-1">
          {landingData.title}
        </h6>
      </div>

      <div
        className={`${returnLandingDataStyleHeight(landingData.display_type)}`}
      >
        {landingData.landing_data_children &&
          landingData.landing_data_children.map(
            (landindDataChild, internalIndex) => {
              return (
                <div
                  className=" cursor-pointer"
                  onClick={() => {
                    //  alert(landindDataChild!.childable_keyword)
                    handleClick(landindDataChild!)
                  }}
                  key={internalIndex}
                >
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

                  <p className="leading-1 [&:not(:first-child)]:mt-1 line-clamp-2 text-xs  sm:text-sm font-semibold text-gray-600">
                    apple
                  </p>
                </div>
              )
            }
          )}
      </div>
    </div>
  )
}

export default LandingLandscapeRowCustomer
