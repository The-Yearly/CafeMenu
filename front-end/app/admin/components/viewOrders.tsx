'use client';
import { useState,useEffect } from 'react';
interface Orders{
    orderId:number;
    tableId:number;
    totalCost:number;
    createdAt:string
}
interface OrderItem{
    orderId:number;
    itemId:number;
    quantity:number;   
}
export default function ViewOrders() {
  const [orders,setOrders]=useState<Orders[]|null>(null);
  const [orderItem,setOrderItem]=useState<OrderItem[]|null>(null)
  const [foodData,setFoodData]=useState<{[key:number]:string}|null>(null);
  const [deleId,setDeleId] =useState(0)
  const [trackDelete,setTrackDelete]=useState(0)
  useEffect(()=>{const deleteId=async()=>{
    if(deleId!=0){
      const res=await fetch("http://localhost:3001/api/v1/deleteItem/"+deleId)
      console.log(res)
      if(res.status==200){
        setTrackDelete(trackDelete+1)
      }
    }
  }
  deleteId()},[deleId])
  useEffect(()=>{
    const getOrders=async()=>{
        const res=await fetch("http://localhost:3001/api/v1/orders")
        const resjson=await res.json()
        setOrders(resjson.orders)
        setOrderItem(resjson.items)
        const i= setInterval(getOrders,30000)
        return()=>clearInterval(i)
       }
    getOrders()
  },[trackDelete])
  useEffect(()=>{const fetchFood=async()=>{
    const res=await fetch("http://localhost:3001/api/v1/allitems")
    const data=await res.json()
    setFoodData(data.items)
  }
  fetchFood()},[])
if(orders!=null && orderItem!=null && foodData!=null){
    console.log(orders)
    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Active Orders</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {orders.map((order) => (
            <div key={order.orderId} className="bg-white p-4 shadow-md rounded-lg border">
                <h2 className="text-lg font-semibold mb-2">Table {order.tableId} #{order.orderId}</h2>
                <ul className="list-disc pl-5">
                    {orderItem.map((item) => (
                        (item.orderId==order.orderId)?<li key={item.itemId} className="text-gray-700">{foodData[item.itemId]} x {item.quantity}</li>:null
                    ))}
                </ul>
                <button onClick={()=>{setDeleId(order.orderId)}} className="w-[4vw] h-[2vw] bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Done</button>
            </div>
            ))}
        </div>
        </div>
    );
    }
}