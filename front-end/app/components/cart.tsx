'use client'
import { Swiper,SwiperSlide } from "swiper/react";
import cart from "@/app/assets/images/Cart.png"
import Image from "next/image";
import AddButton from "./addButton";
import { Bill } from "../assets/interface/Bill";
import { useState,useEffect,use } from "react";
import { useButton } from "../itemContext";
import 'swiper/css/bundle';
import axios from "axios";
import { CartData } from "../assets/interface/CartData";
export default function Cart(props:{tid:number}){
    const link="http://localhost:3001/api/v1/"
    const {items,setItems}=useButton()
    const tableId=Number(props.tid)
    const [data,setData]=useState<Bill|null>(null)
    const [cartData,setCartData]=useState<CartData[]|null>(null)
    const [iscartShowing,setCartShowing]=useState(false)
    useEffect(()=>{const sendOrder=async()=>{
      if(data!=null){      
        const res=await axios.post(link+"/orders/",data)}
        localStorage.setItem("status","true")   
    }
    sendOrder()
    },[data])
    useEffect(()=>{const getCart=()=>{
        const cart=localStorage.getItem("cart")
        if(cart==null){
          localStorage.setItem("cart","{}")
        }
        }
        getCart()
        },[items])
    useEffect(()=>{const fetchCart=()=>{
        const cart=sessionStorage.getItem("cart")
        if(cart!=null){
          setCartData(Object.values(JSON.parse(cart)))
        }
    }
    fetchCart()},[iscartShowing,items])
    function sendOrder(){
      let bill=0
      if(cartData!=undefined){
        for(let g=0;g<cartData?.length;g++){
          bill+=(cartData[g].cost*cartData[g].quantity)
        }
      setData({tableId:tableId,totalCost:bill,cartItems:cartData})
      }
    }
    if(cartData!=null){
        return(
            <>
             <Image src={cart} className="absolute xl-phone:top-[5vw] xl-phone:right-[5vw] xl-phone:w-[10vw] top-[5vw] right-[5vw] w-[10vw] " onClick={()=>{setCartShowing(true)}} height={1000} width={1000} alt="Cart"/>
            <div className={iscartShowing?"fixed top-0 right-0 z-10 xl-phone:w-[30vw] w-[30vw] h-[100%] backdrop-filter backdrop-blur-sm bg-opacity-20 bg-slate-100 border border-gray-100":"hidden"}>
            <p className="font-times text-gray-500" onClick={()=>{setCartShowing(false)}}>X</p>
            <Swiper className="xl-phone:top-[5vw] xl-phone:h-[200vw] top-[2 vw] h-[175vw]" slidesPerView={6}  direction={"vertical"}>
                {cartData?.map((food)=>
                <SwiperSlide key={food.itemId}>
                  <AddButton item={food} location="cart"/>
                  <Image className="absolute xl-phone:w-[30vw] xl-phone:rounded-[30vw] xl-phone:h-[30vw] w-[26vw] rounded-[30vw] h-[26vw] xl-phone:left-0 left-[3vw] " src={food.image} width={1000} height={1000} alt="Food"/>
                </SwiperSlide>)}
            </Swiper>
            <button className="absolute bottom-[10vw] z-50 left-[3vw]" onClick={()=>{sendOrder()}}>Buy</button>
        </div>
        </>
        )
    }   
}