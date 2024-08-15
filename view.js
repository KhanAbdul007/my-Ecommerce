document.addEventListener("DOMContentLoaded", () => {
    let productDetails = document.getElementById("productDetails");
    let products = JSON.parse(localStorage.getItem("products"));
    let selectedProductId = localStorage.getItem("selectedProductId");
   
    if (products && selectedProductId) {
        let selectedProduct = products.find(
            (product) => product.id == selectedProductId
        );
        if (selectedProduct) {
            console.log(selectedProduct);
            productDetails.innerHTML = `
            <section>
                <main>
                    <div id="tophalf">
                        <div id="ping">
                            <img src="${selectedProduct.images[0]}"/>
                        </div>
                        <div id="pdetail">
                            <h2 id="title">${selectedProduct.title}</h2>
                            <p id="brand"><strong>Brand:</strong> ${selectedProduct.brand}</p>
                            <p id="category"><strong>Category:</strong> ${selectedProduct.category}</p>
                            <p id="descrip"><strong>Description:</strong> ${selectedProduct.description}</p>
                            <p id="price"><strong>Price:</strong> $${selectedProduct.price}</p>
                            <div id="butn">
                                <button id="addToCart">Add to Cart</button>
                                <button id="backToHome">Back To Home</button>
                            </div>
                        </div>
                    </div>
                    <div id="review">
                        <h1>Customer Review</h1>
                        <hr>
                        ${selectedProduct.reviews.map(
                            (review) => `
                            <div id="ratings">
                                ${"⭐".repeat(review.rating)}${"🖤".repeat(5 - review.rating)}
                               <p id="comment">${review.comment}</p>
                               
                               <p id="nam">by : Salman Khan <strong></strong></p>
                                
                            </div>`
                        ).join("")}
                    </div>
                </main>
                </section>
            `;

            document.getElementById("addToCart").addEventListener("click", () => addToCart(selectedProduct));
            document.getElementById("backToHome").addEventListener("click", () => {
                window.location.href = "home.html"; 
            });
        }
    }
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
}
