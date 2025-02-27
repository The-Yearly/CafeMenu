'use client'
import { useEffect, useState } from "react"
import { CartData } from "../assets/interface/CartData";
import { useButton } from "../itemContext";
export default function AddButton(props:{item:CartData,location:string}){
    let cartJson
    let cartDetsJson:CartData[];
    const {items,setItems}=useButton()
    const [additem,setAddItem]=useState(0)
    const loc=props.location
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
    fetchdata()},[items])
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
            setItems(items+1)
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
            setItems(items-1)
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
        <div className={(loc=="top5")?"absolute top-0 left-0":(loc=="item")?"absolute xl-phone:top-[2vw] xl-phone:left-[3vw] top-[3vw] left-[0vw]":"absolute xl-phone:top-[-10vw] bg-black xl-phone:left-[-15vw] left-[-15vw] top-[-15vw] z-50"}>
            {additem==0?<button className="absolute text-center z-0 text-green-300 2xl:top-[5vw] shadow-md 2xl:left-[9vw] 2xl:h-[2.5vw] 2xl:text-[1.5vw] 2xl:w-[2.5vw] border-1 2xl:rounded-[10vw] lg:top-[7vw] lg:left-[11vw] lg:h-[3.5vw] lg:text-[1.5vw] lg:w-[3.5vw] border-1 bg-white md:rounded-[10vw] md:top-[8vw] md:left-[14vw] md:h-[4vw] md:text-[2vw] md:w-[4vw] border-1  lg:rounded-[10vw] sm:top-[12vw] sm:rounded-[5vw] sm:left-[24vw] sm:h-[5.5vw] sm:text-[3.5vw] sm:w-[5.5vw] xl-phone:rounded-[5vw] xl-phone:top-[33vw] xl-phone:left-[33vw] xl-phone:h-[10vw] xl-phone:text-[5vw] xl-phone:w-[10vw] rounded-[5vw] top-[33vw] left-[35vw] h-[9vw] text-[6vw] w-[9vw] " onClick={AddItem}>+</button>:<div className="absolute flex items-center 2xl:top-[5vw] z-0 2xl:left-[6vw] bg-white  2xl:w-[5vw] 2xl:h-[2.5vw] 2xl:rounded-[2vw] lg:top-[7vw] lg:left-[7vw] lg:w-[7vw] lg:h-[3.5vw] shadow-md lg:rounded-[2vw] sm:top-[12vw] sm:left-[17vw] sm:w-[13vw] sm:h-[5vw] sm:rounded-[3vw] md:top-[8vw] md:left-[8vw] md:w-[10vw] md:h-[4vw] md:rounded-[2vw] xl-phone:top-[33vw] xl-phone:left-[22vw] xl-phone:w-[20vw] xl-phone:h-[10vw] xl-phone:rounded-[5vw] top-[33vw] left-[23vw] w-[20vw] h-[9vw] rounded-[10vw]"><button className="absolute 2xl:left-[0.8vw] 2xl:text-[1.5vw]  text-red-400 lg:left-[1vw] lg:text-[2vw] md:left-[1vw] md:text-[3.5vw] sm:left-[2vw] sm:text-[4vw] xl-phone:left-[4vw] xl-phone:text-[7vw] left-[1vw] text-[9vw]" onClick={RemoveItem}>-</button><p className="absolute 2xl:left-[2.2vw] 2xl:text-[0.9vw] lg:left-[3vw] lg:text-[1.5vw] md:left-[4vw]  md:text-[2vw] sm:left-[6vw] sm:text-[2.5vw] xl-phone:left-[9vw] xl-phone:top-[2vw]  xl-phone:text-[4vw] left-[8vw] text-[5vw]">{additem}</p><button className="absolute 2xl:right-[0.6vw] text-green-400 2xl:text-[1vw] lg:right-[1vw] lg:text-[1.5vw] md:right-[1.5vw] md:text-[2.5vw] sm:right-[2vw] sm:text-[3vw] xl-phone:top-[1.5vw] xl-phone:right-[3vw] xl-phone:text-[5vw] right-[2.5vw] text-[6vw]" onClick={AddItem}>+</button></div>}
        </div>
    )       
}