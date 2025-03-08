'use client'
import {useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Categories from "@/app/assets/interface/categories";
export default function AddCat() {
  const [data,setData]=useState<Categories|null>(null)
  const [name,setName]=useState("")
  const [img,setImg]=useState("")
  const [slug,setSlug]=useState("")
  useEffect(()=>{const sendItem=async()=>{
    if(data!=null){
      const res=await axios.post("http://localhost:3001/api/v1/addCat",data)
      toast(res.data.message)
    }
  }
  sendItem()},[data])
  function sendCat(){
    if(name!="" && img!="" && slug!=""){
        setData({name:name,images:img,slug:slug})
    }
  }
  return (
    <div className="absolute left-[35vw] top-[10vw] w-[30vw] mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add Category</h2>
      <div className="space-y-4">
        <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Category Name" className="w-full p-2 border rounded"/>
        <input value={img} placeholder="Image URL" onChange={(e)=>{setImg(e.target.value)}} className="w-full p-2 border rounded"/>
        <input value={slug} placeholder="Slug" onChange={(e)=>{setSlug(e.target.value)}} className="w-full p-2 border rounded"/>
        <button onClick={sendCat} className="w-full h-[3vw] p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
      </div>
    </div>
  );
}
