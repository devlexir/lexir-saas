import { motion, useAnimation } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

function useOnScreen(ref: any, rootMargin = '0px') {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    let currentRef: any = null
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
      }
    )
    if (ref.current) {
      currentRef = ref.current
      observer.observe(currentRef)
    }
    return () => {
      observer.unobserve(currentRef)
    }
  }, [ref, rootMargin]) // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting
}

const ScrollFade = ({ children }: any) => {
  const controls = useAnimation()
  const rootRef = useRef()
  const onScreen = useOnScreen(rootRef)
  useEffect(() => {
    if (onScreen) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
        },
      })
    }
  }, [onScreen, controls])
  return (
    <motion.div
      className="lazy-div"
      ref={rootRef}
      initial={{ opacity: 0, x: -10 }}
      animate={controls}
    >
      {children}
    </motion.div>
  )
}

export default ScrollFade
