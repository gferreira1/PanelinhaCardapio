import firebaseConfig from './firebase/firebaseConfig.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



// Inicializa Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// Variáveis de controle (mantidas iguais)
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Renderiza o carrinho (com mesmos IDs/classes)
function renderCart() {
  const cartContent = document.getElementById('cartContent');
  cartContent.innerHTML = '';

  if (cartItems.length === 0) {
    cartContent.innerHTML = '<p>Seu carrinho está vazio.</p>';
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) cartCountElement.innerText = 0;
    document.getElementById('checkoutButton').style.display = 'none';
    return;
  }

  let total = 0;
  let totalItems = 0;

  cartItems.forEach((item, index) => {
    const itemTotal = parseFloat(item.price.replace('R$', '').replace(',', '.')) * item.quantity;
    total += itemTotal;
    totalItems += item.quantity;

    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');

    // Cria conteúdo HTML do item
    cartItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-quantity">Qtd: ${item.quantity} x ${item.price}</p>
        <p class="cart-item-total">Total: R$ ${itemTotal.toFixed(2).replace('.', ',')}</p>
      </div>
    `;

    // Cria botão de excluir com event listener
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-item');
    removeButton.textContent = 'Excluir';
    removeButton.addEventListener('click', () => removeFromCart(index));
    cartItemElement.appendChild(removeButton);

    // Adiciona ao carrinho
    cartContent.appendChild(cartItemElement);
  });

  // Total geral
  const totalElement = document.createElement('div');
  totalElement.classList.add('cart-total');
  totalElement.innerHTML = `<h3>Total: R$ ${total.toFixed(2).replace('.', ',')}</h3>`;
  cartContent.appendChild(totalElement);

  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) cartCountElement.innerText = totalItems;

  document.getElementById('checkoutButton').style.display = 'block';
}


// Remove item (mantido igual)
function removeFromCart(index) {
  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  renderCart();
}

// Fecha o modal (mantido igual)
function closeModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.style.display = 'none';
}

// Confirma a compra (adaptada para integrar com seu painel)
async function confirmCheckout() {
  const userName = document.getElementById('userName').value.trim();
  const userPhoneRaw = document.getElementById('userPhone').value.trim();
  const orderNotes = document.getElementById('orderNotes').value.trim();

  if (userName === '') {
    alert('Por favor, preencha seu nome.');
    return;
  }

  const userPhone = userPhoneRaw.replace(/\D/g, '');

  if (userPhone.length < 10 || userPhone.length > 11) {
    alert('Número de telefone inválido. Informe um número com DDD (ex: 51999999999).');
    return;
  }

  closeModal();

const numeroPedido = Math.floor(1000 + Math.random() * 9000); // Ex: 7664
const newOrder = {
  id: '#' + numeroPedido, // Para exibição
  cliente: userName,
  telefone: userPhone, // ✅ TELEFONE INCLUÍDO AQUI
  valor: 'R$ ' + cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace('R$', '').replace(',', '.')) * item.quantity;
  }, 0).toFixed(2).replace('.', ','),
  observacoes: orderNotes,
  itens: cartItems.map(item => ({
    nome: item.name,
    quantidade: item.quantity,
    valorUnitario: item.price,
    valorTotal: 'R$ ' + (
      parseFloat(item.price.replace('R$', '').replace(',', '.')) * item.quantity
    ).toFixed(2).replace('.', ',')
  })),
  horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  data: new Date().toLocaleDateString('pt-BR'),
  status: 'recebido'
};

// Salvar com ID limpo (sem #) como identificador real no Firestore
await setDoc(doc(db, 'pedidos', numeroPedido.toString()), newOrder);



try {
  await setDoc(doc(db, 'pedidos', numeroPedido), newOrder);
  console.log("Pedido salvo com ID personalizado:", numeroPedido);

  // Salva também no localStorage
  const existingOrders = JSON.parse(localStorage.getItem('pedidos')) || [];
  existingOrders.push(newOrder);
  localStorage.setItem('pedidos', JSON.stringify(existingOrders));
} catch (e) {
  console.error("Erro ao salvar pedido no Firebase:", e);
  alert("Erro ao registrar o pedido. Tente novamente.");
  return;
}



  // 📲 Envia mensagem no WhatsApp
// 📲 Envia mensagem no WhatsApp
const emojiMap = {
  'Bolo': '🍰',
  'Mini Pizza': '🍕',
  'Pizza Broto': '🍕',
  'Lasanha': '🍝',
  'Panqueca': '🥞'
};

let message = `👤 *Nome:* ${userName}\n📱 *Tel:* (${userPhone.substring(0, 2)}) ${userPhone.substring(2)}\n📦 *Resumo do Pedido:*\n\n`;

cartItems.forEach(item => {
  const emoji = emojiMap[item.category] || '🛒';
  message += `${emoji} ${item.name} - ${item.quantity} x ${item.price}\n`;
});

message += `\n💰 *Total:* ${newOrder.valor}`;
if (orderNotes !== '') {
  message += `\n📝 *Observações:* ${orderNotes}`;
}

// ➕ Adiciona email para pagamento via Pix
message += `\n📧 *Chave Pix (E-mail):* panelinhadosaborscs@gmail.com`;

const encodedMessage = encodeURIComponent(message);
const vendedorPhone = '5551980533191';
window.open(`https://wa.me/${vendedorPhone}?text=${encodedMessage}`, '_blank');

// 🧹 Limpa carrinho e atualiza visual
cartItems = [];
localStorage.removeItem('cartItems');
renderCart();

if (typeof carregarPedidos === 'function') {
  carregarPedidos();
}
}


// Inicia tudo ao carregar (mantido igual)
document.addEventListener('DOMContentLoaded', function () {
  renderCart();

  const checkoutBtn = document.getElementById('checkoutButton');
  const phoneInput = document.getElementById('userPhone');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
      const modal = document.getElementById('checkoutModal');
      if (modal) modal.style.display = 'block';
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '');
      if (this.value.length > 11) {
        this.value = this.value.slice(0, 11);
      }
    });
  }
});

