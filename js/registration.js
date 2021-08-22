const storeDetais = [];
let updatedMobileNumber = 0;

let isNotValidMobile = false;
let fname, lname, mobile, email;

function validateMobile() {
  const mobileNumber = document.getElementById("mobile").value;
  isNotValidMobile = storeDetais.some((item) => item.mobile === mobileNumber);
  if (isNotValidMobile) {
    isNotValidMobile = true;
    alert("This mobile number is already registered!!");
    return;
  }
}

function updateUser() {
  const updatedFname = document.getElementById("fname").value;
  const updatedLname = document.getElementById("lname").value;
  const updatedMobile = document.getElementById("mobile").value;
  const updatedEmail = document.getElementById("email").value;
  let table = document.getElementById("userDetails");
  let index = storeDetais.findIndex(
    (item) => item.mobile == updatedMobileNumber
  );
  storeDetais.splice(index, 1, {
    fName: updatedFname,
    lName: updatedLname,
    mobile: updatedMobile,
    email: updatedEmail,
  });
  deleteUser(updatedMobileNumber, "updating");
  updateTableDOM(updatedFname, updatedLname, updatedMobile, updatedEmail);
  clearFormData();
  document.getElementById("saveButtons").classList.toggle("hidden");
  document.getElementById("updateButton").classList.toggle("hidden");
  // const updatedStore = storeDetais.map((item) => {
  //   if (item.mobile == updatedMobileNumber) {
  //     return {
  //       fName: updatedFname,
  //       lName: updatedLname,
  //       mobile: updatedMobile,
  //       email: updatedEmail,
  //     };
  //   } else {
  //     return item;
  //   }
  // });
  // storeDetais = updatedStore;
}

function editUser(mobileNumber) {
  updatedMobileNumber = mobileNumber;
  const userData = storeDetais.find((item) => item.mobile == mobileNumber);
  document.getElementById("fname").value = userData.fName;
  document.getElementById("lname").value = userData.lName;
  document.getElementById("mobile").value = userData.mobile;
  document.getElementById("email").value = userData.email;

  document.getElementById("mobile").setAttribute("disabled", true);
  document.getElementById("saveButtons").classList.toggle("hidden");
  document.getElementById("updateButton").classList.toggle("hidden");
}

function deleteUser(mobileNumber, actionType) {
  const table = document.getElementById("userDetails"); // DOM - Document Object Modal
  // BOM - Browser Object Modal.
  const index = storeDetais.findIndex((item) => item.mobile == mobileNumber);
  table.deleteRow(index + 1);
  if (actionType !== "updating") {
    storeDetais.splice(index, 1);
  }
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
  clearFormData();
  if (!fname || !lname || !mobile || !email) {
    alert("Please Fill The Details");
    return;
  }
  updateTableDOM(fname, lname, mobile, email);
}

function updateTableDOM(firstName, lastName, mobile, email) {
  const table = document.getElementById("userDetails");
  table.innerHTML =
    table.innerHTML +
    "<tr><td>" +
    firstName +
    "</td>" +
    "<td>" +
    lastName +
    "</td>" +
    "<td>" +
    mobile +
    "</td>" +
    "<td>" +
    email +
    "</td>" +
    "<td><img onclick='editUser(" +
    mobile +
    ")' src='../images/edit.png' class='action-image' width='25px' height='25px'/><img onclick='deleteUser(" +
    mobile +
    ")' src='../images/delete-icon.jpg' width='25px' height='25px' class='action-image' /></td></tr>";
  alert("Details  Submited Successfully");
}

function clearFormData() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("mobile").value = "";
  document.getElementById("email").value = "";
}
