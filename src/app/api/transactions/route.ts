// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import transaction from "@/model/transaction";
// import user from "@/model/user";

// export async function POST(req:Request){
    
//     const {title,amount,type,category,notes,userId}=await req.json();
//     try {
//         await connectDB();
//         const User=await user.findById(userId);
//         if(!User){
//             return NextResponse.json({message:"user not found"},{status:400});
//         }

//         const data=new transaction({title,amount,type,category,notes,userId});
//         await data.save();
//         return NextResponse.json({message:"transaction added successfully"},{status:201});
        
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({message:"server error"},{status:500})
        
//     }
// }

// export async function GET(req:Request){
//     try {
//         await connectDB();
//         const {searchParams}=new URL(req.url);
//         const userId=searchParams.get("userId")
//          console.log(userId,999);
//         const transactiondata= await transaction.find({userId:userId})
//         console.log(transactiondata)
//         console.log(userId,999);
//         return NextResponse.json({transactiondata},{status:200})
//     } catch (error) {
//         console.log("error error")
//         return NextResponse.json({message:"server error"},{status:500});
        
//     }
// }

// export async function DELETE(req:Request){
//     try {
//         await connectDB();
//         const {searchParams}=new URL(req.url);
//         const transactionId=searchParams.get("transactionId")
//         const transactiondata= await transaction.findOneAndDelete({_id:transactionId});
//         return NextResponse.json({message:"deleted successfully"},{status:200})
//     } catch (error) {
//          return NextResponse.json({message:"error deleting"},{status:500})
//     }
// }
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import transaction from "@/model/transaction";
import user from "@/model/user";
import budget from "@/model/budget";
import { sendEmergencyMail } from "@/utils/mailer";

export async function POST(req: Request) {
  const { title, amount, type, category, notes, userId } = await req.json();
  try {
    await connectDB();

    const User = await user.findById(userId);
    if (!User) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }

    // ✅ Save new transaction
    const data = new transaction({ title, amount, type, category, notes, userId });
    await data.save();

    // ✅ Check budget and total expense
    const budgetData = await budget.findOne({ userId });
    if (budgetData) {
      const totalBudget = Object.values(budgetData.toObject())
        .filter((val) => typeof val === "number")
        .reduce((sum, val) => sum + val, 0);

      const allExpenses = await transaction.find({ userId, type: "expense" });
      const totalExpense = allExpenses.reduce((sum, tx) => sum + tx.amount, 0);

      const percentUsed = (totalExpense / totalBudget) * 100;

      // ✅ Send email if over 90%
      if (percentUsed >= 90) {
        await sendEmergencyMail(User.email);
        console.log("Emergency email sent ✅");
      }
    }

    return NextResponse.json({ message: "transaction added successfully" }, { status: 201 });
  } catch (error) {
    console.log("POST error:", error);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const transactiondata = await transaction.find({ userId });
    return NextResponse.json({ transactiondata }, { status: 200 });
  } catch (error) {
    console.log("GET error:", error);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get("transactionId");

    await transaction.findOneAndDelete({ _id: transactionId });
    return NextResponse.json({ message: "deleted successfully" }, { status: 200 });
  } catch (error) {
    console.log("DELETE error:", error);
    return NextResponse.json({ message: "error deleting" }, { status: 500 });
  }
}
