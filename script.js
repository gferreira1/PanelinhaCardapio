let cartCount = 0;
let itemCount = 1;
let currentCategory = 'Todos';
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const produtos = [
  { id: '1', category: 'Bolo', name: 'Bolo de Pote de Limão', price: 'R$ 12,00', image: './assets/images/bololimao.webp' },
  { id: '2', category: 'Bolo', name: 'Bolo de Pote de Brigadeiro', price: 'R$ 12,00', image: './assets/images/bolobrigadeiro.webp' },
  { id: '3', category: 'Mini Pizza', name: 'Mini Pizza Calabresa', price: 'R$ 25,00', image: './assets/images/minipizza calabresa.webp' },
  { id: '4', category: 'Pizza Broto', name: 'Pizza Broto 4 Queijos', price: 'R$ 25,00', image: './assets/images/pizzabrotoqueijo.webp' },
  { id: '5', category: 'Lasanha', name: 'Lasanha Bolonhesa', price: 'R$ 30,00', image: './assets/images/lasanhacarne.webp' },
  { id: '6', category: 'Panqueca', name: 'Panqueca de Frango', price: 'R$ 15,00', image: './assets/images/panqueca.webp' },
  { id: '7', category: 'Bolo', name: 'Bolo de Pote de Maracuja', price: 'R$ 12,00', image: './assets/images/Bolomaracuja.webp' },
];

// Função de exibição de produtos em grade
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

function abrirModal(productName, productPrice, productImage) {
  itemCount = 1;
  document.getElementById('modal-product-name').innerText = productName;
  document.getElementById('modal-product-price').innerText = productPrice;
  document.getElementById('modal-product-image').src = productImage;
  document.getElementById('modal-item-count').innerText = itemCount;
  document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

function alterarQuantidade(amount) {
  itemCount += amount;
  if (itemCount < 1) itemCount = 1;
  document.getElementById('modal-item-count').innerText = itemCount;
}

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

document.querySelectorAll('.category-dot').forEach(button => {
  button.addEventListener('click', () => {
    currentCategory = button.getAttribute('data-category');
    renderGrid(currentCategory);
    document.querySelectorAll('.category-dot').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

document.getElementById('cartIcon').addEventListener('click', function() {
  window.location.href = 'carrinho.html';
});

renderGrid('Todos');
