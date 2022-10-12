export const QuickbooksLogo = ({ ...props }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <rect x="6" y="5" width="37" height="37" fill="url(#pattern8)" />
      <defs>
        <pattern
          id="pattern8"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_1877_18281" transform="scale(0.00444444)" />
        </pattern>
        <image
          id="image0_1877_18281"
          width="225"
          height="225"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  )
}