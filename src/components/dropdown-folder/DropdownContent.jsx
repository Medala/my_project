import React from "react"

const DropdownContent = ({ children }) => {
  return (
    <div className="absolute z-10 left-20 bottom-6 text-xs text-gray-900  bg-red-300 rounded-md px-8 py-2 w-auto h-auto shadow-sm hover:shadow-md">
      {children}
    </div>
  )
}

export default DropdownContent
