import mongoose from "mongoose";
const { Schema, model } = mongoose

const noteSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is Required"]
    },
    description: {
        type: String,
        required: [true, "Description is Required"]
    },
}, { timestamps: true })

export const noteModel = model("note", noteSchema)