// Firebase config
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function renderCart() {
  const cartContent = document.getElementById('cartContent');
  cartContent.innerHTML = '';

  if (cartItems.length === 0) {
    cartContent.innerHTML = '<p>Seu carrinho est\u00e1 vazio.</p>';
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

    cartItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-quantity">Qtd: ${item.quantity} x ${item.price}</p>
        <p class="cart-item-total">Total: R$ ${itemTotal.toFixed(2).replace('.', ',')}</p>
      </div>
    `;

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-item');
    removeButton.textContent = 'Excluir';
    removeButton.addEventListener('click', () => removeFromCart(index));
    cartItemElement.appendChild(removeButton);

    cartContent.appendChild(cartItemElement);
  });

  const totalElement = document.createElement('div');
  totalElement.classList.add('cart-total');
  totalElement.innerHTML = `<h3>Total: R$ ${total.toFixed(2).replace('.', ',')}</h3>`;
  cartContent.appendChild(totalElement);

  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) cartCountElement.innerText = totalItems;

  document.getElementById('checkoutButton').style.display = 'block';
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  renderCart();
}

function closeModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.style.display = 'none';
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
    alert('N\u00famero de telefone inv\u00e1lido. Informe um n\u00famero com DDD.');
    return;
  }

  closeModal();
  const numeroPedido = await gerarProximoIdPedido();

  const newOrder = {
    id: '#' + numeroPedido,
    cliente: userName,
    telefone: userPhone,
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
  message += `\n📧 *Chave Pix (E-mail):* panelinhadosaborscs@gmail.com`;

  const encodedMessage = encodeURIComponent(message);
  const vendedorPhone = '5551980533191';
  window.open(`https://wa.me/${vendedorPhone}?text=${encodedMessage}`, '_blank');

  cartItems = [];
  localStorage.removeItem('cartItems');
  renderCart();

  if (typeof carregarPedidos === 'function') carregarPedidos();
}

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

window.confirmCheckout = confirmCheckout;
window.removeFromCart = removeFromCart;
