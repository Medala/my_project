import React, { useEffect, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { FaArrowRightLong } from "react-icons/fa6"

interface Props {
  totalPages: number | undefined
  currentPage: number | undefined
  goToPage: (page: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
}

function splitNumber(number: number) {
  let fixedNumber = number.toFixed(10)
  let parts = fixedNumber.split(".")
  let integerPart = parseInt(parts[0])
  let decimalPart = parseFloat("0." + parts[1])
  return { integerPart, decimalPart }
}

function magicPageNumbers(availablePages: number) {
  if (availablePages < 5) {
    // total page can be total page
  } else {
    //divide available pages by 5
    var result = availablePages / 5
    if (result % 1 != 0) {
      var split = splitNumber(result)
      var splitCount = split.integerPart
    }
  }
}

const AppPagination = ({
  totalPages,
  currentPage,
  goToPage,
  goToNextPage,
  goToPreviousPage,
}: Props) => {
  const [paginationPack, setPaginationPack] = useState<number[]>([0])

  useEffect(() => {
    console.log("we have the total page on use effect")
    if (totalPages! < 5) {
      let list = []
      for (var i = 1; i <= totalPages!; i++) {
        list.push(i)
      }

      setPaginationPack([...list])
    } else {
      let list = []
      for (var i = 1; i <= 5; i++) {
        list.push(i)
      }

      setPaginationPack([...list])
    }
  }, [totalPages])

  return (
    <div className=" w-full mt-8 text-gray-500">
      <div className="mx-auto w-4/6  flex space-x-8 justify-center  align-middle">
        {currentPage !== 1 && (
          <div
            onClick={() => {
              goToPreviousPage()
            }}
            className="flex items-center space-x-4 cursor-pointer "
          >
            <FaArrowLeftLong size={24} />
            <div>Previous page</div>
          </div>
        )}

        {currentPage == 1 && (
          <div className="invisible flex items-center space-x-4 cursor-pointer ">
            <FaArrowLeftLong size={24} />
            <div>Previous page</div>
          </div>
        )}

        <div>
          Page {currentPage} of {totalPages}
        </div>

        {/*   {paginationPack.map((num) => (
          <button
            onClick={() => {
              goToPage(num)
            }}
            key={num}
            className="text-sm h-10 w-10  bg-gray-700 rounded-full text-white shadow hover:shadow-lg cursor-pointer"
          >
            {num}
          </button>
        ))} */}

        {/* <button className="text-sm h-10 w-10 bg-gray-700 rounded-full text-white shadow hover:shadow-lg cursor-pointer">
          2
        </button> */}
        {currentPage !== totalPages && (
          <div
            onClick={() => {
              goToNextPage()
            }}
            className="flex items-center space-x-4 cursor-pointer"
          >
            <div>Next Page</div>

            <FaArrowRightLong size={24} />
          </div>
        )}

        {currentPage == totalPages && (
          <div
            onClick={() => {
              goToNextPage()
            }}
            className="invisible flex items-center space-x-4 cursor-pointer"
          >
            <div>Next Page</div>

            <FaArrowRightLong size={24} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AppPagination
