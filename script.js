const foods = [
    { id:1, name:"Pizza", price:199, rating:4.2, time:"25 min", image:"images/pizza.jpg" },
    { id:2, name:"Burger", price:99, rating:4.0, time:"15 min", image:"images/burger.jpg" },
    { id:3, name:"Biryani", price:149, rating:4.5, time:"30 min", image:"images/biryani.jpg" },
    { id:4, name:"Sandwich", price:79, rating:4.1, time:"10 min", image:"images/sandwich.jpg" },
    { id:5, name:"Noodles", price:129, rating:4.3, time:"20 min", image:"images/noodles.jpg" },
    { id:6, name:"Fries", price:89, rating:4.0, time:"12 min", image:"images/fries.jpg" },
    { id:7, name:"Ice Cream", price:59, rating:4.6, time:"5 min", image:"images/icecream.jpg" },
    { id:8, name:"Pasta", price:139, rating:4.2, time:"18 min", image:"images/pasta.jpg" },
    { id:9, name:"Dosa", price:89, rating:4.4, time:"15 min", image:"images/dosa.jpg" },
    { id:10, name:"Idli", price:69, rating:4.3, time:"10 min", image:"images/idli.jpg" },
    { id:11, name:"Paneer Tikka", price:179, rating:4.5, time:"25 min", image:"images/paneer.jpg" },
    { id:12, name:"Chowmein", price:119, rating:4.2, time:"20 min", image:"images/chowmein.jpg" },
    { id:13, name:"Roll", price:99, rating:4.1, time:"15 min", image:"images/roll.jpg" },
    { id:14, name:"Momos", price:109, rating:4.4, time:"12 min", image:"images/momos.jpg" },
    { id:15, name:"Cake", price:199, rating:4.6, time:"30 min", image:"images/cake.jpg" },
    { id:16, name:"Cold Coffee", price:129, rating:4.3, time:"8 min", image:"images/coffee.jpg" },
    { id:17, name:"Samosa", price:29, rating:4.2, time:"5 min", image:"images/samosa.jpg" },
    { id:18, name:"Vada Pav", price:39, rating:4.5, time:"7 min", image:"images/vadapav.jpg" },
    { id:19, name:"Pav Bhaji", price:119, rating:4.6, time:"20 min", image:"images/pavbhaji.jpg" },
    { id:20, name:"Thali", price:199, rating:4.7, time:"35 min", image:"images/thali.jpg" }
  ];
  
  // CART FUNCTIONS
  function addToCart(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
    updateCartCount();
  }
  
  function updateCartCount(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = document.getElementById("cart-count");
    if(count){
      count.innerText = "Cart: " + cart.length;
    }
  }
  
  // 🔥 LOCATION FUNCTION
  function getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
  }
  
  function showPosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
  
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
      .then(res => res.json())
      .then(data => {
        document.getElementById("area").innerText = "📍 " + (data.locality || data.city || "Your Area");
        document.getElementById("city").innerText = data.city || data.principalSubdivision || "";
      });
  }
  
  function showError(){
    document.getElementById("area").innerText = "📍 Location blocked";
    document.getElementById("city").innerText = "";
  }
  function goHome(){
    if(window.location.pathname.includes("index.html")){
      location.reload();
    } else {
      window.location.href = "index.html";
    }
  }
  function showPage(page){
    document.getElementById("home").style.display = "none";
    document.getElementById("cart").style.display = "none";
    document.getElementById("orders").style.display = "none";
    document.getElementById("profile").style.display = "none";
  
    document.getElementById(page).style.display = "block";
  
    if(page === "cart") loadCart();
    if(page === "orders") loadOrders();
    if(page === "profile") loadProfile();
  }

  function placeOrder(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
  
    orders.push(cart);
    localStorage.setItem("orders", JSON.stringify(orders));
  
    localStorage.removeItem("cart");
    alert("Order Placed 🎉");
  
    showPage("orders");
  }
  
  function loadOrders(){
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let container = document.getElementById("order-list");
    container.innerHTML = "";
  
    orders.forEach((order, index) => {
      container.innerHTML += `<h4>Order ${index + 1}</h4>`;
  
      order.forEach(id => {
        let item = foods.find(f => f.id === id);
        container.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
      });
    });
  }
  function loadCart(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-items");
    container.innerHTML = "";
  
    let total = 0;
  
    cart.forEach(id => {
      let item = foods.find(f => f.id === id);
      total += item.price;
  
      container.innerHTML += `
        <p>${item.name} - ₹${item.price}</p>
      `;
    });
  
    container.innerHTML += `<h3>Total: ₹${total}</h3>
    <button onclick="placeOrder()">Place Order</button>`;
  }
  function saveUser(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
  
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  
    alert("Saved ✅");
    document.getElementById("login").style.display = "none";

  loadProfile(); 
  }
  
  function loadProfile(){
    let name = localStorage.getItem("name");
    let email = localStorage.getItem("email");
  
    document.getElementById("pname").innerText = "Name: " + (name || "Not set");
    document.getElementById("pemail").innerText = "Email: " + (email || "Not set");
  }