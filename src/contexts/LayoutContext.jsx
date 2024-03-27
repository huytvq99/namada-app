import React, { createContext, useState, useContext } from 'react'

const LayoutContext = createContext(null)

export const useLayout = () => {
  const layoutContext = useContext(LayoutContext)

  if (!layoutContext) {
    throw new Error('useLayout must be used within an LayoutProvider')
  }

  return layoutContext
}

export const LayoutProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const onToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const layoutContextValue = {
    isCollapsed,
    onToggleCollapse
  }

  return (
    <LayoutContext.Provider value={layoutContextValue}>
      {children}
    </LayoutContext.Provider>
  )
}
