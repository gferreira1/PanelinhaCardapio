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
  { id: '25', category: 'Todos', name: 'Pao Grande  ', price: 'R$ 12,00', image: './assets/images/paooficial.jpeg' },
  { id: '26', category: 'Todos', name: 'Pao Pequeno', price: 'R$ 6,00', image: './assets/images/paooficial.jpeg' },
  { id: '27', category: 'Todos', name: 'Cueca Virada 250g', price: 'R$ 7,00', image: './assets/images/cuecavirada.jpeg' },
  { id: '28', category: 'Todos', name: 'Cuca Linguiça', price: 'R$ 28,00', image: './assets/images/panelalogo.png' },
  { id: '29', category: 'Todos', name: 'Cuca Abacaxi com Chocolate branco', price: 'R$ 28,00', image: './assets/images/panelalogo.png' },
  { id: '30', category: 'Pizza', name: 'Mini Pizza Carne Desfiada', price: 'R$ 1,00', image: './assets/images/minipizza calabresa.webp' },
  { id: '31', category: 'Todos', name: 'Cuca de Chocolate', price: 'R$ 28,00', image: './assets/images/panelalogo.png' },
  { id: '32', category: 'Todos', name: 'Cuca de Coco', price: 'R$ 25,00', image: './assets/images/panelalogo.png' },
  { id: '33', category: 'Todos', name: 'Cuca de Goiaba', price: 'R$ 25,00', image: './assets/images/panelalogo.png' },
  { id: '34', category: 'Todos', name: 'Cuca de Abacaxi com Chocolate', price: 'R$ 28,00', image: './assets/images/panelalogo.png' },
  { id: '35', category: 'Todos', name: 'Cuca de Açucar', price: 'R$ 25,00', image: './assets/images/panelalogo.png' },
  { id: '36', category: 'Todos', name: 'Cuca de Frambroesa', price: 'R$ 25,00', image: './assets/images/panelalogo.png' },
   { id:'37', category: 'Lasanha', name: 'Lasanha de Carne Desfiado 500g', price: 'R$ 16,50', image: './assets/images/lasanhacarne.webp' },
  { id: '38', category: 'Lasanha', name: 'Lasanha de Carne Desfiado 750g', price: 'R$ 18,50', image: './assets/images/lasanhacarne.webp' },
  { 
  id: '39',
  category: 'Todos',
  name: 'Kit Festa 1',
  price: 'R$ 12,00',
  image: './assets/images/panelalogo.png',
  options: [
    {
      label: 'Cachorrinho ou Mini Hambúrguer:',
      choices: ['Cachorro-quente', 'Mini Hambúrguer']
    },
    {
      label: 'Mini pizza 2 sabores:',
      choices: [
        'Calabresa',
        'Carne Desfiada',
        'Frango',
        'Margherita',
        'Brócolis',
        'Milho, Pimentão, Cebola, Alho e Tomate'
      ],
      multiple: 2
    },
    {
      label: 'Quiche ou Esfirra:',
      choices: ['Quiche', 'Esfirra de Frango', 'Esfirra de Carne', 'Esfirra de Calabresa']
    }
  ],
  description: [
    '2 doces (Brigadeiro e Beijinho)',
    '2 Pastéis mini'
  ]
},
{ 
  id: '40',
  category: 'Todos',
  name: 'Kit Festa 2',
  price: 'R$ 6,00',
  image: './assets/images/panelalogo.png',
  options: [
    {
      label: 'Cachorrinho ou Mini Hambúrguer:',
      choices: ['Cachorro-quente', 'Mini Hambúrguer']
    },
    {
      label: 'Mini pizza 2 sabores:',
      choices: ['Calabresa e Frango', 'Mussarela e Presunto', 'Quatro Queijos']
    },
   
  ],
  description: [
    '2 doces (Brigadeiro e Beijinho)',
  ]
}
  
];

// Função para exibir os produtos na grade


function alterarQuantidadeKit(amount) {
  itemCountKit += amount;
  if (itemCountKit < 1) itemCountKit = 1; // mínimo 1
  const kitQtyEl = document.getElementById('kit-quantity');
  if (kitQtyEl) kitQtyEl.innerText = itemCountKit;
  atualizarPrecoKit();
}

function atualizarPrecoKit() {
  if (!currentKit) return;
  let precoNum = parseFloat(currentKit.price.replace('R$', '').replace(',', '.'));
  let total = precoNum * itemCountKit;
  const kitPriceEl = document.getElementById('kit-price');
  if (kitPriceEl) kitPriceEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}


