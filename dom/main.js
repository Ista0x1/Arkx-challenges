let cartbar = document.getElementById('cart-bar');
let cartIcon =  document.getElementById('cart-icon');
cartIcon.addEventListener('click',()=>{
    if(cartbar.style.display =='none'){
    cartbar.style.display = 'block';
    }
    else{
        cartbar.style.display ='none';
    }
})
// console.log(products)

// fetchproduct();
let products = [
    {
        id : 1,
        name: 'Cold Water',
        description:' Cold water make youre life better',
        Image : './assets/WhatsApp Image 2023-09-06 at 10.25.25.jpeg',
        price:2000,
        currency:'MAD',
        quantity:0
    },
    {
        id : 2,
        name: 'kas original',
        description:' Sun Skin make your life better',
        Image : './assets/kas.jpeg',
        price:100,
        quantity:0,
        currency:'MAD'
    },
    {
        id : 3,
        name: 'cask gaming  ',
        description:' Cold water make youre life better',
        Image : './assets/cask.jpeg',
        price:2000,
        currency:'MAD'
    },
    {
        id : 4,
        name: 'Air Pods Oraimo',
        description:' Cold water make youre life better',
        Image : './assets/oraimo.jpeg',
        price:2000,
        currency:'MAD'
    },
    {
        id : 5,
        name: 'Air Pods ',
        description:' Cold water make youre life better',
        Image : './assets/airpodsanas.jpeg',
        price:2000,
        currency:'MAD'
    },
    {
        id : 6,
        name: 'Hot Water',
        description:' Cold water make youre life better',
        Image : './assets/ain at.jpeg',
        price:2000,
        quantity:20,
        currency:'MAD'
    },
    {
        id : 7,
        name: 'Book Arkx ',
        description:' Cold water make youre life better',
        Image : './assets/arkxbook.jpeg',
        price:400,
        quantity:20,
        currency:'MAD'
    },
    {
        id : 8,
        name: 'BRika for best Smoking Experience',
        description:' Cold water make youre life better',
        Image : './assets/brika.jpeg',
        price:2000,
        quantity:20,
        currency:'MAD'
    },
    {
        id : 9,
        name: 'Tmar for a fresh Energy',
        description:' Cold water make youre life better',
        Image : './assets/tmar.jpeg',
        price:2000,
        quantity:20,
        currency:'MAD'
    },
    {
        id : 10,
        name: 'Loz',
        description:' Cold water make youre life better',
        Image : './assets/loz.jpeg',
        price:2000,
        quantity:20,
        currency:'MAD'
    }
]
console.log(products)
let cart = [];
let productContainer = document.getElementById('products-fetch');
console.log(productContainer);
function fetchproduct() {
    products.forEach((value, key) => {
        let divElement = document.createElement("div");
        divElement.innerHTML =`
        <div class="item mx-3 py-2 bg-light">
            <div class="product font-rale">
                <a href="#"><img src="${value.Image}" alt="product1" class="img-fluid"></a>
                <div class="text-center">
                    <h6>${value.name}</h6>
                    <div class="rating text-warning font-size-12">
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="far fa-star"></i></span>
                    </div>
                    <div class="price py-2">
                        <span>${value.price}</span>
                    </div>
                    <button class="like" style="color: red; border: none; padding: 5px 10px; margin-left: 10px;">
                    <i  class="fa-regular fa-heart"></i>
                    </button>
                    <button type="button" class="btn btn-warning font-size-12 addcart" data-product-id="${value.id}">Add to Cart</button>
                </div>
            </div>
        </div>`;
        
        productContainer.appendChild(divElement);
        let addToCartButton = divElement.querySelector(".addcart");
        addToCartButton.addEventListener("click", function() {
            addToCart(value);
        });
        let likeButton = divElement.querySelector('.like');
        likeButton.addEventListener('click', function() {
            const heartIcon = this.querySelector('.fa-heart');
            console.log('like button clicked');
        
            // Toggle heart icon's classes
            heartIcon.classList.toggle('fa-regular');
            heartIcon.classList.toggle('fa-solid');
        });
        
        
    });
}
let addcard = document.querySelector('.addcard');
addcard.addEventListener('click',function(){
    cart.push({id : 1,
        name: 'Cold Water',
        description:' Cold water make youre life better',
        Image : './assets/WhatsApp Image 2023-09-06 at 10.25.25.jpeg',
        price:2000,
        currency:'MAD'})
        updateCartDisplay();
})
function addToCart(product) {
    product.quantity = 1; // add quantity property to the product
    cart.push(product);
    updateCartDisplay();
}

function totalfunc() {
    if(cart.length > 0) {
        count.innerText = cart.length;
        // Compute total price by multiplying product's price with its quantity
        let totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
        console.log(totalPrice);
        soustotal.innerText = totalPrice;
    }
    else {
        count.innerText = 0;
        soustotal.innerText = '0';
    }
}


let count =document.getElementById('cart-count');
count.innerText =0;
let soustotal = document.querySelector('.total-price')
function updateCartDisplay() {
    let cartProductsDiv = document.querySelector(".cart-products");
    cartProductsDiv.innerHTML = ''; // Clear current items
    console.log(cart)
    cart.forEach((product, index) => {
        let cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-b align-items-center d-flex';
    
        cartItemDiv.innerHTML = `
            <div class="cart-product">
                <img src="${product.Image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <div class="d-flex justify-content-between align-items-center">
                    <p>${product.currency} ${product.price}</p>
                    <div class="quantity-control">
                        <button class="decrease" style="background-color: #f1f1f1; border: none; padding: 5px 10px; margin-right: 5px;">-</button>
                        <input type="number" value="1" min="1" style="width: 40px; text-align: center;">
                        <button class="increase" style="background-color: #f1f1f1; border: none; padding: 5px 10px; margin-left: 5px;">+</button>
                    </div>
                    <button class="remove" style="background-color: red; border: none; color: white; padding: 5px 10px; margin-left: 10px;">
                        <i class="fas fa-trash"></i>
                    </button>
                   
                    
                </div>
            </div>
        `;
    
        cartProductsDiv.appendChild(cartItemDiv);
    
        // Event Listener for removing product from cart
        cartItemDiv.querySelector(".remove").addEventListener("click", function() {
            cart.splice(index, 1); // remove the product from cart array
            cartItemDiv.remove();
            totalfunc() // remove the product from DOM
        });
    
        let quantityInput = cartItemDiv.querySelector(".quantity-control input");

        cartItemDiv.querySelector(".decrease").addEventListener("click", function() {
            if(quantityInput.value > 1) {
                quantityInput.value = Number(quantityInput.value) - 1;
                product.quantity = Number(quantityInput.value); // update product's quantity
                totalfunc(); // update the total price
            }
        });
        cartItemDiv.querySelector(".increase").addEventListener("click", function() {
            quantityInput.value = Number(quantityInput.value) + 1;
            product.quantity = Number(quantityInput.value); // update product's quantity
            totalfunc(); // update the total price
        });
        
    });
    
    totalfunc();
    
}


fetchproduct();

