import { Category } from "@/interface/interface"
import AppDropdownButton, {
  AppDropdownChild,
  AppDropdownIcon,
  AppDropdownType,
} from "../app-dropdown-folder/app-dropdown"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"

interface CategoryListProps {
  categoryList: [Category]
  setActivecategory: Function
  confirmDeleteCategory: Function
}

const ManageCategoryListItems = ({
  categoryList,
  setActivecategory,
  confirmDeleteCategory,
}: CategoryListProps) => {
  const [deleteDialog, showDeleteDialog] = useState(false)
  const [deleteCategoryId, setDeleteCategoryId] = useState<number>()

  const dropdownChildDelete: AppDropdownChild = {
    title: "Delete",
    appDropdownFunction: () => {
      deleteDialog ? showDeleteDialog(false) : showDeleteDialog(true)
    },
  }

  return (
    <div className="h-screen w-full">
      {categoryList && (
        <div className="px-4">
          {categoryList.map((category, index) => (
            <div
              className="px-1 py-2 mb-1 flex justify-between shadow-sm cursor-pointer hover:shadow"
              key={index}
            >
              <div
                className="w-full"
                onClick={() => {
                  setActivecategory(category.id, category.name)
                }}
              >
                <p className="leading-7 [&:not(:first-child)]:mt-6 line-clamp-1">
                  {category.name}
                </p>
              </div>

              <div>
                <AppDropdownButton
                  icon={AppDropdownIcon.slOptionsVertical}
                  buttonTitle=""
                  dropdownType={AppDropdownType.iconButton}
                  children={[
                    {
                      title: "Delete",
                      appDropdownFunction: () => {
                        setDeleteCategoryId(category.id)
                        deleteDialog
                          ? showDeleteDialog(false)
                          : showDeleteDialog(true)
                      },
                    },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialog} onOpenChange={showDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the category without deleting any
              product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                showDeleteDialog(false)
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                confirmDeleteCategory(deleteCategoryId)
                //  deleteCategory(parseInt(categoryId!))
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ManageCategoryListItems
