const { PrismaClient } = require("@prisma/client");
const express=require("express")
const data=require("./data.json")
const prisma=new PrismaClient()
const app=express()
app.use(express.json())
const cors = require("cors");
app.use(cors());
let d={"1":"Appetizers","2":"Wraps","3":"Chicken","4":"Main Course","5":"Burgers","6":"Specials","7":"Drinks","8":"Shakes & Smoothies","9":"Desserts","10":"Combos"}
async function setInit(){
    for(g in data){
        await prisma.items.create({
            data:{
                item_name:data[g]["name"],
                item_bio:"Sss",
                item_subcategory:data[g]["sub_category"],
                item_category:data[g]["category"],
                item_image:"https://imgs.search.brave.com/j4QbFnxclm6YSA0YfQDv6KUFUPmp1rpvIiEbpeuGivY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI1/NjQ3Njk5My9waG90/by9mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1NLS1H/TDMwYTl0a0VEUUpW/SDBVSTA3VmUtUWdG/TTJ4NUpVejRUd3Y5/OUxnPQ",
                item_isVegan:false,
                item_cost:data[g]["cost"]

            }
    })}}
async function getCat(){
    const res=await prisma.items.findMany({
        distinct:["item_category"],
        select:{
            item_category:true
        }
    })    
    return res
}
async function getItems(id){
    const res=await prisma.items.findMany({
        where:{
            item_category:d[id]
        }
    })
    return(res)
}
app.get("/getCat",async(req,res)=>{
    res.json(await getCat())
})
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
