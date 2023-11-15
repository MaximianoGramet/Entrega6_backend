import express from "express"
import ProductManager from "./ProductManager.js"

const Host = express()

Host.use (express.json())
Host.use(express.urlencoded({extended:true}))

const TiendaEjemplos = new ProductManager("./Products.json")

Host.get("/products",(req,res)=>{
    const {limit} = req.query

    const products = TiendaEjemplos.ConsultarProductos()

    if(limit){
        const OptionsLimit = products.slice(0,limit)
        return res.json(OptionsLimit)
    }
    return res.json(products)
})

Host.get("/products/:id",(req,res)=>{
    const {id} =req.params
    try{
        const ResgetProductById = TiendaEjemplos.getProductById(() => Number(id));
        return res.json(ResgetProductById)
    }catch(error){
        return res.status(404).json({error:error.message})
    }
})

Host.listen(8080,()=>{
    console.log("Iniciando servidor...")
    //response.send("<h1> Bienvenido </h1>");
})