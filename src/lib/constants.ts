import { LandingDataChildTypeEnum } from "@/interface/app_enums"
import { LandingDataChild } from "@/interface/interface"
import { useNavigate } from "react-router-dom"

export const customersPageUrl = "/customers"
export const homePageurl = "/home"
export const landingPageUrl = "/landing"

export const inventoryPageUrl = "/inventory"
export const aboutPageUrl = "/about"
export const contactPageUrl = "/contact"
export const calendarPageUrl = "/calendar"

export const groupsPageUrl = "/groups"
export const tomatoUrl = "/tomato"
export const adminDashboardUrl = "/admin-dashboard"
export const adminCategoriesUrl = "/admin-dashboard/categories"
export const loginUrl = "/login"
export const logoutUrl = "/logout"

export const baseApiUrl = "http://localhost:8002/api/"
export const baseServerUrl = "http://localhost:8002/"

export const postNewUserUrl = baseApiUrl + "login/otp"
export const loginOtpVerify = baseApiUrl + "login/otp/verify"

/* product routes */
export const createProductUrl = baseApiUrl + "products/create"
export const createLandingDataUrl = baseApiUrl + "landing-data/create"
export const updateLandingDataUrl = baseApiUrl + "landing-data/update"
export const deleteLandingDataRowChildUrl =
  baseApiUrl + "landing-data/delete-landing-row-data-child"
export const deleteLandingDataRowUrl =
  baseApiUrl + "landing-data/delete-landing-row"
export const updateProductUrl = baseApiUrl + "products/update"
export const deleteProductApi = baseApiUrl + "products/delete"
export const myProductPageUrl = "/products"
export const myProductListApi = baseApiUrl + "manage/my-products"
export const manageGetAllLandingList = baseApiUrl + "manage/landing-data-list"
export const manageGetMainCategories = baseApiUrl + "get-main-category-list"
export const createNewCategoryApi = baseApiUrl + "new-category"
export const upsertCartApi = baseApiUrl + "upsert-cart"
export const getCartUrl = baseApiUrl + "user-cart"
export const deleteCategoryApi = baseApiUrl + "delete-category"
export const detachCategoryApi = baseApiUrl + "detach-category"
export const attachCategoryAPI = baseApiUrl + "attach-category"
export const fetchAllLandingList = baseApiUrl + "fetch/landing-data-list"

export const myProductSearchApi = baseApiUrl + "user/products/search"
export const productSearchApi = baseApiUrl + "products/search"
export const myProductDetailEditPageUrl = "products/mine/edit/:productId"
export const productDetailUrl = "products/:productId"
export const categoryBrowsePageUrl = "category/:categoryId"
//export const myProductApi = baseApiUrl + "products/mine/edit/:"
export const navigateProductEditUri = "/products/mine/edit"
export const navigateProductDetailUri = "/products"
export const createProductPageUrl = "/products/new"

export const cartUrl = "/cart"
export const profileUrl = "/profile"
export const updateProfileUrl = baseApiUrl + "update-profile"
export const getUserProfile = baseApiUrl + "get-profile"

export function editMyProductDetailApi(id: string) {
  return baseApiUrl + "products/mine/edit/" + id
}

export function getProduct(id: string) {
  return baseApiUrl + "products/" + id
}

export function fetchCategory(id: string, page: string) {
  return baseApiUrl + "category/" + id + `?page=${page}`
}

export function getCategoryChildren(id: number) {
  return manageGetMainCategories + "/" + id
}

export function pictureUrl(path: string) {
  return baseServerUrl + path
}
