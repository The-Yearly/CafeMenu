'use client'
import { useEffect, useState } from "react"
import { CartData } from "../assets/interface/CartData";
export default function AddButton(props:{item:CartData}){
    let cartJson;
    let cartDetsJson:CartData[];
    const [additem,setAddItem]=useState(0)
    useEffect(()=>{const fetchdata=async()=>{
        const cart=sessionStorage.getItem("cart")
        console.log(cart)
        if(cart!=null){
            cartJson=JSON.parse(cart)
            if(cartJson[props.item.item_id]!=null){
                setAddItem(cartJson[props.item.item_id])
            }else{
                setAddItem(0)
            }
        }
    }
    fetchdata()},[])
    function AddItem(){
        const cart=sessionStorage.getItem("cart")
        const cartDets=sessionStorage.getItem("cartDets")
        console.log(cart)
        if(cart==null){
            sessionStorage.setItem("cart","{}")
            cartJson={}
        }else{
            cartJson=JSON.parse(cart)
        }
        if(cart!=null){
            setAddItem(additem+1)
            cartJson[props.item.item_id]=additem+1
            sessionStorage.setItem("cart",JSON.stringify(cartJson))
        }
        if(cartDets==null){
            sessionStorage.setItem("cartDets","[]")
            cartDetsJson=[]
        }else{
            cartDetsJson=JSON.parse(cartDets)
        }
        if(cartDets!=null){
            const data={"item_id":props.item.item_id,"item_name":props.item.item_name,"item_image":props.item.item_image,"item_bio":props.item.item_bio,"item_cost":props.item.item_cost}
            if(additem==0){
                cartDetsJson.push(data)
                sessionStorage.setItem("cartDets",JSON.stringify(cartDetsJson))
        }
    }   
        
    }
    function RemoveItem(){
        const cart=sessionStorage.getItem("cart")
        const cartDets=sessionStorage.getItem("cartDets")
        if(cart!=null && cartDets!=null){
            cartJson=JSON.parse(cart)
            cartDetsJson=JSON.parse(cartDets)
            setAddItem(additem-1)
            cartJson[props.item.item_id]=additem-1
            if(additem-1==0){
                delete cartJson[props.item.item_id]
                cartDetsJson=cartDetsJson.filter(food=>food.item_id!=props.item.item_id)
                sessionStorage.setItem("cartDets",JSON.stringify(cartDetsJson))
            }
            sessionStorage.setItem("cart",JSON.stringify(cartJson))

        }
    }
    return(
        <>
            {additem==0?<button className="absolute text-center z-10 text-green-300 2xl:top-[5vw] shadow-md 2xl:left-[9vw] 2xl:h-[2.5vw] 2xl:text-[1.5vw] 2xl:w-[2.5vw] border-1 2xl:rounded-[10vw] lg:top-[7vw] lg:left-[11vw] lg:h-[3.5vw] lg:text-[1.5vw] lg:w-[3.5vw] border-1 bg-white md:rounded-[10vw] md:top-[8vw] md:left-[14vw] md:h-[4vw] md:text-[2vw] md:w-[4vw] border-1  lg:rounded-[10vw] sm:top-[12vw] sm:rounded-[5vw] sm:left-[24vw] sm:h-[5.5vw] sm:text-[3.5vw] sm:w-[5.5vw] xl-phone:rounded-[5vw] xl-phone:top-[13vw] xl-phone:left-[28vw] xl-phone:h-[7vw] xl-phone:text-[4vw] xl-phone:w-[7vw] rounded-[5vw] top-[13vw] left-[28vw] h-[8vw] text-[4.5vw] w-[8vw] " onClick={AddItem}>+</button>:<div className="absolute flex items-center 2xl:top-[5vw] z-20 2xl:left-[6vw] bg-white  2xl:w-[5vw] 2xl:h-[2.5vw] 2xl:rounded-[2vw] lg:top-[7vw] lg:left-[7vw] lg:w-[7vw] lg:h-[3.5vw] shadow-md lg:rounded-[2vw] sm:top-[12vw] sm:left-[17vw] sm:w-[13vw] sm:h-[5vw] sm:rounded-[3vw] md:top-[8vw] md:left-[8vw] md:w-[10vw] md:h-[4vw] md:rounded-[2vw]  xl-phone:top-[13vw] xl-phone:left-[19vw] xl-phone:w-[16vw] xl-phone:h-[7vw] xl-phone:rounded-[5vw]  top-[13vw] left-[19vw] w-[17vw] h-[8vw] rounded-[5vw]"><button className="absolute 2xl:left-[0.8vw] 2xl:text-[1.5vw]  text-red-400 lg:left-[1vw] lg:text-[2vw] md:left-[1vw] md:text-[3.5vw] sm:left-[2vw] sm:text-[4vw] xl-phone:left-[2vw] xl-phone:text-[6vw] left-[2vw] text-[7vw]" onClick={RemoveItem}>-</button><p className="absolute 2xl:left-[2.2vw] 2xl:text-[0.9vw] lg:left-[3vw] lg:text-[1.5vw] md:left-[4vw]  md:text-[2vw] sm:left-[6vw] sm:text-[2.5vw] xl-phone:left-[7vw] xl-phone:text-[3.5vw] left-[7vw] text-[4vw]">{additem}</p><button className="absolute 2xl:right-[0.6vw] text-green-400 2xl:text-[1vw] lg:right-[1vw] lg:text-[1.5vw] md:right-[1.5vw] md:text-[2.5vw] sm:right-[2vw] sm:text-[3vw] xl-phone:right-[2vw] xl-phone:text-[4vw] right-[2.5vw] text-[5vw]" onClick={AddItem}>+</button></div>}
        </>
    )       
}