// Função para mostrar informações de promoção
function mostrarPromocao() {
    var promoInfo = document.getElementById('promo-info');
    promoInfo.style.display = 'block';
}

const cart = JSON.parse(localStorage.getItem('cart')) || []; // Carregar o carrinho armazenado, ou um carrinho vazio

let total = 0;

// Função para adicionar item ao carrinho
function addToCart(name, price, description) {
    // Adiciona o produto com nome, preço e descrição ao carrinho
    cart.push({ name, price, description });
    updateCart();
    showNotification();
    saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Salva o carrinho no localStorage
}

function displayPurchaseConfirmation() {
    const purchaseItems = JSON.parse(localStorage.getItem('cart'));
    const purchaseTotal = localStorage.getItem('purchaseTotal');

    if (purchaseItems && purchaseTotal) {
        const itemsList = document.getElementById('purchase-items');
        const totalElement = document.getElementById('purchase-total');

        // Exibe os itens do carrinho com nome, descrição e preço
        purchaseItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.description} - R$ ${item.price.toFixed(2)}`;
            itemsList.appendChild(li);
        });

        totalElement.textContent = `Total da compra: R$ ${purchaseTotal}`;
     // Adiciona o botão de impressão
     const printButton = document.createElement('button');
     printButton.textContent = 'Imprimir Detalhes da Compra';
     printButton.id = 'print-button';
     itemsList.appendChild(printButton);

     // Adiciona evento ao botão de impressão
     printButton.addEventListener('click', printPurchaseDetails);

        // Limpar o carrinho após a compra (se necessário)
        localStorage.removeItem('cart');
        localStorage.removeItem('purchaseTotal');
        
    }
}

window.onload = function() {
    // Recupera o carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('cart'));
    const purchaseTotal = localStorage.getItem('purchaseTotal');

    // Exibe os itens na lista
    const itemsList = document.getElementById('purchase-items');
    if (cart) {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name ||'Nome não definido'} -  R$ ${item.price.toFixed(2)}`;
            itemsList.appendChild(li);
        });
    }

    // Exibe o total da compra
    const totalElement = document.getElementById('purchase-total');
    if (purchaseTotal) {
        totalElement.textContent = `Total da compra: R$ ${purchaseTotal}`;
    } else {
        totalElement.textContent = 'Total da compra: R$ 0,00'; // Valor padrão, caso não haja total
    }
    
    // Limpa os dados após a compra (opcional)
    localStorage.removeItem('cart');
    localStorage.removeItem('purchaseTotal');
};

// Função para atualizar o carrinho na página
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = ''; // Limpar itens da lista
    total = 0; // Resetar o total

    // Adicionar cada item do carrinho à lista de exibição
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name ||'Nome não definido'} - R$ ${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    // Atualizar o total
    cartTotal.textContent = total.toFixed(2);
}

// Função para limpar o carrinho
function clearCart() {
    localStorage.removeItem('cart'); // Remover o carrinho do localStorage
    cart.length = 0; // Limpar o carrinho na memória
    updateCart();
}

// Função para finalizar a compra
function buyCart() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
    } else {
        // Calculando o total da compra
        let total = cart.reduce((acc, item) => acc + item.price, 0);
        
        // Salvando o carrinho e o total no localStorage
        localStorage.setItem('cart', JSON.stringify(cart)); // Itens do carrinho
        localStorage.setItem('purchaseTotal', total.toFixed(2)); // Total da compra

        // Redirecionando para a página de confirmação
        window.location.href = 'confirmacao.html';
    }
}




// Função para exibir a notificação de item adicionado ao carrinho
function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Carregar o carrinho ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    updateCart(); // Atualizar o carrinho na página com os dados do localStorage
});

const loginToggle = document.getElementById('login-toggle');
const loginForm = document.getElementById('login-form');

// Adicionar eventos aos botões de limpar e comprar
document.getElementById('clear-cart').addEventListener('click', clearCart);
document.getElementById('buy-cart').addEventListener('click', buyCart);

// Alternar visibilidade do carrinho
document.getElementById('carrinho-toggle').addEventListener('click', function() {
    var cartForm = document.getElementById('cart');
    if (cartForm.style.display === 'none' || cartForm.style.display === '') {
        cartForm.style.display = 'block'; // Mostrar o carrinho
    } else {
        cartForm.style.display = 'none'; // Ocultar o carrinho
    }
});

// Função de login simulada
// Função de login simulada
function loginUsuario(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Pega os valores do formulário
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Credenciais simuladas (substitua por autenticação real com um backend)
    const credenciais = {
        email: "cliente@pizzaria.com",
        senha: "12345"
    };

    // Verifica as credenciais
    if (email === credenciais.email && senha === credenciais.senha) {
        alert("Login bem-sucedido!");

        // Redireciona para a página de login efetuado
        window.location.href = "login_efetuado.html";
    } else {
        alert("E-mail ou senha inválidos. Tente novamente.");
    }
}


// Função de logout
function logout() {
    document.getElementById('perfil').style.display = 'none';
    document.querySelector('.login').style.display = 'block';
}

document.addEventListener("DOMContentLoaded", () => {
    // Dados simulados (substituir por dados reais do backend)
    const usuario = {
        nome: "Fulano da Silva",
        email: "cliente@pizzaria.com"
    };

    // Atualiza os dados na página
    document.getElementById("usuarioNome").textContent = usuario.nome;
    document.getElementById("nomeUsuario").textContent = usuario.nome;
    document.getElementById("emailUsuario").textContent = usuario.email;
});

const promocoes = [
    {
        nome: "Desconto de 10%",
        tipo: "percentual",
        valor: 10, // 10% de desconto
        descricao: "Desconto de 10% em toda a compra",
        codigo: "DESC10" // código promocional
    },
    {
        nome: "Desconto R$ 15,00",
        tipo: "fixo",
        valor: 15, // Desconto fixo de R$ 15
        descricao: "Desconto de R$ 15,00 em toda a compra",
        codigo: "DESC15"
    }
];
