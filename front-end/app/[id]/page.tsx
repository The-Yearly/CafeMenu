'use client'
import { Food } from "../assets/interface/food";
import { Swiper,SwiperSlide } from "swiper/react";
import { EffectCoverflow,Autoplay, Pagination } from "swiper/modules";
import AddButton from "../components/addButton";
import Image from "next/image";
import { useState,useEffect } from "react";
import 'swiper/css/bundle';
import dynamic from "next/dynamic";
export default function Home(){
  const [route,setRoute]=useState(1)
  const [data,setData]=useState<Food[]|null>(null)
  const [search,setSearch]=useState("")
  const [filteredData,setFilter]=useState<Food[]|null>(null)
  const [top5,setTop5]=useState<Food[]|null>(null)
  useEffect(()=>{const fetchdata=async()=>{
    const link="http://localhost:8000/getData/"+route
    const res=await fetch(link)
    setData(await res.json())
  }
  fetchdata()},[route])
  useEffect(()=>{const Search=()=>{
    if(data!=null){
      const a=data.filter(food=>food.item_name.toLowerCase().includes(search.toLowerCase()))
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
    const top5=data.slice(0,5)
    console.log(data)
    return(
      <>
        <div>
          <p className="absolute xl-phone:top-[15vw] xl-phone:left-[5vw] xl-phone:text-[8vw] font-playwrite">Malibu Cafe</p>
          <input className="absolute xl-phone:h-[15vw] xl-phone:top-[35vw] xl-phone:left-[2vw] xl-phone:w-[96vw] xl-phone:pl-[5vw] xl-phone:rounded-[3vw] bg-white p-[1vw]" value={search} onChange={gotInput} placeholder="Search"/>
          <p className="absolute xl-phone:text-[5vw] xl-phone:left-[5vw] xl-phone:top-[55vw] font-playwrite ">Categories</p>
          <Swiper loop={true} className="absolute xl-phone:top-[66vw] xl-phone:w-[96vw] xl-phone:left-[0vw]" spaceBetween={70} slidesPerView={4}>
            <SwiperSlide><p onClick={()=>{setRoute(1)}} className={(route!=1)?"flex text-black justify-center font-playwrite items-center bg-white xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]":"flex justify-center font-playwrite text-white items-center bg-black xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]"}>Appetizers</p></SwiperSlide>
            <SwiperSlide><p onClick={()=>{setRoute(2)}} className={(route!=2)?"flex text-black justify-center font-playwrite items-center  bg-white xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]":"flex justify-center font-playwrite text-white items-center bg-black xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]"}>Wraps</p></SwiperSlide>
            <SwiperSlide><p onClick={()=>{setRoute(3)}} className={(route!=3)?"flex text-black justify-center font-playwrite items-center bg-white xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]":"flex justify-center font-playwrite text-white items-center bg-black xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]"}>Chicken</p></SwiperSlide>
            <SwiperSlide><p onClick={()=>{setRoute(4)}} className={(route!=4)?"flex text-black justify-center font-playwrite items-center bg-white xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]":"flex justify-center font-playwrite text-white items-center bg-black xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]"}>Main Course</p></SwiperSlide>
            <SwiperSlide><p onClick={()=>{setRoute(5)}} className={(route!=5)?"flex text-black justify-center font-playwrite items-center bg-white xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]":"flex justify-center font-playwrite text-white items-center bg-black xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]"}>Burgers</p></SwiperSlide>
            <SwiperSlide><p onClick={()=>{setRoute(6)}} className={(route!=6)?"flex text-black justify-center font-playwrite items-center bg-white xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]":"flex justify-center font-playwrite text-white items-center bg-black xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]"}>Specials</p></SwiperSlide>
            <SwiperSlide><p onClick={()=>{setRoute(7)}} className={(route!=7)?"flex text-black justify-center font-playwrite items-center bg-white xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]":"flex justify-center font-playwrite text-white items-center bg-black xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]"}>Drinks</p></SwiperSlide>
            <SwiperSlide><p onClick={()=>{setRoute(8)}} className={(route!=8)?"flex text-black justify-center font-playwrite items-center bg-white xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]":"flex justify-center font-playwrite text-white items-center bg-black xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]"}>Smoothies</p></SwiperSlide>
            <SwiperSlide><p onClick={()=>{setRoute(9)}} className={(route!=9)?"flex text-black justify-center font-playwrite items-center bg-white xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]":"flex justify-center font-playwrite text-white items-center bg-black xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]"}>Desserts</p></SwiperSlide>
            <SwiperSlide><p onClick={()=>{setRoute(10)}} className={(route!=10)?"flex text-black justify-center font-playwrite items-center bg-white xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]":"flex justify-center font-playwrite text-white items-center bg-black xl-phone:w-[25vw] xl-phone:h-[8vw] xl-phone:rounded-[4vw]"}>Combos</p></SwiperSlide>
          </Swiper>
        </div>
        <div className="absolute xl-phone:top-[80vw]">
          <Swiper
          effect={'coverflow'}
          grabCursor={true} 
          centeredSlides={true} 
          loop={true} 
          spaceBetween={10}  
          slidesPerView={1.8}
          coverflowEffect={{
            rotate: 20,
            stretch: 20,
            depth: 200,
            slideShadows:false,
            modifier: 2,
          }} 
          autoplay={{
            delay:2500,
            disableOnInteraction:false
          }}
          modules={[EffectCoverflow,Autoplay,Pagination]}           
          className="xl-phone:top-[0vw] xl-phone:h-[50vw] xl-phone:w-[96vw] xl-phone:left-[4vw]">
            {top5.map((food)=>
              <SwiperSlide className="bg-transparent rounded-[3vw]" key={food.item_id}>
                <Image className="absolute 2xl:top-[-2vw] z-0 xl:top-[-2vw] md:top-[-2vw] 2xl:w-[10vw] lg:w-[10vw] lg:h-[10vw] md:w-[14vw] md:h-[14vw] sm:w-[23vw] sm:h-[23vw] sm:rounded-[15vw] sm:top-[-5vw] xl-phone:w-[45vw] xl-phone:h-[45vw] xl-phone:rounded-[30vw] xl-phone:top-[0vw] w-[30vw] h-[30vw] rounded-[15vw] top-[-8vw]" alt={"Food Item"+food.item_id} width={1000} height={1000} src={food.item_image}/>
                <AddButton item={food} location={"top5"}/>
              </SwiperSlide>
            )}
          </Swiper>
          <div className="relative grid xl-phone:grid-cols-2 xl-phone:gap-4 xl-phone:top-[0vw]">
              {(filteredData??data).map((food)=>
                <div className="relative shadow-lg bg-white flex items-center justify-center 2xl:top-[9vw] 2xl:rounded-[2vw] 2xl:w-[14vw] 2xl:min-h-[17vw] 2xl:p-4 h-auto lg:p-8 lg:top-[9vw] lg:rounded-[3vw] lg:w-[18vw] lg:min-h-[23vw] md:p-8 md:top-[9vw] md:rounded-[4vw] md:w-[24vw] md:min-h-[30vw] sm:p-8 sm:top-[9vw] sm:rounded-[4vw] sm:w-[40vw] sm:min-h-[35vw] xl-phone:min-h-[65vw] xl-phone:h-auto xl-phone:p-8 xl-phone:top-[5vw] p-8 top-[0vw] rounded-[10vw] w-[47vw] min-h-[55vw] " key={food.item_id}>
                  <Image className="absolute 2xl:top-[-2vw] z-0 xl:top-[-2vw] md:top-[-2vw] 2xl:w-[10vw] lg:w-[10vw] lg:h-[10vw] md:w-[14vw] md:h-[14vw] sm:w-[23vw] sm:h-[23vw] sm:rounded-[15vw] sm:top-[-5vw] xl-phone:w-[45vw] xl-phone:h-[45vw] xl-phone:rounded-[10vw] xl-phone:top-[0vw] w-[30vw] h-[30vw] rounded-[15vw] top-[-8vw]" alt={"Food Item"+food.item_id} width={1000} height={1000} src={food.item_image}/>
                    <p className="absolute text-center text-black font-playwrite 2xl:text-[1.5vw] break-words  2xl:w-[10vw] 2xl:top-[8.5vw] lg:text-[2vw] lg:w-[15vw] lg:top-[11vw]  md:text-[2.5vw] md:w-[20vw] md:top-[13vw]  sm:text-[3vw] sm:w-[20vw] sm:top-[18vw]  xl-phone:text-[4vw] xl-phone:w-[35vw] xl-phone:top-[48vw] text-[4.5vw] w-[30vw] top-[24vw] ">{food.item_name}</p>
                    <p className="absolute text-center 2xl:top-[13.7vw] 2xl:text-[1.5vw] font-playwrite lg:text-[2vw] lg:top-[19vw] md:text-[2.5vw] md:top-[24vw] sm:text-[3vw] sm:top-[29vw] xl-phone:text-[4vw] xl-phone:top-[60vw] text-[4.5vw] top-[43vw]">{food.item_cost}</p>
                    <AddButton item={food} location="item"/>
                  </div>
                )}
          </div>
        </div>
      </>
    )
  }
}