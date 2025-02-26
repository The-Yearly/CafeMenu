import { Swiper,SwiperSlide } from "swiper/react";
import { EffectCoverflow,Autoplay, Pagination } from "swiper/modules";
import cart from "@/app/assets/images/Cart.png"
import Image from "next/image";
import AddButton from "./addButton";
import { useState,useEffect } from "react";
import { Food } from "../assets/interface/food";
import 'swiper/css/bundle';
export default function Cart(){
    const [cartData,setCartData]=useState<Food[]|null>(null)
    const [iscartShowing,setCartShowing]=useState(false)
    useEffect(()=>{const fetchCart=()=>{
        const cartDets=sessionStorage.getItem("cartDets")
        if(cartDets!=null){
        setCartData(JSON.parse(cartDets))
        }
    }
    fetchCart()},[iscartShowing])
    if(cartData!=null){
        return(
            <>
             <Image src={cart} className="absolute xl-phone:top-[5vw] xl-phone:right-[5vw] xl-phone:w-[10vw] top-[5vw] right-[5vw] w-[10vw] " onClick={()=>{setCartShowing(true)}} height={1000} width={1000} alt="Cart"/>
            <div className={iscartShowing?"fixed top-0 xl-phone:right-0 xl-phone:z-10 xl-phone:w-[30vw] xl-phone:h-[100%] backdrop-filter backdrop-blur-sm bg-opacity-20 bg-slate-100 border border-gray-100":"hidden"}>
            <p className="font-times text-gray-500" onClick={()=>{setCartShowing(false)}}>X</p>
            <Swiper className="xl-phone:top-[5vw] xl-phone:h-[200vw]" slidesPerView={6}  direction={"vertical"}>
                {cartData?.map((food)=>
                <SwiperSlide key={food.item_id}>
                  <AddButton item={food} location="cart"/>
                  <Image className="xl-phone:w-[30vw] xl-phone:rounded-[30vw] xl-phone:h-[30vw] " src={food.item_image} width={1000} height={1000} alt="Food"/>
                </SwiperSlide>)}
            </Swiper>
        </div>
        </>
        )
    }   
}