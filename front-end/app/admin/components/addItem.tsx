'use client'
import {useEffect, useState } from "react";
import axios from "axios";
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
  const [cat,setCat]=useState("")
  const [subcat,setSubCat]=useState("")
  const [cost,setCost]=useState(0);
  const [isVegan,setIsVegan]=useState(false) 
  useEffect(()=>{const sendItem=async()=>{
    if(data!=null){
      const res=await axios.post("http://localhost:3001/api/v1/addItem",data)
    }
  }
  sendItem()},[data])
  function sendData(){
    setData({name:name,bio:bio,image:img,category:cat,subcategory:subcat,isvegan:isVegan,cost:cost,avalability:true})
  }
  return (
    <div className="absolute left-[35vw] top-[10vw] w-[30vw] mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add Food Item</h2>
      <div className="space-y-4">
        <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Name" className="w-full p-2 border rounded"/>
        <textarea value={bio} placeholder="Bio" onChange={(e)=>{setBio(e.target.value)}} className="w-full p-2 border rounded"/>
        <input value={img} placeholder="Image URL" onChange={(e)=>{setImg(e.target.value)}} className="w-full p-2 border rounded"/>
        <input value={cat} placeholder="Category" onChange={(e)=>{setCat(e.target.value)}} className="w-full p-2 border rounded"/>
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
