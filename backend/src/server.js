const express = require('express');
const cors = require('cors');
const connection = require('./db_config');
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    return res.send('Hello, World!')
})

app.post('/usuario/cadastro', (req, res) => {
    const { name, email, password } = req.body;
    
    const query = 'INSERT INTO owner (name, email, password) VALUES (?, ?, ?)'
    connection.query(query, [name, email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, err, message: 'Erro no servidor'})
        }
        res.status(201).json({success: true, results, message: 'Sucesso no cadastro!'})
    })
})

app.post('/usuario/login', (req, res) => {
    const {name, password} = req.body

    const query = 'SELECT * FROM owner WHERE name = ? AND password = ?'
    connection.query(query, [name, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor!'})
    }

    if (results.length > 0) {
        res.json({ success: true, message: 'Sucesso no login!', data: results[0]})
    } else {
        res.json({ succes: false, message: 'Usuário ou senha incorretos!'})
    } 
    })
})

app.post('/carro/cadastro', (req, res) => {
    const {vehicle, plate, parking_space, owner} = req.body

    const query = 'INSERT INTO cars (vehicle, plate, parking_space, owner) VALUES (?, ?, ?, ?)'
    connection.query(query, [vehicle, plate, parking_space, owner], (err, results) => {
        if(err) {
            return res.status(500).json({success: false, err, message: 'Erro no Servidor'})
        }
        res.status(201).json({success: true, results, message: 'Sucesso no cadastro do veículo'})
    })
})

app.get('/carros', (req, res) => {

    const query = 'SELECT * FROM cars'
    connection.query(query, (err, results) => {
        if(err) {
            return res.status(500).json({ success: false, err, message: 'Erro ao buscar carro'})
        } 
        res.json({success: true, cars: results})
    })
})

app.put('/carros/:id', (req, res) => {
    const { id } = req.params
    const { vehicle, plate } = req.body

    const query = 'UPDATE cars SET vehicle = ?, plate = ? WHERE id = ?'
    connection.query(query, [vehicle, plate, id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, err, message: 'Erro ao editar veículo'})
        }
        res.json({ success: true, message: 'Carro editado com sucesso!' })
    })
})

app.delete('/carros/:id', (req, res) => {
    const { id } = req.params
    const query = 'DELETE FROM cars WHERE id = ?'
    connection.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, err, message: 'Erro ao deletar veículo' })
        }
        res.json({ success: true, message: 'Veículo deletado com sucesso' })
    })
})

app.listen(port, () => console.log(`Server rodando na porta ${port}`))