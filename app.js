var totalAmount = document.getElementById("amt");
var userAmount = document.getElementById("usr-amt");
var checkAmountButton = document.getElementById("chk-amt");
var totalAmountButton = document.getElementById("amt-btn");
var productTitle = document.getElementById("prod");
var errorMessage = document.getElementById("bud-err");
var productTitleError = document.getElementById("prod-err");
var productCostError = document.getElementById("prod-err");
var amount = document.getElementById("b");
var expenditureValue = document.getElementById("E");
var balanceValue = document.getElementById("sp");
var list = document.getElementById("list");
var tempAmount = 0;

totalAmountButton.addEventListener("click", function() {
  tempAmount = totalAmount.value;
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    amount.innerHTML = tempAmount;
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    totalAmount.value = "";
  }
});

var disableButtons = function(bool) {
  var editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach(function(element) {
    element.disabled = bool;
  });
};

var modifyElement = function(element, edit) {
  if (edit === void 0) {
    edit = false;
  }
  var parentDiv = element.parentElement;
  var currentBalance = balanceValue.innerText;
  var currentExpense = expenditureValue.innerText;
  var parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    var parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
};

var listCreator = function(expenseName, expenseValue) {
  var sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML =
    '<p class="product">' +
    expenseName +
    '</p><p class="amount">' +
    expenseValue +
    "</p>";
  var editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", function() {
    modifyElement(editButton, true);
  });
  var deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", function() {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};

checkAmountButton.addEventListener("click", function() {
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  disableButtons(false);
  var expenditure = parseInt(userAmount.value);
  var sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  var totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  listCreator(productTitle.value, userAmount.value);
  productTitle.value = "";
  userAmount.value = "";
});
