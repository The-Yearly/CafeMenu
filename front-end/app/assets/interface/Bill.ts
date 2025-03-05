import { CartData } from "./CartData";
export interface Bill{
    cartItems:CartData[]
    tableId:number;
    totalCost:number
}