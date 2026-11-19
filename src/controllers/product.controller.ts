import type { IncomingMessage, ServerResponse } from "http";
import type {IProduct} from "../types/product.type";
import { bodyParser } from "../utils/bodyParser";
import { createProduct, productService } from "../service/product.service";


const productsController = async (req: IncomingMessage, res:ServerResponse)=>{
    const url = req.url;
    const method = req.method;
    const urlParams = url?.split('/');
    const id = urlParams && urlParams[1] === 'products'? Number(urlParams[2]) : null;

    const products = productService(req, res)

    if(url === '/products' && method === "GET"){
        res.writeHead(200, {"content-type" : "application/json"}); 
        res.end(JSON.stringify({
            message: "Products Loaded Successfully!",
            product: products
        }));
    } else if(method === "GET" &&  id !== null){
        const result = products.find((p:IProduct)=>{return p.productID === id})
        
        res.writeHead(200, {"content-type" : "application/json"}); 
        res.end(JSON.stringify({
            message: "Products Loaded Successfully!",
            data: result,
        }));
    } else if(method === "POST" && url === "/products"){
        const body = await bodyParser(req);
        const newProduct = {
            productID: Date.now(),
            ...body
        }
        products.push(newProduct);
        createProduct(products)
        res.writeHead(201, {"content-type" : "application/json"}); 
        res.end(JSON.stringify({
            message: "Products Created Successfully!",
            data: newProduct
        }));
    } else if(method === "PUT" && id !== null){
        const body = await bodyParser(req);
        const products = productService(req, res);
        const index = products.findIndex((p:IProduct)=>p.productID === id);
        
        if(index < 0){
            res.writeHead(404, {"content-type" : "application/json"}); 
            res.end(JSON.stringify({
            message: "Product Not Found!",
            }));
        }else{
            products[index] = {productID:products[index].productID, ...body}
            createProduct(products)
            res.writeHead(200, {"content-type" : "application/json"}); 
            res.end(JSON.stringify({
                message: "Product Updated Successfully.",
            }));
        }
    } else if(method === "DELETE" && id !==null){

        const products = productService(req, res);
        const index = products.findIndex((p:IProduct)=>p.productID === id);

        if(index < 0){
            res.writeHead(404, {"content-type" : "application/json"}); 
            res.end(JSON.stringify({
            message: "Product Not Found!",
            }));
        }else{
            products.splice(index, 1);
            createProduct(products);
            res.writeHead(200, {"content-type" : "application/json"}); 
            res.end(JSON.stringify({
                message: "Product Deleted Successfully.",
            }));
        }
    }

    } 
export default productsController;