'use client'
import { Food } from "@/app/assets/interface/food"
import { useState,useEffect } from "react"
import Image from "next/image"
export default function Item(props:{item:Food}){
    const [item,setItem]=useState(props.item)
    const [canINotEdit,setCanINotEdit]=useState(true)
    const [name,setName]=useState(item.name)
    const [cost,setCost]=useState(item.cost)
    const [isVegan,setIsVegan]=useState(item.isvegan)
    const [isAvailable,setIsAvailable]=useState(item.availability)
    const [cat,setCat]=useState(item.category)
    const [subCat,setSubCat]=useState(item.subcategory)
    const [desc,setDesc]=useState(item.bio)
    if(item!=null){
        return(
            <div key={item.itemId} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <Image alt={item.name} src={item.image} height={1000} width={1000} className="w-full h-[15vw] object-cover"/>
                <div className="p-4">
                    <input className="text-xl bg-white font-semibold text-gray-800 mb-2" value={name} disabled={canINotEdit} onChange={(e)=>{setName(e.target.value)}}/>
                    <p className="text-lg font-medium text-gray-600 bg-white">Cost: <input type="number" disabled={canINotEdit}  onChange={(e)=>{setCost(parseInt(e.target.value))}} value={cost} className="text-green-600 bg-white"/></p>
                    <div className="my-2">
                        <p className="text-gray-700">Is Vegan</p>
                        <input type="checkbox" checked={Boolean(isVegan)} disabled={canINotEdit} className="mr-2"/>
                    </div>
                    <div className="my-2">
                        <p className="text-gray-700">Is Available</p>
                        <input type="checkbox"  checked={Boolean(isAvailable)} disabled={canINotEdit} className="mr-2"/>
                    </div>
                    <div className="my-2">
                        <p className="text-gray-700">Category: <input className="font-medium text-gray-800 bg-white" value={cat} disabled={canINotEdit}/></p>
                        <p className="text-gray-700">Sub-Category: <input className="bg-white font-medium text-gray-800" value={subCat} disabled={canINotEdit}/></p>
                    </div>
                    <div className="my-2">
                        <p className="text-gray-700">Description</p>
                        <textarea value={desc} disabled={canINotEdit} className="w-full p-2 border rounded-md text-gray-700" rows={3}/>
                    </div>
                </div>
                <button className="my-2 mx-5 text-[1vw] bg-blue-500 text-white 2xl:w-[3vw] xl:w-[4vw] lg:w-[5vw] md:w-[6vw] rounded-sm hover:bg-blue-600" onClick={()=>{setCanINotEdit(!canINotEdit)}}>Edit</button>
            </div>
        )
    }
}