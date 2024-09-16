import React, { ReactNode } from 'react'

interface childProps{
    children : ReactNode
}
const Layout = ({children}:childProps) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Layout
