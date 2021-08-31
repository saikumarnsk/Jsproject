const storeDetais = [];
let updatedMobileNumber = 0;

let isNotValidMobile = false;
let fname, lname, mobile, email;

function validateMobile() {
  const mobileNumber = document.getElementById("mobile").value;
  isNotValidMobile = storeDetais.some((item) => item.mobile === mobileNumber);
  if (isNotValidMobile && mobileNumber) {
    isNotValidMobile = true;
    alert("This mobile number is already registered!!");
    return;
  }
}
function updateUser() {
  const updatedFname = document.getElementById("fname").value;
  const updatedLname = document.getElementById("lname").value;
  const updatedgender = document.getElementById("radio1").checked
    ? "Male"
    : "Female";
  const updatedMobile = document.getElementById("mobile").value;
  const updatedEmail = document.getElementById("email").value;
  var e = document.getElementById("speification");
  var updatedspecification = e.options[e.selectedIndex].text;
  var checkboxes = document.getElementsByName("language");
  var updatedselectedlanguages = [];
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      updatedselectedlanguages.push(checkboxes[i].value);
    }
  }
  let table = document.getElementById("userDetails");
  let index = storeDetais.findIndex(
    (item) => item.mobile == updatedMobileNumber
  );
  storeDetais.splice(index, 1, {
    fName: updatedFname,
    lName: updatedLname,
    gender: updatedgender,
    mobile: updatedMobile,
    email: updatedEmail,
    specification: updatedspecification,
    selectedlanguages: updatedselectedlanguages,
  });
  deleteUser(updatedMobileNumber, "updating");
  updateTableDOM(
    updatedFname,
    updatedLname,
    updatedgender,
    updatedMobile,
    updatedEmail,
    updatedspecification,
    updatedselectedlanguages
  );
  clearFormData();
  document.getElementById("saveButtons").classList.toggle("hidden");
  document.getElementById("updateButton").classList.toggle("hidden");
  document
    .getElementsByClassName("saved-message")[0]
    .classList.toggle("hidden");
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
  if (userData.gender == "male") {
    document.getElementById("radio1").checked = true;
    document.getElementById("radio2").checked = false;
  } else {
    document.getElementById("radio1").checked = false;
    document.getElementById("radio2").checked = true;
  }
  document.getElementById("mobile").value = userData.mobile;
  document.getElementById("email").value = userData.email;
  document.getElementById("speification").value = userData.specification;
  console.log(userData.selectedLanguages); // ['React']
  document.getElementsByName("language").forEach((checkbox) => {
    if (userData.selectedLanguages.includes(checkbox.value)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
  document.getElementById("mobile").setAttribute("disabled", true);
  document.getElementById("saveButtons").classList.toggle("hidden");
  document.getElementById("updateButton").classList.toggle("hidden");
  document
    .getElementsByClassName("saved-message")[0]
    .classList.toggle("hidden");
}

function deleteUser(mobileNumber, actionType) {
  const table = document.getElementById("userDetails"); // DOM - Document Object Modal
  // BOM - Browser Object Modal.
  const index = storeDetais.findIndex((item) => item.mobile == mobileNumber);
  table.deleteRow(index + 1);
  if (actionType !== "updating") {
    storeDetais.splice(index, 1);
    document
      .getElementsByClassName("delete-message")[0]
      .classList.toggle("hidden");
    document
      .getElementsByClassName("saved-message")[0]
      .classList.toggle("hidden");
  }
}

function registerUser() {
  validateMobile();
  if (isNotValidMobile) {
    return;
  }
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const gender = document.getElementById("radio1").checked ? "Male" : "Female";
  const mobile = document.getElementById("mobile").value;
  console.log(typeof mobile);
  if (typeof mobile === "string") {
    alert("Please Fill the Mobile Number as a intiger");
    return;
  }
  const email = document.getElementById("email").value;
  var e = document.getElementById("speification");
  var specification = e.options[e.selectedIndex].text; //index=0,1:value=mecha,elect:text=mech.elect
  const selectedLanguages = [];
  document.getElementsByName("language").forEach((checkbox) => {
    if (checkbox.checked) {
      selectedLanguages.push(checkbox.value);
    }
  });

  const userData = {
    fName: fname,
    lName: lname,
    gender: gender,
    mobile: mobile,
    email: email,
    specification: specification,
    selectedLanguages: selectedLanguages,
  };
  storeDetais.push(userData);
  // Reset Data after register user.
  clearFormData();
  if (!fname || !lname || !mobile || !email) {
    alert("Please Fill The Details");
    return;
  }
  updateTableDOM(
    fname,
    lname,
    gender,
    mobile,
    email,
    specification,
    selectedLanguages
  );

  document
    .getElementsByClassName("saved-message")[0]
    .classList.remove("hidden");

  if (storeDetais.length) {
    document
      .getElementsByClassName("table-content")[0]
      .classList.remove("hidden");
  }
}

function updateTableDOM(
  firstName,
  lastName,
  gender,
  mobile,
  email,
  specification,
  selectedLanguages
) {
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
    gender +
    "</td>" +
    "<td>" +
    mobile +
    "</td>" +
    "<td>" +
    email +
    "</td>" +
    "<td>" +
    specification +
    "</td>" +
    "<td>" +
    selectedLanguages.join(", ") +
    "</td>" +
    "<td><img onclick='editUser(" +
    mobile +
    ")' src='../images/edit.png' class='action-image' width='25px' height='25px'/><img onclick='deleteUser(" +
    mobile +
    ")' src='../images/delete-icon.jpg' width='25px' height='25px' class='action-image' /></td></tr>";
}

function clearFormData() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("radio1").checked = true;
  document.getElementById("radio2").checked = false;
  document.getElementById("mobile").value = "";
  document.getElementById("email").value = "";
  document.getElementById("speification").value = "";
  document.getElementsByName("language").forEach((item) => {
    item.checked = false;
  });
}
