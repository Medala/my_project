import React from "react"

type PaginationProps = {
  totalItems: number
  itemsPerPage: number
  paginate: (pageNumber: number) => void
}

function Pagination({ totalItems, itemsPerPage, paginate }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )

  return <div>Pagination</div>
}

export default Pagination
