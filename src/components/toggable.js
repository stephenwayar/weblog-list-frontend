import React, { useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"

const Toggable =  forwardRef(({ children, btnText }, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return(
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{btnText}</button>
      </div>

      <div style={showWhenVisible}>
        {children}

        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Toggable.propTypes = {
  btnText: PropTypes.string.isRequired
}

Toggable.displayName = "Toggable"

export default Toggable