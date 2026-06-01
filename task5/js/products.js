const products = [

{
id:1,
name:"Laptop",
price:65000,
image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
},

{
id:2,
name:"Smartphone",
price:25000,
image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
},

{
id:3,
name:"Headphones",
price:3000,
image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
}

];

const container =
document.getElementById("product-container");

products.forEach(product => {

container.innerHTML += `

<div class="card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<button onclick="addToCart(${product.id})">
Add To Cart
</button>

</div>

`;

});

function addToCart(id){

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const product =
products.find(p => p.id === id);

cart.push(product);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

alert("Product Added Successfully");

}
