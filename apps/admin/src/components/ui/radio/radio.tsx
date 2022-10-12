import React, { InputHTMLAttributes } from 'react'


export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  name?: string
  id: string
  error?: string
  variant?: any
}

const Radio = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, name, id, error, variant, ...rest }, ref) => {
    return (
      <div className={className}>
        <div className="flex items-center">
          <input
            id={id}
            name={name}
            type="radio"
            ref={ref}
            className="mr-2 h-4 w-4 text-[#1c8c64]  focus:outline-none focus:ring focus:ring-[#1c8c64] "
            {...rest}
          />

          {variant ? (
            <label htmlFor={name} className="text-lg text-body">
              {label}
            </label>
          ) : (
            <label htmlFor={name} className="text-sm text-body">
              {label}
            </label>
          )}
        </div>

        {error && <p className="my-2 text-xs text-red-500 text-end">{error}</p>}
      </div>
    )
  }
)

export default Radio
