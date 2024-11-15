import {Schema,model} from 'moongose'


const subscriptionSchema=new Schema({
   subscriber:{
    type:Schema.Types.ObjectId,
    ref:'User'
   },
   channel:{
    type:Schema.Types.ObjectId,
    ref:'User'
   }
},{timestamps:true})

const Subscription=model('subscription',subscriptionSchema)

export default Subscription