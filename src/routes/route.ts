import type { IncomingMessage, ServerResponse } from "http";
import productsController from "../controllers/product.controller";

const routeHandler = (req:IncomingMessage, res:ServerResponse)=>{

    const url = req.url;
    const method = req.method;

    if(url === "/" && method === "GET"){
            res.writeHead(200, {"content-type" : "application/json"});
            res.end(JSON.stringify({message: "This is root route!"}));
        }else if(url?.startsWith('/products')){
            productsController(req, res)
        }else{
            res.writeHead(200, {"content-type" : "application/json"});
            res.end(JSON.stringify({message: "This route is not found"})); 
        }
}

export default routeHandler;