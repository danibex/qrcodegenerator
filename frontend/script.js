document.getElementById('formularioQR').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário da maneira padrão
    alert('Clique em OK e aguarde...')
    const formData = new FormData(event.target);
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        senha: formData.get('senha'),
        url: formData.get('url'),
    };
    fetch('http://localhost:3002/gerar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Adicione aqui o código para lidar com o sucesso da requisição
    })
    .finally(() => {
        alert('QR Code gerado com sucesso! Verfique seu email.')
    })
    .catch((error) => {
        console.error('Error:', error);
        // Adicione aqui o código para lidar com erros na requisição
    });
});
