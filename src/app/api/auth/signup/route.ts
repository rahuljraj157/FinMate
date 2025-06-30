import user from "@/model/user";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req:Request){
    try {
        await connectDB();
        const {name,email,password}=await req.json();
        const userData=await user.findOne({email})
        if(userData){
            return NextResponse.json({message:"user already exist"},{status:400})
        }
        const hashedpassword=await bcrypt.hash(password,10);
        const newuser=new user({name,email,password:hashedpassword})
        await newuser.save();
        return NextResponse.json({message:"user registered successfully"},{status:200})
    } catch (error) {
        return NextResponse.json({message:"server error"},{status:500})
        
    }
}
