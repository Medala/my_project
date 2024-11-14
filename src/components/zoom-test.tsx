import { useEffect, useMemo, useRef, useState } from "react"

interface ZoomProps {
  imageSrc: string
}

function ZoomTest({ imageSrc }: ZoomProps) {
  return (
    <>
      <div className="h-4/6 mx-auto w-auto object-cover rounded-lg">
        {/* <img className="h-full w-full" alt="Small Pic" src="/sample.avif" /> */}
        <img
          className="h-4/6 mx-auto w-auto object-cover rounded-lg"
          alt={imageSrc}
          src={imageSrc}
        />
      </div>

      <div className="absolute object-contain  top-0 -right-[500px]"></div>
    </>
  )
}

export default ZoomTest
