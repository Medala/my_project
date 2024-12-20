import { useRef, useState } from "react"
import { BsShop } from "react-icons/bs"
import Dropdown from "./dropdown-folder/Dropdown"
import DropdownItem from "./dropdown-folder/DropdownItem"
import { NavLink, useNavigate } from "react-router-dom"
import { GiDrill } from "react-icons/gi"
import { IoSearchOutline } from "react-icons/io5"
import { RxHamburgerMenu } from "react-icons/rx"

import { IoHomeOutline } from "react-icons/io5"
import {
  aboutPageUrl,
  cartUrl,
  contactPageUrl,
  homePageurl,
  landingPageUrl,
  loginUrl,
  ordersUrl,
  profileUrl,
} from "lib/constants"
import AppDropdownButton, {
  AppDropdownChild,
  AppDropdownIcon,
  AppDropdownType,
} from "./app-dropdown-folder/app-dropdown"
import CartComponent from "./cart"
import MainMenu from "./ui/main-menu"
import { useBasket } from "@/lib/stores/cart-store-state"
import ProductSearchNavbar from "./product-search-navbar"
import ProfileDropdownButton from "./app-dropdown-folder/profile-dropdown-button"

/* const loginDropdown: AppDropdownChild = {
  title: "Login",
  appDropdownFunction: () => {
    alert("a ni mai lawm")
  },
} */

interface Props {
  isSearchPage?: boolean
}

