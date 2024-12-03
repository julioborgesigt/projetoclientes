

// Eventos de login e registro já existentes



// Evento de registro
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.error || 'Erro ao registrar usuário.');
        }
    } catch (error) {
        console.error('Erro ao registrar:', error);
        alert('Erro ao registrar.');
    }
});


// Evento de login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
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
            alert(data.error || 'Erro ao fazer login.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login.');
    }
});

