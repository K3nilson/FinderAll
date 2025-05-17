// Função para verificar se o usuário está logado
function verificarLogin() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    console.log('Dados do usuário logado:', usuarioLogado);
    
    if (!usuarioLogado) {
        console.log('Usuário não está logado, redirecionando para login...');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Função para obter o nome do usuário logado
function getNomeUsuario() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    console.log('Obtendo nome do usuário:', usuarioLogado);
    
    if (usuarioLogado) {
        try {
            const usuario = JSON.parse(usuarioLogado);
            console.log('Dados do usuário parseados:', usuario);
            if (usuario && usuario.nome) {
                return usuario.nome;
            }
        } catch (e) {
            console.error('Erro ao processar dados do usuário:', e);
        }
    }
    return 'Usuário';
}

// Função para fazer logout
function fazerLogout() {
    console.log('Fazendo logout...');
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
}

// Função para atualizar o nome do usuário no header
function atualizarNomeUsuario() {
    console.log('Atualizando nome do usuário no header...');
    const userInfo = document.querySelector('.user-info');
    if (userInfo) {
        const nome = getNomeUsuario();
        console.log('Nome do usuário a ser exibido:', nome);
        // Forçar a atualização do texto
        userInfo.innerHTML = `Olá, ${nome}`;
        // Verificar se o texto foi atualizado
        console.log('Texto atualizado:', userInfo.textContent);
    } else {
        console.log('Elemento .user-info não encontrado');
    }
}

// Função para verificar se a página atual é protegida
function isPaginaProtegida() {
    const url = window.location.href;
    console.log('URL atual:', url);
    
    // Verifica se é a página inicial (localhost:8000 ou localhost:8000/)
    if (url === 'http://localhost:8000/' || url === 'http://localhost:8000') {
        return true;
    }
    
    // Verifica outras páginas protegidas
    const paginasProtegidas = ['index.html', 'dispositivos.html'];
    const paginaAtual = window.location.pathname.split('/').pop();
    return paginasProtegidas.includes(paginaAtual);
}

// Verificar login em todas as páginas protegidas
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, verificando login...');
    
    if (isPaginaProtegida()) {
        console.log('Página protegida detectada');
        if (!verificarLogin()) {
            return;
        }
        
        // Atualizar o nome do usuário no header
        atualizarNomeUsuario();
    }
});

// Adicionar verificação adicional após o carregamento completo da página
window.addEventListener('load', function() {
    console.log('Página completamente carregada, verificando novamente...');
    if (isPaginaProtegida()) {
        atualizarNomeUsuario();
    }
}); 