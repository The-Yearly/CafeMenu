'use client'
import { Food } from "@/app/assets/interface/food"
import { useState,useEffect } from "react"
import Image from "next/image"
import Item from "./itemcard"
export default function ViewItems(){
    const [data,setData]=useState<Food[]|null>(null)
    const [search,setSearch]=useState("")
    const [filteredData,setFilter]=useState<Food[]|null>(null)

    useEffect(()=>{const fetchAllItems=async()=>{
        const res=await fetch("http://localhost:3001/api/v1/adminmenu")
        const resjson=await res.json()
        setData(resjson.items)
        const i= setInterval(fetchAllItems,30000)
        return()=>clearInterval(i)
    }
    fetchAllItems()},[])
    useEffect(()=>{const fetchAllItems=async()=>{
        const res=await fetch("http://localhost:3001/api/v1/menu")
        const resjson=await res.json()
        setData(resjson.items)
    }
    fetchAllItems()},[])
    useEffect(()=>{const Search=()=>{
        if(data!=null){
          const a=data.filter(food=>food.name.toLowerCase().includes(search.toLowerCase()))
          if(search!=""){
            setFilter(a)
        }else{
            setFilter(null)
        }
      }
      }
      Search()},[search])
    if(data!=null){
        console.log(data)
        return(
            <>
            <input className="absolute top-[5vw] left-[2vw] w-[94vw] rounded-md h-[3vw] pl-8" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search"/>
            <div className="absolute top-[10vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {(filteredData??data).map((item) => (
                    <div key={item.itemId}>
                        <Item item={item}/>
                    </div>
                ))}
            </div>
        </>
        )
    }
}