import { LandingDataDisplayType } from "@/components/app-dropdown-folder/app-dropdown"
import { LandingDataChildTypeEnum } from "./app_enums"

export interface Product {
  id: number
  title: string
  description: string
  image_url: string
  youtube_url: string | null
  images: [string]
  price: number
  gst: number
  compared_price: number
  specification?: string
  pictures: ProductPictures
  quantityInCard: number | null
}

export interface User {
  email: string
  picture: string
  name: string
  phone: string
  address: string
  role: string
}

export interface ProductWithCategory {
  id: number
  title: string
  description: string
  image_url: string
  images: [string]
  price: number
  compared_price: number
  quantity: number
  gst: number
  product_video: string | null
  pictures: ProductPictures
  specification: string | null
  categories: [Category?]
}

export interface CategoryBrowseData {
  id: number
  name: string
  parent_id?: number
  children: [Category]
  paginated_products: PaginatedProducts
}

export interface LandingDataApiFetch {
  landing_data: [LandingDataRow?]
}

export interface Category {
  id: number
  parent_id?: number
  level?: number
  name: string
  //children: [Category?]
}

export interface PaginatedCategories {
  data: [Category]
  last_page: number
  current_page: number | undefined
  total: number
}

export interface LandingDataRow {
  id?: number
  title: string
  display_type: LandingDataDisplayType
  order: number
  landing_data_children: [LandingDataChild?]
}

export interface LandingDataChild {
  id?: number
  //picture_url: string
  //hash: string
  childable_type: string
  childable_keyword: LandingDataChildTypeEnum
  childable: [Product?]
  childable_id: number
  picture: Picture
}

export interface DeleteRowChildInterface {
  landingRowId: number
  landingChildType: LandingDataChildTypeEnum
  landindDataChildId: number
}
export interface DeleteRowInterface {
  landingRowId: number
}

export interface Picture {
  id?: number
  landing_data_child_id?: string
  large_paths?: [string]
  medium_paths?: [string]
  product_id?: string
  small_paths?: [string]
  thumbnail_path?: string
}

export interface ProductPictures {
  id?: number
  large_paths?: [string]
  medium_paths?: [string]
  product_id?: string
  small_paths?: string[]
  thumbnail_path?: string
}

export interface SearchData {
  search_data: [Product]
}

export interface PaginatedData {
  data: [Product]
  last_page: number
  current_page: number | undefined
  total: number

  /* nextPage: number | null
  lastPage: number
  currentPage: number */
}

export interface PaginatedOrderData {
  data: ServerOrderData[]
  last_page: number
  current_page: number | undefined
  total: number

  /* nextPage: number | null
  lastPage: number
  currentPage: number */
}

export interface PaginatedProducts {
  data: [Product]
  last_page: number
  current_page: number | undefined
  total: number
}

export interface AppPaginationInterface {
  nextPage: number | null
  lastPage: number | null
  currentPage: number | null
}

export interface BreadCrumbCategoryItem {
  category_id: number
  name: string
}

export interface BreadCrumbCategoryItemList {
  list?: [BreadCrumbCategoryItem]
}

export interface Cart {
  items: [CartItem]
  totalPrice: number
  totalPayable: number | undefined
  totalSaved: number | undefined
}

export interface CartItem {
  item: Product
  quantity: number
}

export interface UpsertItem {
  item_id: number
  quantity: number
}

export interface Order {
  item: [CartItem]
  status: string
  totalPayable: number | undefined
  totalSaved: number | undefined
}

export interface ServerOrderData {
  created_at: Date
  id: number
  message: string | null
  completed: boolean
  remark: string | null
  shipping_charge: string | null
  total_payable: number
  total_price: number
  ordered_items: ServerOrder[]
}

export interface ServerOrder {
  product_id: number
  order_quantity: number
  quantity: number
  price: number
  total_item_price: number
  product: Product | null
}

export interface ServerUploadOrder {
  server_orders: ServerOrder[]
}
