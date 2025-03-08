'use client'
import { Food } from "@/app/assets/interface/food"
import { useEffect, useState} from "react" 
import Categories from "@/app/assets/interface/categories"
import axios from "axios"
import Image from "next/image"
import { toast } from "react-toastify"
export default function Item(props:{item:Food}){
    const [item,setItem]=useState(props.item)
    const [cats,setCats]=useState<Categories[]|null>(null)
    const [canINotEdit,setCanINotEdit]=useState(true)
    const [img,setImg]=useState(item.image)
    const [name,setName]=useState(item.name)
    const [cost,setCost]=useState(item.cost)
    const [isVegan,setIsVegan]=useState(item.isvegan)
    const [isAvailable,setIsAvailable]=useState(item.availability)
    const [cat,setCat]=useState(item.category)
    const [subCat,setSubCat]=useState(item.subcategory)
    const [desc,setDesc]=useState(item.bio)
    const [showDropDown,setShowDropDown]=useState(false)
    const [data,setData]=useState<Food|null>(null)
    function reset(){
        setShowDropDown(false)
        setName(item.name)
        setCost(item.cost)
        setImg(item.image)
        setIsVegan(item.isvegan)
        setIsAvailable(item.availability)
        setCat(item.category)
        setSubCat(item.subcategory)
        setDesc(item.bio)
        toast("No Changes Were Made")
    }
    useEffect(()=>{const getCat=async()=>{
        const res=await fetch("http://localhost:3001/api/v1/getCategories")
        const cats=await res.json()
        setCats(cats.categories)
    }
    getCat()},[])
    useEffect(()=>{const sendData=async()=>{
        if(data!=null){
            const res=await axios.post("http://localhost:3001/api/v1/changeItem",data)
            toast(res.data.message)
        }
    }
    sendData()},[data])
    function submit(itemId:number){
        setData({itemId:item.itemId,name:name,bio:desc,category:cat,subcategory:subCat,availability:isAvailable,cost:cost,image:img,isvegan:isVegan,quantity:1})
    }   
    if(item!=null && cats!=null){
        return(
            <div key={item.itemId} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <Image alt={item.name} src={item.image} height={1000} width={1000} className="w-full h-[15vw] object-cover"/>
                <div className="p-4">
                    <input className="text-xl bg-white font-semibold text-gray-800 mb-2" value={name} disabled={canINotEdit} onChange={(e)=>{setName(e.target.value)}}/>
                    <p className="text-lg font-medium text-gray-600 bg-white">Cost: <input type="number" disabled={canINotEdit}  onChange={(e)=>{setCost(parseInt(e.target.value))}} value={cost} className="text-green-600 bg-white"/></p>
                    <p className="text-lg font-medium text-gray-600 bg-white">Img Url: <input disabled={canINotEdit}  onChange={(e)=>{setImg(e.target.value)}} value={img} className="text-blue-400 bg-white"/></p>
                    <div className="my-2">
                        <p className="text-gray-700">Is Vegan</p>
                        <input type="checkbox" checked={Boolean(isVegan)} disabled={canINotEdit} onClick={()=>{setIsVegan(!isVegan)}} className="mr-2"/>
                    </div>
                    <div className="my-2">
                        <p className="text-gray-700">Is Available</p>
                        <input type="checkbox"  checked={Boolean(isAvailable)} onClick={()=>{setIsAvailable(!isAvailable)}} disabled={canINotEdit} className="mr-2"/>
                    </div>
                    <div className="my-2">
                        <div className="text-gray-700">Category: <button className={(!showDropDown)?"font-medium text-gray-800 cursor-pointer bg-white":"hidden"} onClick={()=>{setShowDropDown(true)}} disabled={canINotEdit}>{cat}</button>
                        <ul className={`absolute left-0 w-full mt-1 bg-white rounded-md shadow-md z-40 ${showDropDown ? 'block' : 'hidden'}`}>
                        {cats?.map((category) => (
                        <li key={category.name} className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer" onClick={()=>{ setCat(category.name);setShowDropDown(false);}}>{category.name}</li>))}
                        </ul>
                        </div>
                        <p className="text-gray-700">Sub-Category: <input className="bg-white font-medium text-gray-800" value={subCat} onChange={(e)=>{setSubCat(e.target.value)}} disabled={canINotEdit}/></p>
                    </div>
                    <div className="my-2">
                        <p className="text-gray-700">Description</p>
                        <textarea value={desc} disabled={canINotEdit} className="w-full p-2 border rounded-md text-gray-700" onChange={(e)=>{setDesc(e.target.value)}} rows={3}/>
                    </div>
                </div>
                <button className={canINotEdit?("my-2 mx-5 text-[1vw] bg-blue-500 text-white 2xl:w-[3vw] xl:w-[4vw] lg:w-[5vw] md:w-[6vw] rounded-sm hover:bg-blue-600"):"hidden"} onClick={()=>{setCanINotEdit(!canINotEdit);toast("You Can Edit Item")}}>Edit</button>
                <button className={!canINotEdit?("my-2 mx-5 text-[1vw] bg-blue-500 text-white 2xl:w-[3vw] xl:w-[4vw] lg:w-[5vw] md:w-[6vw] rounded-sm hover:bg-blue-600"):"hidden"} onClick={()=>{setCanINotEdit(!canINotEdit);submit(item.itemId)}}>Done</button>
                <button className={!canINotEdit?("my-2 mx-5 text-[1vw] bg-blue-500 text-white 2xl:w-[3vw] xl:w-[4vw] lg:w-[5vw] md:w-[6vw] rounded-sm hover:bg-blue-600"):"hidden"} onClick={()=>{setCanINotEdit(!canINotEdit);reset()}}>Cancel</button>
            </div>
        )
    }
}