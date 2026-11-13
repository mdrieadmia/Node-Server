import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import routeHandler from "./routes/route";
const server = createServer((req, res) => {
    routeHandler(req, res);
});
server.listen(5000, () => {
    console.log("Server is running successfully!");
});
//# sourceMappingURL=server.js.map