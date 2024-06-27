const express = require('express')
const cors = require('cors');
const app = express()
const port = 3002
const Gerador = require('./core/gerador')

app.use(express.json());
app.use(cors());

app.post('/gerar', async (req, res) => {
  const {nome, email, senha, url} = req.body

  let gerador = new Gerador(nome, email, senha, url)
  let resposta = await gerador.efetuarProcesso();
  res.send({resposta: resposta})
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})