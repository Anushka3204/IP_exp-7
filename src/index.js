const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

// Sample product data
const products = [
    { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 15.99 },
    { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 7.99 },
];

// Middleware to parse JSON bodies
app.use(express.json());

// 1. View all products
app.get('/products', (req, res) => {
    const { search } = req.query;

    if (search) {
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
        return res.json(filteredProducts);
    }

    res.json(products);
});

// 2. View product details by ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) return res.status(404).send('Product not found');
    
    res.json(product);
});

// 3. Add a new product (Optional)
app.post('/products', (req, res) => {
    const { name, description, price } = req.body;

    if (!name || !description || price == null) {
        return res.status(400).send('All fields are required');
    }

    const newProduct = {
        id: products.length + 1,
        name,
        description,
        price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
