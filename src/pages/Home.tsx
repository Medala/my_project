import { useRef, useState } from "react"

import Dropdown from "../components/dropdown-folder/Dropdown"
import DropdownItem from "../components/dropdown-folder/DropdownItem"

import { FaPlus } from "react-icons/fa6"
import Navbar from "@components/Navbar"
import { NavLink } from "react-router-dom"
import {
  aboutPageUrl,
  calendarPageUrl,
  contactPageUrl,
  customersPageUrl,
  groupsPageUrl,
  inventoryPageUrl,
  loginUrl,
} from "lib/constants"
import LeftPanel from "@components/left-panel"
import Layout from "@components/layouts/layout"

export default function Home() {
  const items = [
    { name: "Home", link: aboutPageUrl },
    { name: "About", link: aboutPageUrl },
    { name: "Contact", link: contactPageUrl },
    { name: "Login", link: loginUrl },
  ]

  const [topRightMenu, toggleTopRightMenu] = useState<boolean>(false)

  function toggleMenu() {
    toggleTopRightMenu(!topRightMenu)
  }

  function closeMenu() {
    //  alert('closing with close menu');
    toggleTopRightMenu(false)
  }

  return (
    <>
      <Layout>
        <div>child</div>
      </Layout>
    </>
  )
}
