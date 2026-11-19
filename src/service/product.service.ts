import fs from "fs";
import type { IncomingMessage, ServerResponse } from "http";
import path from "path";
import { fileURLToPath } from "url";
import type { IProduct } from "../types/product.type";


const filePath = path.join(process.cwd(), "./src/database/db.json");

export const productService = (req: IncomingMessage, res:ServerResponse) =>{

    const result = fs.readFileSync(filePath, "utf-8")

    return JSON.parse(result)
}


export const createProduct = (payload: IProduct)=>{
    fs.writeFileSync(filePath, JSON.stringify(payload))
}