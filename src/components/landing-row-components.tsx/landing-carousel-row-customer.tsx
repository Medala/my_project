import {
  LandingDataChildTypeEnum,
  LandingRowHeight,
} from "@/interface/app_enums"
import { LandingDataChild, LandingDataRow } from "@/interface/interface"
import { baseServerUrl, navigateProductDetailUri } from "@/lib/constants"
import { IoAdd, IoTrashBinOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"

interface Props {
  landingData: LandingDataRow
  index: number
}

const LandingCarouselRowCustomer = ({ landingData, index }: Props) => {
  const navigate = useNavigate()
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
    <div className="w-full p-2 mb-2">
      {/* <div className="flex justify-start mb-1">
        <h6 className="scroll-m-20 text-sm font-semibold tracking-tight line-clamp-1">
          {landingData.title}
        </h6>
      </div> */}
      <div className="">
        <Carousel>
          <CarouselContent className="-ml-2 md:-ml-4 w-full">
            {landingData.landing_data_children &&
              landingData.landing_data_children.map(
                (landingDataChild, internalIndex) => {
                  return (
                    <CarouselItem
                      onClick={() => {
                        //  alert(landindDataChild!.childable_keyword)
                        handleClick(landingDataChild!)
                      }}
                      key={internalIndex}
                      className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4 cursor-pointer"
                    >
                      <img
                        className="object-fit  h-full w-full"
                        src={
                          baseServerUrl +
                          landingDataChild?.picture.thumbnail_path
                        }
                        alt=""
                      />
                    </CarouselItem>
                  )
                }
              )}
          </CarouselContent>
          {/* <CarouselPrevious className=" ml-16" />
          <CarouselNext className=" mr-16 " /> */}
        </Carousel>
      </div>

      {/*  <div className="grid md:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-4">
        {landingData.landing_data_children &&
          landingData.landing_data_children.map(
            (landindDataChild, internalIndex) => {
            

              return (
                <div
                  className="cursor-pointer"
                  key={internalIndex}
                  onClick={() => {
                    
                    handleClick(landindDataChild!)
                  }}
                >
                  <div className="aspect aspect-1/2  w-full overflow-hidden rounded-lg  bg-slate-300">
                    <img
                      className="object-fit  h-full w-full"
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
      </div> */}
    </div>
  )
}

export default LandingCarouselRowCustomer
