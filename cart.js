// Variáveis de controle
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Renderiza o carrinho
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

    cartItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-quantity">Qtd: ${item.quantity} x ${item.price}</p>
        <p class="cart-item-total">Total: R$ ${itemTotal.toFixed(2).replace('.', ',')}</p>
      </div>
      <button class="remove-item" onclick="removeFromCart(${index})">Excluir</button>
    `;

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

// Remove item
function removeFromCart(index) {
  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  renderCart();
}

// Fecha o modal
function closeModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.style.display = 'none';
}

// Confirma a compra e envia pelo WhatsApp
function confirmCheckout() {
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

  const emojiMap = {
    'Bolo': '🍰',
    'Mini Pizza': '🍕',
    'Pizza Broto': '🍕',
    'Lasanha': '🍝',
    'Panqueca': '🥞'
  };

  let message = `👤 *Nome:* ${userName}\n📱 *Telefone:* (${userPhone.substring(0, 2)}) ${userPhone.substring(2)}\n📦 *Resumo do Pedido:*\n\n`;

  cartItems.forEach(item => {
    const emoji = emojiMap[item.category] || '🛒';
    message += `${emoji} ${item.name} - ${item.quantity} x ${item.price}\n`;
  });

  const total = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace('R$', '').replace(',', '.')) * item.quantity;
  }, 0);

  message += `\n💰 *Total:* R$ ${total.toFixed(2).replace('.', ',')}`;

  if (orderNotes !== '') {
    message += `\n📝 *Observações:* ${orderNotes}`;
  }

  const encodedMessage = encodeURIComponent(message);
  const vendedorPhone = '5551980533191';

  window.open(`https://wa.me/${vendedorPhone}?text=${encodedMessage}`, '_blank');

  cartItems = [];
  localStorage.removeItem('cartItems');
  renderCart();
}

// Inicia tudo ao carregar
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
