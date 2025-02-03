import React from 'react'

/**
 * Custom input component with proper styling and extendable props
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input 
        type={type} 
        ref={ref} 
        className={`customInput ${className}`}
        {...props} 
      />
    )
  }
);

export default Input