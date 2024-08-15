document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});

function displayCart() {
    let cartContent = document.getElementById("cartcontent");
    let totalprice = document.getElementById("totalprice");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);

    // Clear the content of the cartContent element
    cartContent.innerHTML = "";
    
    let total = 0;
    if (cart.length === 0) {
        cartContent.innerHTML = `<p class ="empty-message">Your cart is empty. Start Shopping</p>`;
        totalprice.innerHTML = "";
        return;
    }

    cart.map((product, index) => {
        total += product.price;
        let productDiv = document.createElement("div");
        productDiv.classList.add("product-info");
        productDiv.innerHTML = `

        <div class="outer">
            <div class="img-prod">
                <div class="img">
                    <img src="${product.images[0]}" alt="${product.title}" onclick="goToProduct()"/>
                </div>
                <div class="product-details">
                    <h3>${product.title}</h3>
                    <p>Availability:- ${product.availabilityStatus}</p>
                    <p>Category:- ${product.category}</p>
                    <p>Return Policy:- ${product.returnPolicy}</p>
                    <p>Price:- ${product.price.toFixed(2)}</p>
                </div>

                <div class="btn">
                  <button onclick="removeFromCart(${index})">Remove Item.</button>
                   <button id="backToHome"> Back To Home</button>
                </div>

            </div>
            </div>
            
            
        `;
         
        cartContent.appendChild(productDiv);
        document.getElementById("backToHome").addEventListener("click", () => {
            window.location.href = "home.html"; 
        });
    });

    totalprice.innerHTML = `<h2>Total Price: ${total.toFixed(2)}</h2>`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
