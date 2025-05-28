import { WebSocketServer } from "ws";

const PORT = 8080;
const ws = new WebSocketServer({ port: PORT });

ws.on("connection", (ws) => {

    ws.on("message", (data) => {
        const payload = JSON.parse(data.toString());
        console.log("data received", payload)
    })
    ws.on('error', (error) => {
        console.log("Error:", error)
    })

});

console.log(`WebSocket Server listning on port ${PORT}`);