import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import firebaseConfig from './firebase/firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let itemCount = 1;
let currentCategory = 'Todos';
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let produtos = [];

async function carregarProdutos() {
  try {
    const produtosDocRef = doc(db, "cadastros", "produtos");
    const produtoSubcolRef = collection(produtosDocRef, "produto");
    const snapshot = await getDocs(produtoSubcolRef);
    produtos = [];

    snapshot.forEach(doc => {
      const data = doc.data();

      if (data.disponivel !== false) { // filtra só disponíveis
        produtos.push({
          id: doc.id,
          name: data.name,
          price: data.price,
          image: data.image,
          category: data.category
        });
      }
    });

    console.log("Produtos carregados:", produtos); // LOG AQUI
    return produtos;

  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    return [];
  }
}


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

  // Pega o produto completo no array produtos para achar o id
  const produto = produtos.find(p => p.name === nome);

  if (!produto) {
    alert("Produto não encontrado.");
    return;
  }

  const existente = cartItems.find(item => item.id === produto.id);
  if (existente) {
    existente.quantity += itemCount;
  } else {
    cartItems.push({ id: produto.id, name: nome, price: preco, image: imagem, quantity: itemCount });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  atualizarContadorCarrinho();
  fecharModal();
}


function atualizarContadorCarrinho() {
  const contador = document.getElementById('cartCount');
  const totalItens = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  contador.innerText = totalItens;

  if (totalItens > 0) {
    contador.classList.add('visible');
  } else {
    contador.classList.remove('visible');
  }
}
// Expõe a função no escopo global para evitar erro
window.atualizarContadorCarrinho = atualizarContadorCarrinho;

function atualizarCarrinho() {
  const lista = document.getElementById('carrinhoLista');
  lista.innerHTML = '';

  if (cartItems.length === 0) {
    lista.innerHTML = '<p style="padding: 20px; text-align: center;">Seu carrinho está vazio.</p>';
    document.getElementById('totalCarrinho').innerText = 'R$ 0,00';
    atualizarContadorCarrinho();
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
  atualizarContadorCarrinho();
}

function removerItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  atualizarCarrinho();
}

function voltarParaLoja() {
  document.getElementById("paginaUsuario").style.display = 'none';
  document.getElementById("paginaCarrinho").style.display = 'none';
  document.getElementById("paginaLoja").style.display = 'block';
}

function irParaCarrinho() {
  document.getElementById("paginaLoja").style.display = 'none';
  document.getElementById("paginaCarrinho").style.display = 'block';
  atualizarCarrinho();
}

// Modal aviso entrega (1x ao dia)
function fecharModalAviso() {
  document.getElementById("modalEntrega").style.display = 'none';
}

// Checkout
function openCheckoutModal() {
  if(cartItems.length === 0) {
    alert('Seu carrinho está vazio.');
    return;
  }
  document.getElementById('checkoutModal').style.display = 'flex';
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal').style.display = 'none';
  document.getElementById('userName').value = '';
  document.getElementById('userPhone').value = '';
  document.getElementById('userObs').value = '';
}

function validateCheckout() {
  const name = document.getElementById('userName').value.trim();
  const phone = document.getElementById('userPhone').value.trim();
  if (!name) {
    alert('Por favor, insira seu nome.');
    return false;
  }
  if (!phone || !/^\d{10,11}$/.test(phone)) {
    alert('Por favor, insira um telefone válido com 10 ou 11 números.');
    return false;
  }
  return true;
}

async function confirmCheckout() {
  const userName = document.getElementById('userName').value.trim();
  const userPhoneRaw = document.getElementById('userPhone').value.trim();
  const orderNotes = document.getElementById('userObs').value.trim(); // Ajustado aqui

  if (userName === '') {
    alert('Por favor, preencha seu nome.');
    return;
  }

  const userPhone = userPhoneRaw.replace(/\D/g, '');
  if (userPhone.length < 10 || userPhone.length > 11) {
    alert('Número de telefone inválido. Informe um número com DDD.');
    return;
  }

  // Fecha modal de checkout
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.style.display = 'none';

  // Gera próximo ID numérico do pedido
  const numeroPedido = await gerarProximoIdPedido();

  // Calcula valor total formatado
  const valorTotal = 'R$ ' + cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace('R$', '').replace(',', '.')) * item.quantity;
  }, 0).toFixed(2).replace('.', ',');

  // Monta objeto do pedido
  const newOrder = {
    id: numeroPedido,
    cliente: userName,
    telefone: userPhone,
    valor: valorTotal,
    observacoes: orderNotes,
   itens: cartItems.map(item => ({
  produto: item.id,
  nome: item.name,
  quantidade: item.quantity,
  valorUnitario: item.price,
  valorTotal: 'R$ ' + (parseFloat(item.price.replace('R$', '').replace(',', '.')) * item.quantity).toFixed(2).replace('.', ',')
})),
    horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    data: new Date().toLocaleDateString('pt-BR'),
    status: 'recebido'
  };

  try {
    await setDoc(doc(db, 'pedidos', numeroPedido), newOrder);
    console.log("Pedido salvo com ID personalizado:", numeroPedido);

    const existingOrders = JSON.parse(localStorage.getItem('pedidos')) || [];
    existingOrders.push(newOrder);
    localStorage.setItem('pedidos', JSON.stringify(existingOrders));
  } catch (e) {
    console.error("Erro ao salvar pedido no Firebase:", e);
    alert("Erro ao registrar o pedido. Tente novamente.");
    return;
  }

  // Emoji para categorias (ajuste caso suas categorias mudem)
  const emojiMap = {
    'Bolo': '🍰',
    'Mini Pizza': '🍕',
    'Pizza Broto': '🍕',
    'Lasanha': '🍝',
    'Panqueca': '🥞'
  };

  // Monta mensagem para WhatsApp
  let message = `👤 *Nome:* ${userName}\n📱 *Tel:* (${userPhone.substring(0, 2)}) ${userPhone.substring(2)}\n📦 *Resumo do Pedido:*\n\n`;
  cartItems.forEach(item => {
    const emoji = emojiMap[item.category] || '🛒';
    message += `${emoji} ${item.name} - ${item.quantity} x ${item.price}\n`;
  });
  message += `\n💰 *Total:* ${newOrder.valor}`;
  if (orderNotes !== '') {
    message += `\n📝 *Observações:* ${orderNotes}`;
  }
  message += `\n📧 *Chave Pix (E-mail):* panelinhadosaborscs@gmail.com`;

  const encodedMessage = encodeURIComponent(message);
  const vendedorPhone = '5551980533191';
  window.open(`https://wa.me/${vendedorPhone}?text=${encodedMessage}`, '_blank');

  // Limpa carrinho e atualiza interface
  cartItems = [];
  localStorage.removeItem('cartItems');

  // Atualiza carrinho na tela (ajuste renderCart para atualizar #carrinhoLista e #totalCarrinho)
  if (typeof renderCart === 'function') renderCart();

  // Atualiza pedidos se função existir
  if (typeof carregarPedidos === 'function') carregarPedidos();
}

