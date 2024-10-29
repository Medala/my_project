import DropdownButton from "./DropdownButton"
import DropdownContent from "./DropdownContent"
import { useState, useRef, useEffect } from "react"
import DropdownItem from "./DropdownItem"

const Dropdown = ({ contents }) => {
  const [open, setOpen] = useState(false)

  const toggleDropdown = () => {
    setOpen((open) => !open)
  }

  const dropdownRef = useRef()
  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("click", handler)

    return () => {
      document.removeEventListener("click", handler)
    }
  }, [dropdownRef])

  return (
    <div className="h-full flex items-center relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="">
        <DropdownButton>{/* add icon maybe */}</DropdownButton>
        {open && (
          <DropdownContent>
            <>
              {contents.map((content) => (
                <DropdownItem
                  child={content.name}
                  link={content.link}
                  key={content.name}
                ></DropdownItem>
              ))}
            </>
          </DropdownContent>
        )}
      </button>
    </div>
  )
}

export default Dropdown
