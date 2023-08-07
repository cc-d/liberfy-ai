import React, { createContext, useContext } from 'react';

export interface SidebarContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isSmallDevice: boolean;
  marginLeft: string;
  setMarginLeft: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebarContext must be used within an SidebarProvider");
  }
  return context;
};

export default SidebarContext;
