let budgetInput = document.getElementById("amt");
let expenseInput = document.getElementById("usr-amt");
const checkExpenseButton = document.getElementById("chk-amt");
const setBudgetButton = document.getElementById("amt-btn");
const productTitleInput = document.getElementById("prod");
const budgetErrorMessage = document.getElementById("bud-err");
const productTitleErrorMessage = document.getElementById("prod-err");
const productCostErrorMessage = document.getElementById("prod-err");
const budgetDisplay = document.getElementById("b");
const expenseDisplay = document.getElementById("E");
const balanceDisplay = document.getElementById("sp");
const expenseList = document.getElementById("list");
let tempBudget = 0;

function handleSetBudget() {
  tempBudget = budgetInput.value;
  if (tempBudget === "" || tempBudget < 0) {
    budgetErrorMessage.classList.remove("hide");
  } else {
    budgetErrorMessage.classList.add("hide");
    budgetDisplay.innerHTML = tempBudget;
    balanceDisplay.innerText = tempBudget - expenseDisplay.innerText;
    budgetInput.value = "";
  }
}

setBudgetButton.addEventListener("click", handleSetBudget);

function disableButtons(bool) {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach(function (element) {
    element.disabled = bool;
  });
}

function modifyElement(element, edit = false) {
  let parentDiv = element.parentElement;
  let currentBalance = balanceDisplay.innerText;
  let currentExpense = expenseDisplay.innerText;
  let parentAmountElement = parentDiv.querySelector(".amount");
  let parentTextElement = parentDiv.querySelector(".product");
  let parentAmount = parentAmountElement.innerText;

  if (edit) {
    let parentText = parentTextElement.innerText;
    productTitleInput.value = parentText;
    expenseInput.value = parentAmount;
    disableButtons(true);
    parentDiv.remove();
    balanceDisplay.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenseDisplay.innerText = parseInt(currentExpense) - parseInt(parentAmount);
  } else {
    parentAmountElement.innerText = expenseInput.value;
    parentTextElement.innerText = productTitleInput.value;
    disableButtons(false);
    let updatedAmount = parseInt(expenseInput.value);
    let difference = updatedAmount - parseInt(parentAmount);
    balanceDisplay.innerText = parseInt(currentBalance) - difference;
    expenseDisplay.innerText = parseInt(currentExpense) + difference;
  }
}

function createExpenseElement(expenseName, expenseValue) {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  let productElement = document.createElement("p");
  productElement.classList.add("product");
  productElement.textContent = expenseName;
  sublistContent.appendChild(productElement);
  let amountElement = document.createElement("p");
  amountElement.classList.add("amount");
  amountElement.textContent = expenseValue;
  sublistContent.appendChild(amountElement);
  let editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.innerHTML = '<i class="fas fa-pen"></i>';
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", function () {
    modifyElement(editButton, true);
  });
  sublistContent.appendChild(editButton);
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", function () {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(deleteButton);
  expenseList.appendChild(sublistContent);
}

function handleAddExpense() {
  if (!expenseInput.value || !productTitleInput.value) {
    productTitleErrorMessage.classList.remove("hide");
    return false;
  }
  disableButtons(false);
  let expense = parseInt(expenseInput.value);
  let sum = parseInt(expenseDisplay.innerText) + expense;
  expenseDisplay.innerText = sum;
  const totalBalance = tempBudget - sum;
  balanceDisplay.innerText = totalBalance;
  createExpenseElement(productTitleInput.value, expenseInput.value);
  productTitleInput.value = "";
  expenseInput.value = "";
}

checkExpenseButton.addEventListener("click", handleAddExpense);
