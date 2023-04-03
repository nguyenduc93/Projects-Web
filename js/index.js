let flag = localStorage.getItem("flag");
let listUser = localStorage.getItem("numberPhone")
let contact = localStorage.getItem("contactInput")
document.getElementById("cart").style.display = "none";
if (flag == 1) {
    document.getElementById("register").innerHTML = `<a type = "submit" onclick = "logOut()"><button type="button" class="btn btn-outline-primary logout">Đăng xuất</button></a>`
    document.getElementById("logIn").innerHTML = `<i class="bi bi-heart"></i> Xin Chào <i class="bi bi-heart"></i> <br> ${listUser}`;
    document.getElementById("cart").style.display = "inline"
}
function logOut() {
    localStorage.removeItem("numberPhone");
    localStorage.removeItem("flag");
    window.location.reload();
}
let product = JSON.parse(localStorage.getItem("product"));
function renderProduct() {
    let result = "";
    for (i = 0; i < product.length; i++) {
        result +=
            `
            <div class="col">
            <div class="card h-100">
              <img src="${product[i].image}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${product[i].name}</h5>
                <p class="card-text">
                 <p>Giá: ${product[i].price} VNĐ<p>
                 <p>Thương Hiệu: ${product[i].trademark} </p>
                  </p>
              </div>
              <div class="card-footer">
                <small class="text-muted"><button class="btn btn-primery text-white cart2" onclick="addToCart(${product[i].id})"><i class="bi bi-cart-plus"></i>Thêm vào giỏ hàng</button></small>
              </div>
            </div>
          </div>
        `
    }
    document.getElementById("product1").innerHTML = result;
}
renderProduct();
function addToCart(index) {
    if (listUser == null) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        return;
    }
    let listProductCart = JSON.parse(localStorage.getItem("listProductCart"));
    if (listProductCart == null) {
        listProductCart = [];
        for (j = 0; j < product.length; j++) {
            if (product[j].id = index) {
                listProductCart.push(product[j]);
                listProductCart[listProductCart.length - 1].userName = listUser;
                localStorage.setItem("listProductCart", JSON.stringify(listProductCart));
                break;
            }
        }
    } else {
        for (let k = 0; k < product.length; k++) {
            if (product[k].id == index) {
                let flag1 = true;
                for (let i = 0; i < listProductCart.length; i++) {              
                    if (listProductCart[i].id == index && listProductCart[i].userName == listUser) {
                        flag1 = false;
                        break;
                    } else {
                        flag1 = true;  
                    }
                }
                localStorage.setItem("listProductCart", JSON.stringify(listProductCart));
                if (!flag1) {
                    var x = document.getElementById("snackbar1");
                    x.className = "show";
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                    break;
                } else {
                    listProductCart.push(product[k]);
                    listProductCart[listProductCart.length - 1].userName = listUser;
                    localStorage.setItem("listProductCart", JSON.stringify(listProductCart));
                    break;
                }
            }
        }
    }renderCountCart()
    // document.getElementById("countCart").innerHTML = count;
//     let count = document.getElementById("countCart").innerHTML= listProductCart.length;
//     localStorage.setItem("count", JSON.stringify(count));
}
// let listProductCart = JSON.parse(localStorage.getItem("listProductCart"));
// document.getElementById("countCart").innerHTML= listProductCart.length;
function renderCountCart() {
    let listUser = localStorage.getItem("numberPhone");
    let listProductCart = JSON.parse(localStorage.getItem("listProductCart"));
    let numberCart = 0;
    if (listProductCart) {
      for (let i = 0; i < listProductCart.length; i++) {
        if (listProductCart[i].userName == listUser) {
          numberCart++;
        }
      }
    }
    localStorage.setItem("numberCart", numberCart);
    document.getElementById("countCart").innerHTML = numberCart;
  }
//   let numberCart = JSON.parse(localStorage.getItem("numberCart"));
//   document.getElementById("countCart").innerHTML = numberCart;
