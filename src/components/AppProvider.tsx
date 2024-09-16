import {NextUIProvider} from "@nextui-org/react";
import React, { ReactNode } from 'react'

interface childrenProps {
    children : ReactNode
}

const AppProvider = ({children}:childrenProps) => {
  return (
    <NextUIProvider>
        {children}
    </NextUIProvider>
  )
}

export default AppProvider
