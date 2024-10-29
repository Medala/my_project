import { LandingDataChild, LandingDataRow } from "@/interface/interface"
import { baseServerUrl, navigateProductDetailUri } from "@/lib/constants"
import { IoAdd, IoTrashBinOutline } from "react-icons/io5"
import { LandingDataDisplayType } from "../app-dropdown-folder/app-dropdown"
import { useNavigate } from "react-router-dom"
import { LandingDataChildTypeEnum } from "@/interface/app_enums"

interface Props {
  landingData: LandingDataRow
  index: number
}

const LandingPortriatRowCustomer = ({
  landingData,

  index,
}: Props) => {
  const navigate = useNavigate()
  function handleClick(child: LandingDataChild) {
    switch (child.childable_keyword) {
      case LandingDataChildTypeEnum.Product:
        return navigate(`${navigateProductDetailUri}/${child.childable_id}`)

      case LandingDataChildTypeEnum.Collection:
        return "collection"
    }
  }
  function returnLandingDataStyleHeight(
    landingDataDisplayType: LandingDataDisplayType
  ) {
    switch (landingDataDisplayType) {
      case LandingDataDisplayType.Portriat:
        return "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10  gap-2"
      case LandingDataDisplayType.PortriatLg:
        return "grid  grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8  gap-3"
      case LandingDataDisplayType.PortriatXl:
        return "grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4"
    }
  }
  return (
    <div className="w-full p-2  mb-4">
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
              /* function removeProductFromRow(
                index: number,
                internalIndex: number
              ) {
                throw new Error("Function not implemented.")
              } */

              return (
                <div
                  className="cursor-pointer aspect-2/3"
                  onClick={() => {
                    //  alert(landindDataChild!.childable_keyword)
                    handleClick(landindDataChild!)
                  }}
                  key={internalIndex}
                >
                  <div className="h-full    overflow-hidden rounded-lg">
                    <img
                      className="h-full object-cover"
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

export default LandingPortriatRowCustomer
