// Function to retrieve expenses from local storage
function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

// Function to save expenses to local storage
function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Function to display expenses and total
function displayExpenses() {
  const expenses = getExpenses();
  const expenseList = document.getElementById("expenseList");
  const totalExpense = document.getElementById("totalExpense");

  let total = 0;
  expenseList.innerHTML = "";
  expenses.forEach((expense) => {
    total += expense.amount;
    expenseList.innerHTML += `<div>${expense.name}: $${expense.amount.toFixed(
      2
    )}</div>`;
  });

  totalExpense.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to handle form submission
document
  .getElementById("expenseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const expenseName = document.getElementById("expenseName").value;
    const expenseAmount = parseFloat(
      document.getElementById("expenseAmount").value
    );

    if (expenseName && !isNaN(expenseAmount)) {
      const newExpense = {
        name: expenseName,
        amount: expenseAmount,
      };

      const expenses = getExpenses();
      expenses.push(newExpense);
      saveExpenses(expenses);

      displayExpenses();

      // Reset form fields
      document.getElementById("expenseName").value = "";
      document.getElementById("expenseAmount").value = "";
    } else {
      alert("Please enter a valid expense name and amount.");
    }
  });
  // Function to handle clearing expenses
document.getElementById('clearExpenses').addEventListener('click', function() {
  if (confirm('Are you sure you want to clear all expenses?')) {
    localStorage.removeItem('expenses');
    displayExpenses(); // Update the displayed expenses after clearing
  }
});

// Initial display of expenses when the page loads
displayExpenses();
