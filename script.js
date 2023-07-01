const wishlisbtn = document.querySelector(".wishlist");
const cartbtn = document.querySelector(".cart");
const wishlistcard = document.querySelector(".wishlistcard");
const cartsystem = document.querySelector(".cartsystem");
const mainbox = document.querySelector(".main-box");
const maincartbox = document.querySelector(".main-cart-box");
const mainwishlistbox = document.querySelector(".main-wishlist-box");
const paynow = document.querySelector(".paynow");
const items = document.querySelector(".items");
const removeall = document.querySelector(".removeall");
const wishlist = document.querySelector(".wishlist .numberwish");
const cartnumber = document.querySelector(" .cartnumber");
const money = document.querySelector(" .money");
const select = document.querySelector("select");
const searchbtn = document.querySelector(".searchbtn");
const search = document.querySelector(".search input");
const menu = document.querySelector(".fa-bars");
const menulist = document.querySelector(".menulist");
const yourcart = document.querySelector(".yourcart");
const yourwishlist = document.querySelector(".yourwishlist");

wishlisbtn.addEventListener("click", () => {
  cartsystem.classList.remove("show");
  wishlistcard.classList.toggle("show");
});

cartbtn.addEventListener("click", () => {
  wishlistcard.classList.remove("show");
  cartsystem.classList.toggle("show");
});
// document.addEventListener("click", () => {
//   wishlistcard.classList.add("hide");
//   cartsystem.classList.add("hide");
// });
let myproducts=products
function showproducts(product){
  mainbox.innerHTML=''
  product.forEach(function (item) {
    mainbox.innerHTML += `<div class="box">
  
     <div class="img">
     <div class="wishbtn"><i class="fa-solid fa-heart" onclick="addwishlist(${item.id})"></i></div>
       <img src="${item.image}" alt="" />
     </div>
     <div class="title">${item.name}</div>
     <div class="productprice">$${item.price}</div>
     <div class="addtocart-box">
         <div class="addto" onclick="addToCart(${item.id})" >add to cart</div>
     </div>
   </div>`;
  });
}
showproducts(myproducts)
// add prodact to cart
let cart = JSON.parse(localStorage.getItem("Cart")) || [];
updateCart();

function addToCart(id) {
  if (cart.some((product) => product.id === id)) {
    changeNumberOfunits("plus", id);
   
    
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({ ...item, numberOfUnits: 1 });

    
  }
  updateCart();
}
function updateCart() {
  cartitems();
  total();
  localStorage.setItem("Cart", JSON.stringify(cart));
}

function cartitems() {
  maincartbox.innerHTML = "";
  cart.forEach((item) => {
    maincartbox.innerHTML += `    <div class="box-cart">
    <div class="imageandd-title">
      <img src="${item.image}" alt="" />
      <h4>${item.name}</h4>
    </div>
    <span>$${item.price}</span>
    <div class="actionelement">
      <i class="fa-solid fa-square-minus"  onclick="changeNumberOfunits('minus', ${item.id})"></i>
      <p>${item.numberOfUnits}</p>
      <i class="fa-solid fa-square-plus" onclick="changeNumberOfunits('plus', ${item.id})"></i>
      <div class="delete">
        <i class="fa-solid fa-trash" onclick="removeitem(${item.id})"></i>
      </div>
    </div>
  </div>`;

    if (cart.length !== 0) {
      paynow.classList.remove("hide");
      items.classList.remove("hide");
      removeall.classList.remove("hide");
      cartnumber.classList.remove("hide");
    }
  });
}

function changeNumberOfunits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }
    return { ...item, numberOfUnits };
  });

  updateCart();
}

function total() {
  items.innerHTML = "";
  let totalprice = 0,
    totalitems = 0;
  cart.forEach((item) => {
    totalprice += item.price * item.numberOfUnits;
    totalitems += item.numberOfUnits;
  });
  items.innerHTML = ` <p class="totat">total( ${totalitems} items)</p>
  <div class="dollar">$${totalprice}</div>`;

  money.innerText = `$${totalprice.toFixed(2)}`;
  cartnumber.innerText = cart.length;

  if (cartnumber.innerText == 0) {
    maincartbox.innerText = "your cart is empty";
    cartnumber.classList.add("hide");
    paynow.classList.add("hide");
    items.classList.add("hide");
    removeall.classList.add("hide");
    cartnumber.classList.add("hide");
  }
}

//  removeitem fromt he cart
function removeitem(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

// remoalldata

function remoalldata() {
  cart = cart.filter((item) => {
    return false;
  });
  updateCart();
}

// wishlis
let wishlistdata = JSON.parse(localStorage.getItem("wishlist")) || [];
updatewishlist()

function addwishlist(id) {
if(cart.some(wish => wish.id === id)){
  alert('this product has already been added')
}
 else if(wishlistdata.some(wish => wish.id === id)){
  alert('this product has already been added')
}
else{
  let item= products.find((wishlist) =>wishlist.id===id)
  wishlistdata.push(item);

}

updatewishlist()


}
function wishlistitems(){
  mainwishlistbox.innerHTML=''
  // console.log(wishlistdata);


  wishlistdata.forEach(wish=>{
    mainwishlistbox.innerHTML +=`<div class="box-wishlist">
    <div class="imageandd-title">
      <img src="${wish.image}" alt="" />
      <h4>${wish.name}</h4>
    </div>
    <span>$${wish.price}</span>
    <div class="addtocart">
      <div class="add" onclick="addTowishlisttocart(${wish.id})">add to cart</div>
      <i class="fa-solid fa-trash" onclick="removewishlist(${wish.id})"></i>
    </div>
  </div>`
  })
  wishlist.innerText=wishlistdata.length
  wishlist.classList.remove("hide")
  if(wishlistdata.length == 0){
    wishlist.classList.add("hide")
  }
}


function updatewishlist(){
  wishlistitems()
  localStorage.setItem("wishlist", JSON.stringify(wishlistdata));
 
}



// filterdata

select.addEventListener("change", function(e){
  e.preventDefault()
    let event= e.target.value;
console.log(event)
    myproducts=products.filter((item)=>{
      if(event != ''){
        if(item.nature.type != event){
          return false;
        }
      }
      return true;
    })
  showproducts(myproducts)
})


searchbtn.addEventListener('click', () =>{
  let filterdata = search.value
  console.log(filterdata)
  myproducts=products.filter((item)=>{
    if(filterdata != ''){
      if(item.name.trim() !== filterdata){
        return false;
      }
    } 
    return true;
  })
  showproducts(myproducts)
})

// removewishlist

function addTowishlisttocart(id) {
console.log("sddsd")




   
    

    const item = products.find((product) => product.id === id);

    cart.push({ ...item, numberOfUnits: 1 });

    const productIndex = wishlistdata.findIndex((item) => item.id == id);
    wishlistdata.splice(productIndex, 1);
    

  updatewishlist()
  updateCart();
  
}

function removewishlist(id) {
  wishlistdata = wishlistdata.filter((item) => item.id !== id);
 
  updatewishlist()
}
menu.addEventListener('click', (e) =>{
  menulist.classList.toggle("hide")
})


yourwishlist.addEventListener('click', (e) =>{
  wishlistcard.classList.toggle("show");
  // cartsystem.classList.toggle("hide")
  cartsystem.classList.remove("show");

});
yourcart.addEventListener('click', (e) =>{
  wishlistcard.classList.remove("show");
  // cartsystem.classList.toggle("hide")
  cartsystem.classList.toggle("show");

});