import Fastify from "fastify";
import { connectDB } from "./database.js";
import { socket } from "./socket/note.socket.js";
import Socket from "fastify-socket.io"

const fastify = Fastify({
    logger: true
})

connectDB()
fastify.register(Socket)
const start = async() => {
    try {
        await fastify.listen({ port: 4000, host: '0.0.0.0' })
        console.log(`Server listening at port 4000`);
        socket(fastify)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()