const mongoose = require("mongoose")
const { Number } = require("mongoose/lib/schema/index")
const ObjectId = require("mongoose/lib/types/objectid")

const orderSchema = new mongoose.Schema({
    userId: ObjectId,
    products: []
})




orderSchema.statics.getOrders = async function (userId) {
    const orders= await this.find({userId:userId})
    
    return orders
}


const Order = mongoose.model("order", orderSchema);

module.exports= Order