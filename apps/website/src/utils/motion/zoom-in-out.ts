export function zoomInOut (duration = 0.2) {
  return {
    from: { 
      scale: 0.9,
      transition: {
        type: 'easeOut',
				duration: duration,
      } 
    },
    to: { 
      scale: 1,
      transition: {
        type: 'easeOut',
				duration: duration,
      } 
    },
  }
}