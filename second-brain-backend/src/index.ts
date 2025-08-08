
import express from "express";
import  Jwt  from "jsonwebtoken";

import bcrypt, { hash } from "bcrypt";

import { ContentModel, linkModel, userModel } from "./db";
import { useMiddleware } from "./middleware";
import { generate } from "./generateLink";

import cors from "cors";
const app=express();


 export const JWT_Secret="shrivarshancsv";
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup",async (req,res)=>{
    const username= req.body.username;
    const password= req.body.password;

    const hashpassword= await  bcrypt.hash(password,5);

    const result = await userModel.findOne({
        username:username,
   })


    if(!result){
        await userModel.create({
            username:username,
            password:hashpassword
        })

        res.status(200).json({"message":"Signup successful"});

    }
    else
    {
   res.status(409).json({"message":"user already exist"}).status(409);
    }


})
app.post("/api/v1/signin",async(req,res)=>{

    try{
   const username= req.body.username;
    const password= req.body.password;
 const findUser= await userModel.findOne({
    username:username,
 })
 if(!findUser)
    {
        return res.status(404).json({"message":"User not found"});
    }
 //@ts-ignore
    const decrypt = await bcrypt.compare(password, findUser.password);

 if(decrypt)
 {
    const token=Jwt.sign({
        id:findUser._id},
        JWT_Secret);
 return  res.status(200).json({token,"message":"SignedIn"});

}
else
{
return   res.status(409).json({
        "message":"Incorrect authorization"
    })
}
    }catch(e){
        res.status(404).json({"message":"servor error"})
    }
})


app.post("/api/v1/content",useMiddleware,async(req,res)=>{

    const type=req.body.type;
    const link=req.body.link;
    const title=req.body.title;
    const description=req.body.description;
    const tags=req.body.tags;


    const createContent= await ContentModel.create({
        type:type,
        link:link,
        title:title,
        description:description,
        tags:[],
        //@ts-ignore
        userId:req.userId
    })

    if(createContent)
    {
        res.status(200).json({"mesage":"contents added successfully"})
    }
    else
    {
        res.status(404).json({"message":"content not added"});
    }
})

app.get("/api/v1/content",useMiddleware,async(req,res)=>{

    //@ts-ignore
    const userId=req.userId;
    try{
        const content = await ContentModel.find(
            {
              userId
            }
        ).populate("userId" ,"username")


        res.status(200).json({content});


    }catch(e)
    {  res.status(404).json({"message":"user id not found"});
    }
})


app.delete("/api/v1/delete",(req,res)=>{


})

// POST route to create or delete a share link
app.post("/api/v1/brain/share", useMiddleware, async (req, res) => {
    const { share } = req.body;

    try {
        //@ts-ignore
        const existingLink = await linkModel.findOne({ userId: req.userId });

        if (share) {

            if (existingLink) {
                return res.json({ message: existingLink.hash });
            }

            const newLink = await linkModel.create({
            //@ts-ignore
                userId: req.userId,
                hash: generate(15),
            });

            return res.json({ message: newLink.hash });
        } else {
            // If `share` is false, delete existing share link
            if (existingLink) {

                //@ts-ignore
                await linkModel.deleteOne({ userId: req.userId });
                return res.json({ message: "Link deleted" });
            } else {
                return res.json({ message: "No link found to delete" });
            }
        }
    } catch (error) {
        console.error("Error in POST /brain/share:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.get("/api/v1/brain/:shareLink", async (req, res) => {
    try {
      const header = req.params.shareLink;

      const findLink = await linkModel.findOne({ hash: header });

      if (!findLink) {
        return res.status(404).json({ message: "Share link may be wrong" });
      }

      const findContent = await ContentModel.find({ userId: findLink.userId });

      if (!findContent || findContent.length === 0) {
        return res.status(404).json({ message: "Content not found" });
      }

      const findUser = await userModel.findOne({ _id: findLink.userId });

      if (!findUser) {
        return res.status(404).json({ message: "User details not found" });
      }

      return res.status(200).json({
        findUser,
        findContent,
      });
    } catch (error) {
      console.error("Error in GET /api/v1/brain/:shareLink:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });

app.listen(3000,()=>{
    console.log(`app running on port ${3000}`)
})
