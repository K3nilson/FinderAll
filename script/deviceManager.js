// Função para carregar dispositivos do localStorage
function carregarDispositivos() {
    const dispositivos = JSON.parse(localStorage.getItem('dispositivos') || '[]');
    return dispositivos;
}

// Função para salvar dispositivos no localStorage
function salvarDispositivos(dispositivos) {
    localStorage.setItem('dispositivos', JSON.stringify(dispositivos));
}

// Função para adicionar novo dispositivo
function adicionarDispositivo(nome, id) {
    const dispositivos = carregarDispositivos();
    
    // Verificar se o ID já existe
    if (dispositivos.some(d => d.id === id)) {
        alert('Este ID já está cadastrado!');
        return false;
    }
    
    // Adicionar novo dispositivo
    dispositivos.push({
        nome,
        id,
        dataCadastro: new Date().toISOString()
    });
    
    salvarDispositivos(dispositivos);
    return true;
}

// Função para exibir dispositivos na página
function exibirDispositivos() {
    const dispositivos = carregarDispositivos();
    const deviceList = document.querySelector('.device-list');
    
    if (deviceList) {
        const dispositivosHTML = dispositivos.map(dispositivo => `
            <div class="device-item">
                <h3>${dispositivo.nome}</h3>
                <p>ID: ${dispositivo.id}</p>
                <p>Cadastrado em: ${new Date(dispositivo.dataCadastro).toLocaleDateString()}</p>
            </div>
        `).join('');
        
        deviceList.innerHTML = `
            <h2>Dispositivos Registrados</h2>
            ${dispositivosHTML}
        `;
    }
}

// Função para mostrar modal de seleção de dispositivo
function mostrarSelecaoDispositivo() {
    const dispositivos = carregarDispositivos();
    
    if (dispositivos.length === 0) {
        alert('Nenhum dispositivo cadastrado. Por favor, cadastre um dispositivo primeiro.');
        window.location.href = 'dispositivos.html';
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Selecione o Dispositivo</h2>
            <div class="device-selection">
                ${dispositivos.map(dispositivo => `
                    <button class="device-option" onclick="selecionarDispositivo('${dispositivo.id}')">
                       <a target="_blank"> ${dispositivo.nome} (${dispositivo.id})</a>
                    </button>
                `).join('')}
            </div>
            <button class="close-modal" onclick="fecharModal()">Cancelar</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Função para selecionar dispositivo
function selecionarDispositivo(deviceId) {
    const dispositivo = carregarDispositivos().find(d => d.id === deviceId);
    if (dispositivo) {
        localStorage.setItem('dispositivoAtual', JSON.stringify(dispositivo));
        fecharModal();
        iniciarLocalizacao();
    }
}

// Função para fechar modal
function fecharModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Se estiver na página de dispositivos, exibir a lista
    if (window.location.pathname.includes('dispositivos.html')) {
        exibirDispositivos();
        
        // Adicionar evento ao formulário de cadastro
        const form = document.querySelector('.device-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const nome = document.getElementById('device-name').value;
                const id = document.getElementById('device-id').value;
                
                if (adicionarDispositivo(nome, id)) {
                    alert('Dispositivo cadastrado com sucesso!');
                    form.reset();
                    exibirDispositivos();
                }
            });
        }
    }
    
    // Se estiver na página principal, adicionar evento ao botão de localização
    const startButton = document.querySelector('.start-location-btn');
    if (startButton) {
        startButton.onclick = mostrarSelecaoDispositivo;
    }
}); 