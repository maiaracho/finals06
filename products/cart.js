/* ==========================
      CART SYSTEM
========================== */

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartIcon();
}

// Update the cart icon badge
function updateCartIcon() {
    const cartIcon = document.querySelector(".cart");
    if (!cartIcon) return;

    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartIcon.innerHTML = `🛒${totalQty > 0 ? `<span class="cart-count">${totalQty}</span>` : ""}`;
    cartIcon.style.position = "relative";

    // Make the cart icon clickable
    cartIcon.style.cursor = "pointer";
    cartIcon.onclick = () => {
        window.location.href = "cart.html"; // redirect to cart page
    };
}


// Add product to cart
function addToCart(product) {
    let cart = getCart();

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ 
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1 
        });
    }

    saveCart(cart);
}

// Remove product from cart completely
function removeFromCart(id) {
    let cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
}

// Check if item in cart
function isInCart(id) {
    return getCart().some(item => item.id === id);
}

// Quantity update
function changeQuantity(id, amount) {
    let cart = getCart();

    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity += amount;
    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    saveCart(cart);
}

document.addEventListener("DOMContentLoaded", updateCartIcon);
