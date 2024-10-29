import { FaRegUser } from "react-icons/fa"
const DropdownButton = ({ children }) => {
  return (
    <>
      <div className="rounded-full px-4">
        <div>{children}</div>
        <span className="px-2">
          <FaRegUser />
        </span>
      </div>
    </>
  )
}

export default DropdownButton
