import Navbar from "@components/Navbar"
import LeftPanel from "@components/left-panel"
import React, { ReactNode } from "react"
import { Toaster } from "@/components/ui/toaster"

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-row">
        <div className="hidden fm: sm:block sm:basis-32">
          <LeftPanel></LeftPanel>
        </div>
        <div className="w-full">{children}</div>
      </div>
      <Toaster />
    </>
  )
}

export default Layout
