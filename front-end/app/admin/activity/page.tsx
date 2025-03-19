"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import axios from "axios"
import { getImg,messagestatusColors,ActivityType } from "../components/Dashboard"
const activity_messages = {
  "PLACED_ORDER": "Order has been placed with Order ID: {change_id}.",
  "COMPLETED_ORDER": "Order with Order ID: {change_id} has been completed.",
  "ADDED_ITEM": "Item with Id {change_id} has been added successfully.",
  "UPDATED_ITEM": "Item with Id {change_id} has been updated.",
  "ADDED_CATEGORY": "Category with Id {change_id} has been added successfully.",
  "UPDATED_CATEGORY": "Category with ID {change_id} has been updated."
}
export default function Activities() {
  const [activities,setActivites]=useState<ActivityType[]|null>(null)
  useEffect(()=>{const getActivity=async()=>{
    const res=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getActivity`)
    setActivites(res.data.recentActivity)
  }
  getActivity()},[])
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="flex justify-center items-center w-full p-4">
      <motion.div
        className="w-full mt-40 max-w-2xl bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Recent Activity
          </h2>
        
        </div>

        <div className="space-y-4">
          {activities?.map((activity) => {
            const Icon = getImg[activity.activity]

            return (
              <motion.div
                key={activity.activitId}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${messagestatusColors[activity.activity]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">{(activity_messages[activity.activity]).replace("{change_id}",String(activity.changedId))}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{String(activity.createdAt)}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 text-center"
          variants={itemVariants}
        >
        
        </motion.div>
      </motion.div>
    </div>
  )
}

