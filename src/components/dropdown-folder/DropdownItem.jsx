import { homePageurl, loginOtpVerify } from "lib/constants"
import { useNavigate } from "react-router-dom"
import React from "react"

const DropdownItem = ({ child, link }) => {
  const navigate = useNavigate()
  function logoutAndRedirect() {
    console.log("loggin out")
    localStorage.clear()
    navigate(homePageurl)
  }
  if (child !== "Logout") {
    return (
      <a href={link}>
        <div className="py-1 w-full hover:text-orange-800 cursor-pointer">
          {child}
        </div>
      </a>
    )
  } else {
    return (
      <div
        typeof="button"
        onClick={logoutAndRedirect}
        className="py-1 w-full hover:text-orange-800 cursor-pointer"
      >
        {child}
      </div>
    )
  }
}

export default DropdownItem
