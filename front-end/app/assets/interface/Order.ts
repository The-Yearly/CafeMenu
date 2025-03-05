import { CartData } from "./CartData"
export interface Order{
    Cart:CartData
    totalCost:number
    tableId:number
}