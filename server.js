const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'userpassword',
    database: process.env.DB_NAME || 'miappdb',
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
        process.exit(1);
    }
    console.log('Conectado a MySQL');
});

// Endpoint para recibir datos del frontend
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';

    db.query(query, [name, email], (err) => {
        if (err) {
            console.error('Error al guardar datos:', err);
            res.status(500).send('Error al guardar datos');
            return;
        }
        res.status(200).send('Datos guardados');
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
