function togglePassword(button) {
    const input = button.previousElementSibling;
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    
    // Alternar o ícone
    const icon = button.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}

function validarSenha(senha) {
    // Verifica se a senha tem pelo menos 6 caracteres
    if (senha.length < 6) {
        return false;
    }
    // Verifica se contém pelo menos uma letra e um número
    const temLetra = /[a-zA-Z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    return temLetra && temNumero;
}

function processarCadastro() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    // Validações
    if (!nome || !email || !senha || !confirmarSenha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    if (!validarSenha(senha)) {
        alert('A senha deve ter no mínimo 6 caracteres, incluindo letras e números!');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    // Buscar usuários existentes
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Verificar se o email já está cadastrado
    if (usuarios.some(u => u.email === email)) {
        alert('Este email já está cadastrado!');
        return;
    }

    // Adicionar novo usuário
    usuarios.push({
        nome,
        email,
        senha
    });

    // Salvar no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mostrar mensagem de sucesso
    alert('Cadastro realizado com sucesso! Faça login para continuar.');

    // Redirecionar para a página de login
    window.location.href = 'login.html';
}

// Adicionar validação em tempo real para a senha
document.getElementById('senha').addEventListener('input', function(e) {
    const senha = e.target.value;
    if (senha && !validarSenha(senha)) {
        e.target.setCustomValidity('A senha deve ter no mínimo 6 caracteres, incluindo letras e números.');
    } else {
        e.target.setCustomValidity('');
    }
});

// Adicionar validação em tempo real para a confirmação de senha
document.getElementById('confirmarSenha').addEventListener('input', function(e) {
    const senha = document.getElementById('senha').value;
    const confirmarSenha = e.target.value;
    if (confirmarSenha && senha !== confirmarSenha) {
        e.target.setCustomValidity('As senhas não coincidem!');
    } else {
        e.target.setCustomValidity('');
    }
});

// Adicionar log para verificar se o arquivo está sendo carregado
console.log('Arquivo cadastro.js carregado'); 