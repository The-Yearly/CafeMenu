'use client'
import Image from "next/image"
import { useState,useEffect } from "react"
import { Food } from "../assets/interface/food"
import axios from "axios"
import cart from "@/app/assets/images/cart.png"
import Link from "next/link"
import { toast, ToastContainer } from "react-toastify"
export default function Billing(){
  const [data,setData]=useState<Food[]|null>(null)
  const [order,setOrder]=useState<Food[]|null>(null)
  const [qty,serQty]=useState(null)
  useEffect(()=>{const fetchdata=()=>{
      const cartDets=sessionStorage.getItem("cartDets")
      const cart=sessionStorage.getItem("cart")
      if(cartDets!=null){
        setData(JSON.parse(cartDets))
       }
       if(cart!=null){
        serQty(JSON.parse(cart))
       }
      }
      fetchdata()},[])
  useEffect(()=>{
    const sendOrder=async()=>{
      if(order!=null){
        const res=await axios.post("http://localhost:8000/placeOrder",{item:order,qty:qty})
        toast(res.data.message)
      }
      
    }
    sendOrder()
    },[order])
  function placeOrder(){
    setOrder(data)
  }
  if(data!=null && qty!=null){
    return(
      <>
      <ToastContainer/>
      <Link className="fixed flex shadow-lg justify-center items-center 2xl:w-[5vw] 2xl:h-[5vw] 2xl:bottom-[2vw] 2xl:right-[10vw] 2xl:rounded-[3vw] xl:w-[5vw] xl:h-[5vw] xl:bottom-[2vw] xl:right-[10vw] xl:rounded-[3vw] lg:w-[6vw] lg:h-[6vw] lg:bottom-[2vw] lg:right-[11vw] lg:rounded-[3vw] md:w-[7vw] md:h-[7vw] md:bottom-[5vw] md:right-[4vw] md:rounded-[5vw] sm:w-[15vw] sm:h-[15vw] sm:bottom-[5vw] sm:right-[10vw] sm:rounded-[10vw] xl-phone:w-[15vw] xl-phone:h-[15vw] xl-phone:bottom-[7vw] xl-phone:right-[10vw] xl-phone:rounded-[10vw] sm-phone:w-[15vw] sm-phone:h-[15vw] sm-phone:bottom-[12vw] sm-phone:right-[10vw] sm-phone:rounded-[10vw] right-[10vw] bottom-[15vw] rounded-[10vw] bg-white" href={"/"}><Image alt="Cart" className="2xl:w-[3vw] 2xl:h-[3vw] xl:w-[3vw] xl:h-[3vw] lg:w-[4vw] lg:h-[4vw] md:w-[4vw] md:h-[4vw] sm:w-[7vw] sm:h-[7vw] xl-phone:w-[7vw] xl-phone:h-[7vw] sm-phone:w-[7vw] sm-phone:h-[7vw] w-[7vw] h-[7vw] " src={cart} width={1000} height={1000}></Image></Link>
        <div>
          <Image src="https://www.apjtours.com/admin/assets/img/blog/Best-Cafes-In-Gurgaon-1200x675.jpg" alt="Cafe Image" width={1000} height={1000} className="absolute  2xl:top-[2vw] 2xl:left-[27vw] 2xl:h-auto 2xl:w-[44vw] 2xl:rounded-[3vw]  xl  :top-[2vw] xl:left-[20vw] xl:h-auto xl:w-[60vw] xl:rounded-[3vw] lg:top-[3vw] lg:left-[21vw] lg:h-auto lg:w-[60vw] md:rounded-[3vw] md:top-[4vw]  md:h-auto md:left-[12vw] md:w-[75vw]  sm:rounded-[4vw] sm:top-[5vw] sm:left-[5vw] sm:h-auto sm:w-[90vw] xl-phone:rounded-[3vw] xl-phone:h-[80vw] xl-phone:top-[0vw] xl-phone:left-[0vw] xl-phone:w-[100vw] rounded-[3vw] h-[75vw] top-[0vw] left-[0vw] w-[100vw] lg:rounded-[3vw]"/>
          <p className="absolute 2xl:top-[19vw] 2xl:left-[30vw] 2xl:text-[3vw] font-courier text-white lg:top-[28vw] lg:left-[24vw] lg:text-[4vw] md:top-[35vw] md:left-[15vw] md:text-[5vw] sm:top-[40vw] sm:left-[10vw] sm:text-[7vw] xl-phone:top-[60vw] xl-phone:left-[1vw] xl-phone:text-[9vw] top-[60vw] left-[1vw] text-[10vw] ">Summer Time Cafe</p>
        </div>
        <div className="absolute z-0 2xl:top-[29vw] 2xl:left-[27vw] lg:top-[40vw] lg:left-[21vw] md:top-[50vw] md:left-[12vw] sm:top-[60vw] sm:left-[5vw] xl-phone:top-[85vw] xl-phone:left-[1vw] xl:top-[40vw] left-[1vw] top-[80vw]">
              <ul className="absolute 2xl:left-[3vw] xl:left-[10vw] lg:left-[6vw] md:left-[10vw] sm:left-[6vw] xl-phone:left-[12vw] left-[10vw] ">
                  {data.map((food)=>
                  <li className="2xl:pb-[1vw] xl:pb-[1vw] sm:pb-[3vw] pb-[3vw]" key={food.item_id}>
                  <div className="bg-gray-100 2xl:rounded-[2vw] 2xl:w-[38vw] 2xl:min-h-[16vw] h-auto 2xl:p-4 xl:rounded-[2vw] xl:w-[38vw] xl:min-h-[16vw]  lg:p-4 lg:rounded-[2vw] lg:w-[48vw] lg:min-h-[22vw] md:p-4 md:rounded-[2vw] md:w-[56vw] md:min-h-[22vw] sm:p-4 sm:rounded-[2vw] sm:w-[75vw] sm:min-h-[22vw] xl-phone:p-4 xl-phone:rounded-[2vw] xl-phone:w-[75vw] xl-phone:min-h-[22vw] xl:p-4 xl-p-4 rounded-[2vw] w-[80vw] min-h-[32vw]">
                    <div className="relative 2xl:top-[0.5vw] 2xl:left-[1.3vw] 2xl:w-[34vw] 2xl:h-[13vw] xl:rounded-[2vw] xl:top-[0.5vw] xl:left-[1.3vw] xl:w-[34vw] xl:h-[13vw] lg:rounded-[2vw] lg:top-[0.5vw] lg:left-[1.3vw] lg:w-[43vw] lg:h-[18vw] 2xl:rounded-[2vw] md:rounded-[2vw] md:top-[0.5vw] md:left-[1.3vw] md:w-[50vw] md:h-[20vw] sm:rounded-[2vw] sm:top-[0.5vw] sm:left-[1.3vw] sm:w-[68vw] sm:h-[23vw] xl-phone:rounded-[2vw] xl-phone:top-[0.5vw] xl-phone:left-[1.3vw] xl-phone:w-[68vw] xl-phone:h-[23vw] rounded-[2vw] top-[3vw] left-[6vw] w-[68vw] h-[25vw] bg-white p-4">
                              <Image className="relative 2xl:top-[2vw] 2xl:left-[2vw] 2xl:w-[8vw] 2xl:h-[8vw] 2xl:rounded-[2vw] xl:top-[1vw] xl:left-[2vw] xl:w-[8vw] xl:h-[8vw] lg:rounded-[2vw] lg:top-[3vw] lg:left-[2vw] lg:w-[10vw] lg:h-[10vw] md:rounded-[2vw] md:top-[1vw] md:left-[1vw] md:w-[12vw] md:h-[12vw] sm:rounded-[2vw] sm:top-[1vw] sm:left-[1vw] sm:w-[15vw] sm:h-[15vw] xl-phone:rounded-[2vw] xl-phone:top-[1vw] xl-phone:left-[1vw]  xl-phone:w-[15vw] xl-phone:h-[15vw] xl:rounded-[2vw] rounded-[2vw] top-[0vw] left-[1vw]  w-[15vw] phone:h-[15vw]" alt={"Food Item"+food.item_id} width={1000} height={1000} src={food.item_image}/>
                              <p className="relative text-gray-500 2xl:text-[2vw] 2xl:left-[12vw] 2xl:top-[-6vw] xl:text-[2vw] xl:left-[12vw] xl:top-[-7vw] lg:text-[3vw] lg:left-[14vw] lg:top-[-7vw] md:text-[3vw] md:left-[17vw] md:top-[-11vw] sm:text-[4vw] sm:left-[19vw] sm:top-[-14vw] xl-phone:text-[4vw] xl-phone:left-[19vw] xl-phone:top-[-14vw] text-[4.5vw] left-[19vw] top-[-16vw]">{food.item_name}</p>
                              <p className="relative text-gray-500 font-times 2xl:top-[-5.5vw] 2xl:w-[20vw]  2xl:left-[12vw] xl:top-[-7vw] xl:w-[20vw]  xl:left-[12vw] xl:text-[1vw] lg:top-[-7vw] lg:w-[25vw]  lg:left-[14vw] lg:text-[1.5vws md:top-[-11vw] md:w-[25vw] md:left-[15vw] md:text-[2vw] sm:top-[-14vw] sm:w-[25vw] sm:left-[20vw] sm:text-[2vw] xl-phone:top-[-14vw] xl-phone:w-[25vw] xl-phone:left-[20vw] xl-phone:text-[2vw] top-[-16vw] w-[25vw] left-[20vw] text-[2.2vw] line-clamp-3">{food.item_bio}</p>
                              <p className="relative text-gray-500 font-times 2xl:top-[-5.5vw] 2xl:w-[20vw]  2xl:left-[12vw] xl:top-[-7vw] xl:w-[20vw]  xl:left-[12vw] xl:text-[1vw] lg:top-[-7vw] lg:w-[25vw]  lg:left-[14vw] lg:text-[1.5vws md:top-[-11vw] md:w-[25vw] md:left-[15vw] md:text-[2vw] sm:top-[-14vw] sm:w-[25vw] sm:left-[20vw] sm:text-[2vw] xl-phone:top-[-14vw] xl-phone:w-[25vw] xl-phone:left-[20vw] xl-phone:text-[2vw] top-[-16vw] w-[25vw] left-[20vw] text-[2.2vw] line-clamp-3">{qty[food.item_id]}</p>
                          </div>
                      </div>
                  </li>
                  )}
              </ul>
          </div>  
          <button className="fixed right-5 bg-slate-300 bottom-4" onClick={placeOrder}>Buy</button>
      </>
    )
}
}
