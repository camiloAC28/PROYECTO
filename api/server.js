const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyecto_finanza'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');
});


app.post('/api/usuarios', (req, res) => {
    const { doc_usuario, mail_usuario, nom_usuario, ape_usuario, num_usuario, contraseña } = req.body;

    if (!doc_usuario || !mail_usuario || !nom_usuario || !ape_usuario || !num_usuario || !contraseña) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const sql = `
        INSERT INTO usuarios (doc_usuario, mail_usuario, nom_usuario, ape_usuario, num_usuario, contraseña)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [doc_usuario, mail_usuario, nom_usuario, ape_usuario, num_usuario, contraseña];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al registrar usuario:', err);
            return res.status(500).json({ error: 'Error al registrar usuario.' });
        }
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    });
});


app.get('usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios;';
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay usuarios')
        }
    })
})

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
