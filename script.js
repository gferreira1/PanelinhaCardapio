let itemCount = 1;
let currentCategory = 'Todos';
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Corrigido

const produtos = [
  //{ id: '1', category: 'Bolo', name: 'Bolo de Pote de Limão', price: 'R$ 12,00', image: './assets/images/bololimão.jpg' },
  { id: '2', category: 'Bolo', name: 'Bolo de Pote de Brigadeiro', price: 'R$ 12,00', image: './assets/images/bolobrigadeiro.webp' },
  { id: '3', category: 'Pizza', name: 'Mini Pizza Calabresa', price: 'R$ 1,00', image: './assets/images/minipizza calabresa.webp' },
  { id: '4', category: 'Pizza', name: 'Pizza Broto Milho,Pimentão,cebola,alho e tomate', price: 'R$ 14,50', image: './assets/images/brotomilhoo.png' },
  { id: '5', category: 'Lasanha', name: 'Lasanha Bolonhesa 500g', price: 'R$ 16,50', image: './assets/images/lasanhacarne.webp' },
  { id: '6', category: 'Panqueca', name: 'Panqueca de Frango 500g', price: 'R$ 14,00', image: './assets/images/panqueca.webp' },
  { id: '7', category: 'Bolo', name: 'Bolo de Pote de Maracujá', price: 'R$ 12,00', image: './assets/images/Bolomaracuja.webp' },
  { id: '8', category: 'Bolo', name: 'Bolo de Pote de Paçoca', price: 'R$ 12,00', image: './assets/images/pacoca.jpeg' },
 // { id: '9', category: 'Bolo', name: 'Bolo de Pote de Morango', price: 'R$ 12,00', image: './assets/images/bolomorango.jpg' },
  { id: '10', category: 'Bolo', name: 'Bolo de Pote de Prestigio', price: 'R$ 12,00', image: './assets/images/bolococo.jpg' },
  { id: '11', category: 'Bolo', name: 'Bolo de Pote de Leite Ninho', price: 'R$ 12,00', image: './assets/images/Recheio-de-leite-ninho.jpg' },
  { id: '12', category: 'Pizza', name: 'Pizza Broto Frango ', price: 'R$ 14,50', image: './assets/images/minipizzafrango.jpg' },
  { id: '13', category: 'Pizza', name: 'Pizza Broto Calabresa ', price: 'R$ 14,50', image: './assets/images/pizzabrotocalabresa.jpg' },
  { id: '14', category: 'Lasanha', name: 'Lasanha de Frango 500g', price: 'R$ 16,50', image: './assets/images/lasanhacarne.webp' },
  { id: '15', category: 'Lasanha', name: 'Lasanha Bolonhesa 750g', price: 'R$ 18,50', image: './assets/images/lasanhacarne.webp' },
  { id: '16', category: 'Lasanha', name: 'Lasanha Frango 750g', price: 'R$ 18,50', image: './assets/images/lasanhacarne.webp' },
  { id: '17', category: 'Pizza', name: 'Mini Pizza Frango', price: 'R$ 1,00', image: './assets/images/minipizzafrangoo.jpg' },
  { id: '18', category: 'Pizza', name: 'Mini Pizza Margherita', price: 'R$ 1,00', image: './assets/images/minipizza calabresa.webp' },
  { id: '19', category: 'Pizza', name: 'Mini Pizza Milho,Pimentão,cebola,alho e tomate', price: 'R$ 1,00', image: './assets/images/minipizza calabresa.webp' },
  { id: '20', category: 'Panqueca', name: 'Panqueca de Carne 500g', price: 'R$ 14,00', image: './assets/images/panqueca.webp' },
  { id: '21', category: 'Panqueca', name: 'Panqueca de Carne 700g', price: 'R$ 16,00', image: './assets/images/panqueca.webp' },
  { id: '22', category: 'Panqueca', name: 'Panqueca de Frango 700g', price: 'R$ 16,00', image: './assets/images/panqueca.webp' }, 
  { id: '23', category: 'Pizza', name: 'Pizza broto Carne de Panela', price: 'R$ 14,50', image: './assets/images/brotomilhoo.png' },
  { id: '24', category: 'Pizza', name: 'Mini Pizza de Brócolis ', price: 'R$ 1,00', image: './assets/images/Mini-pizza-de-brocolis.jpg' },
  { id: '25', category: 'Todos', name: 'Pao ', price: 'R$ 12,00', image: './assets/images/pao.jpeg' },
  { id: '26', category: 'Todos', name: 'Cueca Virada 250g', price: 'R$ 7,00', image: './assets/images/cuecavirada.jpeg' },
  { id: '27', category: 'Todos', name: 'Cuca Linguiça', price: 'R$ 28,00', image: './assets/images/panelalogo.png' },
  { id: '28', category: 'Todos', name: 'Cuca Abacaxi com Chocolate branco', price: 'R$ 28,00', image: './assets/images/panelalogo.png' },
  { id: '29', category: 'Pizza', name: 'Mini Pizza Carne Desfiada', price: 'R$ 1,00', image: './assets/images/minipizza calabresa.webp' },
  { id: '30', category: 'Todos', name: 'Cuca de Chocolate', price: 'R$ 28,00', image: './assets/images/panelalogo.png' },
  { id: '31', category: 'Todos', name: 'Cuca de Coco', price: 'R$ 28,00', image: './assets/images/panelalogo.png' },
  { id: '32', category: 'Todos', name: 'Cuca de Goiaba', price: 'R$ 28,00', image: './assets/images/panelalogo.png' },
  { id: '33', category: 'Todos', name: 'Cuca de Abacaxi com Chocolate', price: 'R$ 28,00', image: './assets/images/panelalogo.png' },
  { id: '34', category: 'Todos', name: 'Cuca de Açucar', price: 'R$ 28,00', image: './assets/images/panelalogo.png' },
  { id: '35', category: 'Todos', name: 'Cuca de Frambroesa', price: 'R$ 28,00', image: './assets/images/panelalogo.png' },
    
];

