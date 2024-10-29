import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import NoPage from "./pages/NoPage"
import React from "react"
import Customers from "pages/customers"
import Inventory from "pages/inventory"
import CalendarPage from "pages/calendar"
import {
  homePageurl,
  aboutPageUrl,
  contactPageUrl,
  customersPageUrl,
  inventoryPageUrl,
  calendarPageUrl,
  groupsPageUrl,
  tomatoUrl,
  loginUrl,
  createProductUrl,
  logoutUrl,
  myProductPageUrl,
  createProductPageUrl,
  myProductDetailEditPageUrl,
  landingPageUrl,
  cartUrl,
  productDetailUrl,
  adminDashboardUrl,
  adminCategoriesUrl,
  categoryBrowsePageUrl,
  profileUrl,
} from "lib/constants"
import Groups from "pages/groups"
import TomatoPage from "pages/ tomato"
import LoginScreen from "pages/login-screen"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CreateProductPage from "pages/create-product-page"
import MyProductList from "pages/my-product-list"
import MyProductDetailEditPage from "pages/my-product-detail-edit-page"
import Landing from "./pages/landing"
import CartPage from "./pages/cart-page"
import ProductDetailPage from "./pages/product-detail-page"
import AdminDashboard from "./pages/admin-dashboard"
import ManageCategories from "./pages/manage-categories"
import CategoryBrowse from "./pages/category-browse-page"
import UserProfilePage from "./pages/user-profile-page"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Landing />} />
            <Route path={landingPageUrl} index element={<Landing />} />
            <Route
              path={productDetailUrl}
              index
              element={<ProductDetailPage />}
            />

            <Route
              path={categoryBrowsePageUrl}
              index
              element={<CategoryBrowse />}
            />
            <Route path={homePageurl} index element={<Landing />} />
            <Route path={cartUrl} index element={<CartPage />} />
            <Route path={profileUrl} index element={<UserProfilePage />} />

            <Route path={aboutPageUrl} element={<About />} />
            <Route path={contactPageUrl} element={<Contact />} />
            <Route path={customersPageUrl} element={<Customers />} />
            <Route path={inventoryPageUrl} element={<Inventory />} />
            <Route path={calendarPageUrl} element={<CalendarPage />} />
            <Route path={groupsPageUrl} element={<Groups />} />
            <Route path={adminDashboardUrl} element={<AdminDashboard />} />
            <Route path={adminCategoriesUrl} element={<ManageCategories />} />

            <Route path={tomatoUrl} element={<TomatoPage />} />
            <Route path={myProductPageUrl} element={<MyProductList />} />
            <Route
              path={myProductDetailEditPageUrl}
              element={<MyProductDetailEditPage />}
            />
            <Route
              path={createProductPageUrl}
              element={<CreateProductPage />}
            />
            <Route path={loginUrl} element={<LoginScreen />} />

            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  )
}

export default App
