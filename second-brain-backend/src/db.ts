import mongoose, { Schema,model } from "mongoose";

import dotenv from "dotenv";
dotenv.config();
const userSchema = new Schema({

    username:{type:String,unique:true},
    password:String
})


const ContentSchema = new Schema({


    type: { type: String, required: true },
    link: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },

	tags: [{type:mongoose.Types.ObjectId,ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true}
})


const linkSchema = new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId,require:true,unique:true}
})

export const linkModel = model("Link",linkSchema);

export const ContentModel = model("Content",ContentSchema);

mongoose.connect(process.env.DB_URL as string);

 export const userModel = model("User",userSchema);
