'use client'
import Image from "next/image"
import { useState,useEffect } from "react"
import cart from "@/app/assets/images/cart.png"
import Link from "next/link"
import AddButton from "./components/addButton"
import { Food } from "./assets/interface/food"

export default function Home(){
  const[route,setRoute]=useState(0)
  const [data,setData]=useState<Food[]|null>(null)
  const [filteredData,setFilter]=useState<Food[]|null>(null)
  useEffect(()=>{const getCart=()=>{
    const cart=sessionStorage.getItem("cart")
    const cartdets=sessionStorage.getItem("cartDets")
    if(cart==null){
      sessionStorage.setItem("cart","{}")
    }
    if(cartdets==null){
      sessionStorage.setItem("cartDets","[]")
    }
    }
    getCart()
    })
  const [search,setSearch]=useState("")
  /*'https://cafe-menu-system-backend.vercel.app/users/0*/  
  useEffect(()=>{const fetchdata=async()=>{
    let link="";
    if(route==0){
      link="http://localhost:8000/getData/1"
      setSearch("") 
      setFilter(null) 
    }
    else if(route==1){
      link="http://localhost:8000/getData/2"
    }
    else if(route==2){
      link="http://localhost:8000/getData/3"
    }
    else if(route==3){
      link="http://localhost:8000/getData/4"
    }
    else if(route==4){
      link="http://localhost:8000/getData/5"
    } 
    const res=await fetch(link)
    setData(await res.json()) 
  }
  fetchdata()},[route])
  useEffect(()=>{const Search=()=>{
    if(data!=null){
      const a=data.filter(food=>food.item_name.toLowerCase().includes(search.toLowerCase()))
      console.log(a)
      setFilter(a)
  }
  }
  Search()},[search])
  function gotInput(event:React.ChangeEvent<HTMLInputElement>){
    if(event.target.value!=""){
      setSearch(event.target.value)
    }else{
      setSearch("")
    }
  }
    if(data!=null){
      console.log(route)
      console.log(data,filteredData)

    return(
      <>
        <div>
          <Image src="https://www.apjtours.com/admin/assets/img/blog/Best-Cafes-In-Gurgaon-1200x675.jpg" alt="Cafe Image" width={1000} height={1000} className="absolute  2xl:top-[2vw] 2xl:left-[27vw] 2xl:h-auto 2xl:w-[44vw] 2xl:rounded-[3vw]  xl:top-[2vw] xl:left-[20vw] xl:h-auto xl:w-[60vw] xl:rounded-[3vw] lg:top-[3vw] lg:left-[21vw] lg:h-auto lg:w-[60vw] md:rounded-[3vw] md:top-[4vw]  md:h-auto md:left-[12vw] md:w-[75vw]  sm:rounded-[4vw] sm:top-[5vw] sm:left-[5vw] sm:h-auto sm:w-[90vw] xl-phone:rounded-[3vw] xl-phone:h-[80vw] xl-phone:top-[0vw] xl-phone:left-[0vw] xl-phone:w-[100vw] rounded-[3vw] h-[75vw] top-[0vw] left-[0vw] w-[100vw] lg:rounded-[3vw]"/>
          <p className="absolute 2xl:top-[19vw] 2xl:left-[30vw] 2xl:text-[3vw] font-courier text-white lg:top-[28vw] lg:left-[24vw] lg:text-[4vw] md:top-[35vw] md:left-[15vw] md:text-[5vw] sm:top-[40vw] sm:left-[10vw] sm:text-[7vw] xl-phone:top-[60vw] xl-phone:left-[1vw] xl-phone:text-[9vw] top-[60vw] left-[1vw] text-[10vw] ">Summer Time Cafe</p>
          <input className="absolute 2xl:h-[3vw] 2xl:rounded-[2vw] 2xl:top-[30vw] 2xl:left-[27vw] 2xl:w-[44vw] lg:h-[4vw] lg:rounded-[2vw] lg:top-[42vw] lg:left-[21vw] lg:w-[60vw] md:rounded-[2vw] md:h-[5vw] md:top-[54vw] md:left-[12vw] md:w-[75vw] sm:rounded-[3vw] sm:h-[6vw] sm:top-[64vw] sm:left-[5vw] sm:w-[90vw] xl-phone:rounded-[3vw] xl-phone:h-[8vw] xl-phone:top-[92vw] xl-phone:left-[0vw] xl-phone:w-[100vw] rounded-[3vw] h-[8vw] top-[86vw] left-[0vw] w-[100vw]  bg-white p-[1vw]" placeholder="Search" value={search} onChange={gotInput}/>
          <p className="absolute 2xl:top-[27vw] font-times lg:left-[48vw] 2xl:text-[2vw] lg:top-[38vw] 2xl:left-[47vw] lg:text-[2.5vw] md:top-[48vw] md:left-[45vw] md:text-[3.5vw] sm:top-[57vw] sm:left-[45vw] sm:text-[5vw] xl-phone:top-[80vw] xl-phone:left-[40vw] xl-phone:text-[8vw]  top-[75vw] left-[40vw] text-[8vw] text-gray-500">Menu</p>
          <div className="absolute 2xl:top-[34vw] 2xl:left-[27vw] 2xl:h-[3vw] 2xl:w-[44vw] flex border-[0.1vw] 2xl:rounded-[1vw] 2xl:flex 2xl:border-[0.1vw] lg:left-[21vw] lg:top-[47vw] lg:h-[5vw] lg:w-[60vw] lg:rounded-[2vw] md:left-[12vw] md:top-[61vw] md:h-[7vw] md:w-[75vw] md:rounded-[2vw] sm:left-[5vw] sm:top-[73vw] sm:h-[7vw] sm:w-[90vw] sm:rounded-[1vw] xl-phone:left-[0vw] xl-phone:top-[103vw] xl-phone:h-[10vw] xl-phone:w-[100vw] xl-phone:rounded-[1vw] left-[0vw] top-[98vw] h-[15vw] w-[100vw] rounded-[1vw] border-black">
            <div className="relative flex z-10 2xl:left-[5vw] lg:left-[1vw] sm:left-[1vw] xl-phone:left-[0vw] left-0 ">
            <button className="2xl:pl-[3vw] font-times 2xl:text-[1vw] xl:pl-[5vw] xl:text-[1.5vw] lg:text-[1.7vw] lg:pl-[5vw] md:text-[2vw] md:pl-[7vw] sm:text-[3vw] sm:pl-[6vw] xl-phone:text-[4vw] xl-phone:pl-[6vw] text-[4.3vw] pl-[3.5vw]" onClick={()=>setRoute(0)}><p className={route==0?"2xl:border-b-[0.2vw] 2xl:rounded-[0.2vw] 2xl:pb-[0.1vw] border-green-600 lg:border-b-[0.3vw] lg:rounded-[0.35vw] lg:pb-[0.3vw] md:border-b-[0.5vw] md:rounded-[0.5vw] md:pb-[0.3vw] sm:border-b-[0.5vw] sm:rounded-[0.5vw] sm:pb-[0.3vw] xl-phone:border-b-[0.7vw] xl-phone:rounded-[0.7vw] xl-phone:pb-[0.3vw] border-b-[1vw] rounded-[1vw] pb-[0.3vw]":"border-[0px]"}>Starters</p></button>
            <button className="2xl:pl-[3vw] font-times 2xl:text-[1vw] xl:pl-[5vw] xl:text-[1.5vw] lg:text-[1.7vw] lg:pl-[5vw] md:text-[2vw] md:pl-[7vw] sm:text-[3vw] sm:pl-[6vw] xl-phone:text-[4vw] xl-phone:pl-[6vw] text-[4.3vw] pl-[3.5vw]" onClick={()=>setRoute(1)}><p className={route==1?"2xl:border-b-[0.2vw] 2xl:rounded-[0.2vw] 2xl:pb-[0.1vw] border-green-600 lg:border-b-[0.3vw] lg:rounded-[0.35vw] lg:pb-[0.3vw] md:border-b-[0.5vw] md:rounded-[0.5vw] md:pb-[0.3vw] sm:border-b-[0.5vw] sm:rounded-[0.5vw] sm:pb-[0.3vw] xl-phone:border-b-[0.7vw] xl-phone:rounded-[0.7vw] xl-phone:pb-[0.3vw] border-b-[1vw] rounded-[1vw] pb-[0.3vw]":"border-[0px]"}>Salads</p></button>
            <button className="2xl:pl-[3vw] font-times 2xl:text-[1vw] xl:pl-[5vw] xl:text-[1.5vw] lg:text-[1.7vw] lg:pl-[5vw] md:text-[2vw] md:pl-[7vw] sm:text-[3vw] sm:pl-[6vw] xl-phone:text-[4vw] xl-phone:pl-[6vw] text-[4.3vw] pl-[3.5vw]" onClick={()=>setRoute(2)}><p className={route==2?"2xl:border-b-[0.2vw] 2xl:rounded-[0.2vw] 2xl:pb-[0.1vw] border-green-600 lg:border-b-[0.3vw] lg:rounded-[0.35vw] lg:pb-[0.3vw] md:border-b-[0.5vw] md:rounded-[0.5vw] md:pb-[0.3vw] sm:border-b-[0.5vw] sm:rounded-[0.5vw] sm:pb-[0.3vw] xl-phone:border-b-[0.7vw] xl-phone:rounded-[0.7vw] xl-phone:pb-[0.3vw] border-b-[1vw] rounded-[1vw] pb-[0.3vw]":"border-[0px]"}>Main Course</p></button>
            <button className="2xl:pl-[3vw] font-times 2xl:text-[1vw] xl:pl-[5vw] xl:text-[1.5vw] lg:text-[1.7vw] lg:pl-[5vw] md:text-[2vw] md:pl-[7vw] sm:text-[3vw] sm:pl-[6vw] xl-phone:text-[4vw] xl-phone:pl-[6vw] text-[4.3vw] pl-[3.5vw]" onClick={()=>setRoute(3)}><p className={route==3?"2xl:border-b-[0.2vw] 2xl:rounded-[0.2vw] 2xl:pb-[0.1vw] border-green-600 lg:border-b-[0.3vw] lg:rounded-[0.35vw] lg:pb-[0.3vw] md:border-b-[0.5vw] md:rounded-[0.5vw] md:pb-[0.3vw] sm:border-b-[0.5vw] sm:rounded-[0.5vw] sm:pb-[0.3vw] xl-phone:border-b-[0.7vw] xl-phone:rounded-[0.7vw] xl-phone:pb-[0.3vw] border-b-[1vw] rounded-[1vw] pb-[0.3vw]":"border-[0px]"}>Drinks</p></button>
            <button className="2xl:pl-[3vw] font-times 2xl:text-[1vw] xl:pl-[5vw] xl:text-[1.5vw] lg:text-[1.7vw] lg:pl-[5vw] md:text-[2vw] md:pl-[7vw] sm:text-[3vw] sm:pl-[6vw] xl-phone:text-[4vw] xl-phone:pl-[6vw] text-[4.3vw] pl-[3.5vw]" onClick={()=>setRoute(4)}><p className={route==4?"2xl:border-b-[0.2vw] 2xl:rounded-[0.2vw] 2xl:pb-[0.1vw] border-green-600 lg:border-b-[0.3vw] lg:rounded-[0.35vw] lg:pb-[0.3vw] md:border-b-[0.5vw] md:rounded-[0.5vw] md:pb-[0.3vw] sm:border-b-[0.5vw] sm:rounded-[0.5vw] sm:pb-[0.3vw] xl-phone:border-b-[0.7vw] xl-phone:rounded-[0.7vw] xl-phone:pb-[0.3vw] border-b-[1vw] rounded-[1vw] pb-[0.3vw]":"border-[0px]"}>Desserts</p></button> 
            </div >
          </div>
        </div>
        <div className="absolute z-0 2xl:top-[33vw] 2xl:left-[27vw] lg:top-[46vw] lg:left-[21vw] md:top-[63vw] md:left-[12vw] sm:top-[78vw] sm:left-[5vw] xl-phone:top-[125vw] xl-phone:left-[1vw] top-[125vw] left-[1vw]">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 2xl:gap-y-[3vw] 2xl:gap-5 2xl:w-[45vw] lg:gap-y-[5vw] lg:gap-5 lg:w-[60vw] md:gap-y-[5vw] md:gap-10  md:w-[70vw] sm:gap-y-[5vw] sm:gap-2  sm:w-[90vw] xl-phone:gap-y-[10vw] xl-phone:gap-2  xl-phone:w-[100vw] xl-phone:grid-cols-2 gap-y-[10vw] gap-2  w-[100vw] grid-cols-2 ">
                  {(filteredData??data).map((food)=>
                  <div className="relative shadow-lg bg-white flex items-center justify-center 2xl:top-[9vw] 2xl:rounded-[2vw] 2xl:w-[14vw] 2xl:min-h-[17vw] 2xl:p-4 h-auto lg:p-8 lg:top-[9vw] lg:rounded-[3vw] lg:w-[18vw] lg:min-h-[23vw] md:p-8 md:top-[9vw] md:rounded-[4vw] md:w-[24vw] md:min-h-[30vw] sm:p-8 sm:top-[9vw] sm:rounded-[4vw] sm:w-[40vw] sm:min-h-[35vw] xl-phone:p-8 xl-phone:top-[0vw] xl-phone:rounded-[7vw] xl-phone:w-[47vw] xl-phone:min-h-[50vw]  p-8 top-[0vw] rounded-[8vw] w-[47vw] min-h-[55vw] " key={food.item_id}>
                      <AddButton item={food}/>
                      <p className="absolute text-center text-black font-courier 2xl:text-[1.5vw] break-words  2xl:w-[10vw] 2xl:top-[8.5vw] lg:text-[2vw] lg:w-[15vw] lg:top-[11vw]  md:text-[2.5vw] md:w-[20vw] md:top-[13vw]  sm:text-[3vw] sm:w-[20vw] sm:top-[18vw]  xl-phone:text-[4vw] xl-phone:w-[30vw] xl-phone:top-[22vw] text-[4.5vw] w-[30vw] top-[24vw] ">{food.item_name}</p>
                      <p  className="absolute z-10 text-center text-gray-500 font-times 2xl:top-[11vw] 2xl:text-[0.9vw] 2xl:w-[10vw] line-clamp-2 lg:top-[14vw] lg:text-[1.4vw] lg:w-[15vw] md:top-[17vw] md:text-[2vw] md:w-[21vw] sm:top-[22vw] sm:text-[2.2vw] sm:w-[28vw] xl-phone:top-[30vw] xl-phone:text-[3.5vw] xl-phone:w-[40vw] top-[31vw] text-[3.5vw] w-[40vw]">{food.item_bio}</p>
                      <p className="absolute text-center 2xl:top-[13.7vw] 2xl:text-[1.5vw] font-times lg:text-[2vw] lg:top-[19vw] md:text-[2.5vw] md:top-[24vw] sm:text-[3vw] sm:top-[29vw] xl-phone:text-[4vw] xl-phone:top-[40vw] text-[4.5vw] top-[43vw]">1000</p>
                    </div>
                  )}
              </div>
          </div>  
        <div>
          <Link className="fixed flex shadow-lg justify-center items-center 2xl:w-[5vw] 2xl:h-[5vw] 2xl:bottom-[2vw] 2xl:right-[10vw] 2xl:rounded-[3vw] xl:w-[5vw] xl:h-[5vw] xl:bottom-[2vw] xl:right-[10vw] xl:rounded-[3vw] lg:w-[6vw] lg:h-[6vw] lg:bottom-[2vw] lg:right-[11vw] lg:rounded-[3vw] md:w-[7vw] md:h-[7vw] md:bottom-[5vw] md:right-[4vw] md:rounded-[5vw] sm:w-[15vw] sm:h-[15vw] sm:bottom-[5vw] sm:right-[10vw] sm:rounded-[10vw] xl-phone:w-[15vw] xl-phone:h-[15vw] xl-phone:bottom-[7vw] xl-phone:right-[10vw] xl-phone:rounded-[10vw] sm-phone:w-[15vw] sm-phone:h-[15vw] sm-phone:bottom-[12vw] sm-phone:right-[10vw] sm-phone:rounded-[10vw] right-[10vw] bottom-[15vw] rounded-[10vw] bg-white" href={"/billing"}><Image alt="Cart" className="2xl:w-[3vw] 2xl:h-[3vw] xl:w-[3vw] xl:h-[3vw] lg:w-[4vw] lg:h-[4vw] md:w-[4vw] md:h-[4vw] sm:w-[7vw] sm:h-[7vw] xl-phone:w-[7vw] xl-phone:h-[7vw] sm-phone:w-[7vw] sm-phone:h-[7vw] w-[7vw] h-[7vw] " src={cart} width={1000} height={1000}></Image></Link>
        </div>
      </>
    )
}
}
