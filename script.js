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
  quantidade: 14, // quantidade de kits
  valorTotal: 'R$ 168,00',
  itens: [
    { nome: 'Mini Cachorro-Quente', quantidade: 1 },
    { nome: 'Mini Pizza de Frango', quantidade: 1 },
    { nome: 'Mini Pizza de Calabresa', quantidade: 1 },
    { nome: 'Esfirra', quantidade: 1 },
    { nome: 'Docinhos Sortidos', quantidade: 2 }
  ],
  options: [
    {
      label: 'Mini cachorro ou Mini Hambúrguer:',
      choices: ['Mini cachorro', 'Mini Hambúrguer']
    },
    {
      label: 'Mini pizza 2 sabores:',
      choices: [
        'Frango',
        'Carne Desfiada',
        'Calabresa',
        'Brócolis',
        'Milho, Pimentão, Cebola, Alho e Tomate'
      ],
      multiple: 2
    },
    {
      label: 'Esfirra ou Empada Aberta:',
      choices: [
        'Esfirra de Carne',
        'Esfirra de Frango',
        'Esfirra de Calabresa',
        'Empada Aberta Frango',
        'Empada Aberta Bacon',
        'Empada Aberta Calabresa'
      ]
    },
    {
      label: '2 mini Pastel:',
      choices: ['Carne', 'Frango', 'Pizza']
    }
  ],
  description: [
    '2 doces (Brigadeiro e Beijinho)',
  ]
},
{ 
  id: '40',
  category: 'Todos',
  name: 'Kit Festa 2',
  price: 'R$ 8,00',
  image: './assets/images/panelalogo.png',
  quantidade: 10,
  valorTotal: 'R$ 80,00',
  itens: [
    { nome: 'Mini Cachorro-Quente', quantidade: 10 },
    { nome: 'Mini Pizza de Frango', quantidade: 10 },
    { nome: 'Esfirra', quantidade: 10 },
    { nome: 'Docinhos Sortidos', quantidade: 20 }
  ],
  options: [
    {
      label: 'mini cachorrinho ou Mini Hambúrguer:',
      choices: ['mini cachorrinho', 'Mini Hambúrguer']
    },
    {
      label: 'Mini pizza 2 sabores:',
      choices: [
        'Frango',
        'Carne Desfiada',
        'Calabresa',
        'Brócolis',
        'Milho, Pimentão, Cebola, Alho e Tomate'
      ],
      multiple: 2
    },
    {
      label: '2 mini Pastel:',
      choices: ['Carne', 'Frango', 'Pizza']
    }
  ],
  description: [
    '2 doces (Brigadeiro e Beijinho)',
  ]
},
{ id: '41', category: 'Todos', name: 'Mini Cachorro', price: 'R$ 2,50', image: './assets/images/minihamburguer.jpeg' },
{ id: '42', category: 'Todos', name: 'Mini hamburguer', price: 'R$ 2,50', image: './assets/images/minicachorro.jpeg' }

  
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
// Função para abrir o modal de compra
function abrirModal(productName, productPrice, productImage) {
  const produtosMin20 = ["Mini Cachorro", "Mini hamburguer"];

  itemCount = produtosMin20.includes(productName) ? 20 : 1;

  document.getElementById('modal-product-name').innerText = productName;
  document.getElementById('modal-product-price').innerText = productPrice;
  document.getElementById('modal-product-image').src = productImage;
  document.getElementById('modal-item-count').innerText = itemCount;

  // Esconde o aviso ao abrir o modal
  const aviso = document.getElementById('modal-quantidade-aviso');
  aviso.style.display = "none";

  document.getElementById('modal').style.display = 'flex';
}

// Fecha o modal
function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

