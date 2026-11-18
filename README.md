
# Inventory and Data Management System

## Project Description

The Inventory and Data Management System is a REST API-based application developed using Node.js, Express.js and MongoDB.

This project helps manage product inventory efficiently. It allows users to add, view, update and delete products. It also provides low-stock alerts and category-wise inventory summaries.

The system stores product information in MongoDB and uses Mongoose for database operations.

---

## Features

- Add new products to inventory.
- View all available products.
- Search products using their ID.
- Update existing product details.
- Update product stock quantity.
- Delete products from inventory.
- View low-stock products.
- Generate category-wise inventory summary.
- Validate product information.
- Handle errors with proper HTTP status codes.
- Prevent duplicate SKU entries.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Backend framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| dotenv | Environment variable management |
| Postman | API testing |
| Nodemon | Automatic server restarting during development |

---

## Project Folder Structure

```text
Inventory_Data_Management_System/
│
├── config/
│   └── db.js
│
├── models/
│   └── Product.js
│
├── routes/
│   └── productRoutes.js
│
├── middleware/
│   └── errorMiddleware.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── app.js
```

---

## Product Schema

Each product contains the following fields:

| Field | Data Type | Description |
|---|---|---|
| name | String | Product name |
| brand | String | Product brand |
| category | String | Product category |
| sku | String | Unique product code |
| price | Number | Product price |
| quantity | Number | Available stock |
| reorderLevel | Number | Minimum stock level |
| supplier | String | Supplier name |

The schema also includes automatic `createdAt` and `updatedAt` timestamps.

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to Project Folder

```bash
cd Inventory_Data_Management_System
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/inventoryDB
```

### 5. Start MongoDB

Make sure MongoDB Server is installed and running on your system.

### 6. Start the Application

```bash
npm start
```

For development mode:

```bash
npm run dev
```

Expected output:

```text
MongoDB connected successfully
Server running on port 5001
```

---

## API Documentation

### Base URL

```text
http://localhost:5001/api/products
```

### 1. Get All Products

- Method: GET
- Endpoint: `/`

Returns all products stored in the database.

### 2. Get Product by ID

- Method: GET
- Endpoint: `/:id`

Returns details of a particular product using its MongoDB ID.

### 3. Add New Product

- Method: POST
- Endpoint: `/`

Adds a new product to the inventory.

Sample Request Body:

```json
{
    "name": "Blue Pen",
    "brand": "Cello",
    "category": "Stationery",
    "sku": "PEN-1001",
    "price": 10,
    "quantity": 50,
    "reorderLevel": 10,
    "supplier": "Cello"
}
```

### 4. Update Product

- Method: PUT
- Endpoint: `/:id`

Updates the details of an existing product.

### 5. Update Stock

- Method: PATCH
- Endpoint: `/:id/stock`

Updates the available stock quantity.

Sample Request Body:

```json
{
    "change": 5
}
```

A positive value increases stock, while a negative value decreases stock.

### 6. Delete Product

- Method: DELETE
- Endpoint: `/:id`

Deletes a product from the inventory using its ID.

### 7. Get Low Stock Products

- Method: GET
- Endpoint: `/low-stock`

Returns products whose quantity is less than or equal to their reorder level.

### 8. Category Summary

- Method: GET
- Endpoint: `/category-summary`

Generates a category-wise inventory summary using MongoDB aggregation.

It provides:

- Total products in each category.
- Total available quantity.
- Total stock value.

---

## API Testing Using Postman

All APIs can be tested using Postman.

| Operation | Method | Endpoint |
|---|---|---|
| Get All Products | GET | `/api/products` |
| Get Product by ID | GET | `/api/products/:id` |
| Add Product | POST | `/api/products` |
| Update Product | PUT | `/api/products/:id` |
| Update Stock | PATCH | `/api/products/:id/stock` |
| Delete Product | DELETE | `/api/products/:id` |
| Low Stock | GET | `/api/products/low-stock` |
| Category Summary | GET | `/api/products/category-summary` |

For POST, PUT and PATCH requests, select:

**Body → raw → JSON**

For GET and DELETE requests, no request body is required.

---

## HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Product created successfully |
| 400 | Invalid request or validation error |
| 404 | Product or route not found |
| 409 | Duplicate SKU conflict |
| 500 | Internal server error |

---

## Database Information

Database Name:

```text
inventoryDB
```

Collection Name:

```text
products
```

MongoDB stores product records in the `products` collection.

---

## Error Handling

The project includes centralized error-handling middleware.

It handles:

- Invalid product IDs.
- Product not found errors.
- Duplicate SKU errors.
- Missing required fields.
- Invalid product data.
- Internal server errors.

---

## Future Enhancements

The following features can be added in the future:

- User authentication and authorization.
- Admin dashboard.
- Product search and filtering.
- Pagination for large product records.
- Automatic low-stock notifications.
- Sales and purchase reports.
- Frontend dashboard with charts.
- Supplier management.

---

## Learning Outcomes

Through this project, I learned:

- How to create REST APIs using Express.js.
- How to connect Node.js with MongoDB.
- How to perform CRUD operations.
- How to create schemas and models using Mongoose.
- How to use MongoDB aggregation.
- How to handle errors and validate data.
- How to test APIs using Postman.
- How to manage environment variables.

---

## Author

Developed as an academic project to understand backend development, REST API creation and database management.

## License

This project is created for educational and learning purposes.