export default function Navbar({ isSearchPage }: Props) {
  //const items = [{name:"Home", link:"/home"}, {name:"About", link:"/about"}, {name:"Contact", link:"/contact"}];
  const [topRightMenu, toggleTopRightMenu] = useState(false)
  const [closeBrowseMenu, setCloseMenu] = useState(false)
  const navigate = useNavigate()
  const cartStore = useBasket()

  const items = [
    { name: "Home", link: aboutPageUrl },
    { name: "About", link: aboutPageUrl },
    { name: "Contact", link: contactPageUrl },
    {
      name: localStorage.getItem("token") ? "Logout" : "Login",
      link: loginUrl,
    },
  ]

  const testButton: AppDropdownChild = {
    title: "User name",
    appDropdownFunction: () => {
      // alert("aa panda")
    },
  }

  const profileButton: AppDropdownChild = {
    title: "Profile",
    appDropdownFunction: () => {
      navigate(profileUrl)
    },
  }

  const ordersButton: AppDropdownChild = {
    title: "Orders",
    appDropdownFunction: () => {
      navigate(ordersUrl)
    },
  }

  const admin: AppDropdownChild = {
    title: "Admin",
    appDropdownFunction: () => {
      navigate("/admin-dashboard")
    },
  }

  const loginLogout: AppDropdownChild = {
    title: localStorage.getItem("token") ? "Logout" : "Login",
    appDropdownFunction: () => {
      console.log(localStorage.getItem("token"))

      localStorage.getItem("token") ? logoutAndRedirect() : goToLogin()
    },
  }

  function logoutAndRedirect() {
    console.log("loggin out")
    localStorage.clear()
    cartStore.actions.clearBasket()
    navigate(landingPageUrl)
  }

  function goToLogin() {
    navigate(loginUrl)
  }

  function toggleMenu() {
    toggleTopRightMenu(!topRightMenu)
  }
  1

  function goToCart() {
    navigate(cartUrl)
  }

  function closeMenu() {
    //  alert('closing with close menu');
    toggleTopRightMenu(false)
  }

  function returnUserButtons(role: string | null) {
    if (role === "admin") {
      return [profileButton, admin, loginLogout]
    }
    if (role === "customer") {
      return [profileButton, ordersButton, loginLogout]
    }

    if (role === "manager") {
      return [profileButton, loginLogout]
    } else return [loginLogout]
  }

  function getProfilePic(): string | null {
    const user = localStorage.getItem("user")
    if (user !== null) {
      const us = JSON.parse(user)
      console.log("we have a user in storage")
      console.log(us.picture)
      return us.picture ?? null
    } else {
      console.log("no user in storageeeeeee")
      return null
    }
  }

  return (
    <>
      <nav className="relative hover:shadow-lg transition duration-150 hidden md:block">
        <div className=" flex h-16 items-center justify-between ">
          <div className="flex space-x-4 ">
            <NavLink to={landingPageUrl}>
              <div className="flex h-full  ">
                <div className="rounded-full bg-orange-400 hover:bg-orange-500 cursor-pointer h-12 w-12 my-auto mx-4  flex items-center shadow-sm hover:shadow-lg transition-all duration-100">
                  <div className="mx-auto text-gray-900 ">
                    <GiDrill size={40} />
                  </div>
                </div>
                <div className="flex md:items-end">
                  <span className="flex items-baseline font-bold md:text-2xl text-orange-500 ">
                    Sarah Power Tools
                  </span>
                </div>
              </div>
            </NavLink>
            {/*         <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium my-auto hover:bg-gray-700 hover:cursor-pointer">Dashboard</div>
                    <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium  my-auto hover:bg-gray-700 hover:cursor-pointer">Team</div>
                    <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium  my-auto hover:bg-gray-700 hover:cursor-pointer">Projects</div>
                    <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium my-auto hover:bg-gray-700 hover:cursor-pointer">Calendar</div>
               */}{" "}
          </div>

          <div className="md:w-2/6 ">
            <ProductSearchNavbar isSearchPage={isSearchPage} />
          </div>

          <div className="pr-2 z-10 flex items-center justify-between w-4/12 sm:w-6/12 md:w-2/12 ">
            <button
              onClick={() => {
                goToCart()
              }}
            >
              <CartComponent cartColor="black" />{" "}
            </button>
            <AppDropdownButton
              pictureUrl={getProfilePic()}
              icon={AppDropdownIcon.user}
              buttonTitle=""
              dropdownType={AppDropdownType.iconButton}
              children={returnUserButtons(localStorage.getItem("role"))}
            />
          </div>
          {/* <Dropdown contents={items}></Dropdown> */}
        </div>

        {/* below is nav bar lower */}
        <div className="w-full flex justify-start ">
          <MainMenu setCloseMenu={setCloseMenu} isOpen={closeBrowseMenu} />
        </div>
      </nav>

      <div className="md:hidden  mt-4 w-full  ">
        <div className="flex space-x-4 justify-between">
          <NavLink to={landingPageUrl}>
            <div className="flex h-full items-center ">
              <div className="rounded-full bg-orange-400 hover:bg-orange-500 cursor-pointer h-12 w-12 my-auto mx-4  flex items-center shadow-sm hover:shadow-lg transition-all duration-100">
                <div className="mx-auto text-gray-900 ">
                  <GiDrill size={40} />
                </div>
              </div>
              <div className="flex md:items-end">
                <span className="flex items-baseline font-bold md:text-2xl text-orange-500 ">
                  {isSearchPage === true ? "" : "Sarah Power Tools"}
                </span>
              </div>
            </div>
          </NavLink>
          {isSearchPage && (
            <div className="w-full">
              <ProductSearchNavbar isSearchPage={isSearchPage} />
            </div>
          )}
          <div className="pr-2">
            <ProfileDropdownButton
              pictureUrl={getProfilePic()}
              icon={AppDropdownIcon.user}
              buttonTitle=""
              dropdownType={AppDropdownType.iconButton}
              children={returnUserButtons(localStorage.getItem("role"))}
            />
          </div>
          {/*         <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium my-auto hover:bg-gray-700 hover:cursor-pointer">Dashboard</div>
                    <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium  my-auto hover:bg-gray-700 hover:cursor-pointer">Team</div>
                    <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium  my-auto hover:bg-gray-700 hover:cursor-pointer">Projects</div>
                    <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium my-auto hover:bg-gray-700 hover:cursor-pointer">Calendar</div>
               */}{" "}
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 w-full bg-gray-900  py-1 flex justify-between items-center px-4">
        <MainMenu setCloseMenu={setCloseMenu} isOpen={closeBrowseMenu} />
        <NavLink to={landingPageUrl}>
          <IoHomeOutline color="white " size={20} />
        </NavLink>
        <IoSearchOutline
          color="white "
          size={20}
          onClick={() => {
            navigate("/search")
          }}
        />
        <button
          onClick={() => {
            goToCart()
          }}
        >
          <CartComponent cartColor="white" />{" "}
        </button>
      </div>
    </>
  )
}
