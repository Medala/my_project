import React, { useEffect, useRef } from "react"

interface Modalprop {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
}

const Modal = ({ isOpen, onClose, onSubmit }: Modalprop) => {
  const modalRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    } else {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      //form is open, do whatever
    }
  }, [isOpen])

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-90">
      <div
        className="bg-red-400 h-5/6 w-11/12 p-6 rounded backdrop-blur-xl"
        ref={modalRef}
      >
        <div className="h-full w-full bg-green-600">asdfswd</div>
      </div>
    </div>
  )
}

export default Modal
