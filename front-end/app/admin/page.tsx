'use client'
import { useEffect, useState } from "react";
import AddFoodItem from "./components/addItem"
import ViewOrders from "./components/viewOrders"
import ViewItems from "./components/viewItems";
import { useRouter } from "next/navigation";
export default function admin(){
  const isAdmin=localStorage.getItem("isAdmin")
  const [route,setRoute]=useState(0)
  const router=useRouter()
  function dynamic(){
    switch(route){
      case 0:
        return(<ViewOrders/>)
      case 1:
        return(<AddFoodItem/>)
      case 2:
        return <ViewItems/>
      default:
        return(<ViewOrders/>)
    }
  }
  useEffect(()=>{const checkAdmin=()=>{
    if(isAdmin!="true"){
      router.push("authentication")
    }
  }
  checkAdmin()},[])
  return(
    <>
    <div className="flex justify-center">
      <button onClick={()=>{setRoute(0)}} className={(route!=0)?"font-playwrite text-[1.5vw] text-black px-5":"text-[1.5vw] border-b-[0.2vw] font-playwrite px-1 rounded-sm border-blue-500"}>See Orders</button>
      <button onClick={()=>{setRoute(1)}} className={(route!=1)?"text-black font-playwrite px-5 text-[1.5vw]":"text-[1.5vw] border-b-[0.2vw] px-1 rounded-sm font-playwrite border-blue-500"}>Add Items</button>
      <button onClick={()=>{setRoute(2)}} className={(route!=2)?"text-black font-playwrite px-5 text-[1.5vw]":"text-[1.5vw] border-b-[0.2vw] px-1 rounded-sm font-playwrite border-blue-500"}>Edit Items</button>
      </div>
      {dynamic()}
      </>
    )
  }
