const express = require('express');
const mysql = require('mysql2/promise');

// Initialize Express
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies

// Database connection configuration
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',         // Change this to your MySQL username
    password: 'Integritymasha1@', // Change this to your MySQL password
    database: 'crud_api',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test DB connection
(async () => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        console.log('Database connected:', rows[0].solution);
    } catch (err) {
        console.error('Database connection test failed:', err.message);
    }
})();

// Routes

// GET all users
app.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET user by ID
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create new user
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

    try {
        const [result] = await pool.query(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        );
        res.status(201).json({ id: result.insertId, name, email });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: err.message });
    }
});

// PUT update user
app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    if (!name && !email) return res.status(400).json({ error: 'Nothing to update' });

    try {
        const [result] = await pool.query(
            'UPDATE users SET name = IFNULL(?, name), email = IFNULL(?, email) WHERE id = ?',
            [name, email, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });

        const [updated] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        res.json(updated[0]);
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: err.message });
    }
});

// DELETE user
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});