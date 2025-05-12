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

// Inicia render
document.addEventListener('DOMContentLoaded', function () {
  renderCart();
});

// Enviar pedido via WhatsApp ao clicar em Finalizar
document.getElementById('checkoutButton').addEventListener('click', function () {
  if (cartItems.length === 0) {
    alert('Seu carrinho está vazio. Adicione itens antes de finalizar a compra.');
    return;
  }

  // Monta a mensagem
  let message = '📦 *Resumo do Pedido:*\n\n';
  cartItems.forEach(item => {
    message += `🍔 ${item.name} - ${item.quantity} x ${item.price}\n`;
  });

  const total = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace('R$', '').replace(',', '.')) * item.quantity;
  }, 0);

  message += `\n💰 *Total:* R$ ${total.toFixed(2).replace('.', ',')}`;

  const encodedMessage = encodeURIComponent(message);

  // 🔁 Altere aqui para o seu número de WhatsApp
  const vendedorPhone = '555180533191'; // Exemplo: +55 81 99999-9999

  window.open(`https://wa.me/${vendedorPhone}?text=${encodedMessage}`, '_blank');

  // Limpa carrinho após envio
  cartItems = [];
  localStorage.removeItem('cartItems');
  renderCart();
});
