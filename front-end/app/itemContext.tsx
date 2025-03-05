
'use client'
import React, { createContext,useContext,useState } from "react";
interface ContextTypes {
    price: number;
    setPrice: React.Dispatch<React.SetStateAction<number>>
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
    let tprice=Number(sessionStorage.getItem("price"))
    if(tprice==null){
        sessionStorage.setItem("price","0")
        tprice=0
    }
    const [price,setPrice]=useState(tprice)
    return(
        <ItemsContext.Provider value={{price,setPrice}}>
            {children}
        </ItemsContext.Provider>
    )
}