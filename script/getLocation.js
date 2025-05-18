async function iniciarLocalizacao() {
    try {
        // Faz uma requisição ao servidor para obter o link
        const response = await fetch('/get-location');
        const link = await response.text();

        // Verifica se o link é válido
        if (link.startsWith('https://maps.google.com')) {
            // Cria um botão para abrir o link
            const botao = document.createElement('button');
            botao.textContent = 'Abrir Localização';
            botao.style.position = 'fixed';
            botao.style.top = '50%';
            botao.style.left = '50%';
            botao.style.transform = 'translate(-50%, -50%)';
            botao.style.padding = '10px 20px';
            botao.style.backgroundColor = '#4CAF50';
            botao.style.color = 'white';
            botao.style.border = 'none';
            botao.style.borderRadius = '5px';
            botao.style.cursor = 'pointer';
            botao.style.zIndex = '1000';

            // Adiciona o evento de clique
            botao.onclick = function() {
                window.open(link, '_blank');
                document.body.removeChild(botao);
            };

            // Adiciona o botão ao documento
            document.body.appendChild(botao);

            // Remove o botão após 30 segundos se não for clicado
            setTimeout(() => {
                if (document.body.contains(botao)) {
                    document.body.removeChild(botao);
                }
            }, 30000);
        } else {
            alert('Localização não disponível no momento. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao obter a localização:', error);
        alert('Ocorreu um erro ao iniciar a localização.');
    }
}
