// Importa módulos
const http = require('http');
const fs = require('fs');
const path = require('path');
const colors = require('colors');

// Cria o servidor
const server = http.createServer((req, res) => {

  // ROTA HOME
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Bem-vindo a API de Criptomoedas</h1>');
  }

  // ROTA API
  else if (req.url === '/api/crypto') {
    const moedas = [
      { nome: 'Bitcoin', simbolo: 'BTC', valor: 'R$ 350.000' },
      { nome: 'Ethereum', simbolo: 'ETH', valor: 'R$ 18.000' },
      { nome: 'Solana', simbolo: 'SOL', valor: 'R$ 750' }
    ];

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(moedas));
  }

  // ROTA 404 -> lê o arquivo public/404.html
  else {
    const filePath = path.join(__dirname, 'public', '404.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Erro interno do servidor');
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  }
});

// Porta
server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000'.green);
});
