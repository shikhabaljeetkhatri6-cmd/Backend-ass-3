
const express = require("express");
const router = express.Router();

const Product = require("../models/Product");


// ==========================================
// 1. GET ALL PRODUCTS
// GET /api/products
// ==========================================
router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            total: products.length,
            data: products
        });

    } catch (error) {
        next(error);
    }
});


// ==========================================
// 2. GET LOW STOCK PRODUCTS
// GET /api/products/low-stock
// ==========================================
router.get("/low-stock", async (req, res, next) => {
    try {
        const products = await Product.find({
            $expr: {
                $lte: ["$quantity", "$reorderLevel"]
            }
        });

        res.status(200).json({
            success: true,
            total: products.length,
            message: "Low stock products fetched successfully",
            data: products
        });

    } catch (error) {
        next(error);
    }
});


// ==========================================
// 3. CATEGORY SUMMARY
// GET /api/products/category-summary
// ==========================================
router.get("/category-summary", async (req, res, next) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: "$category",

                    totalProducts: {
                        $sum: 1
                    },

                    totalQuantity: {
                        $sum: "$quantity"
                    },

                    totalStockValue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: "Category summary fetched successfully",
            totalCategories: summary.length,
            data: summary
        });

    } catch (error) {
        next(error);
    }
});


// ==========================================
// 4. GET PRODUCT BY ID
// GET /api/products/:id
// ==========================================
router.get("/:id", async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        next(error);
    }
});


// ==========================================
// 5. ADD NEW PRODUCT
// POST /api/products
// ==========================================
router.post("/", async (req, res, next) => {
    try {
        console.log("Received data:", req.body);

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "SKU already exists. Use a different SKU."
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        next(error);
    }
});


// ==========================================
// 6. UPDATE PRODUCT
// PUT /api/products/:id
// ==========================================
router.put("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "SKU already exists"
            });
        }

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        next(error);
    }
});


// ==========================================
// 7. UPDATE STOCK
// PATCH /api/products/:id/stock
// ==========================================
router.patch("/:id/stock", async (req, res, next) => {
    try {
        const change = Number(req.body.change);

        if (!Number.isInteger(change) || change === 0) {
            return res.status(400).json({
                success: false,
                message: "Change must be a non-zero integer"
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.quantity + change < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock quantity cannot be negative"
            });
        }

        product.quantity += change;

        await product.save();

        res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            data: product
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        next(error);
    }
});


// ==========================================
// 8. DELETE PRODUCT
// DELETE /api/products/:id
// ==========================================
router.delete("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        next(error);
    }
});


module.exports = router;
