import {
  createProductPageUrl,
  myProductDetailEditPageUrl,
  myProductListApi,
  navigateProductDetailUri,
  navigateProductEditUri,
} from "lib/constants"

import { useNavigate } from "react-router-dom"

import AppPagination from "@components/app-pagination"
import { AspectRatio } from "@/components/ui/aspect-ratio"
//import UserProductSearchBar from "@/components/user-product-search-bar"

const navigate = useNavigate()

export function navigateMyProductDetailEditPage(id: number) {
  navigate(navigateProductEditUri + "/" + id)
}
