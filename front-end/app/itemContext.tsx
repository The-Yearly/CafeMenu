
'use client'
import React, { createContext,useContext,useState } from "react";
interface ContextTypes {
    items: number;
    setItems: React.Dispatch<React.SetStateAction<number>>
}

const ItemsContext=createContext<ContextTypes | undefined>(undefined)

export const useButton = (): ContextTypes =>{
    const context = useContext(ItemsContext)
    if(!context){
        console.log("No context")
        throw new Error("No context")
    }
    return context
}

export const ItemsContextProvider=({children}:{children:React.ReactNode})=>{
    const [items,setItems]=useState(0)
    return(
        <ItemsContext.Provider value={{items,setItems}}>
            {children}
        </ItemsContext.Provider>
    )
}