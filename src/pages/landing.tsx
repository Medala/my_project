import { useRef, useState } from "react"

import Dropdown from "../components/dropdown-folder/Dropdown"
import DropdownItem from "../components/dropdown-folder/DropdownItem"

import { FaPlus } from "react-icons/fa6"
import Navbar from "@components/Navbar"
import { NavLink, useNavigate } from "react-router-dom"
import {
  aboutPageUrl,
  contactPageUrl,
  customersPageUrl,
  fetchAllLandingList,
  loginUrl,
  manageGetAllLandingList,
  navigateProductDetailUri,
} from "lib/constants"
import LeftPanel from "@components/left-panel"
import Layout from "@components/layouts/layout"
import CustomerLayout from "@/components/layouts/customer-layout"
import { LandingDataApiFetch } from "@/interface/interface"
import { useQuery } from "@tanstack/react-query"
import LandingRow from "@/components/landing-row"
import LandingRowCustomer from "@/components/landing-row-customer"

export default function Landing() {
  const navigate = useNavigate()
  const items = [
    { name: "Home", link: aboutPageUrl },
    { name: "About", link: aboutPageUrl },
    { name: "Contact", link: contactPageUrl },
    { name: "Login", link: loginUrl },
  ]

  const [topRightMenu, toggleTopRightMenu] = useState<boolean>(false)

  async function fetchAllLandingData(): Promise<LandingDataApiFetch> {
    console.log("Bearer " + localStorage.getItem("token"))
    const response = await fetch(fetchAllLandingList, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      credentials: "include",
    })
    if (!response.ok) {
      throw new Error("Something went wrong")
    }
    return response.json()
  }

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["landingPageQuery"],
    queryFn: () => fetchAllLandingData(),
    // placeholderData: keepPreviousData,
  })
  if (data) {
    console.log("home landing loaded")
    console.log(data)
  }

  function toggleMenu() {
    toggleTopRightMenu(!topRightMenu)
  }

  function closeMenu() {
    //  alert('closing with close menu');
    toggleTopRightMenu(false)
  }
  function navigateProductDetailPage(id: number) {
    navigate(navigateProductDetailUri + id)
  }

  return (
    <>
      <CustomerLayout>
        <div>
          {/*  landing row */}
          {data && (
            <div>
              {data.landing_data?.map((landingComponent, index) => (
                <div className="" key={index}>
                  <LandingRowCustomer
                    index={index}
                    landingData={landingComponent!}
                  />
                </div>
              ))}
            </div>
          )}
          {/* end landing row */}
        </div>
      </CustomerLayout>
    </>
  )
}
