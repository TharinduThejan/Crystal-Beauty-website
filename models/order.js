import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }, status: {
        type: String,
        required: true,
        default: 'pending'
    },
    labeledTotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    products: [
        {
            productInfo: {
                productId: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                altNames: {
                    type: [String],
                    required: false
                },
                description: {
                    type: String,
                    required: true
                },
                images: [{
                    type: String
                }],
                labeledPrice: {
                    type: Number,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                }

            }, qty: {
                type: Number,
                required: true
            },
        }
    ], date: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model("Order", orderSchema);
export default Order;
