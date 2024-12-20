import CustomerLayout from "@/components/layouts/customer-layout"
import { useNavigate } from "react-router-dom"

export default function SearchPage() {
  const navigate = useNavigate()

  return (
    <>
      <CustomerLayout isSearchPage={true}>
        <div></div>
      </CustomerLayout>
    </>
  )
}
