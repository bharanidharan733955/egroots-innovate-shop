# E-Groots Backend API

A complete Node.js + Express + MongoDB backend for the E-Groots eCommerce platform.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Environment Setup:**
Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/egroots
PORT=5000
NODE_ENV=development
```

3. **Seed the database (optional):**
```bash
node scripts/seedProducts.js
```

4. **Start the server:**
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Products API

#### Get All Products
```http
GET /api/products
```

Query Parameters:
- `category` - Filter by category
- `featured` - Filter featured products (true/false)
- `search` - Search in name and description
- `sort` - Sort by: featured, name, price-low, price-high, rating
- `limit` - Limit number of results (default: 50)

#### Get Single Product
```http
GET /api/products/:id
```

#### Create Product
```http
POST /api/products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "originalPrice": 129.99,
  "category": "Educational Kits",
  "image": "https://example.com/image.jpg",
  "rating": 4.5,
  "reviewCount": 100,
  "inStock": true,
  "isNew": false,
  "isFeatured": true,
  "stockQuantity": 50
}
```

#### Update Product
```http
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 89.99
}
```

#### Delete Product
```http
DELETE /api/products/:id
```

### Orders API

#### Create Order
```http
POST /api/orders
Content-Type: application/json

{
  "items": [
    {
      "productId": "product_id_here",
      "name": "Product Name",
      "price": 99.99,
      "quantity": 2,
      "image": "https://example.com/image.jpg",
      "category": "Educational Kits"
    }
  ],
  "total": 199.98,
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, State 12345"
  },
  "paymentMethod": "Credit/Debit Card"
}
```

#### Get All Orders
```http
GET /api/orders
```

Query Parameters:
- `email` - Filter by customer email
- `status` - Filter by payment status
- `limit` - Limit number of results (default: 50)
- `page` - Page number for pagination (default: 1)

#### Get Single Order
```http
GET /api/orders/:id
```

#### Update Order Status
```http
PUT /api/orders/:id
Content-Type: application/json

{
  "paymentStatus": "completed",
  "orderStatus": "shipped"
}
```

## 🗄️ Database Schema

### Product Schema
```javascript
{
  name: String (required, max 100 chars),
  description: String (required, max 500 chars),
  price: Number (required, min 0),
  originalPrice: Number (optional, min 0),
  category: String (required, enum),
  image: String (required, URL),
  rating: Number (0-5, default 0),
  reviewCount: Number (min 0, default 0),
  inStock: Boolean (default true),
  isNew: Boolean (default false),
  isFeatured: Boolean (default false),
  stockQuantity: Number (min 0, default 0),
  timestamps: true
}
```

### Order Schema
```javascript
{
  items: [OrderItem] (required),
  total: Number (required, min 0),
  customerInfo: {
    name: String (required, max 50 chars),
    email: String (required, valid email),
    phone: String (required, valid phone),
    address: String (optional, max 200 chars)
  },
  paymentMethod: String (required, enum),
  paymentStatus: String (enum: pending/completed/failed),
  orderStatus: String (enum: processing/shipped/delivered/cancelled),
  orderDate: Date (default: now),
  timestamps: true
}
```

## 🔧 Features

- ✅ Complete CRUD operations for products
- ✅ Order management system
- ✅ Input validation and sanitization
- ✅ Error handling and logging
- ✅ CORS configuration
- ✅ MongoDB connection with Mongoose
- ✅ Environment-based configuration
- ✅ Search and filtering capabilities
- ✅ Pagination support
- ✅ Data seeding script

## 🛡️ Security Features

- Input validation using express-validator
- MongoDB injection protection via Mongoose
- CORS configuration for cross-origin requests
- Error message sanitization
- Request timeout handling

## 📦 Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Update CORS origins to your production frontend domain
3. Use a production MongoDB cluster
4. Consider adding rate limiting and authentication for admin routes
5. Set up proper logging and monitoring

## 🧪 Testing the API

Use the health check endpoint to verify the server is running:
```bash
curl http://localhost:5000/api/health
```

Test product creation:
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","description":"Test description","price":99.99,"category":"Educational Kits","image":"https://example.com/image.jpg"}'
```