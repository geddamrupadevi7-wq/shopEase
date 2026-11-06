// Shopping Cart
let cart = [];

// Add product
function addToCart(name, price) {
    cart.push({ name, price, quantity:1});
    updateCart();

    alert(name + " added successfully!");
}

// Update cart
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartCount.innerText = cart.reduce((sum,item)=>sum+item.quntity,0);

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
    }

    cart.forEach((item, index) => {
      cartItems.innerHTML += `
    <div class="cart-item">
        <span>${item.name} - ₹${item.price}</span>

        <button onclick="decreaseQuantity(${index})">−</button>

        <span>${item.quantity}</span>

        <button onclick="increaseQuantity(${index})">+</button>

        <button class="remove-btn"
        onclick="removeItem(${index})">
        Remove
        </button>
    </div>
`;
    });

    cartTotal.innerText = total;
}

// Remove product
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}
// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        removeItem(index);
        return;
    }

    updateCart();
}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    document.getElementById("checkout-section")
        .style.display = "block";

    document.getElementById("checkout-section")
        .scrollIntoView({ behavior: "smooth" });
}

// Place order
function placeOrder(event) {

    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = document.getElementById("customer-name").value;

    document.getElementById("order-message").innerText =
        "Thank you " + name + "! Your order has been placed successfully! 🎉";

    cart = [];
    updateCart();

    document.getElementById("checkout-form").reset();
}
// Search Products
function searchProducts() {
    let input = document.getElementById("searchInput").value.toLowerCase();

    let products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        let name = product.innerText.toLowerCase();

        if (name.includes(input)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}