document.addEventListener('DOMContentLoaded', function () {
    const addClientForm = document.getElementById('add-client-form');
    const clientsList = document.getElementById('clients-list');
    const sortClientsButton = document.getElementById('sort-clients');

    // Função para exibir os clientes na lista
    function displayClients(clients) {
        clientsList.innerHTML = ''; // Limpar a lista atual
        clients.forEach(client => {
            const clientItem = document.createElement('div');
            clientItem.classList.add('client-item');
            clientItem.innerHTML = `
                <p><strong>Nome:</strong> ${client.name}</p>
                <p><strong>Vencimento:</strong> ${client.vencimento}</p>
                <p><strong>Serviço:</strong> ${client.servico}</p>
                <p><strong>WhatsApp:</strong> ${client.whatsapp}</p>
                <p><strong>Observações:</strong> ${client.observacoes}</p>
            `;
            clientsList.appendChild(clientItem);
        });
    }

    // Função para buscar a lista de clientes
    async function getClients() {
        try {
            const response = await fetch('http://localhost:3000/clientes/list');
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
            const response = await fetch('http://localhost:3000/clientes/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(client)
            });
            const data = await response.json();
            alert(data.message);
            getClients(); // Atualiza a lista de clientes
        } catch (error) {
            console.error('Erro ao adicionar cliente:', error);
        }
    });

    // Ordenar clientes por vencimento
    sortClientsButton.addEventListener('click', async function () {
        try {
            const response = await fetch('http://localhost:3000/clientes/list');
            const data = await response.json();
            data.sort((a, b) => new Date(a.vencimento) - new Date(b.vencimento));
            displayClients(data);
        } catch (error) {
            console.error('Erro ao ordenar clientes:', error);
        }
    });

    // Carregar a lista de clientes ao carregar a página
    getClients();
});



document.getElementById('login-btn').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    this.classList.add('active');
    document.getElementById('register-btn').classList.remove('active');
});

document.getElementById('register-btn').addEventListener('click', function() {
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    this.classList.add('active');
    document.getElementById('login-btn').classList.remove('active');
});



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
