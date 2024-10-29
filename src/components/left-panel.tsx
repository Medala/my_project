import React from "react"
import {
  customersPageUrl,
  inventoryPageUrl,
  calendarPageUrl,
  groupsPageUrl,
  tomatoUrl,
  createProductPageUrl,
  myProductPageUrl,
  adminDashboardUrl,
  adminCategoriesUrl,
} from "lib/constants"
import { NavLink } from "react-router-dom"

const LeftPanel = () => {
  return (
    <div className="h-screen w-full bg-white shadow hover:shadow-lg p-2 flex flex-col gap-2">
      <NavLink to={inventoryPageUrl}>
        <div className="rounded-lg bg-white shadow py-2 text-gray-900 cursor:pointer  p-l-2vb  hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="px-2 text-xs text-center">Inventory</div>
        </div>
      </NavLink>

      <NavLink to={calendarPageUrl}>
        <div className="rounded-lg bg-white shadow py-2 text-gray-900 cursor:pointer  p-l-2vb  hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="px-2 text-xs text-center">Calendar</div>
        </div>
      </NavLink>

      <NavLink to={customersPageUrl}>
        <div className="rounded-lg bg-white shadow py-2 text-gray-900 cursor:pointer  p-l-2vb  hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="px-2 text-xs text-center">Customers</div>
        </div>
      </NavLink>

      <NavLink to={myProductPageUrl}>
        <div className="rounded-lg bg-white shadow py-2 text-gray-900 cursor:pointer  p-l-2vb  hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="px-2 text-xs text-center">Products</div>
        </div>
      </NavLink>

      <NavLink to={tomatoUrl}>
        <div className="rounded-lg bg-white shadow py-2 text-gray-900 cursor:pointer  p-l-2vb  hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="px-2 text-xs text-center">Tomato</div>
        </div>
      </NavLink>
      <NavLink to={adminDashboardUrl}>
        <div className="rounded-lg bg-white shadow py-2 text-gray-900 cursor:pointer  p-l-2vb  hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="px-2 text-xs text-center">Landing Page</div>
        </div>
      </NavLink>
      <NavLink to={adminCategoriesUrl}>
        <div className="rounded-lg bg-white shadow py-2 text-gray-900 cursor:pointer  p-l-2vb  hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="px-2 text-xs text-center">Categories</div>
        </div>
      </NavLink>
    </div>
  )
}

export default LeftPanel
