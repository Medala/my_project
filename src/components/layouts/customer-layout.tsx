import Navbar from "@components/Navbar"
import LeftPanel from "@components/left-panel"
import React, { ReactNode } from "react"
import { Toaster } from "@/components/ui/toaster"

interface Props {
  children: ReactNode
}

const CustomerLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar></Navbar>

      <div className="w-full">{children}</div>

      <Toaster />
    </>
  )
}

export default CustomerLayout
