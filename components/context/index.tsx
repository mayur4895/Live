'use client' 
 
 import { createContext } from "react";

const GlobalContext = createContext<null | { [key: string]: any }>(null);

export default function GlobalState({ children }: { children: React.ReactNode }) {
  return <GlobalContext.Provider value={null}>{children}</GlobalContext.Provider>;
}