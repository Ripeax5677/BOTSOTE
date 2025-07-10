// cart.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`✅ "${name}" added to cart!`);
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  container.innerHTML = cart.map(item => `<li>${item.name} – ${item.price.toFixed(2)}€</li>`).join("");
  document.getElementById("totalAmount").textContent = total.toFixed(2);
  return total;
}

function checkout(method) {
  const total = renderCart();
  const items = cart.map(i => i.name).join(", ");

  if (method === "paypal") {
    const query = new URLSearchParams({
      business: "Pefa1122@gmail.com",
      item_name: `Disco0rder Shop Purchase: ${items}`,
      amount: total.toFixed(2),
      currency_code: "EUR"
    }).toString();
    window.open(`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&${query}`, "_blank");
  } else {
    alert(`Bitte sende mir eine DM mit:\n\nItems: ${items}\nGesamtpreis: ${total}€\nZahlung per: ${method.toUpperCase()}`);
  }
}
