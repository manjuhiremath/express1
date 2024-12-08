// function getExpenses() {
//     const expenses = localStorage.getItem('expenses');
//     return expenses ? JSON.parse(expenses) : [];
//   }

//   function saveExpenses(expenses) {
//     localStorage.setItem('expenses', JSON.stringify(expenses));
//   }


//   function renderExpenses() {
//     const expenses = getExpenses();
//     const expenseList = document.getElementById('expenseList');
//     expenseList.innerHTML = ''; 

//     expenses.forEach((expense, index) => {
//       const li = document.createElement('li');
//       li.classList.add('list-group-item', 'expense-item');
//       li.innerHTML = `
//         <strong>${expense.amount}</strong> - ${expense.description} (${expense.category})
//         <button class="btn btn-sm btn-warning float-end ms-2 edit-btn">Edit</button>
//         <button class="btn btn-sm btn-danger float-end delete-btn">Delete</button>
//       `;

//       li.querySelector('.delete-btn').addEventListener('click', function () {
//         deleteExpense(index);
//       });

//       li.querySelector('.edit-btn').addEventListener('click', function () {
//         editExpense(index);
//       });

//       expenseList.appendChild(li);
//     });
//   }

//   function addExpense() {
//     const amount = document.getElementById('amount').value;
//     const description = document.getElementById('description').value;
//     const category = document.getElementById('category').value;

//     if (amount && description && category) {
//       const newExpense = { amount, description, category };
//       const expenses = getExpenses();
//       expenses.push(newExpense);
//       saveExpenses(expenses);
//       renderExpenses();

//       document.getElementById('amount').value = '';
//       document.getElementById('description').value = '';
//       document.getElementById('category').value = 'Food';
//     } else {
//       alert('Please fill out all fields.');
//     }
//   }

//   function deleteExpense(index) {
//     const expenses = getExpenses();
//     expenses.splice(index, 1);
//     saveExpenses(expenses);
//     renderExpenses();
//   }

//   function editExpense(index) {
//     const expenses = getExpenses();
//     const expense = expenses[index];

//     document.getElementById('amount').value = expense.amount;
//     document.getElementById('description').value = expense.description;
//     document.getElementById('category').value = expense.category;

//     deleteExpense(index);
//   }

//   document.getElementById('addExpenseBtn').addEventListener('click', addExpense);

//   window.onload = renderExpenses;
let currentId = null;
let isEdit = false;

async function getAll() {
  axios.get("http://localhost:3000/expense")
    .then((response) => {
      // console.log(response.data);
      const expenses = response.data;
      const expenseDiv = document.getElementById("expenses-list");
      let tableView = expenses
        .map((expense) => {
          return `
            <tr>
              <td>${expense.id}</td>
              <td>${expense.amount}</td>
              <td>${expense.description}</td>
              <td>${expense.category}</td>
              <td><button class="btn btn-primary" onclick="handleEdit(${expense.id})">Edit</button></td>
              <td><button class="btn btn-danger" onclick="deleteExpense(${expense.id})">Delete</button></td>
            </tr>
          `;
        })
        .join("");
      expenseDiv.innerHTML = tableView;
    })
    .catch((error) => {
      console.error("There was an error fetching the expenses:", error);
    });
}

getAll();

async function handleExpense() {
  event.preventDefault();
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  try {
    if (!isEdit) {
      await axios.post("http://localhost:3000/expense", { amount, description, category });
    } else {
      await axios.put(`http://localhost:3000/expense/${currentId}`, { amount, description, category });
      isEdit = false;
    }
    document.getElementById('submit').textContent = "Submit";
    resetForm();
    await getAll();
  } catch (err) {
    console.log(err);
  }
}

async function handleEdit(id) {
  try {
    const response = await axios.get(`http://localhost:3000/expense/${id}`)
    const expense = response.data;
    document.getElementById('amount').value = expense.amount;
    document.getElementById('description').value = expense.description;
    // document.getElementById('category').value = expense.category;
    const categoryElement = document.getElementById('category');
    const categoryValue = expense.category;

    // Use reduce to find if the category exists in the select options
    const matchingOption = Array.from(categoryElement.options).reduce((found, option) => {
      return found || option.value === categoryValue; // accumulate true if match is found
    }, false);

    // If a matching option is found, set it as the selected value
    if (matchingOption) {
      categoryElement.value = categoryValue;
    } else {
      console.warn('Category not found in the select options:', categoryValue);
    }
    currentId = expense.id;
    isEdit = true;
    console.log(currentId)
    document.getElementById('submit').textContent = "Update expense";
  } catch (err) {
    console.log(err)
  }
}

async function deleteExpense(id) {
  try {
    await axios.delete(`http://localhost:3000/expense/${id}`);
    await getAll();
  } catch (err) {
    console.log(err);
  }

}

function resetForm() {
  document.getElementById('amount').value = '';
  document.getElementById('description').value = '';
  document.getElementById('category').value = '';
  document.getElementById('submit').textContent = "Submit";  // Reset button text to "Submit"
  isEdit = false;
  currentId = null;
}