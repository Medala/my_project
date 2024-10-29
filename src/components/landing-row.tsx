import { LandingDataRow } from "@/interface/interface"
import React from "react"
import { LandingDataDisplayType } from "./app-dropdown-folder/app-dropdown"
import LandingCarouselRow from "./landing-row-components.tsx/landing-carousel-row"
import LandingLandscapeRow from "./landing-row-components.tsx/landing-landscape-row"
import LandingPortriatRow from "./landing-row-components.tsx/landing-portriat-row"

interface Props {
  landingData: LandingDataRow
  deleteLandingRow: Function
  addComponentToRowClick: Function
  index: number
  removeProductFromRow: Function
}

const LandingRow = ({
  landingData,
  addComponentToRowClick,
  index,
  removeProductFromRow,
  deleteLandingRow,
}: Props) => {
  // return <div>landing row</div>

  switch (landingData.display_type) {
    case LandingDataDisplayType.Carousel:
      return (
        <LandingCarouselRow
          deleteLandingRow={deleteLandingRow}
          removeProductFromRow={removeProductFromRow}
          index={index}
          addComponentToRowClick={addComponentToRowClick}
          landingData={landingData}
        />
      )

    case LandingDataDisplayType.Landscape:
      return (
        <LandingLandscapeRow
          deleteLandingRow={deleteLandingRow}
          removeProductFromRow={removeProductFromRow}
          index={index}
          addComponentToRowClick={addComponentToRowClick}
          landingData={landingData}
        />
      )
    case LandingDataDisplayType.LandscapeLg:
      return (
        <LandingLandscapeRow
          deleteLandingRow={deleteLandingRow}
          removeProductFromRow={removeProductFromRow}
          index={index}
          addComponentToRowClick={addComponentToRowClick}
          landingData={landingData}
        />
      )
    case LandingDataDisplayType.LandscapeXl:
      return (
        <LandingLandscapeRow
          deleteLandingRow={deleteLandingRow}
          removeProductFromRow={removeProductFromRow}
          index={index}
          addComponentToRowClick={addComponentToRowClick}
          landingData={landingData}
        />
      )

    case LandingDataDisplayType.Portriat:
      return (
        <LandingPortriatRow
          deleteLandingRow={deleteLandingRow}
          removeProductFromRow={removeProductFromRow}
          index={index}
          addComponentToRowClick={addComponentToRowClick}
          landingData={landingData}
        />
      )
    case LandingDataDisplayType.PortriatLg:
      return (
        <LandingPortriatRow
          deleteLandingRow={deleteLandingRow}
          removeProductFromRow={removeProductFromRow}
          index={index}
          addComponentToRowClick={addComponentToRowClick}
          landingData={landingData}
        />
      )
    case LandingDataDisplayType.PortriatXl:
      return (
        <LandingPortriatRow
          deleteLandingRow={deleteLandingRow}
          removeProductFromRow={removeProductFromRow}
          index={index}
          addComponentToRowClick={addComponentToRowClick}
          landingData={landingData}
        />
      )
  }
}

export default LandingRow
