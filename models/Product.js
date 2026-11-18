
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true
        },

        brand: {
            type: String,
            default: "Not specified",
            trim: true
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true
        },

        sku: {
            type: String,
            required: [true, "SKU is required"],
            unique: true,
            trim: true,
            uppercase: true
        },

        price: {
            type: Number,
            required: [true, "Price is required"],
            min: 0
        },

        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: 0
        },

        reorderLevel: {
            type: Number,
            default: 10,
            min: 0
        },

        supplier: {
            type: String,
            default: "Not specified",
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);
