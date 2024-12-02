/*
// Interações com os formulários de login e cadastro, bem como a lista de clientes
document.addEventListener('DOMContentLoaded', function () {
    const addClientForm = document.getElementById('add-client-form');
    const clientsList = document.getElementById('clients-list');
    const sortClientsButton = document.getElementById('sort-clients');

    function displayClients(clients) {
        clientsList.innerHTML = ''; // Limpa a lista de clientes antes de renderizar
    
        clients.forEach(client => {
            const clientItem = document.createElement('div');
            clientItem.classList.add('client-item');
    
            // Define a classe CSS com base no status
            const statusClass = client.status === 'pendente' ? 'status-pendente' :
                                client.status === 'cobrança feita' ? 'status-cobrança-feita' : '';
    
            clientItem.innerHTML = `
                <p><strong>Nome:</strong> ${client.name}</p>
                <p><strong>Vencimento:</strong> ${client.vencimento}</p>
                <p><strong>Serviço:</strong> ${client.servico}</p>
                <p><strong>WhatsApp:</strong> ${client.whatsapp}</p>
                <p><strong>Observações:</strong> ${client.observacoes}</p>
                <p class="status ${statusClass}"><strong>Status:</strong> ${client.status || 'N/A'}</p>
                <button onclick="deleteClient(${client.id})">Excluir</button>
                <button onclick="markAsPending(${client.id})">Pagamento Pendente</button>
                <button onclick="markAsPaid(${client.id})">Cobrança Feita</button>
                <button class="whatsapp" onclick="sendWhatsAppMessage('${client.whatsapp}')">WhatsApp</button>
                
            `;
            
            clientsList.appendChild(clientItem); // Adiciona o cliente à lista
        });
    }
    
    */
    
    
async function sendWhatsAppMessage(whatsappNumber) {
    try {
        // Obter a mensagem padrão do backend
        const response = await fetch('/clientes/get-message');
        const data = await response.json();
        const message = data.message;

        if (!message || message.trim() === '') {
            alert('Nenhuma mensagem padrão foi configurada.');
            return;
        }

        // Codificar a mensagem para URL
        const encodedMessage = encodeURIComponent(message);

        // Formatar o número do WhatsApp (removendo espaços e caracteres inválidos)
        const formattedNumber = whatsappNumber.replace(/\D/g, '');

        // Construir o link do WhatsApp
        const whatsappLink = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

        // Abrir o link do WhatsApp em uma nova guia
        window.open(whatsappLink, '_blank');
    } catch (error) {
        console.error('Erro ao obter a mensagem padrão:', error);
        alert('Erro ao obter a mensagem padrão.');
    }
}


    // Função para buscar a lista de clientes
    async function getClients() {
        try {
            const response = await fetch('/clientes/list');
            const data = await response.json();
            displayClients(data);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    }

    // Enviar novo cliente
    addClientForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('client-name').value;
        const vencimento = document.getElementById('client-vencimento').value;
        const servico = document.getElementById('client-servico').value;
        const whatsapp = document.getElementById('client-whatsapp').value;
        const observacoes = document.getElementById('client-observacoes').value;

        const client = { name, vencimento, servico, whatsapp, observacoes };

        try {
            const response = await fetch('/clientes/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(client)
            });
            const data = await response.json();
            alert(data.message);
            getClients(); // Atualiza a lista de clientes
        } catch (error) {
            alert('Erro ao adicionar cliente:', error);
        }
    });

    // Ordenar clientes por vencimento
    sortClientsButton.addEventListener('click', async function () {
        try {
            const response = await fetch('/clientes/list');
            const data = await response.json();
            data.sort((a, b) => new Date(a.vencimento) - new Date(b.vencimento));
            displayClients(data);
        } catch (error) {
            alert('Erro ao ordenar clientes:', error);
        }
    });

    // Carregar a lista de clientes ao carregar a página
    getClients();


    


});





    // Carregar a mensagem padrão ao abrir o dashboard
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const response = await fetch('/clientes/get-message');
            const data = await response.json();

            if (data.message) {
                document.getElementById('default-message').value = data.message;
            }
        } catch (error) {
            console.error('Erro ao carregar mensagem padrão:', error);
        }
    });



    document.getElementById('save-message').addEventListener('click', async (e) => {
        e.preventDefault(); // Impede o comportamento padrão do botão (evitar reload da página)
        
        const message = document.getElementById('default-message').value;
    
        if (!message.trim()) {
            alert('A mensagem padrão não pode estar vazia.');
            return;
        }
    
        alert('Mensagem padrão detectada: ' + message); // Verificando o valor da mensagem
    
        try {
            // Verifica se o fetch está sendo chamado corretamente
            alert('Enviando mensagem para o servidor...');
    
            const response = await fetch('/clientes/save-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });
    
            // Verifica a resposta do servidor
            alert('Resposta do servidor recebida: ' + response.status);
    
            if (!response.ok) {
                alert('Erro ao salvar mensagem padrão.');
                throw new Error('Erro ao salvar mensagem padrão.');
            }
    
            const data = await response.json();
            alert('Mensagem salva com sucesso: ' + data.message); // Mensagem de sucesso
        } catch (error) {
            console.error('Erro ao salvar mensagem:', error);
            alert('Erro ao salvar mensagem.');
        }
    });



/*
    document.addEventListener('DOMContentLoaded', () => {
        const saveButton = document.getElementById('save-message');
        const messageInput = document.getElementById('default-message');
    
        if (!saveButton || !messageInput) {
            alert('Botão ou campo de mensagem não encontrado!');
            return;
        }
    
        saveButton.addEventListener('click', async (e) => {
            e.preventDefault();
            alert('Botão Salvar Mensagem clicado!'); // Verificação básica
    
            const message = messageInput.value;
    
            if (!message.trim()) {
                alert('A mensagem padrão não pode estar vazia.');
                return;
            }
    
            try {
                const response = await fetch('/clientes/save-message', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message }),
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao salvar mensagem padrão.');
                }
    
                const data = await response.json();
                alert('Mensagem salva com sucesso: ' + data.message);
            } catch (error) {
                console.error('Erro ao salvar mensagem:', error);
                alert('Erro ao salvar mensagem.');
            }
        });
    });
    
*/

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        window.location.href = '/dashboard.html';
    } else {
        alert(data.error);
    }
});


