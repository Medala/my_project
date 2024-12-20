import { Product, ProductWithCategory } from "@/interface/interface"
import { editMyProductDetailApi } from "lib/constants"
import { getProduct } from "lib/constants"

export async function fetchProductToEdit(
  id: string
): Promise<ProductWithCategory> {
  const response = await fetch(editMyProductDetailApi(id), {
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

  return await response.json()
}

export async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(getProduct(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    credentials: "include",
  })
  if (!response.ok) {
    throw new Error("Something went wrong")
  }
  const data = await response.json()
  return data.product
  //return response.json()
}