function renderGrid(category) {
  const grid = document.getElementById('productGrid');
  const filteredProducts = category === 'Todos'
    ? produtos
    : produtos.filter(product => product.category === category);

  grid.innerHTML = ''; // Limpa a grade

  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card');

    if (product.options) {
      // Produto é um kit → botão "Selecionar"
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h2 class="product-name">${product.name}</h2>
        <span class="product-price">${product.price}</span>
        <button class="btn-selecionar" onclick="abrirModalKit('${product.id}')">Selecionar</button>
      `;
    } else {
      // Produto normal → botão "Comprar"
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h2 class="product-name">${product.name}</h2>
        <span class="product-price">${product.price}</span>
        <button class="btn-comprar" onclick="abrirModal('${product.name}', '${product.price}', '${product.image}')">Comprar</button>
      `;
    }

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
    document.querySelectorAll('.category-dot').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filterAndRender(); // chama a função unificada
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

  filterAndRender();
};


// --- PESQUISA DE PRODUTOS PELO NOME ---
function filterAndRender() {
  const termo = document.querySelector('.search-input').value.toLowerCase();
  const filteredProducts = produtos.filter(product => {
    const matchCategory = currentCategory === 'Todos' || product.category === currentCategory;
    const matchSearch = product.name.toLowerCase().includes(termo);
    return matchCategory && matchSearch;
  });

  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card', 'item');

    if (product.options) {
      // Kit
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h2 class="product-name produto">${product.name}</h2>
        <span class="product-price">${product.price}</span>
        <button class="btn-selecionar" onclick="abrirModalKit('${product.id}')">Selecionar</button>
      `;
    } else {
      // Produto normal
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h2 class="product-name produto">${product.name}</h2>
        <span class="product-price">${product.price}</span>
        <button class="btn-comprar" onclick="abrirModal('${product.name}', '${product.price}', '${product.image}')">Comprar</button>
      `;
    }

    grid.appendChild(card);
  });
}


// Configura a pesquisa ao digitar ou clicar na lupa
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');

  if (searchInput) {
    searchInput.addEventListener('input', filterAndRender); // pesquisa enquanto digita
  }

  if (searchButton) {
    searchButton.addEventListener('click', filterAndRender); // pesquisa ao clicar na lupa
  }
});







  // Fecha modal de aviso
function fecharModalAviso() {
  const modal = document.getElementById("modalEntrega");
  if (modal) {
    modal.style.display = "none";
  }
}



let currentKit = null; // guarda o kit selecionado
let itemCountKit = 1;

function abrirModalKit(id) {
  const kit = produtos.find(p => p.id === id);
  currentKit = kit;
  itemCountKit = 1; // reseta contador
  document.getElementById('kit-name').innerText = kit.name;
  document.getElementById('kit-quantity').innerText = itemCountKit;
  atualizarPrecoKit();

  // Limpa opções e descrição
  const optionsDiv = document.getElementById('kit-options');
  optionsDiv.innerHTML = '';
  const descUl = document.getElementById('kit-description');
  descUl.innerHTML = '';

  // Adiciona opções dinamicamente
  if (kit.options) {
    kit.options.forEach((opt, i) => {
      const label = document.createElement('label');
      label.innerText = opt.label;

      const select = document.createElement('select');
      select.id = `kit-option-${i}`;
      opt.choices.forEach(choice => {
        const optionEl = document.createElement('option');
        optionEl.value = choice;
        optionEl.innerText = choice;
        select.appendChild(optionEl);
      });

      optionsDiv.appendChild(label);
      optionsDiv.appendChild(select);
      optionsDiv.appendChild(document.createElement('br'));
    });
  }

  if (kit.description) {
    kit.description.forEach(desc => {
      const li = document.createElement('li');
      li.innerText = desc;
      descUl.appendChild(li);
    });
  }

  document.getElementById('modalKit').style.display = 'flex';
}


function fecharModalKit() {
  document.getElementById('modalKit').style.display = 'none';
}


function addKitToCart() {
  if (!currentKit) return;

  const selectedOptions = currentKit.options?.map((opt, i) => {
    const select = document.getElementById(`kit-option-${i}`);
    return { label: opt.label, choice: select.value };
  });

  const existingItem = cartItems.find(item => item.id === currentKit.id);
  if (existingItem) {
    existingItem.quantity += itemCountKit;
  } else {
    cartItems.push({
      id: currentKit.id,
      name: currentKit.name,
      price: currentKit.price,
      image: currentKit.image,
      quantity: itemCountKit,
      options: selectedOptions
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  cartCount += itemCountKit;
  document.getElementById('cartCount').innerText = cartCount;

  fecharModalKit();
}


















