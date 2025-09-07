import { useLayoutEffect, useState } from "react"

export const useWindowSize = () => {
   const [size, setSize] = useState({
      width: 0,
      hieght: 0,
      isMobile: false,
   })

   useLayoutEffect(() => {
      function updateSize() {
         setSize({
            hieght: window.innerHeight,
            width: window.innerWidth,
            isMobile: window.innerWidth <= 1200
         })
      }
      window.addEventListener("resize", updateSize)

      updateSize()
      return () => window.removeEventListener("resize", updateSize)
   }, [])

   return size
}