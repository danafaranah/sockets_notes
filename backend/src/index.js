import express from "express";
import { connectDB } from "./database.js";
import { socket } from "./socket/note.socket.js";

connectDB();
const app = express();

app.set("port", 4000);

const server = app.listen(app.get("port"), () => {
    console.log("Servidor escuchando por el puerto", app.get("port"));
});

socket(server);