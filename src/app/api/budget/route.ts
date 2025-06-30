import { connectDB } from '@/lib/db';
import budget from '@/model/budget';
import { NextResponse } from 'next/server';

interface BudgetType {
  food: string;
  travel: string;
  rent: string;
  shopping: string;
  other: string;
  userId: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json(); // ✅ await the body

    const {
      food,
      travel,
      rent,
      shopping,
      other,
      userId,
    }: BudgetType = body;

    await connectDB();

    const newBudget = new budget({
      food,
      travel,
      rent,
      shopping,
      other,
      userId,
    });

    await newBudget.save();

    return new Response(JSON.stringify({ message:"budget added", data: newBudget }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating budget:', error);
    return new Response(JSON.stringify({ message:"error creating", error: 'Server error' }), {
      status: 500,
    });
  }
}

export async function GET(req:Request){
    try {
         const {searchParams}=new URL(req.url);
const userId=searchParams.get("userId");
// const data=await budget.findOne({userId:userId});
const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

const data = await budget.findOne({
    userId:userId,
  createdAt: {
    $gte: startOfMonth,
    $lt: startOfNextMonth
  }
});

console.log(data,888)
return NextResponse.json({message:"got it",data},{status:200})
    } catch (error) {
        console.log(error,98980)
        return NextResponse.json({message:"server error"},{status:500})
    }
 
}

export  async function PUT(req:Request ){

 try {
    const {food,travel,rent,shopping,other}= await req.json();
    console.log(food,travel,rent,shopping,other,8909)
          const {searchParams}=new URL(req.url);
const userId=searchParams.get("userId");
    await connectDB()
    const data=await budget.updateOne({userId:userId},{
        $set:{food,travel,rent,shopping,other}
 })

 const budgetData=await budget.findOne({userId:userId})
 console.log(budgetData,"8000000");
 if(data){
   return  NextResponse.json({message:"budget updated"},{status:200})
 }else{
    console.log("bad request")
 }


    
 } catch (error) {
   return NextResponse.json({message:"budget not updated",error},{status:500})
    
    
 }



}