// Função para exibir os produtos na grade
function renderGrid(category) {
  const grid = document.getElementById('productGrid');
  const filteredProducts = category === 'Todos'
    ? produtos
    : produtos.filter(product => product.category === category);

  grid.innerHTML = ''; // Limpa a grade

  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h2 class="product-name">${product.name}</h2>
      <span class="product-price">${product.price}</span>
      <button class="btn-comprar" onclick="abrirModal('${product.name}', '${product.price}', '${product.image}')">Comprar</button>
    `;

    grid.appendChild(card);
  });
}

// Função para abrir o modal de compra
function abrirModal(productName, productPrice, productImage) {
  itemCount = 1;
  document.getElementById('modal-product-name').innerText = productName;
  document.getElementById('modal-product-price').innerText = productPrice;
  document.getElementById('modal-product-image').src = productImage;
  document.getElementById('modal-item-count').innerText = itemCount;
  document.getElementById('modal').style.display = 'flex';
}

// Fecha o modal de compra
function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

// Altera a quantidade no modal
function alterarQuantidade(amount) {
  itemCount += amount;
  if (itemCount < 1) itemCount = 1;
  document.getElementById('modal-item-count').innerText = itemCount;
}

// Adiciona produto ao carrinho
function addToCart() {
  const productName = document.getElementById('modal-product-name').innerText;
  const productPrice = document.getElementById('modal-product-price').innerText;
  const productImage = document.getElementById('modal-product-image').src;

  const existingItem = cartItems.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += itemCount;
  } else {
    cartItems.push({
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: itemCount
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  cartCount += itemCount;
  document.getElementById('cartCount').innerText = cartCount;
  fecharModal();
}

// Eventos para alternar entre categorias
document.querySelectorAll('.category-dot').forEach(button => {
  button.addEventListener('click', () => {
    currentCategory = button.getAttribute('data-category');
    renderGrid(currentCategory);
    document.querySelectorAll('.category-dot').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

// Clique no carrinho
document.getElementById('cartIcon').addEventListener('click', function () {
  window.location.href = 'carrinho.html';
});

// Exibe todos os produtos ao carregar

window.onload = function () {
  const avisoKey = 'avisoEntregaExibido';
  const agora = Date.now();

  const avisoSalvoStr = localStorage.getItem(avisoKey);
  const avisoSalvo = avisoSalvoStr ? Number(avisoSalvoStr) : null;

  console.log('Carregando página...');
  console.log('Timestamp salvo:', avisoSalvo);
  console.log('Timestamp atual:', agora);

  if (!avisoSalvo || (agora - avisoSalvo) > 24 * 60 * 60 * 1000) {
    console.log('Exibindo aviso de entrega...');
    const modal = document.getElementById("modalEntrega");
    if (modal) {
      modal.style.display = "flex";
    }
    localStorage.setItem(avisoKey, agora.toString());
    console.log('Timestamp salvo no localStorage.');
  } else {
    console.log('Aviso já exibido dentro do prazo.');
  }

  // Atualização do carrinho e grid
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    cartCountElement.innerText = cartCount;
    cartCountElement.classList.add('visible');
  }

  renderGrid(currentCategory);
};




  // Fecha modal de aviso
function fecharModalAviso() {
  const modal = document.getElementById("modalEntrega");
  if (modal) {
    modal.style.display = "none";
  }
}










