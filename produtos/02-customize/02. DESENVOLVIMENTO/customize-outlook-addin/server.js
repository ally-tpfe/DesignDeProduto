const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 3001;
const cors = require('cors');

// Configurações SSL/TLS
const options = {
  key: fs.readFileSync('./.cert/key.pem'),     // Caminho para a chave privada
  cert: fs.readFileSync('./.cert/cert.pem')    // Caminho para o certificado público
};

app.use(cors());

// Rota de exemplo
app.get('/api/usuario', (req, res) => {
  const usuario = {
    usePhoto: false,
    name: 'João',
    email: 'joao@example.com',
    office_phone: '123456789',
    user_photo:''

  };
  res.json(usuario);
});


// Crie o servidor HTTPS
const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Servidor rodando em HTTPS na porta ${port}`);
});
