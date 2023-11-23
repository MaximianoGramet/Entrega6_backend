import { error } from "console";
import fs, { writeFile } from "fs";


class ProductManager{
    constructor(filename){
        this.filename=filename
        if(fs.existsSync(filename)){
            try{
                let Products = fs.readFileSync(filename,"utf-8")
                this.Products = JSON.parse(Products)
            }catch (error){
                this.Products=[]
            }
        }else{
            this.Products=[]
        }
        this.idcounter = this.findMaxProductId() + 1;
    }

    findMaxProductId() {
        let maxId = 0;
    
        for (const product of this.Products) {
          if (product.id > maxId) {
            maxId = product.id;
          }
        }
    
        return maxId;
    }

    async SaveFile(data){
        try{
            await fs.promises.writeFile(
                this.filename,
                JSON.stringify(data,null,"\t")
            )
            return true
        }catch (error){
            console.log(error);
            return false
        }
    }


    async addProduct(product){
        product.id = this.idcounter++;
        this.Products.push(product)
        const response= await this.SaveFile(this.Products)

        if(response){
            console.log("producto creado");
        }else{
            console.log("Error creacion");
        }
    }

    getProductById(id){
        const product = this.Products.find((prod) => prod.id === id());
        if (product){
            console.log("Producto encontrado");
        }else{
            console.log("error en busqueda");
            throw new Error("Producto no encontrado");
        }
        return product || null; 
    }

    ConsultarProductos(){
        console.log(this.Products);
        return this.Products;
    }
}




export class Product {
    constructor(code,name,desc,price,thumbnail,stock){
        this.id=null;
        this.code=code;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.thumbnail=thumbnail;
        this.stock=stock;  
    }
}

export {ProductManager,Product}
