// === SPA - Alternância de páginas sem recarregar ===
document.addEventListener("DOMContentLoaded", () => {
  const lojaSection = document.getElementById("paginaLoja");
  const carrinhoSection = document.getElementById("paginaCarrinho");

  document.getElementById("cartIcon").addEventListener("click", () => {
    lojaSection.style.display = "none";
    carrinhoSection.style.display = "block";
    atualizarCarrinho();
  });

  const voltarBtns = document.querySelectorAll(".btn-voltar-home");
  voltarBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      carrinhoSection.style.display = "none";
      lojaSection.style.display = "block";
    });
  });
});

let itemCount = 1;
let currentCategory = 'Todos';
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

// Lista de produtos
const produtos = [
  { id: '1', category: 'Bolo', name: 'Bolo de Pote de Limão', price: 'R$ 12,00', image: './assets/images/bololimão.jpg' },
  { id: '2', category: 'Bolo', name: 'Bolo de Pote de Brigadeiro', price: 'R$ 12,00', image: './assets/images/bolobrigadeiro.webp' },
  { id: '3', category: 'Pizza', name: 'Mini Pizza Calabresa', price: 'R$ 0,90', image: './assets/images/minipizza calabresa.webp' },
  { id: '4', category: 'Pizza', name: 'Pizza Broto Milho e Bacon', price: 'R$ 14,50', image: './assets/images/brotomilhoo.png' },
  { id: '5', category: 'Lasanha', name: 'Lasanha Bolonhesa 500g', price: 'R$ 16,50', image: './assets/images/lasanhacarne.webp' },
  { id: '6', category: 'Panqueca', name: 'Panqueca de Frango', price: 'R$ 14,00', image: './assets/images/panqueca.webp' },
  { id: '7', category: 'Bolo', name: 'Bolo de Pote de Maracujá', price: 'R$ 12,00', image: './assets/images/Bolomaracuja.webp' },
  { id: '8', category: 'Bolo', name: 'Bolo de Pote de Paçoca', price: 'R$ 12,00', image: './assets/images/pacoca.jpeg' },
  { id: '9', category: 'Bolo', name: 'Bolo de Pote de Morango', price: 'R$ 12,00', image: './assets/images/bolomorango.jpg' },
  { id: '10', category: 'Bolo', name: 'Bolo de Pote de Prestígio', price: 'R$ 12,00', image: './assets/images/bolococo.jpg' },
  { id: '11', category: 'Bolo', name: 'Bolo de Pote de Leite Ninho', price: 'R$ 12,00', image: './assets/images/Recheio-de-leite-ninho.jpg' },
  { id: '12', category: 'Pizza', name: 'Pizza Broto Frango', price: 'R$ 14,50', image: './assets/images/minipizzafrango.jpg' },
  { id: '13', category: 'Pizza', name: 'Pizza Broto Calabresa', price: 'R$ 14,50', image: './assets/images/pizzabrotocalabresa.jpg' },
  { id: '14', category: 'Lasanha', name: 'Lasanha Bolonhesa 750g', price: 'R$ 18,50', image: './assets/images/lasanhacarne.webp' },
  { id: '15', category: 'Lasanha', name: 'Lasanha Frango 750g', price: 'R$ 18,50', image: './assets/images/lasanhacarne.webp' },
  { id: '16', category: 'Pizza', name: 'Mini Pizza Frango', price: 'R$ 0,90', image: './assets/images/minipizzafrangoo.jpg' },
  { id: '17', category: 'Pizza', name: 'Mini Pizza Margherita', price: 'R$ 0,90', image: './assets/images/minipizza calabresa.webp' },
  { id: '18', category: 'Pizza', name: 'Mini Pizza Milho e Bacon', price: 'R$ 0,90', image: './assets/images/minipizza calabresa.webp' },
  { id: '19', category: 'Panqueca', name: 'Panqueca de Carne', price: 'R$ 14,00', image: './assets/images/panqueca.webp' }
];

// Renderiza os produtos
function renderGrid(category) {
  const grid = document.getElementById('productGrid');
  const filteredProducts = category === 'Todos' ? produtos : produtos.filter(p => p.category === category);
  grid.innerHTML = '';
  filteredProducts.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-image">
      <h2 class="product-name">${p.name}</h2>
      <span class="product-price">${p.price}</span>
      <button class="btn-comprar" onclick="abrirModal('${p.name}', '${p.price}', '${p.image}')">Comprar</button>
    `;
    grid.appendChild(card);
  });
}

// Modal
function abrirModal(nome, preco, imagem) {
  itemCount = 1;
  document.getElementById('modal-product-name').innerText = nome;
  document.getElementById('modal-product-price').innerText = preco;
  document.getElementById('modal-product-image').src = imagem;
  document.getElementById('modal-item-count').innerText = itemCount;
  document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

function alterarQuantidade(quantidade) {
  itemCount += quantidade;
  if (itemCount < 1) itemCount = 1;
  document.getElementById('modal-item-count').innerText = itemCount;
}

function addToCart() {
  const nome = document.getElementById('modal-product-name').innerText;
  const preco = document.getElementById('modal-product-price').innerText;
  const imagem = document.getElementById('modal-product-image').src;

  const existente = cartItems.find(item => item.name === nome);
  if (existente) {
    existente.quantity += itemCount;
  } else {
    cartItems.push({ name: nome, price: preco, image: imagem, quantity: itemCount });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  cartCount += itemCount;
  document.getElementById('cartCount').innerText = cartCount;
  fecharModal();
}

// Categorias
document.querySelectorAll('.category-dot').forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategory = btn.getAttribute('data-category');
    renderGrid(currentCategory);
    document.querySelectorAll('.category-dot').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Aviso de entrega
window.onload = function () {
  const avisoKey = 'avisoEntregaExibido';
  const agora = Date.now();
  const avisoSalvo = Number(localStorage.getItem(avisoKey));
  if (!avisoSalvo || (agora - avisoSalvo) > 86400000) {
    document.getElementById("modalEntrega").style.display = "flex";
    localStorage.setItem(avisoKey, agora.toString());
  }

  document.getElementById('cartCount').innerText = cartCount;
  renderGrid(currentCategory);
};

function fecharModalAviso() {
  document.getElementById("modalEntrega").style.display = "none";
}

// Carrinho
function atualizarCarrinho() {
  const lista = document.getElementById('carrinhoLista');
  lista.innerHTML = '';

  if (cartItems.length === 0) {
    lista.innerHTML = '<p style="padding: 20px; text-align: center;">Seu carrinho está vazio.</p>';
    document.getElementById('totalCarrinho').innerText = 'R$ 0,00';
    return;
  }

  let totalGeral = 0;

  cartItems.forEach((item, index) => {
    const precoUnitario = parseFloat(item.price.replace('R$', '').replace(',', '.'));
    const totalItem = precoUnitario * item.quantity;
    totalGeral += totalItem;

    const div = document.createElement('div');
    div.className = 'carrinho-item';

    div.innerHTML = `
      <div class="carrinho-item-info">
        <img src="${item.image}" alt="${item.name}">
        <div class="carrinho-item-texto">
          <strong>${item.name}</strong>
          <span>Qtd: ${item.quantity} x ${item.price}</span>
          <span>Total do item: R$ ${totalItem.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>
      <button class="carrinho-remover" onclick="removerItem(${index})">×</button>
    `;

    lista.appendChild(div);
  });

  document.getElementById('totalCarrinho').innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
}


    function voltarParaLoja() {
      document.getElementById("paginaCarrinho").style.display = "none";
      document.getElementById("paginaLoja").style.display = "block";
    }

