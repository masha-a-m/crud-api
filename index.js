// index.js

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: "Item One", description: "This is item one" },
  { id: 2, name: "Item Two", description: "This is item two" }
];

// -----------------------------
// Routes
// -----------------------------

// Root route
app.get('/', (req, res) => {
  res.send("Hello, World!");
});

// GET /items - Retrieve all items
app.get('/items', (req, res) => {
  res.status(200).json(items);
});

// GET /items/:id - Retrieve a single item by ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(i => i.id === itemId);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json(item);
});

// POST /items - Create a new item
app.post('/items', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  const newItem = {
    id: Date.now(), // Use timestamp as unique ID
    name,
    description
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT /items/:id - Update an item by ID
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  const itemIndex = items.findIndex(i => i.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  items[itemIndex] = {
    ...items[itemIndex],
    name,
    description
  };

  res.json(items[itemIndex]);
});

// DELETE /items/:id - Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  items.splice(itemIndex, 1);
  res.json({ message: 'Item deleted successfully' });
});

// -----------------------------
// Error Handling
// -----------------------------

// Catch-all for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});