document.getElementById("renderListUser").style.display = "none";
document.getElementById("listProduct").style.display = "none"
let product = JSON.parse(localStorage.getItem("product"));
          // Lấy thẻ hình ảnh từ HTML
          const myImage = document.getElementById("image");

          // Lắng nghe sự kiện onchange của input
          const imageInput = document.getElementById("imgProduct");
    
          imageInput.onchange = function (event) {
            const file = event.target.files[0];
    
            // Đọc tệp ảnh và chuyển đổi nó thành dữ liệu URL
            const reader = new FileReader();
            reader.onload = function (event) {
              const dataUrl = event.target.result;
    
              // Thiết lập nguồn ảnh của đối tượng ảnh với dữ liệu URL
              myImage.src = dataUrl;
    
              // Lưu dữ liệu URL vào local storage
              localStorage.setItem("myImage", dataUrl);
    
              // // Hiển thị ảnh
              // imgElement.src = dataUrl;
            };
            reader.readAsDataURL(file);
        };
            
// Thêm sản phẩm
function creatProduct() {

    let id = 0;
    let imageInput = localStorage.getItem("myImage");
    let nameInput = document.getElementById("name").value;
    let trademarkInput = document.getElementById("trademark").value;
    let priceInput = document.getElementById("price").value;
    if (product.length === 0) {
        id = 1;
    } else {
        id = product[product.length - 1].id + 1;
    }
    let listProduct = {
        id: id,
        image: imageInput,
        name: nameInput,
        trademark: trademarkInput,
        price: priceInput,
        sl: 1,
    }
    let flag1 = JSON.parse(localStorage.getItem("flag"));
    if (flag1 != null) {
        product.splice(flag1, 1, listProduct);
        localStorage.removeItem("flag");
        localStorage.setItem("product", JSON.stringify(product));
        renderProduct();
        return;
    }
    if (product == null) {
        product = [];
        product.push(listProduct);
        localStorage.setItem("product", JSON.stringify(product));
    }else{
        product.push(listProduct);
        localStorage.setItem("product", JSON.stringify(product));
    }  
        // localStorage.getItem("myImage") = "";
        document.getElementById("name").value = "";
        document.getElementById("trademark").value = "";
        document.getElementById("price").value = "";
    renderProduct();
}
// Hiển thị
function renderProduct() {
    let result = "";
    for (i = 0; i < product.length; i++) {
        result +=
            `<tr>
        <td>${i + 1}</td>
        <td><img src="${product[i].image}" alt="" width="100px" height="100px" /></td>
        <td>${product[i].name}</td>
        <td>${product[i].trademark}</td>
        <td>${product[i].price}</td>
        <td><button class="btn btn-primery" onclick="editProduct(${i})" 
        data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever><i class="bi bi-pen"></button></td>
        <td><button class="btn btn-primery" onclick="deleteProduct(${i})" id=""><i class="bi bi-trash3-fill"></button></td>
      </tr>`
    }
    document.getElementById("draw-table").innerHTML = result;
}
renderProduct()
// Hàm sửa sản phẩm.
function editProduct(id) {
    // document.getElementById("image").value = product[id].image;
    document.getElementById("name").value = product[id].name;
    document.getElementById("trademark").value = product[id].trademark;
    document.getElementById("price").value = product[id].price;
    localStorage.setItem("flag", id);
    const newImage = localStorage.getItem("myImage");
    if(newImage != null){
        product[id].image = newImage;
        localStorage.removeItem("myImage");
    }
}
// Hàm xóa sản phẩm.
function deleteProduct(id) {
    product.splice(id, 1);
    localStorage.setItem("product", JSON.stringify(product));
    renderProduct()
}
// Hàm hiển thị quản lý sản phẩm.
function showList() {
    document.getElementById("listProduct").style.display = "block";
    document.getElementById("renderListUser").style.display = "none";
}

// Xử lý quản lý người dùng.

let listUser = JSON.parse(localStorage.getItem("contactInput"));
function renderListUser(){
    let result = "";
    for(i = 0; i < listUser.length; i++){
        result +=
    `<tr>
        <td scope="row">${i + 1}</td>
        <td>${listUser[i].phone}</td>
        <td>${listUser[i].email}</td>
        <td>${listUser[i].password}</td>
         <td><button 
         onclick="deleteUser(${i})" class="btn btn-primery"><i class="bi bi-trash3-fill"></i></button></td>
         <td><button class="btn btn-primery" id = "status_${i}" onclick="banUser(${i})">Ban</button></td>
         <td ><span id = "status${i}">${listUser[i].status}</span></td>
    </tr>`
    }
    document.getElementById("listUser").innerHTML = result;
    // console.log(result,111);
} 
renderListUser();

// Hàm hiển thị người dùng.
function showUser(){
    document.getElementById("listProduct").style.display = "none";
    document.getElementById("renderListUser").style.display = "block";
}
function deleteUser(index){
    listUser.splice(index, 1);
    localStorage.setItem("contactInput", JSON.stringify(listUser));
    renderListUser();
}
function banUser(id){
    let listUser = JSON.parse(localStorage.getItem("contactInput"));
    let user = listUser[id];
    if(user.status === "Mở"){
        user.status = "Khóa";
        document.getElementById(`status_${id}`).innerHTML = "unban";    
    }else {
        user.status = "Mở";
        document.getElementById(`status_${id}`).innerHTML = "Ban";
    }
    document.getElementById(`status${id}`).innerHTML = user.status;
    localStorage.setItem("contactInput", JSON.stringify(listUser))
}
