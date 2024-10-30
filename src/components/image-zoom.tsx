import React, { useEffect, useRef } from "react"

const ImageZoom: React.FC = () => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const resultRef = useRef<HTMLDivElement | null>(null)
  const lensRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const img = imgRef.current
    const result = resultRef.current
    const lens = lensRef.current

    if (!img || !result || !lens) return

    const cx = result.offsetWidth / lens.offsetWidth
    const cy = result.offsetHeight / lens.offsetHeight
    console.log(`${cx} is the cx and cy is ${cy}`)
    result.style.backgroundImage = `url('${img.src}')`
    result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`

    const moveLens = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      const pos = getCursorPos(e)
      let x = pos.x - lens.offsetWidth / 2
      let y = pos.y - lens.offsetHeight / 2

      if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth
      if (x < 0) x = 0
      if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight
      if (y < 0) y = 0

      lens.style.left = `${x}px`
      lens.style.top = `${y}px`
      result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`
    }

    const getCursorPos = (
      e: MouseEvent | TouchEvent
    ): { x: number; y: number } => {
      let a = img.getBoundingClientRect()
      let x = (e as MouseEvent).pageX - a.left - window.pageXOffset
      let y = (e as MouseEvent).pageY - a.top - window.pageYOffset
      return { x, y }
    }

    lens.addEventListener("mousemove", moveLens)
    img.addEventListener("mousemove", moveLens)
    lens.addEventListener("touchmove", moveLens)
    img.addEventListener("touchmove", moveLens)

    return () => {
      lens.removeEventListener("mousemove", moveLens)
      img.removeEventListener("mousemove", moveLens)
      lens.removeEventListener("touchmove", moveLens)
      img.removeEventListener("touchmove", moveLens)
    }
  }, [])

  return (
    <div className="h-full">
      <div className="img-zoom-container h-full">
        <img
          ref={imgRef}
          src="https://picsum.photos/200"
          /* width={500}
          height={500} */
          alt="Description of the image"
          className="relative"
        />
        <div ref={lensRef} className="img-zoom-lens"></div>
        <div
          ref={resultRef}
          className="img-zoom-result absolute h-40 w-40 top-0 -right-40  "
        ></div>
      </div>
    </div>
  )
}

export default ImageZoom
