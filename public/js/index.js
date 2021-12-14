"use strict";
var bAdd = document.getElementById('bAdd');
var inputTitle = document.getElementById('title');
var inputCost = document.getElementById('cost');
var inputCurrency = document.getElementById('currency');
var expenses = new Expenses('USD');
bAdd.addEventListener('click', function (event) {
    if (inputTitle.value != '' && inputCost.value != '' && !isNaN(parseFloat(inputCost.value))) {
        var title = inputTitle.value;
        var cost = parseFloat(inputCost.value);
        var currency = inputCurrency.value;
        expenses.add({
            title: title,
            cost: {
                number: cost,
                currency: currency
            }
        });
        render();
    }
    else {
        alert('completa los datos correctamente');
    }
});
var render = function () {
    var html = '';
    expenses.getItems().forEach(function (item) {
        var id = item.id, title = item.title, cost = item.cost;
        var number = cost.number, currency = cost.currency;
        html += "<div class=\"item\">\n                    <div><span class=\"currency\">" + currency + "</span>" + number + "</div>\n                    <div>" + title + "</div>\n                    <div><button class=\"bEliminar\" data-id=\"" + id + "\">Eliminar</button></div>\n                </div>";
    });
    var items = document.getElementById('items');
    items.innerHTML = html;
    var display = document.getElementById('display');
    display.textContent = expenses.getTotal();
    var botonEliminar = document.querySelectorAll('.bEliminar');
    botonEliminar.forEach(function (bEliminar) {
        bEliminar.addEventListener('click', function (event) {
            var id = event.target.getAttribute('data-id');
            expenses.remove(parseInt(id));
            render();
        });
    });
};
