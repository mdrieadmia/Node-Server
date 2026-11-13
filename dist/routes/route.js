const routeHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/" && method === "GET") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "This is root route" }));
    }
    else if (url?.startsWith('/products')) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "This is products route" }));
    }
    else {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "This route is not found" }));
    }
};
export default routeHandler;
//# sourceMappingURL=route.js.map