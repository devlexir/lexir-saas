export function fadeInLeft (duration = 0.3) {
  return {
    from: { 
      left: '-100%',
      transition: {
        type: 'easeInOut',
				duration: duration,
      } 
    },
    to: { 
      left: 0,
      transition: {
        type: 'easeInOut',
				duration: duration,
      } 
    },
  }
}