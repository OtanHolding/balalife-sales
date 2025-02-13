// Инициализация массива для хранения данных
let users = [];

// Элементы DOM
const form = document.getElementById('crud-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const tableBody = document.getElementById('table-body');

// Функция для рендеринга таблицы
function renderTable() {
    tableBody.innerHTML = ''; // Очищаем таблицу перед рендером
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="editUser(${index})">Редактировать</button>
                <button onclick="deleteUser(${index})">Удалить</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Функция для добавления нового пользователя
function addUser(event) {
    event.preventDefault();
    
    const name = nameInput.value;
    const email = emailInput.value;

    if (name && email) {
        users.push({ name, email });
        renderTable();
        nameInput.value = '';
        emailInput.value = '';
    }
}

// Функция для редактирования пользователя
function editUser(index) {
    const user = users[index];
    nameInput.value = user.name;
    emailInput.value = user.email;
    
    // Заменяем кнопку "Добавить" на "Сохранить"
    form.removeEventListener('submit', addUser);
    form.addEventListener('submit', function saveUser(event) {
        event.preventDefault();
        users[index] = {
            name: nameInput.value,
            email: emailInput.value,
        };
        renderTable();
        form.removeEventListener('submit', saveUser);
        form.addEventListener('submit', addUser);
        nameInput.value = '';
        emailInput.value = '';
    });
}

// Функция для удаления пользователя
function deleteUser(index) {
    users.splice(index, 1);
    renderTable();
}

// Обработчик отправки формы
form.addEventListener('submit', addUser);

// Инициализация рендеринга таблицы
renderTable();
