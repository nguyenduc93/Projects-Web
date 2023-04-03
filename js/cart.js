let flag = localStorage.getItem("flag");
let listUser = localStorage.getItem("numberPhone")
if (flag == 1) {
  document.getElementById("user").innerHTML = `<a type = "submit" onclick = "logOut()"><button onclick = "logOut()" class = "btn btn-outline-primary logout">Đăng Xuất</button></a>`
  document.getElementById("register").innerHTML = `<i class="bi bi-heart"></i>Xin Chào<i class="bi bi-heart"></i> <br> ${listUser}`;
}
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

function renderCart() {
  let dataCart = JSON.parse(localStorage.getItem("listProductCart"));
  if (dataCart == null) {
    dataCart = []
  }
  let result = `
    <tr class = "row1">
        <td>STT</td>
        <td>Sản Phẩm</td>
        <td>Mã Sản Phẩm</td>
        <td>Thương Hiệu</td>
        <td>Số Lượng</td>
        <td>Giá</td>
        <td>Thành Tiền</td>
        <td>Tính Năng</td>
    </tr>`;
  let sum = 0;
  let stt = 0;
  
  for (let i = 0; i < dataCart.length; i++) { 
    if(dataCart[i].userName == listUser){
      stt++;
      let totalCart = dataCart[i].sl * dataCart[i].price;
      let totalCart1 = VND.format(totalCart);
      sum += totalCart;
      result +=
      `<tr>
        <td>${stt}</td>
        <td><img src="${dataCart[i].image}"</td>
        <td>${dataCart[i].name}</td>
        <td>${dataCart[i].trademark}</td>
        <td> <div class ="buyandsell">
       <button class="btnQuantity" onclick="minus(${i})"><i class="bi bi-caret-down-fill icondown"></i></button>
       ${dataCart[i].sl}
       <button class="btnQuantity" onclick="plus(${i})"><i class="bi bi-caret-up-fill iconup"></i></button>
       </div> </td>
        <td>${dataCart[i].price} VNĐ</td>
        <td>${totalCart1}</td>
        <td ><button class="btn btn-primery" onclick="deleteButton(${i})" id=""><i class="bi bi-trash3-fill"></button></td>
    </tr>`
    }
    
  } let resultMoney = VND.format(sum);

  document.getElementById("table").innerHTML = result + `<tr>
        <td colspan="6"><h2>Tổng Tiền</h2></td>
        <td colspan = "2"><h2>${resultMoney}</h2> </td>
    </tr>
    <tr>
    <td colspan="8"> <button class = "btn btn-primery pay" onclick = "payButton()"><h2> Thanh Toán Đơn Hàng </h2></button> </td>
    </tr>`;

}
renderCart();

function plus(index) {
  let dataCart = JSON.parse(localStorage.getItem("listProductCart"));
  dataCart[index].sl++;
  localStorage.setItem("listProductCart", JSON.stringify(dataCart));
  renderCart();
}

function minus(index) {
  ;
  let dataCart = JSON.parse(localStorage.getItem("listProductCart"));
  if (dataCart[index].sl > 0) {
    dataCart[index].sl--;
    if (dataCart[index].sl === 0) {
      let confirm1 = confirm("Bạn có muốn xóa sản phẩm này?");
      if (confirm1) {
        dataCart.splice(index, 1);
        localStorage.setItem("listProductCart", JSON.stringify(dataCart));
        renderCart();
      } else {
        return;
      }
    }
  }
  localStorage.setItem("listProductCart", JSON.stringify(dataCart));
  renderCart();
}
function deleteButton(id) {
  let dataCart = JSON.parse(localStorage.getItem("listProductCart"));
  dataCart.splice(id, 1);
  localStorage.setItem("listProductCart", JSON.stringify(dataCart));
  renderCart()
}
function payButton(){
  
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  localStorage.removeItem("listProductCart");
  localStorage.removeItem("count");
  setTimeout(()=>{ 
    window.location.reload();;
}, 4000);
} 
function logOut(){
  localStorage.removeItem("numberPhone");
  localStorage.removeItem("count");
  localStorage.removeItem("flag")
  window.location.href = "../index.html"
}