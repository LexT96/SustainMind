import mongoose, { Schema, Types, model } from "mongoose";

const toDoSchema = new Schema({
    name: String,
    description: String,
    });

export const ToDo = model("ToDo", toDoSchema);