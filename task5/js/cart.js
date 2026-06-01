let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer =
document.getElementById("cart-items");

if(cart.length === 0){

cartContainer.innerHTML =
"<h2>Your Cart Is Empty</h2>";

}
else{

cart.forEach(item => {

cartContainer.innerHTML +=

`

<div class="card">

<h3>${item.name}</h3>

<p>₹${item.price}</p>

</div>

`;

});

}
