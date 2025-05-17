let isCadastro = false;

function alternarCadastro() {
    window.location.href = 'cadastro.html';
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validarSenha(senha) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(senha);
}

function togglePassword(button) {
    const input = button.previousElementSibling;
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    
    // Alternar o ícone
    const icon = button.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}

// Função para verificar se o usuário está logado
function verificarLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const loginButton = document.getElementById('loginButton');
    
    if (usuarioLogado) {
        // Usuário está logado
        loginButton.innerHTML = `
            <span>Olá, ${usuarioLogado.nome}</span>
            <button onclick="fazerLogout()" class="btn-logout">Sair</button>
        `;
    } else {
        // Usuário não está logado
        loginButton.innerHTML = `
            <a href="login.html" class="btn-login">Login</a>
        `;
    }
}

// Função para fazer logout
function fazerLogout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

function processar() {
    const email = document.getElementById('username').value;
    const senha = document.getElementById('password').value;

    console.log('Tentando fazer login com:', { email });

    // Buscar usuários cadastrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    console.log('Usuários cadastrados:', usuarios);
    
    // Verificar se o usuário existe e a senha está correta
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    console.log('Usuário encontrado:', usuario);
    
    if (usuario) {
        // Salvar dados do usuário logado
        const usuarioLogado = {
            nome: usuario.nome,
            email: usuario.email
        };
        console.log('Salvando dados do usuário:', usuarioLogado);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        
        // Verificar se os dados foram salvos
        const dadosSalvos = localStorage.getItem('usuarioLogado');
        console.log('Dados salvos no localStorage:', dadosSalvos);
        
        // Redirecionar para a página principal
        console.log('Redirecionando para a página principal...');
        window.location.href = 'http://localhost:8000/';
    } else {
        alert('Email ou senha incorretos!');
    }
}

document.getElementById('username').addEventListener('input', function(e) {
    const email = e.target.value.trim();
    if (email && !validarEmail(email)) {
        e.target.setCustomValidity('Por favor, insira um email válido.');
    } else {
        e.target.setCustomValidity('');
    }
});

document.getElementById('password').addEventListener('input', function(e) {
    const senha = e.target.value.trim();
    if (senha && !validarSenha(senha)) {
        e.target.setCustomValidity('A senha deve ter no mínimo 6 caracteres, incluindo letras e números.');
    } else {
        e.target.setCustomValidity('');
    }
});

// Verificar login quando a página carregar
window.addEventListener('load', verificarLogin);
