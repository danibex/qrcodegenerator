const QRCode = require('qrcode')
const nodemailer = require("nodemailer");
class Gerador {
  #nome
  #email;
  #senha;
  #url;

  constructor(nome, email, senha, url,) {
    this.#email = email;
    this.#senha = senha;
    this.#url = url;
    this.#nome = nome;
  }

  async gerarQRCode() {
    QRCode.toFile('./backend/public/qrcode.png', this.#url, {
      width: 500,
      color: {
        dark: '',  
        light: ''
      },
      quality: 10,
      margin: 1
    }, function (err) {
      if (err) throw err
      console.log('done')
    })
  }

  async enviarEmail() {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: await this.#email,
        pass: await this.#senha,
      },
    });

      const info = await transporter.sendMail({
        from: `'"${await this.#nome}" <${await this.#email}>'`, // sender address
        to: this.#email, // list of receivers
        subject: "QR Code", // Subject line
        text: "Segue anexo o QR Code", // plain text body
        html: 'QRCode: <br> <img src="cid:qrcodeidparaenvio"/>',
        attachments: [{
            filename: 'qrcode.png',
            path: __dirname + '/../public/qrcode.png',
            cid: 'qrcodeidparaenvio' //same cid value as in the html img src
        }]
      });

      if(info.messageId) {
        return true
      } else {
        return false
      }
  }

  async efetuarProcesso() {
    let gerarQR = await this.gerarQRCode();
    let resposta = await this.enviarEmail();
    return resposta
  }
}

module.exports = Gerador;