import type { IncomingMessage, ServerResponse } from "http";

const productsController = (req: IncomingMessage, res:ServerResponse)=>{
    res.writeHead(200, {"content-type" : "application/json"});
            res.end(JSON.stringify({message: "This is products route"}));
}

export default productsController;