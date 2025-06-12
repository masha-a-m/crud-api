// app.js

const express = require('express');
const mysql = require('pg');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MySQL Connection Pool
const pool = pg.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Integritymasha1@', // ← Replace with your MySQL root password
    database: 'crud_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promisify for async/await
const promisePool = pool.promise();

// Helper function to query DB
async function query(sql, params = []) {
    const [rows] = await promisePool.query(sql, params);
    return rows;
}

// === ROUTES ===

// GET all users
app.get('/users', async (req, res) => {
    try {
        const users = await query('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// GET user by ID
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [user] = await query('SELECT * FROM users WHERE id = ?', [id]);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// POST create user
app.post('/users', async (req, res) => {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await query(
            'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
            [name, email, age]
        );
        const newUser = await query('SELECT * FROM users ORDER BY id DESC LIMIT 1');
        res.status(201).json(newUser[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// PUT update user
app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email, age } = req.body;

    try {
        const [user] = await query('SELECT * FROM users WHERE id = ?', [id]);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await query(
            'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
            [name, email, age, id]
        );

        const updatedUser = await query('SELECT * FROM users WHERE id = ?', [id]);
        res.json(updatedUser[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// DELETE user
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const [user] = await query('SELECT * FROM users WHERE id = ?', [id]);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await query('DELETE FROM users WHERE id = ?', [id]);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});