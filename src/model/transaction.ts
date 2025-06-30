import mongoose, { Schema,models,model} from "mongoose";
import { unique } from "next/dist/build/utils";

const Transactionschema= new Schema({
   title:{type:String,required:true},
    amount:{type:Number,required:true},
    type:{type:String,enum:["income","expense"],required:true},
    category:{type:String,enum:["Food", "Travel", "Rent", "Shopping", "Salary","other"],required:true},
    notes:{type:String},
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     
},{timestamps:true})


const transaction=models.transaction||model("transaction",Transactionschema)

export default transaction;