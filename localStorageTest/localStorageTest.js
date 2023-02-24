//Elements
const inputKey = document.querySelector('#inputKey');
const inputValue = document.querySelector('#inputValue');
let currentTable = document.querySelector('#currentTable');
let editMode = false;

//Functions
const addItem = function () {
  if(editMode){
    inputKey.disabled = false;
    editMode = false;
  }
  const key = inputKey.value;
  const value = inputValue.value;
  localStorage.setItem(key, value);
  cleanInputs();
  buildTableItems();
};
const removeItem = function (key) {
  const exist = localStorage.getItem(key);
  if (exist) {
    localStorage.removeItem(key);
    buildTableItems();
  } else alert(`${key} no existe`);
};
const editItem = function(key, value){
  const exist = localStorage.getItem(key);
  if (exist) {
    inputKey.value = key;
    inputValue.value = value;
    inputKey.disabled = true;
  } else alert(`${key} no existe`);
}
const clearItems = function () {
  const hasValue = localStorage.key(0);
  if (hasValue) {
    localStorage.clear();
    document.getElementById('current-body').remove();
  } else alert(`La base de datos esta vacia`);
};
const buildTableItems = function () {
  let body = document.getElementById('current-body');
  if (body) body.remove();
  body = document.createElement('tbody');
  body.id = 'current-body';
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    const value = localStorage.getItem(key);
    let keyColumn = document.createElement('td');
    let valueColumn = document.createElement('td');
    let deleteButton = document.createElement('button');
    let btnDeleteColumn = document.createElement('td');
    let btnEditColumn = document.createElement('td');
    let editButton = document.createElement('button');
    let row = document.createElement('tr');
    keyColumn.textContent = key;
    valueColumn.textContent = value;
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function(){
      removeItem(key);
    }
    btnDeleteColumn.appendChild(deleteButton);
    editButton.textContent = "Edit";
    editButton.onclick = function(){
      editMode = true;
      editItem(key, value);
    }
    btnEditColumn.appendChild(editButton);
    row.appendChild(keyColumn);
    row.appendChild(valueColumn);
    row.appendChild(btnEditColumn);
    row.appendChild(btnDeleteColumn);
    body.appendChild(row);
  }
  currentTable.appendChild(body);
};
const cleanInputs = function(){
  inputKey.value = '';
  inputValue.value = '';
}
window.onload = buildTableItems;
