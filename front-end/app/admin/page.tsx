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
  /*
  function dynamic(){
    switch(route){
      case 0:
        return(<ViewOrders/>)
      case 1:
        return(<AddFoodItem/>)
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
      <button onClick={()=>{setRoute(0)}} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">See Orders</button>
      <button onClick={()=>{setRoute(1)}} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Add Items</button>
      {dynamic()}
    </>
    )
  }
    */
   return(
    <>
    <ViewItems/>
    </>
   )

}