async function checkAlerts() {
    try {
        const response = await fetch('/clientes/alerts');
        const data = await response.json();

        if (data.length > 0) {
            alert(`Existem ${data.length} clientes com vencimento próximo!`);
        }
    } catch (error) {
        console.error('Erro ao buscar alertas:', error);
    }
}

// Verificar alertas ao carregar o dashboard
document.addEventListener('DOMContentLoaded', checkAlerts);


async function sendMessage(whatsapp, message) {
    try {
        const response = await fetch('/clientes/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ whatsapp, message }),
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert('Erro ao enviar mensagem:', error);
    }
}


function displayClients(clients) {
    clientsList.innerHTML = '';
    clients.forEach(client => {
        const clientItem = document.createElement('div');
        clientItem.classList.add('client-item');

        // Define uma classe CSS com base no status
        const statusClass = client.status === 'pendente' ? 'status-pendente' : 
                            client.status === 'cobrança feita' ? 'status-cobrança-feita' : '';

        clientItem.innerHTML = `
            <p><strong>Nome:</strong> ${client.name}</p>
            <p><strong>Vencimento:</strong> ${client.vencimento}</p>
            <p><strong>Serviço:</strong> ${client.servico}</p>
            <p><strong>WhatsApp:</strong> ${client.whatsapp}</p>
            <p><strong>Observações:</strong> ${client.observacoes}</p>
            <p class="status ${statusClass}"><strong>Status:</strong> ${client.status || 'N/A'}</p>
            <button onclick="deleteClient(${client.id})">Excluir</button>
            <button onclick="markAsPending(${client.id})">Pagamento Pendente</button>
            <button onclick="markAsPaid(${client.id})">Cobrança Feita</button>
            <button onclick="sendWhatsAppMessage('${client.whatsapp}')">WhatsApp</button>
            <button class="whatsapp" onclick="sendWhatsAppMessage('${client.whatsapp}')">WhatsApp</button>

            
        `;
        clientsList.appendChild(clientItem);
    });
}



// Função para excluir um cliente
async function deleteClient(id) {
    try {
        const response = await fetch(`/clientes/delete/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        alert(data.message);
        getClients(); // Atualiza a lista de clientes
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        alert('Erro ao excluir cliente.');
    }
}

// Função para marcar cliente como "Pagamento Pendente"
async function markAsPending(id) {
    try {
        const response = await fetch(`/clientes/mark-pending/${id}`, {
            method: 'PUT',
        });
        const data = await response.json();
        alert(data.message);
        getClients(); // Atualiza a lista de clientes
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        alert('Erro ao marcar como pagamento pendente.');
    }
}

// Função para marcar cliente como "Cobrança Feita"
async function markAsPaid(id) {
    try {
        const response = await fetch(`/clientes/mark-paid/${id}`, {
            method: 'PUT',
        });
        const data = await response.json();
        alert(data.message);
        getClients(); // Atualiza a lista de clientes
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        alert('Erro ao marcar como cobrança feita.');
    }
}

// Salvar mensagem padrão no backend
// Evento para salvar mensagem
// Evento para salvar mensagem
/*
document.getElementById('save-message').addEventListener('click', async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do botão (evitar reload da página)
    
    const message = document.getElementById('default-message').value;

    if (!message.trim()) {
        alert('A mensagem padrão não pode estar vazia.');
        return;
    }

    alert('Mensagem padrão detectada: ' + message); // Verificando o valor da mensagem

    try {
        // Verifica se o fetch está sendo chamado corretamente
        alert('Enviando mensagem para o servidor...');

        const response = await fetch('/clientes/save-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        // Verifica a resposta do servidor
        alert('Resposta do servidor recebida: ' + response.status);

        if (!response.ok) {
            alert('Erro ao salvar mensagem padrão.');
            throw new Error('Erro ao salvar mensagem padrão.');
        }

        const data = await response.json();
        alert('Mensagem salva com sucesso: ' + data.message); // Mensagem de sucesso
    } catch (error) {
        console.error('Erro ao salvar mensagem:', error);
        alert('Erro ao salvar mensagem.');
    }
});

*/






