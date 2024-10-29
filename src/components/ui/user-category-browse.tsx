import { Category } from "@/interface/interface"
import { useState } from "react"
import { IoArrowBackOutline } from "react-icons/io5"

interface CategoryListProps {
  categoryList: [Category]

  activeCategoryId: number
  categoryNavHistory: number[]
  navigateBack: Function

  showChildrenOrNavigateToCategoryPage: Function
}

const UserCategoryBrowse = ({
  categoryList,

  activeCategoryId,
  categoryNavHistory,
  navigateBack,
  showChildrenOrNavigateToCategoryPage,
}: CategoryListProps) => {
  return (
    <div className="h-screen w-full overflow-y-scroll text-white">
      {categoryList && (
        <div className="px-4">
          {activeCategoryId !== 0 ? (
            <div
              onClick={() => {
                navigateBack()
              }}
              className=" py-2 mb-2 cursor-pointer"
            >
              <IoArrowBackOutline />
            </div>
          ) : (
            <div className="px-2 py-1">
              <IoArrowBackOutline color="transparent" className="disabled" />
            </div>
          )}

          {categoryList.map((category, index) => (
            <div
              key={index}
              className="w-full px-1 py-2 mb-1  cursor-pointer font-semibold  rounded-md hover:shadow-lg hover:bg-orange-400 border-b"
              onClick={() => {
                //setActivecategory(category.id, category.name)
                showChildrenOrNavigateToCategoryPage(category.id)
              }}
            >
              <p className="leading-7 px-2 [&:not(:first-child)]:mt-6 line-clamp-1 overflow-hidden">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserCategoryBrowse
