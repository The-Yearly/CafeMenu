'use client'
import { Food } from "@/app/assets/interface/food"
import { useState,useEffect } from "react"
import Image from "next/image"
import Item from "./itemcard"
export default function ViewItems(){
    const [data,setData]=useState<Food[]|null>(null)
    useEffect(()=>{const fetchAllItems=async()=>{
        const res=await fetch("http://localhost:3001/api/v1/menu")
        const resjson=await res.json()
        setData(resjson.items)
    }
    fetchAllItems()},[])
    if(data!=null){
        console.log(data)
        return(
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {data.map((item) => (
                    <div key={item.itemId}>
                        <Item item={item}/>
                    </div>
                ))}
            </div>
        )
    }
}