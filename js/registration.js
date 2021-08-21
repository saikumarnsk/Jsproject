const storeDetais = [];

let isNotValidMobile = false;

function validateMobile() {
  const mobileNumber = document.getElementById("mobile").value;
  isNotValidMobile = storeDetais.some((item) => item.mobile === mobileNumber);
  if (isNotValidMobile) {
    isNotValidMobile = true;
    alert("This mobile number is already registered!!");
    return;
  }
}

function editUser(mobileNumber) {
  const userData = storeDetais.find((item) => item.mobile == mobileNumber);
  document.getElementById("fname").value = userData.fName;
  document.getElementById("lname").value = userData.lName;
  document.getElementById("mobile").value = userData.mobile;
  document.getElementById("email").value = userData.email;

  document.getElementById("mobile").setAttribute("disabled", true);
  document.getElementById("saveButtons").classList.toggle("hidden");
  document.getElementById("updateButton").classList.toggle("hidden");
}

function deleteUser(mobileNumber) {
  console.log("You Clicked On Delete", mobileNumber);
}

function registerUser() {
  validateMobile();
  if (isNotValidMobile) {
    return;
  }
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;

  const userData = {
    fName: fname,
    lName: lname,
    mobile: mobile,
    email: email,
  };
  storeDetais.push(userData);
  // Reset Data after register user.
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("mobile").value = "";
  document.getElementById("email").value = "";

  if (!fname || !lname || !mobile || !email) {
    alert("Please Fill The Details");
    return;
  }
  let table = document.getElementById("userDetails");
  table.innerHTML =
    table.innerHTML +
    "<tr><td>" +
    fname +
    "</td>" +
    "<td>" +
    lname +
    "</td>" +
    "<td>" +
    mobile +
    "</td>" +
    "<td>" +
    email +
    "</td>" +
    "<td><img onclick='editUser(" +
    mobile +
    ")' src='../images/edit.png' class='action-image' width='25px' height='25px'/><img onclick='deleteUser((" +
    mobile +
    ")' src='../images/delete-icon.jpg' width='25px' height='25px' class='action-image' /></td></tr>";
}
