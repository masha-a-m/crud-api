const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// PostgreSQL Connection Pool
const pool = new Pool({
    host: 'localhost',
    user: 'postgres', // ← change if needed
    password: 'Integritymasha1@', // ← replace with your PostgreSQL password
    database: 'crud_db',
    port: 5432,
});

// Helper function to query DB
async function query(sql, params = []) {
    const result = await pool.query(sql, params);
    return result.rows;
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
        const user = await query('SELECT * FROM users WHERE id = $1', [id]);
        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user[0]);
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
        const result = await query(
            'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
            [name, email, age]
        );
        res.status(201).json(result[0]);
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
        const user = await query('SELECT * FROM users WHERE id = $1', [id]);
        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        await query(
            'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
            [name, email, age, id]
        );

        const updatedUser = await query('SELECT * FROM users WHERE id = $1', [id]);
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
        const user = await query('SELECT * FROM users WHERE id = $1', [id]);
        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        await query('DELETE FROM users WHERE id = $1', [id]);

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