// Altera a quantidade no modal
function alterarQuantidade(amount) {
  const productName = document.getElementById('modal-product-name').innerText;
  const produtosMin20 = ["Mini Cachorro", "Mini hamburguer"];
  const aviso = document.getElementById('modal-quantidade-aviso');

  itemCount += amount;

  if (produtosMin20.includes(productName)) {
    // Se tentar ir abaixo de 20, trava e mostra o aviso
    if (itemCount < 20) {
      itemCount = 20;
      aviso.innerText = "Quantidade mínima: 20 unidades";
      aviso.style.color = "red";
      aviso.style.display = "block";
    } else {
      aviso.style.display = "none";
    }
  } else {
    // Produtos normais — mínimo 1
    if (itemCount < 1) itemCount = 1;
    aviso.style.display = "none";
  }

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

  // Garante que o preço seja numérico e esteja no formato correto
  if (!kit.price || kit.price === '') {
    console.warn(`⚠️ O kit "${kit.name}" está sem preço definido.`);
    kit.price = 'R$ 0,00';
  }

  document.getElementById('kit-name').innerText = kit.name;
  document.getElementById('kit-quantity').innerText = itemCountKit;
  atualizarPrecoKit(); // mostra o preço corretamente

  // Limpa opções e descrição
  const optionsDiv = document.getElementById('kit-options');
  optionsDiv.innerHTML = '';
  const descUl = document.getElementById('kit-description');
  descUl.innerHTML = '';

  // Adiciona opções dinamicamente
  if (kit.options) {
    kit.options.forEach((opt, i) => {
      const groupDiv = document.createElement('div');
      groupDiv.classList.add('option-group');

      const label = document.createElement('p');
      label.innerText = opt.label;
      groupDiv.appendChild(label);

      // 🔹 Se for mini pizza (2 sabores)
      // 🔹 Se for mini pizza (2 sabores)
if (opt.multiple && opt.multiple > 1) {
  const saborContainer = document.createElement('div');
  saborContainer.style.display = 'flex';
  saborContainer.style.justifyContent = 'space-between';
  saborContainer.style.gap = '10px';

  for (let j = 0; j < opt.multiple; j++) {
    const select = document.createElement('select');
    select.classList.add('kit-select');
    select.required = true;
    select.style.width = '100%';

    // 🔸 Remove placeholder e define primeira opção como padrão
    opt.choices.forEach((choice, index) => {
      const optionEl = document.createElement('option');
      optionEl.value = choice;
      optionEl.innerText = choice;
      if (index === 0) optionEl.selected = true; // ✅ já vem selecionado
      select.appendChild(optionEl);
    });

    saborContainer.appendChild(select);
  }

  groupDiv.appendChild(saborContainer);
}


      
      // 🔹 Outras opções (sem múltipla escolha)
else {
  const select = document.createElement('select');
  select.id = `kit-option-${i}`;
  select.classList.add('kit-select');

  // Define a primeira opção como padrão (sem placeholder)
  opt.choices.forEach((choice, index) => {
    const optionEl = document.createElement('option');
    optionEl.value = choice;
    optionEl.innerText = choice;
    if (index === 0) optionEl.selected = true; // ✅ primeira já selecionada
    select.appendChild(optionEl);
  });

  groupDiv.appendChild(select);
}


      optionsDiv.appendChild(groupDiv);
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

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  return parseFloat(priceStr.replace('R$', '').replace('.', '').replace(',', '.')) || 0;
}

function atualizarPrecoKit() {
  if (!currentKit) return;
  const precoBase = parsePrice(currentKit.price);
  const total = precoBase * itemCountKit;
  const precoEl = document.getElementById('kit-price');
  if (precoEl) precoEl.innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

function alterarQuantidadeKit(delta) {
  itemCountKit += delta;
  if (itemCountKit < 1) itemCountKit = 1;
  document.getElementById('kit-quantity').innerText = itemCountKit;
  atualizarPrecoKit();
}

function addKitToCart() {
  if (!currentKit) return;

  const selectedOptions = currentKit.options?.map((opt, i) => {
    const select = document.getElementById(`kit-option-${i}`);
    return { label: opt.label, choice: select ? select.value : null };
  });

  // Preço do kit (transforma de R$ 12,00 → 12.00)
  const priceNumber = parseFloat(currentKit.price.replace('R$', '').replace(',', '.')) || 0;

  // Cria o array de itens desmembrados
  const itensDesmembrados = currentKit.itens.map(item => {
    return {
      nome: item.nome,
      quantidade: item.quantidade
    };
  });

  const existingItem = cartItems.find(item => item.id === currentKit.id);

  if (existingItem) {
    existingItem.quantity += itemCountKit;
    existingItem.itens = itensDesmembrados;
    existingItem.price = `R$ ${priceNumber.toFixed(2).replace('.', ',')}`; // atualiza o preço
  } else {
    cartItems.push({
      id: currentKit.id,
      name: currentKit.name,
      image: currentKit.image,
      quantity: itemCountKit,
      options: selectedOptions,
      category: currentKit.category || 'Kit',
      itens: itensDesmembrados,
      price: `R$ ${priceNumber.toFixed(2).replace('.', ',')}` // adiciona o preço
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  cartCount += itemCountKit;
  document.getElementById('cartCount').innerText = cartCount;
  fecharModalKit();

  console.log("✅ Kit adicionado ao carrinho:");
  console.log(JSON.stringify(cartItems[cartItems.length - 1], null, 2));
}







