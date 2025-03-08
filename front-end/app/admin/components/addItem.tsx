'use client'
import {useEffect, useState } from "react";
import Categories from "@/app/assets/interface/categories";
import axios from "axios";
import { toast } from "react-toastify";
interface addItem{
  name:string,
  bio:string,
  image:string,
  category:string,
  subcategory:string,
  isvegan:boolean,
  cost:number,
  avalability:boolean
}
export default function AddFoodItem() {
  const [data,setData]=useState<addItem|null>(null)
  const [name,setName]=useState("")
  const [bio,setBio]=useState("")
  const [img,setImg]=useState("")
  const [cats,setCats]=useState<Categories[]|null>(null)
  const [cat,setCat]=useState("Click Me")
  const [subcat,setSubCat]=useState("")
  const [cost,setCost]=useState(0);
  const [showDropDown,setShowDropDown]=useState(false)
  const [isVegan,setIsVegan]=useState(false) 
  useEffect(()=>{const sendItem=async()=>{
    if(data!=null){
      const res=await axios.post("http://localhost:3001/api/v1/addItem",data)
      toast(res.data.message)
    }
  }
  sendItem()},[data])
  useEffect(()=>{const getCat=async()=>{
    const res=await fetch("http://localhost:3001/api/v1/getCategories")
    const cats=await res.json()
    setCats(cats.categories) 
  }
  getCat()},[])
  function sendData(){
    if(name!="" && bio!="" && img!="" && cat!="Click Me" && subcat!="" && cost!=0){
      setData({name:name,bio:bio,image:img,category:cat,subcategory:subcat,isvegan:isVegan,cost:cost,avalability:true})
      setName("")
      setBio("")
      setImg("")
      setCost(0)
      setIsVegan(false)
      setCat("Click Me")
      setSubCat("")
      setShowDropDown(false)
    }else{
      toast.warn("Fill All Coloumns")
    }
  }
  return (
    <div className="absolute left-[35vw] top-[10vw] w-[30vw] mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add Food Item</h2>
      <div className="space-y-4">
        <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Name" className="w-full p-2 border rounded"/>
        <textarea value={bio} placeholder="Bio" onChange={(e)=>{setBio(e.target.value)}} className="w-full p-2 border rounded"/>
        <input value={img} placeholder="Image URL" onChange={(e)=>{setImg(e.target.value)}} className="w-full p-2 border rounded"/>
        <div className="my-2">
          <div className="text-gray-700">Category: <button className={(!showDropDown)?"font-medium text-gray-800 cursor-pointer bg-white":"hidden"} onClick={()=>{setShowDropDown(true)}}>{cat}</button>
          <ul className={`absolute left-0 w-full mt-1 bg-white rounded-md shadow-md z-40 ${showDropDown ? 'block' : 'hidden'}`}>
          {cats?.map((category) => (
          <li key={category.name} className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer" onClick={()=>{ setCat(category.name);setShowDropDown(false);}}>{category.name}</li>))}
          </ul>
          </div>
        </div>
        <input value={subcat} placeholder="Subcategory" onChange={(e)=>{setSubCat(e.target.value)}} className="w-full p-2 border rounded"/>
        <input value={cost} type="number" placeholder="Cost" onChange={(e)=>{setCost(Number(e.target.value))}} className="w-full p-2 border rounded"/>
        <div className="flex items-center space-x-2">
          <input type="checkbox" checked={isVegan} onChange={()=>{setIsVegan(!isVegan)}}/> 
          <p>Is Vegan</p>
        </div>
        <button onClick={sendData} className="w-full h-[3vw] p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
      </div>
    </div>
  );
}
