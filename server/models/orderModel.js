const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId:{
      type:Number
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
    type:String
    },
    canteenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Canteen",
    },
    canteenName: {
      type: String,
      required: true, 
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FoodItem",
          required: true,
        },
        itemName: {
          type: String,
          required: true,
        },
        itemQuantity: {
          type: Number,
          required: true,
        },
      }
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    payment: {
      type: Number,
      default: 0, // 0 -> not done, 1 -> payment done
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Preparing", "Ready", "Delivered"],
      default: "Pending",
    },
    deliverTo:{
      type:String,
      
          },
    orderPlacedAt: {
      type: Date,
      default: Date.now, 
    },
    deliveredAt: {
      type: Date, 
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastOrder = await this.constructor.findOne().sort({ orderId: -1 });
    this.orderId = lastOrder ? lastOrder.orderId + 1 : 1; // Start from 1 if no orders exist
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
