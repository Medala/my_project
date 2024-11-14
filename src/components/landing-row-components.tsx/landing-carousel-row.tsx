import { LandingRowHeight } from "@/interface/app_enums"
import { LandingDataRow } from "@/interface/interface"
import { baseServerUrl, baseStorageUrl } from "@/lib/constants"
import { IoAdd, IoTrashBinOutline } from "react-icons/io5"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"

interface Props {
  removeProductFromRow: Function
  deleteLandingRow: Function
  landingData: LandingDataRow
  addComponentToRowClick: Function
  index: number
}

const LandingCarouselRow = ({
  removeProductFromRow,
  landingData,
  addComponentToRowClick,
  deleteLandingRow,
  index,
}: Props) => {
  return (
    <div className="w-full p-2 mb-1">
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

      <div className="">
        <Carousel>
          <CarouselContent className="-ml-2 md:-ml-4">
            {landingData.landing_data_children &&
              landingData.landing_data_children.map(
                (landindDataChild, internalIndex) => {
                  return (
                    <CarouselItem
                      key={internalIndex}
                      className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4"
                    >
                      <img
                        className="object-fit  h-full w-full"
                        src={
                          baseStorageUrl +
                          landindDataChild?.picture.thumbnail_path
                        }
                        alt=""
                      />
                    </CarouselItem>
                  )
                }
              )}
          </CarouselContent>
          {/*  <CarouselPrevious className=" ml-16" />
          <CarouselNext className=" mr-16 " /> */}
        </Carousel>

        {/* {landingData.landing_data_children &&
          landingData.landing_data_children.map(
            (landindDataChild, internalIndex) => {
         

              return (
                <div className="relative" key={internalIndex}>
                  <div className="aspect aspect-2/1  w-full overflow-hidden rounded-lg  bg-slate-300">
                    <img
                      className="object-fit  h-full w-full"
                      src={
                        baseServerUrl + landindDataChild?.picture.thumbnail_path
                      }
                      alt=""
                    />
                  </div>

                 

                  <button
                    onClick={() => {
                      removeProductFromRow(
                        landingData.id,
                        landindDataChild?.childable_type,
                        landindDataChild?.id
                      )
                    }}
                    className="absolute z-0 right-1 top-1 p-2 md:text-xl sm:text-sm xs:text-xs rounded-full bg-slate-200 opacity-80 border-red-500 shadow-sm cursor-pointer hover:shadow-lg"
                  >
                    <IoTrashBinOutline color="red" />
                  </button>
                </div>
              )
            }
          )} */}
      </div>
    </div>
  )
}

export default LandingCarouselRow
