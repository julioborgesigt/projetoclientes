USE zjbjbi_banco;



CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    vencimento DATE NOT NULL,
    servico VARCHAR(255),
    whatsapp VARCHAR(20),
    observacoes TEXT
);
