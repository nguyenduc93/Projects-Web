function saveLogin(e) {
  let contactInput = JSON.parse(localStorage.getItem("contactInput"));
    e.preventDefault();
    let loginPhone = document.getElementById("phone").value;
    let loginPassword = document.getElementById("passwordInput").value;
    localStorage.setItem("flag",1);
    localStorage.setItem("numberPhone",loginPhone);
    let checkLogin1 = contactInput.find((user) => user.status === "Khóa")
    if(checkLogin1){
        document.getElementById("result").innerHTML = `Tài khoản đã khóa, hãy liên hệ với admin`;
        return;
    }
    let checkLogin = contactInput.find((user) => user.phone === loginPhone && user.password === loginPassword);
    if(loginPhone == 0975771793 && loginPassword == 68686868){
        setTimeout(()=>{ 
            window.location.href = "../html/admin.html";
        }, 2000);

    }else if (checkLogin) {
        localStorage.setItem("flag",1);
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
        setTimeout(()=>{ window.location.href = "../index.html";}, 2000);
        } else {
        localStorage.setItem("flag",0);
        document.getElementById("result").innerHTML = `* Thông tin không chính xác!`;
    }
}

// Phần xử lý mật khẩu
function togglePassword() {
    let passwordInput = document.getElementById("passwordInput");
    let togglePassword = document.getElementById("togglePassword1");
    // Thêm sự kiện click vào icon
    // togglePassword.addEventListener("click", function () {
      // Thay đổi kiểu hiển thị của mật khẩu
      if (passwordInput.type === "password"){
        passwordInput.type = "text";
        togglePassword.classList.remove("bi-eye-slash");
        togglePassword.classList.add("bi-eye");
      } else {
        passwordInput.type = "password";
        togglePassword.classList.remove("bi-eye");
        togglePassword.classList.add("bi-eye-slash");
      }
    }; 
  togglePassword();