let contactInput = JSON.parse(localStorage.getItem("contactInput"));
function saveUser(e) {
  e.preventDefault();
  let phoneValue = document.getElementById("phone").value;
  let emailValue = document.getElementById("email").value;
  let passwordValue = document.getElementById("password").value;
  let passwordValue1 = document.getElementById("password1").value;
  let valueInput = {
    id: 1,
    phone: phoneValue,
    email: emailValue,
    password: passwordValue,
    password1: passwordValue1,
    status: "Mở",
  }
  if(phoneValue == ""){
    document.getElementById("vldPhone").innerHTML = `* Mời nhập số điện thoại!`
    return;
  }else if(phoneValue.length !== 10){
    document.getElementById("vldPhone").innerHTML = `* Số điện thoại phải 10 số!`
    return;
  }
  if(emailValue == ""){
    document.getElementById("vldEmail").innerHTML = `* Mời nhập Email!`
  }
  if(passwordValue == ""){
    document.getElementById("vldPass").innerHTML = `* Mời nhập mật khẩu!`
  }else if(passwordValue1 == ""){
    document.getElementById("result").innerHTML = `Mời nhập mật khẩu!`
  }
  if (valueInput.password != valueInput.password1) {
    document.getElementById("result").innerHTML = `* Mật khẩu không trùng nhau!`;
    return;
  } else if (valueInput.password.length <= 6) {
    document.getElementById("result").innerHTML = `* Mật khẩu phải trên 6 ký tự!`
    return;
  }
  if (contactInput != null && contactInput.find((user) => user.email === emailValue)) {
    document.getElementById("vldEmail").innerHTML = `* Email đã được đăng ký!`;
    return;
  } else if (contactInput != null && contactInput.find((user) => user.phone === phoneValue)) {
    document.getElementById("vldPhone").innerHTML = `* Số điện thoại đã được đăng ký!`;
    return;
  }
  if (contactInput == null) {
    contactInput = [];
    contactInput.push(valueInput);
    localStorage.setItem("contactInput", JSON.stringify(contactInput));
  } else {
    contactInput.push(valueInput);
    localStorage.setItem("contactInput", JSON.stringify(contactInput));
  }
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
  setTimeout(()=>{ window.location.href = "./dangnhap.html";}, 3000);
}