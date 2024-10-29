import { LandingDataRow } from "@/interface/interface"
import React from "react"
import { LandingDataDisplayType } from "./app-dropdown-folder/app-dropdown"

import LandingLandscapeRow from "./landing-row-components.tsx/landing-landscape-row"
import LandingPortriatRow from "./landing-row-components.tsx/landing-portriat-row"
import LandingCarouselRowCustomer from "./landing-row-components.tsx/landing-carousel-row-customer"
import LandingLandscapeRowCustomer from "./landing-row-components.tsx/landing-landscape-row-customer"
import LandingPortriatRowCustomer from "./landing-row-components.tsx/landing-portriat-customer"

interface Props {
  landingData: LandingDataRow
  index: number
}

const LandingRowCustomer = ({ landingData, index }: Props) => {
  // return <div>landing row</div>

  switch (landingData.display_type) {
    case LandingDataDisplayType.Carousel:
      return (
        <LandingCarouselRowCustomer index={index} landingData={landingData} />
      )

    case LandingDataDisplayType.Landscape:
      return (
        <LandingLandscapeRowCustomer index={index} landingData={landingData} />
      )
    case LandingDataDisplayType.LandscapeLg:
      return (
        <LandingLandscapeRowCustomer index={index} landingData={landingData} />
      )
    case LandingDataDisplayType.LandscapeXl:
      return (
        <LandingLandscapeRowCustomer index={index} landingData={landingData} />
      )

    case LandingDataDisplayType.Portriat:
      return (
        <LandingPortriatRowCustomer index={index} landingData={landingData} />
      )
    case LandingDataDisplayType.PortriatLg:
      return (
        <LandingPortriatRowCustomer index={index} landingData={landingData} />
      )
    case LandingDataDisplayType.PortriatXl:
      return (
        <LandingPortriatRowCustomer index={index} landingData={landingData} />
      )
  }
}

export default LandingRowCustomer
