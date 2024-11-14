import React, { useEffect, useRef, useState } from "react"
import { SlOptionsVertical } from "react-icons/sl"
import { useOutsideClick } from "@components/click-outside"
import { FaRegUser } from "react-icons/fa"
import { IoAdd } from "react-icons/io5"

export enum AppDropdownType {
  iconButton,
  textButton,
}

export enum AppDropdownIcon {
  user,
  slOptionsVertical,
  IoAdd,
}

export enum LandingDataDisplayType {
  Carousel = "carousel",
  Landscape = "landscape",
  LandscapeLg = "landscapeLg",
  LandscapeXl = "landscapeXl",
  Portriat = "portriat",
  PortriatLg = "portriatLg",
  PortriatXl = "portriatlgXl",
}

export interface AppDropdownChild {
  title: string | undefined
  appDropdownFunction: () => void
}

interface AppDropdownProperty {
  buttonTitle: string | undefined
  pictureUrl?: string | null
  dropdownType: AppDropdownType
  icon: AppDropdownIcon
  children: Array<AppDropdownChild>
}

export default function ProfileDropdownButton({
  pictureUrl,
  dropdownType,
  buttonTitle,
  children,
  icon,
}: AppDropdownProperty) {
  const [open, setOpen] = useState(false)

  function toggleDropdown() {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  const ref = useOutsideClick(() => {
    setOpen(false)
  })

  function getMyIcon(icon: AppDropdownIcon, color: string) {
    switch (icon) {
      case AppDropdownIcon.user:
        return (
          <>
            {pictureUrl !== null && (
              <img
                className="h-8 w-8 mx-auto object-fit rounded-full"
                src={`${pictureUrl}`}
                alt=""
              />
            )}
            {pictureUrl == null && <FaRegUser color={color} />}
          </>
        )
        break
      case AppDropdownIcon.slOptionsVertical:
        console.log("return slOptionsVertical")
        return (
          <>
            <SlOptionsVertical color={color} />
          </>
        )
        break

      case AppDropdownIcon.IoAdd:
        return (
          <>
            <IoAdd color={color} />
          </>
        )
        break
    }
  }

  /* if(AppDropdownType.iconButton){

  } */

  return dropdownType == AppDropdownType.iconButton ? (
    <div className="cursor-pointer relative" ref={ref}>
      <div
        className="rounded-full bg-white shadow-lg hover:bg-slate-200 hover:shadow-xl border p-2 "
        onClick={() => {
          toggleDropdown()
        }}
      >
        <>{getMyIcon(icon, "black")}</>
      </div>
      {open && (
        <div className="absolute z-10 border border-gray-100 flex flex-col space-y-2 min-h-max min-w-max right-9  py-2 rounded  shadow-lg bg-white font-semibold text-gray-500">
          {children.map((item) => (
            <div
              key={item.title}
              onClick={() => {
                item.appDropdownFunction()
                setOpen(false)
              }}
              className="hover:bg-slate-100 py-2 px-8 text-md text-center "
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  ) : AppDropdownType.textButton && icon ? (
    <div className="cursor-pointer relative" ref={ref}>
      {/* <div
        className="bg-gray-600 flex items-center text-sm text-white px-2 py-1 rounded shadow-gray-400 shadow-sm hover:shadow-lg" */}
      <div
        className="rounded border p-2 text-xs font-semibold shadow mr-4 mt-2 cursor-pointer hover:shadow-lg flex space-x-1 items-center transition-shadow duration-75"
        onClick={() => {
          toggleDropdown()
        }}
      >
        {buttonTitle}
        <div className="text-xl">{getMyIcon(icon, "black")}</div>
      </div>
      {open && (
        <div className="absolute  z-10 border border-gray-100 flex flex-col space-y-0 min-h-32 min-w-32 right-9  py-2 rounded  shadow-lg bg-white text-sm">
          {children.map((item) => (
            <div
              key={item.title}
              onClick={item.appDropdownFunction}
              className="hover:bg-slate-100 px-2 py-1 "
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div className="cursor-pointer relative" ref={ref}>
      <div
        className="bg-gray-600 text-sm text-white px-2 py-1 rounded shadow-gray-400 shadow-sm hover:shadow-lg"
        onClick={() => {
          toggleDropdown()
        }}
      >
        {buttonTitle}
      </div>
      {open && (
        <div className="absolute z-10 border border-gray-100 flex flex-col space-y-0 min-h-32 min-w-24 right-9  py-2 rounded  shadow-lg bg-white text-sm">
          {children.map((item) => (
            <div
              key={item.title}
              onClick={item.appDropdownFunction}
              className="hover:bg-slate-100 px-2 py-1 "
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