window.confirmCheckout = confirmCheckout;




// Histórico de pedidos (exemplo local, substitua pela sua fonte real)
const historicoPedidos = [
  {
    id: '1',
    telefone: '11999999999',
    nome: 'João Silva',
    pedidos: [
      {
        data: '2025-05-12',
        itens: [
          { nome: 'Bolo de Pote de Limão', preco: 'R$ 12,00' },
          { nome: 'Coxinha de Frango', preco: 'R$ 5,00' }
        ]
      }
    ]
  }
  // ... outros clientes
];

function buscarHistorico() {
  const telefone = document.getElementById('telefoneConsulta').value.trim();
  const resultadoDiv = document.getElementById('resultadoHistorico');

  const cliente = historicoPedidos.find(p => p.telefone === telefone);

  if (!cliente) {
    resultadoDiv.innerHTML = `<p style="color:red;">Nenhum pedido encontrado para o telefone informado.</p>`;
    return;
  }

  let html = `<h3>Histórico de ${cliente.nome}</h3>`;

  const pedidosOrdenados = [...cliente.pedidos].sort((a,b) => new Date(b.data) - new Date(a.data));

  pedidosOrdenados.forEach(pedido => {
    let total = 0;
    html += `<h4>🗓️ ${pedido.data}</h4><ul>`;
    pedido.itens.forEach(item => {
      const preco = parseFloat(item.preco.replace('R$', '').replace(',', '.').trim());
      total += preco;
      html += `<li>🧁 ${item.nome} - <strong>${item.preco}</strong></li>`;
    });
    html += `</ul><p><strong>Total:</strong> R$ ${total.toFixed(2).replace('.', ',')}</p>`;
  });

  resultadoDiv.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", async () => {
  await carregarProdutos();
  renderGrid(currentCategory);
  atualizarContadorCarrinho();

  // Modal entrega (1x ao dia)
  const avisoKey = 'avisoEntregaExibido';
  const agora = Date.now();
  const avisoSalvo = Number(localStorage.getItem(avisoKey));
  if (!avisoSalvo || (agora - avisoSalvo) > 86400000) {
    document.getElementById("modalEntrega").style.display = "flex";
    localStorage.setItem(avisoKey, agora.toString());
  }

  // Eventos para categorias
  document.querySelectorAll('.category-dot').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.getAttribute('data-category');
      renderGrid(currentCategory);
      document.querySelectorAll('.category-dot').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  function abrirPaginaUsuario() {
  document.getElementById("paginaLoja").style.display = 'none';
  document.getElementById("paginaCarrinho").style.display = 'none';
  document.getElementById("paginaUsuario").style.display = 'block';
}

const gerarProximoIdPedido = async () => {
  const snapshot = await getDocs(collection(db, "pedidos"));
  let maior = 0;
  snapshot.forEach(docSnap => {
    const id = docSnap.id;
    const num = parseInt(id, 10);
    if (!isNaN(num) && num > maior) {
      maior = num;
    }
  });
  return String(maior + 1).padStart(4, '0');
};




  // Expor funções globais para uso em HTML (onclick)
  window.irParaCarrinho = irParaCarrinho;
  window.voltarParaLoja = voltarParaLoja;
  window.abrirModal = abrirModal;
  window.fecharModal = fecharModal;
  window.alterarQuantidade = alterarQuantidade;
  window.addToCart = addToCart;
  window.removerItem = removerItem;
  window.fecharModalAviso = fecharModalAviso;
  window.openCheckoutModal = openCheckoutModal;
  window.closeCheckoutModal = closeCheckoutModal;
  window.confirmCheckout = confirmCheckout;
  window.buscarHistorico = buscarHistorico;
    window.abrirPaginaUsuario = abrirPaginaUsuario;
    window.gerarProximoIdPedido = gerarProximoIdPedido;

});
