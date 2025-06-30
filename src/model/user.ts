import { Schema,models,model} from "mongoose";


const Userschema= new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const user=models.user||model("user",Userschema)

export default user;