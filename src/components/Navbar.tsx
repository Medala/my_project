import { useRef, useState } from "react"
import { BsShop } from "react-icons/bs"
import Dropdown from "./dropdown-folder/Dropdown"
import DropdownItem from "./dropdown-folder/DropdownItem"
import { NavLink, useNavigate } from "react-router-dom"
import {
  aboutPageUrl,
  cartUrl,
  contactPageUrl,
  homePageurl,
  landingPageUrl,
  loginUrl,
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

/* const loginDropdown: AppDropdownChild = {
  title: "Login",
  appDropdownFunction: () => {
    alert("a ni mai lawm")
  },
} */

export default function Navbar() {
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
      alert("aa panda")
    },
  }

  const profileButton: AppDropdownChild = {
    title: "Profile",
    appDropdownFunction: () => {
      navigate(profileUrl)
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
      alert("sambar toon")
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

  return (
    <>
      <nav className=" relative hover:shadow-lg transition duration-150">
        <div className=" flex h-16 items-center justify-between ">
          <div className="flex space-x-4 ">
            <NavLink to={landingPageUrl}>
              <div className="rounded-full bg-orange-300 hover:bg-orange-500 cursor-pointer h-12 w-12 my-auto mx-4  flex items-center shadow-sm hover:shadow-lg transition-all duration-100">
                <div className="mx-auto text-gray-900 font-bold">
                  <BsShop />
                </div>
              </div>
            </NavLink>
            {/*         <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium my-auto hover:bg-gray-700 hover:cursor-pointer">Dashboard</div>
                    <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium  my-auto hover:bg-gray-700 hover:cursor-pointer">Team</div>
                    <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium  my-auto hover:bg-gray-700 hover:cursor-pointer">Projects</div>
                    <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium my-auto hover:bg-gray-700 hover:cursor-pointer">Calendar</div>
               */}{" "}
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
              icon={AppDropdownIcon.user}
              buttonTitle=""
              dropdownType={AppDropdownType.iconButton}
              children={[testButton, profileButton, admin, loginLogout]}
            />
          </div>
          {/* <Dropdown contents={items}></Dropdown> */}
        </div>

        {/* below is nav bar lower */}
        <div className="w-full flex justify-start ">
          <MainMenu setCloseMenu={setCloseMenu} isOpen={closeBrowseMenu} />
        </div>
      </nav>
    </>
  )
}
