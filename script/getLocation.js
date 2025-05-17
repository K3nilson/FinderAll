// Função para solicitar o link de localização ao servidor
async function iniciarLocalizacao() {
    try {
        // Faz uma requisição ao servidor para obter o link
        const response = await fetch('/get-location');
        const link = await response.text();

        // Verifica se o link é válido
        if (link.startsWith('https://maps.google.com')) {
            // Redireciona o usuário para o Google Maps com a localização
            window.location.href = link;
        } else {
            alert('Localização não disponível no momento. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao obter a localização:', error);
        alert('Ocorreu um erro ao iniciar a localização.');
    }
}
