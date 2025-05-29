import { WebSocketServer, WebSocket } from "ws";

const PORT = 8080;
const ws = new WebSocketServer({ port: PORT });

const users: {
    [key: string]: {
        ws: WebSocket,
        rooms: string[]
    }
} = {

}

// setInterval(() => {
//     console.log(`*************************************************************************************`)
//     console.log(users);
// }, 4000)

ws.on("connection", (wss) => {

    const id = getRandomId();

    users[id] = {
        ws: wss,
        rooms: [],
    }

    wss.on("message", (data) => {
        const payload = JSON.parse(data.toString());
        console.log("data received", payload)
        wss.send(`received you message that was : ${payload}`);
        if (payload.type === "SUBSCRIBE") {
            users[id].rooms.push(payload.room)
        }

        if (payload.type === "sendMessage") {
            const message = payload.message;
            const roomId = payload.roomId;

            Object.values(users).forEach(({ ws, rooms }) => {
                if (rooms.includes(roomId)) {
                    ws.send(`message from room: ${roomId} ${message}.`)
                }
            })
        }
    })
    ws.on('error', (error) => {
        console.log("Error:", error)
    })

});

const getRandomId = () => {
    return Math.floor(Math.random() * 10) + Math.floor(Math.random() * 100);
}

console.log(`WebSocket Server listning on port ${PORT}`);