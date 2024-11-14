import React from "react"
import {
  customersPageUrl,
  /*   inventoryPageUrl,
  calendarPageUrl,
  groupsPageUrl,
  tomatoUrl, */
  createProductPageUrl,
  navigateGetAllOrders,
  myProductPageUrl,
  adminDashboardUrl,
  adminCategoriesUrl,
} from "lib/constants"
import { NavLink } from "react-router-dom"

const LeftPanel = () => {
  return (
    <>
      <div className="h-screen w-full bg-white shadow hover:shadow-lg p-2 hidden md:flex flex-col gap-2">
        <NavLink to={navigateGetAllOrders}>
          <div className="rounded-lg bg-white shadow py-2 text-gray-900 cursor:pointer  p-l-2vb  hover:shadow-lg transition duration-200 cursor-pointer">
            <div className="px-2 text-xs text-center">Orders</div>
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

        {/* <NavLink to={tomatoUrl}>
        <div className="rounded-lg bg-white shadow py-2 text-gray-900 cursor:pointer  p-l-2vb  hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="px-2 text-xs text-center">Tomato</div>
        </div>
      </NavLink> */}
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

      {/* mobile view */}

      <div className="z-20 w-full  fixed bottom-0 bg-white border hover:shadow-lg p-2 flex flex-row justify-between md:hidden gap-2">
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

        {/* <NavLink to={tomatoUrl}>
        <div className="rounded-lg bg-white shadow py-2 text-gray-900 cursor:pointer  p-l-2vb  hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="px-2 text-xs text-center">Tomato</div>
        </div>
      </NavLink> */}
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

        <NavLink to={navigateGetAllOrders}>
          <div className="rounded-lg bg-white shadow py-2 text-gray-900 cursor:pointer  p-l-2vb  hover:shadow-lg transition duration-200 cursor-pointer">
            <div className="px-2 text-xs text-center">Orders</div>
          </div>
        </NavLink>
      </div>
    </>
  )
}

export default LeftPanel