// Firebase

window.confirmCheckout = confirmCheckout;

window.removeFromCart = removeFromCart;







async function converterPedidosParaNumericos() {
  const colecaoRef = collection(db, 'pedidos');
  const snapshot = await getDocs(colecaoRef);
  let contador = 1001;

  for (const docSnap of snapshot.docs) {
    const docId = docSnap.id;

    // Pula se o ID já for numérico (ex: '1001', '1002', ...)
    if (!isNaN(parseInt(docId))) {
      console.log(`ℹ️ Pedido ${docId} já está com ID numérico, pulando...`);
      continue;
    }

    const docData = docSnap.data();
    const novoId = contador.toString();
    const novoDocRef = doc(db, 'pedidos', novoId);
    const existe = await getDoc(novoDocRef);

    if (!existe.exists()) {
      // Atualiza o campo interno 'id' também (opcional)
      docData.id = novoId;

      await setDoc(novoDocRef, docData);
      await deleteDoc(docSnap.ref);

      console.log(`✅ Pedido ${docId} migrado para ${novoId}`);
      contador++;
    } else {
      console.log(`⚠️ Pedido com ID ${novoId} já existe, pulando...`);
    }
  }

  console.log('✅ Conversão dos pedidos finalizada!');
}

function parseDataHora(data, horario) {
  const [dia, mes, ano] = data.split('/');
  const [hora, minuto] = horario.split(':');
  return new Date(`${ano}-${mes}-${dia}T${hora}:${minuto}:00`);
}

async function reordenarPedidosSequencialmente() {
  const pedidosRef = collection(db, 'pedidos');
  const snapshot = await getDocs(pedidosRef);

  // Recolhe todos os pedidos com dados + ID
  const pedidos = snapshot.docs.map(docSnap => {
    const dados = docSnap.data();
    return {
      idOriginal: docSnap.id,
      data: dados.data,
      horario: dados.horario,
      dados
    };
  });

  // Ordena por data + hora (do mais antigo para o mais recente)
  pedidos.sort((a, b) => {
    const dataA = parseDataHora(a.data, a.horario);
    const dataB = parseDataHora(b.data, b.horario);
    return dataA - dataB;
  });

  // Inicia contador e começa a renomeação
  let contador = 1;

  for (const pedido of pedidos) {
    const novoId = String(contador).padStart(4, '0'); // ex: 0001, 0002

    // Pula se já estiver com ID correto
    if (pedido.idOriginal === novoId) {
      console.log(`ℹ️ Pedido ${novoId} já está correto, pulando.`);
      contador++;
      continue;
    }

    const novoDocRef = doc(db, 'pedidos', novoId);
    const existe = await getDoc(novoDocRef);
    if (existe.exists()) {
      console.log(`⚠️ ID ${novoId} já existe, pulando.`);
      contador++;
      continue;
    }

    // Atualiza campo interno 'id'
    pedido.dados.id = novoId;

    // Copia para novo doc e deleta o antigo
    await setDoc(novoDocRef, pedido.dados);
    await deleteDoc(doc(db, 'pedidos', pedido.idOriginal));

    console.log(`✅ Pedido ${pedido.idOriginal} migrado para ${novoId}`);
    contador++;
  }

  console.log('✅ Reordenação finalizada com sucesso!');
}

// Expor globalmente
window.reordenarPedidosSequencialmente = reordenarPedidosSequencialmente;
console.log('🛠️ Função reordenarPedidosSequencialmente pronta! Execute: reordenarPedidosSequencialmente()');



// Expor função no console
window.converterPedidosParaNumericos = converterPedidosParaNumericos;
console.log('🛠️ Função converterPedidosParaNumericos pronta! Execute no console: converterPedidosParaNumericos()');
