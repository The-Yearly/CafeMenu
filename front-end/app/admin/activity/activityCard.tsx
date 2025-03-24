import { motion } from "framer-motion"
import { getImg,messagestatusColors,ActivityType } from "../components/Dashboard" 
import { ChevronRight, ChevronLeft } from "lucide-react"
import { OrderCard } from "../orders/OrderCard"
import CategoryCard from "./categoryCard"
import { Item } from "@/lib/types"
import { CategorySkeletonLoader } from "../category/skeleton"
import ProductCard from "./productCard"
import { useEffect, useState } from "react"
import axios from "axios"
enum Status {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
  }
interface details{
      tableId: number;
      orderId: number;
      totalCost: number;
      createdAt: string;
      status: Status;
      items: [
        {
          item: Item;
          quantity: number;
        }
      ]
      itemId: number;
      name: string;
      bio: string;
      image: string;
      category: string;
      subcategory: string;
      tags: string[];
      isvegan: boolean;
      cost: number;
      availability: boolean;
      ingredients: string[];
      id: number;
      cname: string;
      description: string;
      images: string;
      totalItems:number;
}
const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
    },
}
const activity_messages = {
    "PLACED_ORDER": "Order has been placed with Order ID: {change_id}.",
    "COMPLETED_ORDER": "Order with Order ID: {change_id} has been completed.",
    "ADDED_ITEM": "Item with Id {change_id} has been added successfully.",
    "UPDATED_ITEM": "Item with Id {change_id} has been updated.",
    "ADDED_CATEGORY": "Category with Id {change_id} has been added successfully.",
    "UPDATED_CATEGORY": "Category with ID {change_id} has been updated."
}
export default function ActivityCard(props:{activity:ActivityType}){
    const activity=props.activity
    const Icon = getImg[activity.activity]
    const [act,setAct]=useState("")
    const [load,setLoad]=useState(false)
    const [details,setDetails]=useState<details|null>(null)
    function renderCard(){
        console.log(details)
        if (details==null) {
            return <CategorySkeletonLoader />;
          }
        if(details!=null){
        switch (act){
            case "COMPLETED_ORDER":
            case "PLACED_ORDER":
                return <OrderCard key={activity.changedId} order={details} totalCost={details.totalCost}/>
            case "ADDED_ITEM":
            case "UPDATED_ITEM":
                return <ProductCard item={details}/>
            case "ADDED_CATEGORY":
            case "UPDATED_CATEGORY":
                return <CategoryCard category={details}/>

                
        }
    }
    }
    useEffect(()=>{const getData=async()=>{
        if(load==true){
            if(act=="COMPLETED_ORDER" || act=="PLACED_ORDER"){
                const res=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getOrders/`,{id:activity.changedId})
                setDetails(res.data.response)
            }
            else if(act=="ADDED_ITEM" || act=="UPDATED_ITEM"){
                console.log(act)
                const res=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getProduct/`,{id:activity.changedId})
                setDetails(res.data.product)
            }
            else if(act=="ADDED_CATEGORY" || act=="UPDATED_CATEGORY"){
                console.log(act)
                const res=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getCat/`,{id:activity.changedId})
                setDetails(res.data.category)
            }
        }
    }
    getData()},[load])
    return(
        <>
        <motion.div
                key={activity.activitId}
                className="flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${messagestatusColors[activity.activity]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">{(activity_messages[activity.activity]).replace("{change_id}",String(activity.changedId))}</p>
                    <div className="flex items-center"><p className="text-sm text-gray-500 dark:text-gray-400">{String(activity.createdAt)}</p>
                    <motion.button className="ml-5" whileHover={load==false?{ x: -5 }:{x:5}} onClick={()=>{setLoad(!load);
                        setAct(activity.activity)}}>
                        {(load==false)?<ChevronRight/>:<ChevronLeft/>}
                    </motion.button>
                    </div>
                </div>
                <div className={load?"block w-1/2":"hidden"} >
                        {renderCard()}
                    </div>
              </motion.div>
            </>
            )
}  