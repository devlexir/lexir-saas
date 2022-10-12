import React, { InputHTMLAttributes } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: any
  name: string
  error?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, name, error, ...rest }, ref) => {
    return (
      <div className={className}>
        <div className="flex items-center">
          <input
            id={name}
            name={name}
            type="checkbox"
            ref={ref}
            className="mr-2 h-6 w-6 cursor-pointer rounded-md border text-[#1c8c64] focus:outline-none focus:ring focus:ring-[#1c8c64]	"
            {...rest}
          />

          <label
            htmlFor={name}
            className="pointer-events-none text-sm text-body md:text-base"
          >
            {label}
          </label>
        </div>

        {error && <p className="my-2 text-xs text-red-500 text-end">{error}</p>}
      </div>
    )
  }
)

export default Checkbox
