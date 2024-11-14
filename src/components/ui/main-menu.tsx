"use client"

import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { MenuIcon } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import UserCategoryBrowse from "./user-category-browse"
import { PaginatedCategories } from "@/interface/interface"
import { fetchCategory, getCategoryChildren } from "@/lib/constants"
import { useNavigate } from "react-router-dom"
import { RxHamburgerMenu } from "react-icons/rx"

interface MenuProps {
  setCloseMenu: (open: boolean) => void
  isOpen: boolean
}

export default function MainMenu({ setCloseMenu, isOpen }: MenuProps) {
  const isDesktop = useMediaQuery("(min-width: 760px)")
  const [activeCategoryId, setActiveCategoryId] = useState(0)
  const [categoryNavHistory, setcategoryNavHistory] = useState<number[]>([0])
  const navigate = useNavigate()

  async function fetchMainOrChildCategories(
    id: number
  ): Promise<PaginatedCategories> {
    console.log("Bearer " + localStorage.getItem("token"))
    const response = await fetch(getCategoryChildren(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    return response.json()
  }

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["categoriesQuery", activeCategoryId],
    queryFn: () => fetchMainOrChildCategories(activeCategoryId),
    // placeholderData: keepPreviousData,
  })

  if (data) {
    /*  console.log("Categories fetched")
    console.log(data) */
  }
  if (error) {
    console.log(error)
  }

  /* function setActiveChildForChidrenListQuery(id: number) { */
  // alert(`the id is ${id}`)
  /*  setCategoryNavstack([
      ...categoryNavStack,
      {
        category_id: id,
        name: name,
      },
    ]) */
  /*   setActiveCategoryId(id)
  } */

  function showChildrenOrNavigateToCategoryPage(id: number) {
    if (categoryNavHistory.length < 2) {
      //   setcategoryNavHistory([...categoryNavHistory, id])
      setcategoryNavHistory((prev) => [...prev, id])
      setActiveCategoryId(id)
    } else {
      setCloseMenu(false)
      setActiveCategoryId(0)
      setcategoryNavHistory([0])
      navigate(`/category/${id}`)
    }
  }
  console.log("categoryNavHistory")
  console.log(categoryNavHistory)

  function navigateBack() {
    if (categoryNavHistory.length !== 1) {
      var tempArray = categoryNavHistory
      tempArray.pop()
      var targetIndex = tempArray.length - 1
      var newActiveId = tempArray[targetIndex]

      setActiveCategoryId(newActiveId)

      setcategoryNavHistory(tempArray)
    } else {
      setActiveCategoryId(0)
    }
  }

  return isDesktop ? (
    <div>
      <Drawer direction="left" open={isOpen} onOpenChange={setCloseMenu}>
        <DrawerTrigger>
          <MenuIcon className=" mx-2 mt-2" />
        </DrawerTrigger>
        <DrawerContent className="bg-slate-800 bg-opacity-70 border-slate-900 border-2">
          <DrawerHeader>
            <DrawerDescription className="sr-only">
              Browse product by category
            </DrawerDescription>
            <DrawerTitle className="w-full flex justify-center text-white">
              Browse Categories
            </DrawerTitle>
          </DrawerHeader>
          {data && (
            <UserCategoryBrowse
              categoryNavHistory={categoryNavHistory}
              activeCategoryId={activeCategoryId}
              showChildrenOrNavigateToCategoryPage={
                showChildrenOrNavigateToCategoryPage
              }
              categoryList={data?.data}
              navigateBack={navigateBack}
            ></UserCategoryBrowse>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  ) : (
    <div>
      <Drawer direction="left">
        <DrawerTrigger>
          <RxHamburgerMenu className="" color="white " size={28} />
        </DrawerTrigger>
        <DrawerContent className="bg-slate-800 bg-opacity-70 border-slate-900 border-2">
          <DrawerHeader>
            <DrawerTitle>Categories</DrawerTitle>
          </DrawerHeader>
          {data && (
            <UserCategoryBrowse
              activeCategoryId={activeCategoryId}
              categoryList={data?.data}
              categoryNavHistory={categoryNavHistory}
              navigateBack={navigateBack}
              showChildrenOrNavigateToCategoryPage={
                showChildrenOrNavigateToCategoryPage
              }
            ></UserCategoryBrowse>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}
