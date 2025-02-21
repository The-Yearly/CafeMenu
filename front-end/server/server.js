const { PrismaClient } = require("@prisma/client");
const express=require("express")
const data=require("/home/theyearly/CafeMenuSystem/server/data.json")
const prisma=new PrismaClient()
const app=express()
app.use(express.json())
const cors = require("cors");
app.use(cors());
let d={1:"startes",2:"Malibu Specials"}
async function setInit(){
    for(g in data){
        await prisma.items.create({
            data:{
                item_name:data[g]["name"],
                item_bio:"Sss",
                item_category:data[g]["category"],
                item_image:"https://media.licdn.com/dms/image/v2/D5635AQFx5Rfm_c0uKw/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1735573684581?e=1740675600&v=beta&t=kq-KZ59_0QQRDz35yq-pVCpsULwV2zzTofI-zRFYwHY",
                item_isVegan:false,
                item_cost:data[g]["cost"]

            }
    })}}
async function getItems(id){
    const res=await prisma.items.findMany({
        where:{
            item_category:d[id]
        }
    })
    return(res)
}

app.get("/setData",async(req,res)=>{
    res.json(await setInit())
    
})
app.get("/getData/:id",async(req,res)=>{
    res.json(await getItems(req.params.id))
    
})
app.get("/test",async(req,res)=>{
    res.json({message:"Hello There"})

})
const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log("Server Starting ;)")
})
